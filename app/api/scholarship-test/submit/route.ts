import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PlacementCheckSubmittedEmail } from '@/components/emails/PlacementCheckSubmittedEmail';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(req: Request) {
    try {
        const { applicationId, score } = await req.json();
        
        if (!applicationId || score === undefined) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        try {
            // Update Supabase with test score and completed status
            const { data: user, error } = await supabase
                .from('applications')
                .update({
                    test_score: score,
                    placement_test_status: 'completed',
                    scholarship_status: 'Completed',
                    taken_scholarship: true
                })
                .eq('application_id', applicationId)
                .select('full_name, email')
                .single();
            
            if (error || !user) {
                console.error('Supabase Update Error:', error);
                return NextResponse.json(
                    { success: false, error: 'User not found or update failed in database' },
                    { status: 404 }
                );
            }

            const { full_name: fullName, email } = user;
            
            await resend.emails.send({
                from: 'Khrien Academy <hello@khrien.com>',
                to: [email],
                subject: 'Placement Check Completed - Catalyst Cohort 🚀',
                react: PlacementCheckSubmittedEmail({ fullName }),
            });

            // Result processed
            return NextResponse.json({ 
                success: true, 
                message: 'Placement check score recorded and email sent successfully' 
            });

        } catch (err: any) {
            console.error('Submission Error:', err);
            return NextResponse.json(
                { success: false, error: err.message },
                { status: 500 }
            );
        }
    } catch (err: any) {
        console.error('Scholarship Submit API Error:', err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
