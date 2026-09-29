import * as React from 'react';

interface ApplicantConfirmationEmailProps {
    fullName: string;
    applicationId: string;
}

export function ApplicantConfirmationEmail({
    fullName,
    applicationId,
}: ApplicantConfirmationEmailProps) {
    const firstName = fullName.split(' ')[0];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.khrien.com';
    const continueUrl = `${baseUrl}/continue?ref=${applicationId}`;

    const containerStyle = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
        backgroundColor: '#0a0a0a',
        color: '#e5e5e5',
        lineHeight: '1.6',
    };

    const contentStyle = {
        backgroundColor: '#171717',
        padding: '40px 30px',
        borderRadius: '16px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #262626',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '30px',
    };

    const footerStyle = {
        marginTop: '40px',
        borderTop: '1px solid #262626',
        paddingTop: '20px',
        fontSize: '13px',
        color: '#a3a3a3',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>
                        Khrien<span style={{ color: '#934ab3' }}>Academy</span>
                    </h1>
                    <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Application</p>
                </div>

                <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

                <p style={{ color: '#d4d4d4' }}>
                    Congratulations — your application for the <strong>Catalyst Cohort</strong> has been received! 🎉
                </p>

                <div style={{ margin: '25px 0', padding: '20px', backgroundColor: '#1e1b4b', borderRadius: '12px', border: '1px dashed #934ab3', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Your Application ID is:</p>
                    <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '3px' }}>{applicationId}</p>
                </div>

                <p style={{ color: '#d4d4d4' }}>
                    To finalize your application and submit your profile for review, please complete your <strong>₦2,000 non-refundable application fee</strong>.
                </p>

                <div style={{ textAlign: 'center', margin: '35px 0' }}>
                    <a 
                        href={continueUrl}
                        style={{ 
                            backgroundColor: '#934ab3', 
                            color: '#ffffff', 
                            padding: '16px 36px', 
                            borderRadius: '9999px', 
                            textDecoration: 'none', 
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '16px',
                            boxShadow: '0 4px 20px rgba(147, 74, 179, 0.4)'
                        }}
                    >
                        Complete Application Fee (₦2,000) →
                    </a>
                </div>

                <p style={{ fontSize: '13px', color: '#a3a3a3', backgroundColor: '#262626', padding: '12px', borderRadius: '8px' }}>
                    💡 <em>Note: Keep your Application ID above handy. You can use it anytime to check your application status or resume your checkout.</em>
                </p>

                <p style={{ color: '#d4d4d4', marginTop: '20px' }}>We are rooting for you. 💜</p>

                <div style={footerStyle}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
                    <p style={{ margin: '4px 0 0 0' }}>🌐 academy.khrien.com</p>
                </div>
            </div>
        </div>
    );
}
