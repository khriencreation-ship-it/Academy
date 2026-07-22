import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { AnimateAfricaEmail } from '@/components/animate-africa/AnimateAfricaEmail';
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

    // ─── CHECK FOR DUPLICATES ───────────────────────────────────────────────
    // Check if this person has already applied to Animate Africa
    const { data: existingApp, error: checkError } = await supabase
      .from('applications')
      .select('email, phone')
      .or(`email.ilike.${data.email},phone.eq.${data.phone}`)
      .maybeSingle();

    if (checkError) {
      console.error('Database check failed:', checkError);
    }

    if (existingApp) {
      const isEmailMatch = existingApp.email.toLowerCase() === data.email.toLowerCase();
      const message = isEmailMatch 
        ? 'An application with this email address already exists.' 
        : 'An application with this phone number already exists.';
      
      return NextResponse.json(
        { success: false, error: message },
        { status: 400 }
      );
    }
    // ────────────────────────────────────────────────────────────────────────

    // Generate unique Application ID
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const applicationId = `KAA-${timestamp}-${random}`;

    // 1. Send data to Supabase (Cohort is tagged as 'Animate Africa')
    const dbPromise = supabase.from('applications').insert([
      {
        application_id: applicationId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        motivation: data.motivation || 'Registered for Animate Africa free tier program.',
        goals: data.goals || 'Learn 3D animation skills.',
        experience: data.experience || 'None',
        referral: data.referral || 'Animate Africa Page',
        taken_scholarship: false,
        scholarship_status: 'Pending',
        test_score: 0,
        cohort: 'Animate Africa',
      }
    ]);

    // 2. Send confirmation email to applicant
    const applicantEmailPromise = resend.emails.send({
      from: 'Khrien Academy <hello@khrien.com>',
      to: [data.email],
      subject: `Your Animate Africa Spot is Claimed! 🎉`,
      react: AnimateAfricaEmail({
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
      return NextResponse.json(
        { success: false, error: 'Database saving failed. Please try again.' },
        { status: 500 }
      );
    }

    if (userEmailResult.error) {
      console.error('Applicant email sending failed:', userEmailResult.error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Lead registered successfully',
      applicationId: applicationId,
      redirectUrl: process.env.NEXT_PUBLIC_ANIMATE_AFRICA_SELAR_URL || 'https://selar.co/animate-africa'
    });
  } catch (err: any) {
    console.error('Animate Africa API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
