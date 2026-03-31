import { supabase as directSupabase } from '@/lib/supabase'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import OutreachClient from '@/components/admin/OutreachClient'
import { Application } from '@/types/admin'

export const revalidate = 0

export default async function OutreachPage() {
  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  // We only want applicants who have not yet taken the test
  const { data, error } = await directSupabase
    .from('applications')
    .select('*')
    .eq('scholarship_status', 'Pending')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching pending applications:', error)
  }

  const pendingApplicants = (data || []) as Application[]

  return (
    <OutreachClient 
      initialApplicants={pendingApplicants} 
    />
  )
}
