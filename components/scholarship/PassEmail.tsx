import * as React from 'react';

interface PassEmailProps {
    fullName: string;
}

export function PassEmail({
    fullName,
}: PassEmailProps) {
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

    const brandColor = '#934ab3'; // Brand Purple

    const linkStyle = {
        color: brandColor,
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

    const infoBoxStyle = {
        backgroundColor: '#fdf4ff',
        padding: '20px',
        borderRadius: '12px',
        border: `1px solid #f5d0fe`,
        margin: '25px 0',
    };

    const infoItemStyle = {
        margin: '8px 0',
        fontSize: '15px',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#000', fontSize: '24px' }}>Khrien Academy</h1>
                </div>

                <p>Hi {firstName},</p>

                <p>We have reviewed your scholarship test results — and we are proud to tell you:</p>

                <p style={{ fontSize: '20px', fontWeight: 'bold', color: brandColor }}>You passed. 🎉</p>

                <p>You have officially earned your scholarship seat in the Genesis Cohort at Khrien Academy.</p>

                <p>This is not a small thing. Out of everyone who applied, you are one of the select few who demonstrated the curiosity, the thinking, and the readiness that we were looking for. That means something.</p>

                <p>Here is what you need to know:</p>

                <div style={infoBoxStyle}>
                    <div style={infoItemStyle}>📚 <strong>COURSE:</strong> AI Foundations & Practical Intelligence</div>
                    <div style={infoItemStyle}>📅 <strong>START DATE:</strong> May 4, 2026</div>
                    <div style={infoItemStyle}>🏁 <strong>END DATE:</strong> July 5, 2026</div>
                    <div style={infoItemStyle}>⏱ <strong>DURATION:</strong> 3 Months</div>
                    <div style={infoItemStyle}>💰 <strong>TUITION:</strong> Fully Free — covered by your scholarship</div>
                </div>

                <p>As a Genesis Cohort member, you are not just a student. You are a founding learner of Khrien Academy — the very first cohort in our history. That is a title that will always belong to you.</p>

                <h3 style={{ color: '#000', marginTop: '30px' }}>WHAT HAPPENS NEXT:</h3>
                <p>We will be sending you your official onboarding details — including access to the learning platform, your first lesson, and how to connect with your fellow cohort members — before May 4.</p>

                <p>In the meantime, make sure you have done the following if you haven't already:</p>

                <div style={{ margin: '20px 0' }}>
                    <p style={{ margin: '10px 0' }}>✅ <strong>Join the Genesis Cohort Group on Whatsapp</strong> → <a href="https://chat.whatsapp.com/H4HeW6GoLs2HkcdpAH9PKX" style={linkStyle}>Join the Community</a></p>
                    <p style={{ margin: '10px 0' }}>✅ <strong>Follow us on Instagram</strong> → <a href="https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw==" style={linkStyle}>Follow on Instagram</a></p>
                </div>

                <p>Both are required for your admission to be fully confirmed, and they are also where you will connect with your cohort and stay updated on everything Genesis.</p>

                <p>Welcome to the beginning of something great, {firstName}.</p>

                <p>We will see you on May 4.</p>

                <div style={footerStyle}>
                    <p style={{ margin: '0 0 5px 0' }}>With excitement,</p>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Keji-Ayodeji Eniibukun</p>
                    <p style={{ margin: '0 0 20px 0', color: '#888' }}>Founder, Khrien Academy</p>
                    
                    <p style={{ margin: '20px 0 0 0', fontStyle: 'italic', color: '#888', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        "The future belongs to those who prepare. And this is only the beginning."<br/>
                        — Khrien Academy
                    </p>
                </div>
            </div>
        </div>
    );
}
