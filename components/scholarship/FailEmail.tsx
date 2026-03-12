import * as React from 'react';

interface FailEmailProps {
    fullName: string;
}

export function FailEmail({
    fullName,
}: FailEmailProps) {
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

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#000', fontSize: '24px' }}>Khrien Academy</h1>
                </div>

                <p>Hi {firstName},</p>

                <p>Thank you for applying to the Genesis Cohort at Khrien Academy and for taking the time to complete the scholarship test. It genuinely means a lot that you showed up.</p>

                <p>After reviewing your results, we are sorry to share that you did not meet the pass mark for this round of the scholarship.</p>

                <p style={{ fontWeight: 'bold' }}>This means you have not been selected for the Genesis Cohort at this time.</p>

                <p>We know that is not easy to hear — and we want to be honest with you rather than leave you wondering.</p>

                <p>But here is what we also want you to know:</p>

                <p style={{ color: brandColor, fontWeight: 'bold', fontSize: '18px' }}>This is not the end of your journey with Khrien Academy.</p>

                <p>The Genesis Cohort is just the beginning. We are building something much bigger, and future cohorts are already in the works. Every program we launch will be an opportunity for you to apply again — and we genuinely hope you do.</p>

                <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#fdf4ff', borderRadius: '12px', border: '1px solid #f5d0fe' }}>
                    <p style={{ fontWeight: 'bold', margin: '0 0 15px 0' }}>HERE IS WHAT WE ENCOURAGE YOU TO DO:</p>
                    <p>👉 Stay connected. Join our community and follow us on Instagram — this is where we announce new cohorts, free learning opportunities, and academy updates first.</p>
                    
                    <div style={{ marginTop: '15px' }}>
                        <p style={{ margin: '5px 0' }}>✅ <strong>Join our community</strong> → <a href="https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw" style={linkStyle}>Join the Community</a></p>
                        <p style={{ margin: '5px 0' }}>✅ <strong>Follow us on Instagram</strong> → <a href="https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw==" style={linkStyle}>Follow on Instagram</a></p>
                    </div>
                </div>

                <p>Keep learning, keep showing up, and keep building. The version of you that applies next time will be even more ready.</p>

                <p>Thank you again, {firstName}. We are rooting for you.</p>

                <div style={footerStyle}>
                    <p style={{ margin: '0 0 5px 0' }}>With encouragement,</p>
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
