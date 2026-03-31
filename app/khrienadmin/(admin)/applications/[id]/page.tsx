import { supabase as directSupabase } from '@/lib/supabase'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, User, Mail, Phone, BookOpen, Award,
  Target, Lightbulb, Star, Share2, Calendar, Hash
} from 'lucide-react'

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
  motivation: string | null
  goals: string | null
  experience: string | null
  referral: string | null
}

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabaseAuth = await createServerSupabase()
  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) redirect('/khrienadmin/login')

  const { data, error } = await directSupabase
    .from('applications')
    .select('*')
    .eq('application_id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  const app = data as Application
  const appliedDate = new Date(app.created_at).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
  const appliedTime = new Date(app.created_at).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit'
  })

  const statusConfig = {
    Pass: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    Fail: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
    Pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  }
  const status = statusConfig[app.scholarship_status as keyof typeof statusConfig] || statusConfig.Pending

  return (
    <div className="p-8 max-w-5xl">
      {/* Back button */}
      <Link
        href="/khrienadmin/applications"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#7c3aed] font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7c3aed] font-black text-3xl flex-shrink-0">
            {app.full_name.charAt(0).toUpperCase()}
          </div>

          {/* Core Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{app.full_name}</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${status.bg} ${status.text} ${status.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {app.scholarship_status}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                {app.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                {app.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#7c3aed]" />
                {app.cohort || 'Unknown Cohort'}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Applied {appliedDate} at {appliedTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="w-4 h-4" />
                <code className="text-[#7c3aed] font-mono text-xs bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                  {app.application_id}
                </code>
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="flex-shrink-0 text-center p-5 rounded-2xl bg-gray-50 border border-gray-100 min-w-[120px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Score</p>
            <p className="text-4xl font-black text-gray-900">{app.test_score ?? '–'}</p>
            <p className="text-xs text-gray-400 mt-0.5">out of 25</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div
                className={`h-1.5 rounded-full ${
                  app.scholarship_status === 'Pass' ? 'bg-green-500' :
                  app.scholarship_status === 'Fail' ? 'bg-red-400' : 'bg-gray-400'
                }`}
                style={{ width: `${(app.test_score / 25) * 100}%` }}
              />
            </div>
            <p className={`text-xs font-bold mt-1 ${
              app.scholarship_status === 'Pass' ? 'text-green-600' :
              app.scholarship_status === 'Fail' ? 'text-red-500' : 'text-gray-400'
            }`}>
              {Math.round((app.test_score / 25) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Application Answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Motivation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Star className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Motivation</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {app.motivation || <span className="text-gray-300 italic">Not provided</span>}
          </p>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Target className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Goals</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {app.goals || <span className="text-gray-300 italic">Not provided</span>}
          </p>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Lightbulb className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Experience</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {app.experience || <span className="text-gray-300 italic">Not provided</span>}
          </p>
        </div>

        {/* Referral */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Share2 className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">How They Heard About Us</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {app.referral || <span className="text-gray-300 italic">Not provided</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
