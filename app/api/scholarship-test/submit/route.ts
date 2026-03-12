import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PassEmail } from '@/components/scholarship/PassEmail';
import { FailEmail } from '@/components/scholarship/FailEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { fullName, email, whatsapp, score } = await req.json();

        if (!fullName || !email || !whatsapp || score === undefined) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const passed = score >= 15;
        const subject = passed 
            ? "You're In. Welcome to the Genesis Cohort 🎉" 
            : "Your Khrien Academy Scholarship Test Results";

        let emailSent = "No";
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

        // Send data to Google Sheets
        try {
            console.log('Sending data to Google Sheets...');
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbxL7uF4NVMBe5y7pdgP73kfQcfjK6-ZiRos29-DJQ71qgQMuO824CxBRlP-wY2kAH_KAw/exec',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        timestamp: new Date().toLocaleString(),
                        fullName: fullName,
                        email: email,
                        whatsapp: whatsapp,
                        score: score,
                        status: passed ? 'Pass' : 'Fail',
                        emailSent: emailSent
                    }),
                }
            );
            console.log('Google Sheets Response Status:', response.status);
            const responseText = await response.text();
            console.log('Google Sheets Response Body:', responseText.substring(0, 200));
        } catch (err) {
            console.error('Google Sheets Error:', err);
        }

        if (emailResult.error) {
            console.error('Email sending failed:', emailResult.error);
            return NextResponse.json(
                { success: false, error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // Also notify admin of the result
        await resend.emails.send({
            from: 'Khrien Academy System <hello@khrien.com>',
            to: ['khriencreation@gmail.com'],
            subject: `Test Result: ${fullName} (${score}/25) - ${passed ? 'PASSED' : 'FAILED'}`,
            html: `
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                <p><strong>Score:</strong> ${score}/25</p>
                <p><strong>Status:</strong> ${passed ? 'PASSED' : 'FAILED'}</p>
            `,
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Result processed and email sent successfully' 
        });
    } catch (err: any) {
        console.error('Scholarship Submit API Error:', err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
