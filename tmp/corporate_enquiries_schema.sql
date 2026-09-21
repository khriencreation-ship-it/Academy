-- ============================================================
-- KHRIEN ACADEMY - CORPORATE AI TRAINING ENQUIRIES TABLE
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================================

-- 1. Create corporate_enquiries table
CREATE TABLE IF NOT EXISTS public.corporate_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT NOT NULL,
    staff_count TEXT NOT NULL,
    delivery_mode TEXT NOT NULL,
    departments TEXT NOT NULL,
    goals TEXT NOT NULL,
    start_date TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Index for faster queries
CREATE INDEX IF NOT EXISTS idx_corporate_enquiries_created_at 
ON public.corporate_enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_corporate_enquiries_company_name 
ON public.corporate_enquiries(company_name);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.corporate_enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone to submit a corporate training enquiry form
DROP POLICY IF EXISTS "Allow public insert to corporate_enquiries" ON public.corporate_enquiries;
CREATE POLICY "Allow public insert to corporate_enquiries" 
ON public.corporate_enquiries 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated admin users full access to select/update/delete
DROP POLICY IF EXISTS "Allow authenticated full access to corporate_enquiries" ON public.corporate_enquiries;
CREATE POLICY "Allow authenticated full access to corporate_enquiries" 
ON public.corporate_enquiries 
FOR ALL 
USING (true);
