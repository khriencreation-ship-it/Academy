import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SafetyNetEmail } from '@/components/emails/SafetyNetEmail';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
  try {
    const { applicationId, email, fullName } = await req.json();

    if (!applicationId || !email) {
      return NextResponse.json({ success: false, error: 'Missing applicationId or email' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.khrien.com';
    const continueUrl = `${baseUrl}/continue?ref=${applicationId}`;

    await resend.emails.send({
      from: 'Khrien Academy <hello@khrien.com>',
      to: [email],
      subject: 'Complete your Catalyst Cohort Application ⏳',
      react: SafetyNetEmail({
        fullName: fullName || 'Applicant',
        applicationId: applicationId,
        continueUrl,
      }),
    });

    return NextResponse.json({ success: true, message: 'Safety net email sent' });
  } catch (error: any) {
    console.error('Safety net email API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
