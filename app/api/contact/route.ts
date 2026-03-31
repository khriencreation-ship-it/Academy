import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactNotificationEmail } from '@/components/apply/ContactNotificationEmail';
import { ApplicantConfirmationEmail } from '@/components/apply/ApplicantConfirmationEmail';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const headerList = headers();
    const ip = (await headerList).get('x-forwarded-for') || 'anonymous';
    
    // 1. Rate Limiting (20 requests per minute per IP address)
    if (!rateLimit(ip, 20, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const data = await req.json();
    const { website, turnstileToken, submissionDuration } = data;

    // Honeypot check
    if (website) {
      console.warn('Spam submission detected via honeypot:', website);
      return NextResponse.json({ 
        success: true, 
        message: 'Form processed successfully' 
      });
    }

    // 3. Submission Duration Check
    if (submissionDuration && submissionDuration < 3000) {
      console.warn('Spam submission detected via duration check:', submissionDuration);
      return NextResponse.json({ 
        success: true, 
        message: 'Form processed successfully' 
      });
    }

    // 4. Cloudflare Turnstile Verification
    const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
    
    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: SECRET_KEY,
          response: turnstileToken,
          remoteip: ip,
        }),
      }
    );

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
      console.warn('Turnstile verification failed:', verifyResult);
      return NextResponse.json(
        { success: false, error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Generate unique Application ID
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const applicationId = `KHA-${timestamp}-${random}`;

    // ─── COHORT CONFIG ────────────────────────────────────────────────────────
    // To start a new cohort, update this ONE constant.
    // All new applications will be tagged with the new cohort name automatically.
    // Old applications retain their original cohort tag permanently.
    const CURRENT_COHORT = 'Genesis Cohort';
    // ─────────────────────────────────────────────────────────────────────────

    // 1. Send data to Supabase
    const dbPromise = supabase.from('applications').insert([
      {
        application_id: applicationId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        motivation: data.motivation,
        goals: data.goals,
        experience: data.experience,
        referral: data.referral,
        taken_scholarship: false,
        scholarship_status: 'Pending',
        test_score: 0,
        cohort: CURRENT_COHORT,
      }
    ]);

    // 2. Send confirmation email to applicant
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
    const [dbResult, userEmailResult] = await Promise.all([
      dbPromise,
      applicantEmailPromise
    ]);

    if (dbResult.error) {
      console.error('Database insertion failed:', dbResult.error);
      // We still return true if emails were sent, but log the error
      // In production, you might want to return an error here
    }

    if (userEmailResult.error) {
      console.error('Applicant email sending failed:', userEmailResult.error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form processed successfully',
      applicationId: applicationId
    });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
