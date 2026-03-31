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
}

export interface AnalyticsEvent {
  id: string
  event_type: string
  created_at: string
}
