import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { applicationId } = await req.json();

        if (!applicationId) {
            return NextResponse.json(
                { success: false, error: 'Application ID is required' },
                { status: 400 }
            );
        }

        // Call Supabase for verification
        try {
            const { data: user, error } = await supabase
                .from('applications')
                .select('full_name, email, taken_scholarship')
                .eq('application_id', applicationId)
                .single();

            if (error || !user) {
                return NextResponse.json({ 
                    success: true, 
                    verified: false,
                    message: 'Invalid Application ID.'
                });
            }
            
            if (user.taken_scholarship) {
                return NextResponse.json({ 
                    success: true, 
                    exists: true, 
                    message: 'You have already taken this test.' 
                });
            }

            // User verified and hasn't taken the test
            return NextResponse.json({ 
                success: true, 
                verified: true,
                exists: false,
                userData: {
                    fullName: user.full_name,
                    email: user.email
                }
            });

        } catch (err) {
            console.error('Supabase Check Error:', err);
            return NextResponse.json({ 
                success: false, 
                error: 'Database verification failed'
            }, { status: 500 });
        }
    } catch (err: any) {
        console.error('Scholarship Check API Error:', err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
