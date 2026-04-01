import * as React from 'react';

interface ReminderEmailProps {
    fullName: string;
    applicationId: string;
}

export function ReminderEmail({
    fullName,
    applicationId,
}: ReminderEmailProps) {
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

                <p>We noticed that your scholarship application for the Genesis Cohort is still incomplete. We'd love to see you finish the process!</p>

                <p>To move forward, you just need to take the 10-minute Scholarship Test. Your spot is waiting, but it's not secured until the test is submitted.</p>

                <div style={{ margin: '25px 0', padding: '20px', backgroundColor: '#f3e8ff', borderRadius: '12px', border: '1px dashed #934ab3', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Ready to Take the Test? 🚀</p>
                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#666' }}>Your Application ID:</p>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#934ab3', letterSpacing: '4px', marginBottom: '20px' }}>{applicationId}</p>
                    
                    <a 
                        href="https://academy.khrien.com/scholarship-test" 
                        style={{ 
                            backgroundColor: '#934ab3', 
                            color: '#ffffff', 
                            padding: '16px 32px', 
                            borderRadius: '8px', 
                            textDecoration: 'none', 
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '16px',
                            boxShadow: '0 4px 14px rgba(147, 74, 179, 0.3)'
                        }}
                    >
                        Finish Your Application →
                    </a>
                </div>

                <p><strong>Common question:</strong> <em>"Will it take long?"</em> — No! It's just 25 multiple-choice questions and takes less than 10 minutes from start to finish.</p>

                <p>If you have any questions or need help, just reply to this email!</p>

                <p>Rooting for you 💜</p>

                <div style={footerStyle}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>— The Khrien Academy Team</p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>🌐 academy.khrien.com</p>
                </div>
            </div>
        </div>
    );
}
