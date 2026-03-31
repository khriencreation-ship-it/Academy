'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Award, 
  Filter, 
  MousePointerClick, 
  Instagram,
  ArrowUpRight,
  Target
} from 'lucide-react'
import AdminCharts from '@/components/admin/AdminCharts'
import { Application, AnalyticsEvent } from '@/types/admin'


interface Props {
  applications: Application[]
  analyticsEvents: AnalyticsEvent[]
  uniqueCohorts: string[]
}

export default function AnalyticsClient({ applications, analyticsEvents, uniqueCohorts }: Props) {
  const [selectedCohort, setSelectedCohort] = useState('All')

  // Filter applications by cohort
  const filteredApps = selectedCohort === 'All' 
    ? applications 
    : applications.filter(a => (a.cohort || 'Genesis Cohort') === selectedCohort)

  // Core App Stats
  const totalApps = filteredApps.length
  
  // Custom Analytics Stats
  const applyClicks = analyticsEvents.filter(e => e.event_type === 'apply_click').length
  const instagramClicks = analyticsEvents.filter(e => e.event_type === 'instagram_click').length
  
  // Conversion Rate (Approximate: Apps / Apply Button Clicks)
  const conversionRate = applyClicks > 0 ? Math.round((totalApps / applyClicks) * 100) : 0

  // Chart Data: Applications by day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    d.setHours(0, 0, 0, 0)
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    
    const count = filteredApps.filter(a => {
      const created = new Date(a.created_at)
      return created >= d && created < next
    }).length

    return {
      day: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      count
    }
  })

  // Status Split
  const statusPieData = [
    { name: 'Pass', value: filteredApps.filter(a => a.scholarship_status === 'Pass').length, color: '#22c55e' },
    { name: 'Fail', value: filteredApps.filter(a => a.scholarship_status === 'Fail').length, color: '#ef4444' },
    { name: 'Pending', value: filteredApps.filter(a => a.scholarship_status === 'Pending').length, color: '#7c3aed' },
  ]

  // Referral breakdown
  const referralMap: Record<string, number> = {}
  filteredApps.forEach(a => {
    const ref = a.referral || 'Other'
    referralMap[ref] = (referralMap[ref] || 0) + 1
  })
  
  const referralColors = ['#7c3aed', '#ec4899', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7']
  const referralPieData = Object.entries(referralMap)
    .map(([name, value], i) => ({
      name,
      value,
      color: referralColors[i % referralColors.length]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  return (
    <div className="p-8 space-y-8 bg-[#f5f6fa] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Detailed breakdown of traffic, engagement, and conversions.</p>
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

      {/* Engagement Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MousePointerClick className="w-5 h-5 text-[#7c3aed]" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Engagement</span>
          </div>
          <p className="text-gray-500 text-xs font-medium mb-1">Apply Button Clicks</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{applyClicks}</h2>
            <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Activity size={10} /> Live
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Instagram className="w-5 h-5 text-pink-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Social</span>
          </div>
          <p className="text-gray-500 text-xs font-medium mb-1">Instagram Page Clicks</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{instagramClicks}</h2>
            <span className="text-[10px] text-pink-600 font-bold bg-pink-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight size={10} /> Growth
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Funnel</span>
          </div>
          <p className="text-gray-500 text-xs font-medium mb-1">Application Conv. Rate</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{conversionRate}%</h2>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Activity size={10} /> Optimized
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
          </div>
          <p className="text-gray-500 text-xs font-medium mb-1">Finalized Submissions</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{totalApps}</h2>
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Award size={10} /> Success
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Flow */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Application Flow</h3>
            <Activity className="w-5 h-5 text-[#7c3aed]" />
          </div>
          <div className="flex-1 min-h-[300px] flex flex-col justify-center">
            <AdminCharts type="bar" data={last7Days} />
          </div>
          <p className="text-gray-400 text-[10px] mt-4 text-center italic">Daily application volume (last 7 days)</p>
        </div>

        {/* Status Split */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Status Split</h3>
            <Award className="w-5 h-5 text-[#7c3aed]" />
          </div>
          <div className="flex-1 min-h-[300px] flex flex-col justify-center">
            <AdminCharts type="pie" data={statusPieData} />
          </div>
          <div className="mt-4 space-y-2">
            {statusPieData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Referral Sources</h3>
            <TrendingUp className="w-5 h-5 text-[#7c3aed]" />
          </div>
          <div className="flex-1 min-h-[300px] flex flex-col justify-center">
            <AdminCharts type="pie" data={referralPieData} />
          </div>
          <div className="mt-4 space-y-1.5 h-32 overflow-y-auto pr-1">
            {referralPieData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 font-medium truncate">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
