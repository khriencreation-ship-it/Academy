import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { event_type, metadata } = await request.json()

    if (!event_type) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('analytics_events')
      .insert([
        { 
          event_type, 
          metadata: metadata || {},
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Error logging analytics:', error)
      return NextResponse.json({ error: 'Failed to log event' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
