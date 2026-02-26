import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactNotificationEmail } from '@/components/apply/ContactNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Send data to Google Sheets
    const googleSheetsPromise = fetch(
      'https://script.google.com/macros/s/AKfycbxVYt0mUeip6jnkptx2_lvfW7f83onsP-2uBbvhkPKxSpn_MoUzRXUsL13yDP5aXPYg/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          motivation: data.motivation,
          goals: data.goals,
          experience: data.experience,
          referral: data.referral,
        }),
      }
    );

    // 2. Send email via Resend
    const emailPromise = resend.emails.send({
      from: 'Khrien Academy Application <hello@khrien.com>',
      to: ['khriencreation@gmail.com'],
      subject: `New Application: ${data.fullName}`,
      react: ContactNotificationEmail({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        motivation: data.motivation,
        goals: data.goals,
        experience: data.experience,
        referral: data.referral,
      }),
    });

    // Run both tasks
    const [sheetResponse, emailResult] = await Promise.all([
      googleSheetsPromise,
      emailPromise,
    ]);

    const sheetText = await sheetResponse.text();

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error);
      // We still return success if the sheet worked, but log the error
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form processed successfully',
      sheetStatus: sheetText 
    });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
