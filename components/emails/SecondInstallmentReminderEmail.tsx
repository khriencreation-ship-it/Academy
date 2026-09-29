import * as React from 'react';

interface SecondInstallmentReminderEmailProps {
  fullName: string;
  applicationId: string;
  courseSelection: string;
  amountDueFormatted: string;
  paymentUrl: string;
}

export function SecondInstallmentReminderEmail({
  fullName,
  applicationId,
  courseSelection,
  amountDueFormatted,
  paymentUrl,
}: SecondInstallmentReminderEmailProps) {
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
          <p style={{ margin: '4px 0 0 0', color: '#a3a3a3', fontSize: '13px' }}>Catalyst Cohort Payment Reminder</p>
        </div>

        <p style={{ fontSize: '16px', color: '#ffffff' }}>Hi {firstName},</p>

        <p style={{ color: '#d4d4d4' }}>
          This is a friendly reminder regarding your 2nd installment tuition balance for the <strong>Catalyst Cohort</strong>.
        </p>

        <div style={{
          margin: '25px 0',
          padding: '20px',
          backgroundColor: '#1e1b4b',
          borderRadius: '12px',
          border: '1px solid #934ab3',
        }}>
          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
            Payment Summary
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Application ID:</strong> <span style={{ color: '#c084fc', fontWeight: 'bold' }}>{applicationId}</span>
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Course:</strong> {courseSelection}
          </p>
          <p style={{ margin: '4px 0', color: '#ffffff', fontSize: '14px' }}>
            <strong>Balance Due:</strong> <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{amountDueFormatted}</span>
          </p>
        </div>

        <p style={{ color: '#d4d4d4' }}>
          Completing your final installment ensures uninterrupted access to live classes, mentor sessions, and project support.
        </p>

        <div style={{ textAlign: 'center', margin: '35px 0' }}>
          <a
            href={paymentUrl}
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
            Pay Final Installment ({amountDueFormatted}) →
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
