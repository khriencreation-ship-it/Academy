import * as React from 'react';

interface PlacementCheckSubmittedEmailProps {
  fullName: string;
}

export function PlacementCheckSubmittedEmail({ fullName }: PlacementCheckSubmittedEmailProps) {
  const firstName = fullName ? fullName.split(' ')[0] : 'Applicant';

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
          <h1 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>
            Khrien<span style={{ color: '#934ab3' }}>Academy</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Placement Check</p>
        </div>

        <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

        <p style={{ color: '#d4d4d4' }}>
          Thank you for completing your <strong>Catalyst Cohort Placement Check</strong>! 🎉
        </p>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          backgroundColor: '#1e1b4b',
          borderRadius: '12px',
          border: '1px solid #934ab3',
        }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Status: Placement Check Completed
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            Your responses have been successfully logged in our system.
          </p>
        </div>

        <p style={{ color: '#d4d4d4' }}>
          Our instructors use these responses strictly to assess your starting knowledge level so we can structure optimal hands-on guidance for you during the cohort.
        </p>

        <div style={{ textAlign: 'center', margin: '35px 0' }}>
          <a
            href="https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw"
            style={{
              backgroundColor: '#25D366',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
            }}
          >
            Join WhatsApp Community →
          </a>
        </div>

        <div style={{ marginTop: '40px', borderTop: '1px solid #262626', paddingTop: '20px', fontSize: '13px', color: '#a3a3a3' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
          <p style={{ margin: '4px 0 0 0' }}>🌐 academy.khrien.com</p>
        </div>
      </div>
    </div>
  );
}
