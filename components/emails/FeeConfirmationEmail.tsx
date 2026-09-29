import * as React from 'react';

interface FeeConfirmationEmailProps {
  fullName: string;
  applicationId: string;
  courseSelection: string;
  pricingTier: string;
  tuitionUrl: string;
}

export function FeeConfirmationEmail({
  fullName,
  applicationId,
  courseSelection,
  pricingTier,
  tuitionUrl,
}: FeeConfirmationEmailProps) {
  const firstName = fullName.split(' ')[0];
  const isEarlyBird = pricingTier === 'early_bird';

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
          <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Application</p>
        </div>

        <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

        <p style={{ color: '#d4d4d4' }}>
          Payment received! Your <strong>₦2,000 Application Fee</strong> for the Catalyst Cohort has been confirmed. 🎉
        </p>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          backgroundColor: '#1e1b4b',
          borderRadius: '12px',
          border: '1px solid #934ab3',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Application Summary
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Application ID:</strong> <span style={{ color: '#c084fc', fontWeight: 'bold' }}>{applicationId}</span>
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Course Selection:</strong> {courseSelection}
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Pricing Tier:</strong> {isEarlyBird ? 'Early-Bird Rate ⚡' : 'Standard Rate 💳'}
          </p>
        </div>

        <h3 style={{ color: '#ffffff', fontSize: '18px', marginTop: '25px' }}>Next Step: Complete Tuition Payment</h3>
        <p style={{ color: '#d4d4d4' }}>
          To lock in your seat and receive your placement check link, click below to select your tuition payment option:
        </p>

        <div style={{ textAlign: 'center', margin: '35px 0' }}>
          <a
            href={tuitionUrl}
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
            Pay Tuition & Unlock Seat →
          </a>
        </div>

        {isEarlyBird ? (
          <p style={{ fontSize: '13px', color: '#a3a3a3', backgroundColor: '#262626', padding: '12px', borderRadius: '8px' }}>
            ⚡ <strong>Early-Bird Benefit:</strong> Your fee is locked at early-bird rate. Full tuition payment is required.
          </p>
        ) : (
          <p style={{ fontSize: '13px', color: '#a3a3a3', backgroundColor: '#262626', padding: '12px', borderRadius: '8px' }}>
            💳 <strong>Standard Benefit:</strong> You can choose Full Payment or 50/50 Split Payment at tuition checkout.
          </p>
        )}

        <div style={{ marginTop: '40px', borderTop: '1px solid #262626', paddingTop: '20px', fontSize: '13px', color: '#a3a3a3' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#ffffff' }}>— The Khrien Academy Team</p>
          <p style={{ margin: '4px 0 0 0' }}>🌐 academy.khrien.com</p>
        </div>
      </div>
    </div>
  );
}
