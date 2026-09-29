import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || searchParams.get('ref') || searchParams.get('email') || '';

    if (!query || !query.trim()) {
      return NextResponse.json({ success: false, error: 'Query parameter is required' }, { status: 400 });
    }

    const trimmed = query.trim();

    const { data: application, error } = await supabase
      .from('applications')
      .select('*')
      .or(`application_id.eq.${trimmed},email.ilike.${trimmed}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Lookup API error:', error);
      return NextResponse.json({ success: false, error: 'Database search failed' }, { status: 500 });
    }

    if (!application) {
      return NextResponse.json({ success: false, error: 'No application found with that ID or Email address.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      application
    });
  } catch (err: any) {
    console.error('Lookup error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
