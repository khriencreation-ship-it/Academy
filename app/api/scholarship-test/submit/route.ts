import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { PassEmail } from '@/components/scholarship/PassEmail';
import { FailEmail } from '@/components/scholarship/FailEmail';

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
        let emailSent = "No";

        try {
            console.log('Updating Google Sheets and retrieving user data...');
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbwqdU49riG5o69LA9I2IqCqnaZVe6ZxD0idPSKjhPOvU-PAY4pXuLXeH1PMupr1kKsD/exec',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'submitScholarship',
                        applicationId: applicationId,
                        score: score,
                        status: passed ? 'Pass' : 'Fail'
                    }),
                }
            );
            
            const result = await response.json();
            
            if (result.success && result.userData) {
                const { fullName, email } = result.userData;
                
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

                if (!emailResult.error) {
                    emailSent = "Yes";
                }

                // Notify admin
                await resend.emails.send({
                    from: 'Khrien Academy System <hello@khrien.com>',
                    to: ['khriencreation@gmail.com'],
                    subject: `Test Result: ${fullName} (${score}/25) - ${passed ? 'PASSED' : 'FAILED'}`,
                    html: `
                        <p><strong>Name:</strong> ${fullName}</p>
                        <p><strong>Application ID:</strong> ${applicationId}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Score:</strong> ${score}/25</p>
                        <p><strong>Status:</strong> ${passed ? 'PASSED' : 'FAILED'}</p>
                    `,
                });
                
                return NextResponse.json({ 
                    success: true, 
                    message: 'Result processed and email sent successfully' 
                });
            } else {
                return NextResponse.json(
                    { success: false, error: 'User not found or update failed in master sheet' },
                    { status: 404 }
                );
            }
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
