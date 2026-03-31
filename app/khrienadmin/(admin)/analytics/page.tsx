import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { supabase as directSupabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import AnalyticsClient from '@/components/admin/AnalyticsClient'

export const revalidate = 0

interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  scholarship_status: string
  test_score: number
  created_at: string
  cohort: string | null
  referral: string | null
}

interface AnalyticsEvent {
  id: string
  event_type: string
  created_at: string
}

export default async function AnalyticsPage() {
  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  // Fetch applications
  const { data: appsData } = await directSupabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch analytics events
  const { data: eventsData } = await directSupabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false })

  const applications = (appsData || []) as Application[]
  const analyticsEvents = (eventsData || []) as AnalyticsEvent[]
  
  const uniqueCohorts = [...new Set(applications.map(a => a.cohort || 'Genesis Cohort'))]
    .filter(Boolean)
    .sort()

  return (
    <AnalyticsClient 
      applications={applications} 
      analyticsEvents={analyticsEvents}
      uniqueCohorts={uniqueCohorts} 
    />
  )
}
