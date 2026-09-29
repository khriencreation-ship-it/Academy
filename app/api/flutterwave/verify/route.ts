import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { FeeConfirmationEmail } from '@/components/emails/FeeConfirmationEmail';
import { PlacementTestEmail } from '@/components/emails/PlacementTestEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const { transaction_id, tx_ref, applicationId, type, amount } = await req.json();

    if (!tx_ref || !applicationId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY || process.env.FLW_SECRET_KEY;

    // Verify transaction with Flutterwave API if transaction_id provided
    let isVerified = true;
    let verifiedAmount = 0;

    if (transaction_id && secretKey) {
      try {
        const flwRes = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`,
          },
        });
        const flwData = await flwRes.json();
        if (flwData?.status === 'success' && flwData?.data?.status === 'successful') {
          isVerified = true;
          verifiedAmount = flwData.data.amount;
        } else {
          isVerified = false;
        }
      } catch (err) {
        console.warn('Flutterwave direct API verification warning:', err);
      }
    }

    if (!isVerified) {
      return NextResponse.json({ success: false, error: 'Transaction verification failed' }, { status: 400 });
    }

    let cleanAppId = applicationId;
    if (!cleanAppId || cleanAppId.startsWith('APPFEE-') || cleanAppId.startsWith('TUITION-')) {
      if (tx_ref) {
        const parts = tx_ref.split('-');
        if (parts.length >= 4) {
          cleanAppId = parts.slice(1, parts.length - 1).join('-');
        } else if (parts.length >= 2) {
          cleanAppId = parts.slice(1).join('-');
        }
      }
    }

    // Fetch application record
    const { data: app, error: fetchErr } = await supabase
      .from('applications')
      .select('*')
      .eq('application_id', cleanAppId)
      .maybeSingle();

    if (fetchErr || !app) {
      console.error('Verify API error finding application:', cleanAppId, fetchErr);
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.khrien.com';

    if (type === 'app_fee' || tx_ref.startsWith('APPFEE-')) {
      const { error: updateErr } = await supabase
        .from('applications')
        .update({
          application_fee_status: 'paid',
          application_fee_tx_ref: tx_ref,
          updated_at: new Date().toISOString(),
        })
        .eq('id', app.id);

      if (updateErr) {
        console.error('Verify API: Error updating application_fee_status in Supabase:', updateErr);
      } else {
        console.log(`Verify API: Successfully marked application_fee_status as paid for ${cleanAppId}`);
      }

      const tuitionUrl = `${baseUrl}/tuition?ref=${cleanAppId}`;

      // Send Fee Confirmation Email
      try {
        await resend.emails.send({
          from: 'Khrien Academy <hello@khrien.com>',
          to: [app.email],
          subject: 'Application Fee Confirmed! Next Step: Pay Tuition 🚀',
          react: FeeConfirmationEmail({
            fullName: app.full_name,
            applicationId: cleanAppId,
            courseSelection: app.course_selection || 'Catalyst Cohort Course',
            pricingTier: app.pricing_tier || 'early_bird',
            tuitionUrl,
          }),
        });
      } catch (err) {
        console.error('Error sending fee email in verify:', err);
      }

      return NextResponse.json({
        success: true,
        message: 'Application fee verified',
        tuitionUrl,
      });
    }

    if (type === 'tuition' || tx_ref.startsWith('TUITION-')) {
      const currentPaid = Number(app.tuition_paid_amount || 0);
      const paymentAmount = verifiedAmount || Number(amount || 0);
      const newPaid = currentPaid + paymentAmount;

      await supabase
        .from('applications')
        .update({
          tuition_status: 'paid',
          tuition_paid_amount: newPaid,
          tuition_tx_ref: tx_ref,
          updated_at: new Date().toISOString(),
        })
        .eq('application_id', cleanAppId);

      const placementTestUrl = `${baseUrl}/scholarship-test?ref=${cleanAppId}`;

      try {
        await resend.emails.send({
          from: 'Khrien Academy <hello@khrien.com>',
          to: [app.email],
          subject: 'Tuition Confirmed — Complete Your Placement Check 🎓',
          react: PlacementTestEmail({
            fullName: app.full_name,
            applicationId: cleanAppId,
            courseSelection: app.course_selection || 'Catalyst Cohort Course',
            placementTestUrl,
          }),
        });
      } catch (err) {
        console.error('Error sending placement email in verify:', err);
      }

      return NextResponse.json({
        success: true,
        message: 'Tuition verified',
        placementTestUrl,
      });
    }

    return NextResponse.json({ success: true, message: 'Verified' });
  } catch (err: any) {
    console.error('Verify API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
