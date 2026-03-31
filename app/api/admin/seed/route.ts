import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const adminEmail = 'admin@khrien.com'
  const adminPassword = 'KhrienAdmin2024!' // You should change this after login

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })

    if (error) {
      if (error.status === 422) {
         return NextResponse.json({ message: 'Admin user already exists' })
      }
      throw error
    }

    return NextResponse.json({ 
      message: 'Admin user created successfully', 
      email: adminEmail,
      note: 'PLEASE DELETE THIS ROUTE FILE AFTER USE FOR SECURITY'
    })

  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
