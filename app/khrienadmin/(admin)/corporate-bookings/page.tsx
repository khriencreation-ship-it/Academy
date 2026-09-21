import { supabase as directSupabase } from '@/lib/supabase'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CorporateBookingsClient from '@/components/admin/CorporateBookingsClient'
import { CorporateEnquiry } from '@/types/admin'

export const revalidate = 0

export default async function CorporateBookingsPage() {
  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  const { data, error } = await directSupabase
    .from('corporate_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.warn('Error fetching corporate_enquiries:', error.message)
  }

  const enquiries = (data || []) as CorporateEnquiry[]

  return <CorporateBookingsClient enquiries={enquiries} />
}
