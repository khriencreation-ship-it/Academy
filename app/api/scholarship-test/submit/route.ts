import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PassEmail } from '@/components/scholarship/PassEmail';
import { FailEmail } from '@/components/scholarship/FailEmail';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { applicationId, score } = await req.json();
        
        if (!applicationId || score === undefined) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const passed = score >= 15;

        try {
            // Update Supabase and retrieve user data
            const { data: user, error } = await supabase
                .from('applications')
                .update({
                    test_score: score,
                    scholarship_status: passed ? 'Pass' : 'Fail',
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
            
            const subject = passed 
                ? "You're In. Welcome to the Genesis Cohort 🎉" 
                : "Your Khrien Academy Scholarship Test Results";

            const emailResult = await resend.emails.send({
                from: 'Khrien Academy <hello@khrien.com>',
                to: [email],
                subject: subject,
                react: passed 
                    ? PassEmail({ fullName }) 
                    : FailEmail({ fullName }),
            });

            // Result processed
            return NextResponse.json({ 
                success: true, 
                message: 'Result processed and email sent successfully' 
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
