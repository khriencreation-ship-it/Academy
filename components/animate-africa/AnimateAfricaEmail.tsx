import * as React from 'react';

interface AnimateAfricaEmailProps {
    fullName: string;
    applicationId: string;
}

export function AnimateAfricaEmail({
    fullName,
    applicationId,
}: AnimateAfricaEmailProps) {
    const firstName = fullName.split(' ')[0];
    
    const containerStyle = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
        backgroundColor: '#0a0a0a',
        color: '#f3f4f6',
        lineHeight: '1.6',
    };

    const contentStyle = {
        backgroundColor: '#121212',
        padding: '40px 30px',
        borderRadius: '16px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #262626',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '35px',
    };

    const tagStyle = {
        backgroundColor: '#2e1065',
        color: '#c084fc',
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 'bold' as const,
        display: 'inline-block',
        marginBottom: '16px',
        border: '1px solid #581c87',
    };

    const idBoxStyle = {
        margin: '25px 0',
        padding: '20px',
        backgroundColor: '#1e1b4b',
        borderRadius: '12px',
        border: '1px dashed #6366f1',
        textAlign: 'center' as const,
    };

    const idLabelStyle = {
        margin: '0 0 8px 0',
        fontSize: '13px',
        color: '#a5b4fc',
        textTransform: 'uppercase' as const,
        letterSpacing: '1.5px',
    };

    const idValueStyle = {
        margin: 0,
        fontSize: '26px',
        fontWeight: 'bold' as const,
        color: '#818cf8',
        letterSpacing: '3px',
    };

    const buttonStyle = {
        backgroundColor: '#934ab3', // Khrien Brand Purple
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold' as const,
        display: 'inline-block',
        fontSize: '16px',
        boxShadow: '0 4px 20px rgba(147, 74, 179, 0.4)',
        transition: 'all 0.2s ease',
    };

    const noticeStyle = {
        fontSize: '14px',
        color: '#d1d5db',
        backgroundColor: '#171717',
        padding: '16px',
        borderRadius: '8px',
        borderLeft: '4px solid #934ab3',
        margin: '25px 0',
    };

    const footerStyle = {
        marginTop: '40px',
        borderTop: '1px solid #262626',
        paddingTop: '25px',
        fontSize: '13px',
        color: '#9ca3af',
    };

    const selarLink = process.env.NEXT_PUBLIC_ANIMATE_AFRICA_SELAR_URL || 'https://selar.com/animate_africa';

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <div style={tagStyle}>Khrien Academy × Animate Africa</div>
                    <h1 style={{ margin: 0, color: '#ffffff', fontSize: '26px', fontWeight: 'bold' }}>
                        Your Animation Spot is Claimed! 🎉
                    </h1>
                </div>

                <p style={{ fontSize: '16px' }}>Hi {firstName},</p>

                <p style={{ fontSize: '15px', color: '#e5e7eb' }}>
                    Congratulations! Your application for the <strong>Animate Africa Free Tier</strong> (powered by Khrien Academy in partnership with MagicLab Studios) has been successfully received.
                </p>

                <div style={idBoxStyle}>
                    <p style={idLabelStyle}>Your Application ID:</p>
                    <p style={idValueStyle}>{applicationId}</p>
                </div>

                <div style={noticeStyle}>
                    <strong>What's Next?</strong> To start learning real 3D animation, get access to the curriculum, and join the cohort community, complete your registration on the portal now.
                </div>

                <div style={{ textAlign: 'center', margin: '35px 0' }}>
                    <a href={selarLink} style={buttonStyle}>
                        Complete Your Onboarding on Selar →
                    </a>
                </div>

                <p style={{ fontSize: '15px', color: '#e5e7eb' }}>
                    Signing up through Khrien Academy gives you access to a support system inside <strong>The House of Khrien</strong> community as you learn. We're here to help you turn curiosity into studio-ready animation skills.
                </p>

                <p style={{ fontSize: '15px', color: '#e5e7eb' }}>Let's bring your stories to life! 🎬</p>

                <div style={footerStyle}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>🌐 <a href="https://academy.khrien.com" style={{ color: '#934ab3', textDecoration: 'none' }}>academy.khrien.com</a></p>
                </div>
            </div>
        </div>
    );
}
