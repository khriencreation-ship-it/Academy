import * as React from 'react';

interface PlacementTestEmailProps {
  fullName: string;
  applicationId: string;
  courseSelection: string;
  placementTestUrl: string;
}

export function PlacementTestEmail({
  fullName,
  applicationId,
  courseSelection,
  placementTestUrl,
}: PlacementTestEmailProps) {
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
          <h1 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>
            Khrien<span style={{ color: '#934ab3' }}>Academy</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Placement Check</p>
        </div>

        <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

        <p style={{ color: '#d4d4d4' }}>
          Welcome to the Catalyst Cohort! 🚀 Your tuition payment has been processed and your seat is reserved.
        </p>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          backgroundColor: '#1e1b4b',
          borderRadius: '12px',
          border: '1px solid #934ab3',
        }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Final Step: Placement Check
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Application ID:</strong> <span style={{ color: '#c084fc', fontWeight: 'bold' }}>{applicationId}</span>
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Selected Course:</strong> {courseSelection}
          </p>
        </div>

        <p style={{ color: '#d4d4d4' }}>
          Please complete your short placement check. This helps our tutors assess your background and place you in the optimal learning track.
        </p>

        <div style={{ textAlign: 'center', margin: '35px 0' }}>
          <a
            href={placementTestUrl}
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
            Take Placement Check Now →
          </a>
        </div>

        <p style={{ fontSize: '13px', color: '#a3a3a3', backgroundColor: '#262626', padding: '12px', borderRadius: '8px' }}>
          ⚠️ <strong>Important:</strong> Keep your Application ID (<strong>{applicationId}</strong>) handy as you will enter it at the start of your placement check.
        </p>

        <div style={{ marginTop: '40px', borderTop: '1px solid #262626', paddingTop: '20px', fontSize: '13px', color: '#a3a3a3' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
          <p style={{ margin: '4px 0 0 0' }}>🌐 academy.khrien.com</p>
        </div>
      </div>
    </div>
  );
}
