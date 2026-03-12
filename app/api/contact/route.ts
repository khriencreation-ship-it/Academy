import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactNotificationEmail } from '@/components/apply/ContactNotificationEmail';
import { ApplicantConfirmationEmail } from '@/components/apply/ApplicantConfirmationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Generate unique Application ID
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const applicationId = `KHA-${timestamp}-${random}`;

    // 1. Send data to Google Sheets
    const googleSheetsPromise = fetch(
      'https://script.google.com/macros/s/AKfycbwqdU49riG5o69LA9I2IqCqnaZVe6ZxD0idPSKjhPOvU-PAY4pXuLXeH1PMupr1kKsD/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: applicationId,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          motivation: data.motivation,
          goals: data.goals,
          experience: data.experience,
          referral: data.referral,
          takenScholarship: 'No',
          scholarshipStatus: 'Pending',
          testScore: 0
        }),
      }
    );

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

    // 3. Send confirmation email to applicant
    const applicantEmailPromise = resend.emails.send({
      from: 'Khrien Academy <hello@khrien.com>',
      to: [data.email],
      subject: `Your Genesis Cohort Application Has Been Received 🎉`,
      react: ApplicantConfirmationEmail({
        fullName: data.fullName,
        applicationId: applicationId,
      }),
    });

    // Run all tasks
    const [sheetResponse, emailResult, applicantEmailResult] = await Promise.all([
      googleSheetsPromise,
      emailPromise,
      applicantEmailPromise,
    ]);

    const sheetText = await sheetResponse.text();

    if (emailResult.error) {
      console.error('Admin email sending failed:', emailResult.error);
    }

    if (applicantEmailResult.error) {
      console.error('Applicant email sending failed:', applicantEmailResult.error);
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
