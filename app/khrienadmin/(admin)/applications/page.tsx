import { supabase as directSupabase } from '@/lib/supabase'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ApplicationsClient from '@/components/admin/ApplicationsClient'

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
}

export default async function ApplicationsPage() {
  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  const { data } = await directSupabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  const applications = (data || []) as Application[]

  const total = applications.length
  const passed = applications.filter(a => a.scholarship_status === 'Pass').length
  const failed = applications.filter(a => a.scholarship_status === 'Fail').length
  const pending = applications.filter(a => a.scholarship_status === 'Pending').length
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0

  // Extract unique cohort names for the filter dropdown
  const cohorts = [...new Set(
    applications.map(a => a.cohort || 'Unknown').filter(Boolean)
  )].sort()

  return (
    <ApplicationsClient
      applications={applications}
      stats={{ total, passed, failed, pending, passRate }}
      cohorts={cohorts}
    />
  )
}
