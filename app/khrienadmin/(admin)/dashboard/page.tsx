import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { supabase as directSupabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/admin/DashboardClient'
import { Application } from '@/types/admin'

export const revalidate = 0


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
