import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ReminderEmail } from '@/components/scholarship/ReminderEmail';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get('authorization');
    const testEmail = searchParams.get('test_email');
    
    // Security check for Cron (Authorization: Bearer CRON_SECRET or ?key=CRON_SECRET)
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && searchParams.get('key') !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ─── SAFE TEST MODE ──────────────────────────────────────────────────────
    if (testEmail) {
      console.log(`Running safe test for email: ${testEmail}`);
      await resend.emails.send({
        from: 'Khrien Academy <hello@khrien.com>',
        to: [testEmail],
        subject: 'TEST: Your application is incomplete',
        react: ReminderEmail({ 
          fullName: "Test Applicant", 
          applicationId: "KHA-TEST-999" 
        }),
      });
      return NextResponse.json({ message: `Test email sent to ${testEmail}` });
    }
    // ───────────────────────────────────────────────────────────────────────

    // 1. Fetch all pending applications
    const { data: pendingApplications, error: fetchError } = await supabase
      .from('applications')
      .select('id, full_name, email, application_id, last_email_reminded_at')
      .eq('scholarship_status', 'Pending');

    if (fetchError) {
      console.error('Error fetching pending applications:', fetchError);
      return NextResponse.json({ error: 'Database fetch failed' }, { status: 500 });
    }

    if (!pendingApplications || pendingApplications.length === 0) {
      return NextResponse.json({ message: 'No pending applications to remind' });
    }

    const now = new Date();
    const emailsToProcess = [];

    // 2. Filter for those who haven't been reminded in the last 48 hours
    for (const app of pendingApplications) {
      const lastRemindedAt = app.last_email_reminded_at ? new Date(app.last_email_reminded_at) : null;
      
      // If never reminded, or last reminder was more than 48 hours ago
      if (!lastRemindedAt || (now.getTime() - lastRemindedAt.getTime()) >= (48 * 60 * 60 * 1000)) {
        emailsToProcess.push(app);
      }
    }

    if (emailsToProcess.length === 0) {
      return NextResponse.json({ message: 'All pending applicants were recently reminded' });
    }

    // 3. Send emails and update database
    const results = await Promise.allSettled(
      emailsToProcess.map(async (app) => {
        try {
          // Send Email via Resend
          await resend.emails.send({
            from: 'Khrien Academy <hello@khrien.com>',
            to: [app.email],
            subject: 'Your application is incomplete',
            react: ReminderEmail({ 
              fullName: app.full_name, 
              applicationId: app.application_id 
            }),
          });

          // Update the last_email_reminded_at timestamp
          await supabase
            .from('applications')
            .update({ last_email_reminded_at: new Date().toISOString() })
            .eq('id', app.id);

          return { success: true, email: app.email };
        } catch (err: any) {
          console.error(`Failed to send reminder for ${app.email}:`, err);
          throw err;
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return NextResponse.json({ 
      message: `Reminder cycle complete`,
      processed: successful,
      failed: failed
    });

  } catch (err: any) {
    console.error('Cron Reminder API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
