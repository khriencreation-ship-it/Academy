import * as React from 'react';

interface ApplicantConfirmationEmailProps {
    fullName: string;
}

export function ApplicantConfirmationEmail({
    fullName,
}: ApplicantConfirmationEmailProps) {
    const firstName = fullName.split(' ')[0];
    
    const containerStyle = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
        backgroundColor: '#f9f9f9',
        color: '#333',
        lineHeight: '1.6',
    };

    const contentStyle = {
        backgroundColor: '#ffffff',
        padding: '40px 30px',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '30px',
    };

    const sectionTitleStyle = {
        color: '#934ab3', // Brand Purple
        fontSize: '18px',
        fontWeight: 'bold' as const,
        marginBottom: '10px',
        display: 'block',
    };

    const linkStyle = {
        color: '#934ab3',
        textDecoration: 'underline',
        fontWeight: 'bold' as const,
    };

    const footerStyle = {
        marginTop: '40px',
        borderTop: '1px solid #eee',
        paddingTop: '20px',
        fontSize: '14px',
        color: '#666',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#000', fontSize: '24px' }}>Khrien Academy</h1>
                </div>

                <p>Hi {firstName},</p>

                <p>Welcome to Khrien Academy — we're so glad you took that first step.</p>

                <p>Your application for the Genesis Cohort has been received, and we're excited to have you in the mix. The Genesis Cohort is going to be something special, and you're already one step closer to being a part of it.</p>

                <p>Before we move forward, there are two quick things you need to do <strong>RIGHT NOW</strong> — and these are non-negotiable prerequisites for your admission:</p>

                <div style={{ marginBottom: '25px' }}>
                    <span style={sectionTitleStyle}>STEP 1 — Join Our Community</span>
                    <p style={{ margin: '5px 0' }}>This is where all the magic happens. Get in, introduce yourself, and connect with fellow applicants.</p>
                    <a href="https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw" style={linkStyle}> 👉 Join the Community</a>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <span style={sectionTitleStyle}>STEP 2 — Follow Us on Instagram</span>
                    <p style={{ margin: '5px 0' }}>Stay in the loop with updates, announcements, and everything Genesis Cohort.</p>
                    <a href="https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw==" style={linkStyle}> 👉 Follow on Instagram</a>
                </div>

                <p style={{ backgroundColor: '#fff4f4', padding: '15px', borderLeft: '4px solid #f44336', fontSize: '14px' }}>
                    <strong>Please note:</strong> Joining the community and following us on Instagram are <strong>REQUIRED</strong> to be considered for admission. If these steps are not completed, your application will not move forward.
                </p>

                <div style={{ marginTop: '30px', marginBottom: '25px' }}>
                    <span style={sectionTitleStyle}>STEP 3 — Take the Scholarship Test</span>
                    <p style={{ margin: '5px 0' }}>Once you've completed Steps 1 and 2, your next task is to take the Scholarship Test.</p>
                    <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                        <li>The scholarship covers your full access to the Genesis Cohort</li>
                        <li>Only applicants who PASS the scholarship test will be awarded the scholarship and granted access</li>
                        <li>The test is your chance to show us you're serious — come prepared</li>
                    </ul>
                    <a href="https://academy.khrien.com/scholarship-test" style={linkStyle}> 👉 Take the Scholarship Test</a>
                </div>

                <p>We're rooting for you. Do the work, show up, and let's build something great together.</p>

                <div style={footerStyle}>
                    <p style={{ margin: '0 0 5px 0' }}>With excitement,</p>
                    <p style={{ margin: '0 0 20px 0', fontWeight: 'bold' }}>Keji-Ayodeji Eniibukun</p>
                    <p style={{ margin: 0 }}>Khrien Academy Team</p>
                </div>
            </div>
        </div>
    );
}
