import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { FeeConfirmationEmail } from '@/components/emails/FeeConfirmationEmail';
import { PlacementTestEmail } from '@/components/emails/PlacementTestEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('verif-hash');
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH || process.env.FLW_WEBHOOK_HASH;

    if (!signature || signature !== secretHash) {
      console.warn('Flutterwave Webhook: Invalid signature hash');
      return NextResponse.json({ success: false, error: 'Unauthorized signature' }, { status: 401 });
    }

    const payload = await req.json();
    console.log('Flutterwave Webhook payload received:', payload?.event, payload?.data?.tx_ref);

    if (payload.event !== 'charge.completed' || payload.data?.status !== 'successful') {
      return NextResponse.json({ success: true, message: 'Event ignored (not successful charge)' });
    }

    const txData = payload.data;
    const txRef: string = txData.tx_ref || '';
    const meta = txData.meta || {};
    const amount: number = Number(txData.amount || 0);
    const customerEmail: string = txData.customer?.email || '';

    let applicationId = meta.application_id || meta.applicationId;
    if (!applicationId && txRef) {
      const parts = txRef.split('-');
      if (parts.length >= 4) {
        // e.g. APPFEE - KHA - TIMESTAMP - RAND - TS -> KHA-TIMESTAMP-RAND
        applicationId = parts.slice(1, parts.length - 1).join('-');
      } else if (parts.length >= 2) {
        applicationId = parts.slice(1).join('-');
      }
    }

    if (!applicationId) {
      console.error('Flutterwave Webhook: Application ID could not be identified from txRef or meta', txRef, meta);
      return NextResponse.json({ success: false, error: 'Application ID missing' }, { status: 400 });
    }

    // Fetch existing application from Supabase
    const { data: application, error: fetchErr } = await supabase
      .from('applications')
      .select('*')
      .eq('application_id', applicationId)
      .maybeSingle();

    if (fetchErr || !application) {
      console.error('Flutterwave Webhook: Application record not found in Supabase:', applicationId, fetchErr);
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.khrien.com';

    // 1. APPLICATION FEE PAYMENT (₦2,000)
    if (txRef.startsWith('APPFEE-') || meta.payment_type === 'app_fee' || amount === 2000) {
      const { error: updateErr } = await supabase
        .from('applications')
        .update({
          application_fee_status: 'paid',
          application_fee_tx_ref: txRef,
          updated_at: new Date().toISOString(),
        })
        .eq('id', application.id);

      if (updateErr) {
        console.error('Flutterwave Webhook: Failed updating application_fee_status:', updateErr);
      } else {
        console.log(`Application Fee confirmed for ${applicationId}`);
      }

      // Send Fee Confirmation Email + Tuition Payment link
      const tuitionUrl = `${baseUrl}/tuition?ref=${applicationId}`;
      try {
        await resend.emails.send({
          from: 'Khrien Academy <hello@khrien.com>',
          to: [customerEmail || application.email],
          subject: 'Application Fee Confirmed! Next Step: Pay Tuition 🚀',
          react: FeeConfirmationEmail({
            fullName: application.full_name,
            applicationId: applicationId,
            courseSelection: application.course_selection || 'Catalyst Cohort Course',
            pricingTier: application.pricing_tier || 'early_bird',
            tuitionUrl,
          }),
        });
      } catch (emailErr) {
        console.error('Flutterwave Webhook: Error sending FeeConfirmationEmail:', emailErr);
      }

      return NextResponse.json({ success: true, message: 'Application fee recorded successfully' });
    }

    // 2. TUITION PAYMENT
    if (txRef.startsWith('TUITION-') || meta.payment_type === 'tuition') {
      const existingPaid = Number(application.tuition_paid_amount || 0);
      const newTotalPaid = existingPaid + amount;
      const targetTuition = Number(meta.total_tuition_fee || application.total_tuition_fee || 0);
      const paymentPlan = meta.payment_plan || application.payment_plan || 'full';

      let newStatus = 'partially_paid';
      if (targetTuition > 0 && newTotalPaid >= targetTuition) {
        newStatus = 'paid';
      } else if (paymentPlan === 'full' || newTotalPaid >= (targetTuition || 1)) {
        newStatus = 'paid';
      }

      const { error: updateTuitionErr } = await supabase
        .from('applications')
        .update({
          tuition_status: newStatus,
          tuition_paid_amount: newTotalPaid,
          tuition_tx_ref: txRef,
          payment_plan: paymentPlan,
          updated_at: new Date().toISOString(),
        })
        .eq('application_id', applicationId);

      if (updateTuitionErr) {
        console.error('Flutterwave Webhook: Failed updating tuition_status:', updateTuitionErr);
      } else {
        console.log(`Tuition payment of ₦${amount} confirmed for ${applicationId}. Status: ${newStatus}`);
      }

      // Trigger Placement Test email if tuition is paid or partially paid (1st installment complete)
      const placementTestUrl = `${baseUrl}/scholarship-test?ref=${applicationId}`;
      try {
        await resend.emails.send({
          from: 'Khrien Academy <hello@khrien.com>',
          to: [customerEmail || application.email],
          subject: 'Tuition Confirmed — Welcome to the Catalyst Cohort! 🎉',
          react: PlacementTestEmail({
            fullName: application.full_name,
            applicationId: applicationId,
            courseSelection: application.course_selection || 'Catalyst Cohort Course',
            placementTestUrl,
          }),
        });

        // Mark placement test as sent in Supabase
        await supabase
          .from('applications')
          .update({ placement_test_status: 'sent' })
          .eq('application_id', applicationId);

      } catch (emailErr) {
        console.error('Flutterwave Webhook: Error sending PlacementTestEmail:', emailErr);
      }

      return NextResponse.json({ success: true, message: 'Tuition payment recorded successfully' });
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error: any) {
    console.error('Flutterwave Webhook Handler Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
