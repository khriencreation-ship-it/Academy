export interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  application_id: string
  scholarship_status: string
  test_score: number
  created_at: string
  cohort: string | null
  motivation: string | null
  goals: string | null
  experience: string | null
  referral: string | null
  whatsapp_reminded_at?: string | null
  whatsapp_remind_count?: number
  last_email_reminded_at?: string | null
}

export interface AnalyticsEvent {
  id: string
  event_type: string
  created_at: string
}

export interface CorporateEnquiry {
  id?: string
  enquiry_id: string
  full_name: string
  work_email: string
  phone: string
  company_name: string
  staff_count: string
  delivery_mode: string
  departments: string
  goals: string
  start_date?: string | null
  created_at: string
  status?: string | null
}

