import * as React from 'react';

interface CorporateNotificationEmailProps {
  enquiryId: string;
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  staffCount: string;
  deliveryMode: string;
  departments: string;
  goals: string;
  startDate?: string | null;
}

export function CorporateNotificationEmail({
  enquiryId,
  fullName,
  workEmail,
  phone,
  companyName,
  staffCount,
  deliveryMode,
  departments,
  goals,
  startDate,
}: CorporateNotificationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f6', color: '#111' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', border: '1px solid #e5e7eb' }}>
        
        {/* Header */}
        <div style={{ borderBottom: '2px solid #934ab3', paddingBottom: '16px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#934ab3', display: 'block', marginBottom: '4px' }}>
            New Corporate Booking
          </span>
          <h2 style={{ margin: 0, color: '#111', fontSize: '24px', fontWeight: 'bold' }}>
            {companyName}
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>
            Enquiry ID: <strong style={{ color: '#934ab3' }}>{enquiryId}</strong>
          </p>
        </div>

        {/* Contact Info Box */}
        <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #f3f4f6' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>
            Contact Person Information
          </h4>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Full Name:</strong> {fullName}
          </div>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Work Email:</strong>{' '}
            <a href={`mailto:${workEmail}`} style={{ color: '#934ab3', textDecoration: 'none', fontWeight: 'bold' }}>
              {workEmail}
            </a>
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Phone / WhatsApp:</strong>{' '}
            <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
              {phone}
            </a>
          </div>
        </div>

        {/* Program Details */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280' }}>
            Training Specifications
          </h4>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Team Size:</strong> {staffCount}
          </div>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Preferred Delivery:</strong> {deliveryMode}
          </div>
          <div style={{ marginBottom: '8px', fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Departments / Roles:</strong> {departments}
          </div>
          <div style={{ fontSize: '14px' }}>
            <strong style={{ color: '#374151' }}>Preferred Start Date:</strong> {startDate || 'Flexible / As soon as possible'}
          </div>
        </div>

        {/* Goals / Needs Box */}
        <div style={{ backgroundColor: '#fdf4ff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #934ab3', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#934ab3' }}>
            Team AI Goals & Requirements
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
            {goals}
          </p>
        </div>

        {/* Quick Link */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <a
            href="https://khrien.com/khrienadmin/corporate-bookings"
            style={{ display: 'inline-block', backgroundColor: '#934ab3', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' }}
          >
            View in Admin Dashboard →
          </a>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
          This notification was sent automatically from the Corporate AI Training booking form on Khrien Academy.
        </div>

      </div>
    </div>
  );
}
