'use client'

import { useState } from 'react'
import { Users, CheckCircle, XCircle, Clock, TrendingUp, Filter, BookOpen } from 'lucide-react'
import { Application } from '@/types/admin'


interface Props {
  applications: Application[]
  uniqueCohorts: string[]
}

export default function DashboardClient({ applications, uniqueCohorts }: Props) {
  const [selectedCohort, setSelectedCohort] = useState('All')

  // Filter applications by cohort
  const filtered = selectedCohort === 'All' 
    ? applications 
    : applications.filter(a => (a.cohort || 'Genesis Cohort') === selectedCohort)

  // Core stats
  const total = filtered.length
  const passed = filtered.filter(a => a.scholarship_status === 'Pass').length
  const failed = filtered.filter(a => a.scholarship_status === 'Fail').length
  const pending = filtered.filter(a => a.scholarship_status === 'Pending').length
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0
  
  // Applications in the last 24 hours
  const last24h = filtered.filter(a => {
    const created = new Date(a.created_at)
    const now = new Date()
    return (now.getTime() - created.getTime()) < 24 * 60 * 60 * 1000
  }).length

  // Score distribution for the sidebar-style summary
  const scoreRanges = [
    { label: '0–9', count: filtered.filter(a => a.test_score >= 0 && a.test_score <= 9).length },
    { label: '10–14', count: filtered.filter(a => a.test_score >= 10 && a.test_score <= 14).length },
    { label: '15–19', count: filtered.filter(a => a.test_score >= 15 && a.test_score <= 19).length },
    { label: '20–25', count: filtered.filter(a => a.test_score >= 20 && a.test_score <= 25).length },
  ]

  // Recent 10 applications (increased from 5 since charts are gone)
  const recent = filtered.slice(0, 10)

  return (
    <div className="p-8 space-y-8 bg-[#f5f6fa] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Quick overview of Khrien Academy intake.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Filter className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all appearance-none cursor-pointer shadow-sm min-w-[180px]"
            >
              <option value="All">All Cohorts</option>
              {uniqueCohorts.map(cohort => (
                <option key={cohort} value={cohort}>{cohort}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {[
          { label: 'Total Applicants', value: total, icon: Users, bg: 'bg-purple-50', iconBg: 'bg-[#7c3aed]', sub: `${last24h} in the last 24h`, subColor: 'text-purple-600' },
          { label: 'Selected Cohort', value: selectedCohort === 'All' ? uniqueCohorts.length : 1, icon: BookOpen, bg: 'bg-blue-50', iconBg: 'bg-blue-500', sub: selectedCohort, subColor: 'text-blue-600' },
          { label: 'Scholarship Pass', value: passed, icon: CheckCircle, bg: 'bg-green-50', iconBg: 'bg-green-500', sub: `${passRate}% pass rate`, subColor: 'text-green-600' },
          { label: 'Scholarship Fail', value: failed, icon: XCircle, bg: 'bg-red-50', iconBg: 'bg-red-500', sub: `${total > 0 ? Math.round((failed / total) * 100) : 0}% fail rate`, subColor: 'text-red-500' },
          { label: 'Tests Pending', value: pending, icon: Clock, bg: 'bg-amber-50', iconBg: 'bg-amber-500', sub: 'Awaiting test', subColor: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`${stat.iconBg} p-2.5 rounded-xl`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
            <p className={`text-[11px] font-medium mt-1 truncate ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Distribution Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-1">Score Distribution</h3>
          <p className="text-gray-400 text-xs mb-6">Aggregate performance for {selectedCohort}</p>
          <div className="space-y-5">
            {scoreRanges.map(range => {
              const pct = total > 0 ? Math.round((range.count / total) * 100) : 0
              return (
                <div key={range.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600 font-medium">{range.label} pts</span>
                    <span className="text-gray-900 font-bold">{range.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-[#7c3aed] transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
             <p className="text-[#7c3aed] text-xs font-bold uppercase tracking-widest mb-1 text-center">Pro Tip</p>
             <p className="text-gray-600 text-[11px] text-center">Visit the <a href="/khrienadmin/analytics" className="font-bold underline text-[#7c3aed]">Analytics</a> section for advanced flow and referral charts.</p>
          </div>
        </div>

        {/* Recent Applications - High Density */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Recent Applications</h3>
              <p className="text-gray-400 text-xs mt-0.5">Latest 10 submissions</p>
            </div>
            <div className="flex gap-3">
              <a href="/khrienadmin/applications" className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">View All</a>
              <a href="/khrienadmin/analytics" className="px-4 py-2 bg-[#7c3aed] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">View Charts</a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.length === 0 && <p className="text-gray-400 text-sm italic col-span-full py-12 text-center">No applications found.</p>}
            {recent.map((app, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-50 hover:border-purple-100 hover:bg-purple-50/30 transition-all">
                <div className="w-10 h-10 rounded-full bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed] font-bold text-sm">
                  {app.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-[13px] truncate">{app.full_name}</p>
                  <p className="text-gray-400 text-[11px] truncate whitespace-nowrap overflow-hidden text-ellipsis">{app.email}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    app.scholarship_status === 'Pass' ? 'bg-green-100 text-green-700' :
                    app.scholarship_status === 'Fail' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {app.scholarship_status}
                  </span>
                  <p className="text-gray-400 text-[9px] mt-1 italic font-medium">
                     {new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
