import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { supabase as directSupabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/admin/DashboardClient'

export const revalidate = 0

interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  application_id: string
  scholarship_status: string
  test_score: number
  created_at: string
  cohort: string | null
  referral: string | null
}

export default async function AdminDashboard() {
  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  const { data } = await directSupabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  const applications = (data || []) as Application[]
  
  // Extract unique cohorts for the filter
  const uniqueCohorts = [...new Set(applications.map(a => a.cohort || 'Genesis Cohort'))]
    .filter(Boolean)
    .sort()

  return (
    <DashboardClient 
      applications={applications} 
      uniqueCohorts={uniqueCohorts} 
    />
  )
}
