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
    const dryRun = searchParams.get('dry_run') === 'true';
    
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
      .select('id, full_name, email, application_id, last_email_reminded_at, created_at')
      .eq('scholarship_status', 'Pending');

    if (fetchError) {
      console.error('Error fetching pending applications:', fetchError);
      return NextResponse.json({ error: 'Database fetch failed' }, { status: 500 });
    }

    if (!pendingApplications || pendingApplications.length === 0) {
      return NextResponse.json({ message: 'No pending applications to remind' });
    }

    const now = new Date();
    const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24 hours
    const REPEAT_REMINDER_MS = 48 * 60 * 60 * 1000; // 48 hours

    // 2. Filter for potential candidates with breakdown
    let skippedGracePeriod = 0;
    let skippedRecentReminder = 0;

    const emailsToProcess = pendingApplications.filter(app => {
      const createdAt = new Date(app.created_at);
      const lastRemindedAt = app.last_email_reminded_at ? new Date(app.last_email_reminded_at) : null;
      
      // Safety: Never remind someone who applied less than 24h ago
      if ((now.getTime() - createdAt.getTime()) < GRACE_PERIOD_MS) {
        skippedGracePeriod++;
        return false;
      }

      // Logic: If never reminded OR last reminder was > 48h ago
      const isEligible = !lastRemindedAt || (now.getTime() - lastRemindedAt.getTime()) >= REPEAT_REMINDER_MS;
      
      if (!isEligible) {
        skippedRecentReminder++;
        return false;
      }

      return true;
    });

    console.log(`Cron identified ${pendingApplications.length} total pending applications.`);
    console.log(`- Eligible: ${emailsToProcess.length}`);
    console.log(`- Skipped (Grace Period < 24h): ${skippedGracePeriod}`);
    console.log(`- Skipped (Recent Reminder < 48h): ${skippedRecentReminder}`);

    // ─── DRY RUN MODE ──────────────────────────────────────────────────────
    if (dryRun) {
      console.log('Dry run enabled: Skipping email delivery and database updates.');
      return NextResponse.json({ 
        message: `Dry run complete. No emails were sent.`,
        dry_run: true,
        eligible_to_process: emailsToProcess.length,
        total_pending: pendingApplications.length,
        skipped_breakdown: {
            applied_less_than_24h_ago: skippedGracePeriod,
            reminded_less_than_48h_ago: skippedRecentReminder
        },
        frequency_rules: {
            grace_period_hours: 24,
            repeat_interval_hours: 48
        }
      });
    }
    // ───────────────────────────────────────────────────────────────────────

    if (emailsToProcess.length === 0) {
      return NextResponse.json({ 
        message: 'All pending applicants were recently reminded or are in grace period',
        total_pending: pendingApplications.length
      });
    }

    // 3. Send emails in Chunks (Batching) to stay under Vercel execution limits
    const CHUNK_SIZE = 30; // Processing 30 at a time
    let successfulSends = 0;
    let failedSends = 0;

    for (let i = 0; i < emailsToProcess.length; i += CHUNK_SIZE) {
      const chunk = emailsToProcess.slice(i, i + CHUNK_SIZE);
      console.log(`Processing batch ${Math.floor(i / CHUNK_SIZE) + 1} (${chunk.length} emails)`);

      const batchResults = await Promise.allSettled(
        chunk.map(async (app) => {
            await resend.emails.send({
              from: 'Khrien Academy <hello@khrien.com>',
              to: [app.email],
              subject: 'Your application is incomplete',
              react: ReminderEmail({ 
                fullName: app.full_name, 
                applicationId: app.application_id 
              }),
            });
            return app.id;
        })
      );

      // Collect IDs of people who were successfully emailed in this batch
      const successfulIds = batchResults
        .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
        .map(r => r.value);
      
      const failedCount = batchResults.filter(r => r.status === 'rejected').length;
      
      successfulSends += successfulIds.length;
      failedSends += failedCount;

      // Batch update the database for everyone who was emailed in this chunk
      if (successfulIds.length > 0) {
        console.log(`Batch updating database for ${successfulIds.length} successful sends...`);
        const { error: updateError } = await supabase
          .from('applications')
          .update({ last_email_reminded_at: new Date().toISOString() })
          .in('id', successfulIds);
        
        if (updateError) {
          console.error('Failed to batch update last_email_reminded_at:', updateError);
        }
      }

      // Small pause between batches if needed to avoid rate limits
      if (i + CHUNK_SIZE < emailsToProcess.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    return NextResponse.json({ 
      message: `Reminder cycle complete`,
      processed: successfulSends,
      failed: failedSends,
      total_eligible: emailsToProcess.length,
      total_pending: pendingApplications.length
    });

  } catch (err: any) {
    console.error('Cron Reminder API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
