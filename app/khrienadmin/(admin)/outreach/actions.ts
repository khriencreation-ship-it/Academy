'use server'

import { supabase } from '@/lib/supabase'

export async function markAsRemindedAction(id: string) {
  // First, get the current count
  const { data: currentData } = await supabase
    .from('applications')
    .select('whatsapp_remind_count')
    .eq('id', id)
    .single()

  const currentCount = currentData?.whatsapp_remind_count || 0

  const { error } = await supabase
    .from('applications')
    .update({ 
      whatsapp_reminded_at: new Date().toISOString(),
      whatsapp_remind_count: currentCount + 1
    })
    .eq('id', id)

  if (error) {
    console.error('Server Action Error:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
