import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { CorporateNotificationEmail } from '@/components/corporate-training/CorporateNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, workEmail, phone, companyName, staffCount, deliveryMode, departments, goals, startDate } = data;

    if (!fullName || !workEmail || !phone || !companyName || !goals) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const enquiryId = `KHC-${timestamp}-${random}`;

    // 1. Log to console
    console.log('[Corporate AI Training Enquiry Received]:', {
      enquiryId,
      fullName,
      workEmail,
      phone,
      companyName,
      staffCount,
      deliveryMode,
      departments,
      goals,
      startDate: startDate || 'N/A',
    });

    // 2. Insert into Supabase if configured (failsafe)
    try {
      if (supabase) {
        await supabase.from('corporate_enquiries').insert([
          {
            enquiry_id: enquiryId,
            full_name: fullName,
            work_email: workEmail,
            phone: phone,
            company_name: companyName,
            staff_count: staffCount,
            delivery_mode: deliveryMode,
            departments: departments,
            goals: goals,
            start_date: startDate || null,
            created_at: new Date().toISOString(),
          }
        ]);
      }
    } catch (dbErr) {
      console.warn('Database storage skipped or unavailable:', dbErr);
    }

    // 3. Send email notification via Resend to khriencreation@gmail.com and hello@khrien.com
    try {
      await resend.emails.send({
        from: 'Khrien Academy <hello@khrien.com>',
        to: ['khriencreation@gmail.com', 'hello@khrien.com'],
        subject: `New Corporate AI Training Booking: ${companyName}`,
        react: CorporateNotificationEmail({
          enquiryId,
          fullName,
          workEmail,
          phone,
          companyName,
          staffCount,
          deliveryMode,
          departments,
          goals,
          startDate,
        }),
      });
    } catch (emailErr) {
      console.warn('Resend email notification warning:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Corporate AI training enquiry submitted successfully',
      enquiryId,
    });
  } catch (err: any) {
    console.error('Corporate Training API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
