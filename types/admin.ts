export interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  application_id: string
  location?: string | null
  dob?: string | null
  current_status?: string | null
  course_selection?: string | null
  pricing_tier?: 'early_bird' | 'standard' | string | null
  application_fee_status?: 'pending' | 'paid' | 'failed' | string | null
  application_fee_tx_ref?: string | null
  tuition_status?: 'not_started' | 'pending' | 'partially_paid' | 'paid' | string | null
  tuition_paid_amount?: number | null
  tuition_tx_ref?: string | null
  payment_plan?: 'full' | 'split_50_50' | string | null
  placement_test_status?: 'not_sent' | 'sent' | 'completed' | string | null
  scholarship_status?: string | null
  test_score?: number
  created_at: string
  cohort: string | null
  motivation: string | null
  goals?: string | null
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

