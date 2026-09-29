import * as React from 'react';

interface SafetyNetEmailProps {
  fullName: string;
  applicationId: string;
  continueUrl: string;
}

export function SafetyNetEmail({
  fullName,
  applicationId,
  continueUrl,
}: SafetyNetEmailProps) {
  const firstName = fullName.split(' ')[0];

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5',
      lineHeight: '1.6',
    }}>
      <div style={{
        backgroundColor: '#171717',
        padding: '40px 30px',
        borderRadius: '16px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #262626',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#ffffff', fontSize: '24px', letterSpacing: '-0.5px' }}>
            Khrien<span style={{ color: '#934ab3' }}>Academy</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Application</p>
        </div>

        <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

        <p style={{ color: '#d4d4d4' }}>
          We noticed you started your application for the <strong>Catalyst Cohort</strong>, but haven't completed the <strong>₦2,000 non-refundable application fee</strong> yet.
        </p>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          backgroundColor: '#1e1b4b',
          borderRadius: '12px',
          border: '1px dashed #934ab3',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Your Application ID
          </p>
          <p style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '3px' }}>
            {applicationId}
          </p>
        </div>

        <p style={{ color: '#d4d4d4' }}>
          Your application details are safely saved. You can complete your ₦2,000 application fee anytime using your unique link below:
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

        <p style={{ fontSize: '13px', color: '#a3a3a3', backgroundColor: '#262626', padding: '14px', borderRadius: '8px' }}>
          💡 <em>Note: Application fees are non-refundable and confirm your spot in the review queue.</em>
        </p>

        <div style={{ marginTop: '40px', borderTop: '1px solid #262626', paddingTop: '20px', fontSize: '13px', color: '#a3a3a3' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
          <p style={{ margin: '4px 0 0 0' }}>🌐 academy.khrien.com</p>
        </div>
      </div>
    </div>
  );
}
