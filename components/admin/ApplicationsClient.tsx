'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Search, Download, Users, CheckCircle, XCircle, Clock, 
  BookOpen, Eye, Calendar, ArrowUpDown, ChevronLeft, 
  ChevronRight, Filter, FileJson 
} from 'lucide-react'
import Link from 'next/link'
import { Application } from '@/types/admin'


interface Props {
  applications: Application[]
  stats: { total: number; passed: number; failed: number; pending: number; passRate: number }
  cohorts: string[]
  referrals: string[]
}

type SortOption = 'recent' | 'asc' | 'desc'
type ExportType = 'all' | 'lms'

export default function ApplicationsClient({ applications, stats, cohorts, referrals }: Props) {
  // Filters & State
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [cohortFilter, setCohortFilter] = useState<string>('All')
  const [referralFilter, setReferralFilter] = useState<string>('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)
  
  const ITEMS_PER_PAGE = 30

  // Close export dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExportOptions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtering Logic
  const filtered = applications.filter(app => {
    const matchesSearch =
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.application_id.toLowerCase().includes(search.toLowerCase()) ||
      (app.phone || '').includes(search)

    const matchesStatus = statusFilter === 'All' || app.scholarship_status === statusFilter
    const matchesCohort = cohortFilter === 'All' || (app.cohort || 'Unknown') === cohortFilter
    const matchesReferral = referralFilter === 'All' || (app.referral || 'Other') === referralFilter
    
    // Date Filtering
    let matchesDate = true
    const appDate = new Date(app.created_at)
    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      matchesDate = matchesDate && appDate >= start
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      matchesDate = matchesDate && appDate <= end
    }

    return matchesSearch && matchesStatus && matchesCohort && matchesReferral && matchesDate
  })

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    if (sortBy === 'asc') {
      return a.full_name.localeCompare(b.full_name)
    }
    if (sortBy === 'desc') {
      return b.full_name.localeCompare(a.full_name)
    }
    return 0
  })

  // Pagination Logic
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginatedData = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, cohortFilter, referralFilter, startDate, endDate, sortBy])

  const handleExport = (type: ExportType) => {
    let headers: string[]
    let rows: any[][]

    if (type === 'lms') {
      headers = ['Full Name', 'Email', 'Phone']
      rows = sorted
        .filter(a => a.scholarship_status === 'Pass')
        .map(a => [`"${a.full_name}"`, `"${a.email}"`, `"${a.phone || ''}"`])
    } else {
      headers = ['Full Name', 'Email', 'Phone', 'Application ID', 'Cohort', 'Status', 'Score', 'Applied', 'Motivation', 'Goals', 'Experience', 'Referral']
      rows = sorted.map(a => [
        `"${a.full_name}"`, `"${a.email}"`, `"${a.phone || ''}"`, a.application_id,
        a.cohort || 'Unknown', a.scholarship_status,
        `${a.test_score}/25`,
        new Date(a.created_at).toLocaleDateString('en-GB'),
        `"${(a.motivation || '').replace(/"/g, "'")}"`,
        `"${(a.goals || '').replace(/"/g, "'")}"`,
        `"${(a.experience || '').replace(/"/g, "'")}"`,
        `"${(a.referral || '').replace(/"/g, "'")}"`,
      ])
    }

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `khrien-${type}-export-${Date.now()}.csv`
    a.click()
    setShowExportOptions(false)
  }

  // Dynamic Stats for Cards
  const dynamicStats = {
    total: filtered.length,
    passed: filtered.filter(a => a.scholarship_status === 'Pass').length,
    failed: filtered.filter(a => a.scholarship_status === 'Fail').length,
    pending: filtered.filter(a => a.scholarship_status === 'Pending').length,
    passRate: filtered.length > 0 
      ? Math.round((filtered.filter(a => a.scholarship_status === 'Pass').length / filtered.length) * 100) 
      : 0
  }

  return (
    <div className="p-8 space-y-8 bg-[#f5f6fa] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and review all scholarship applicants.</p>
        </div>
        
        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#7c3aed] text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all shadow-md shadow-purple-200"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          
          {showExportOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1 animate-in fade-in zoom-in duration-100">
              <button
                onClick={() => handleExport('all')}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7c3aed] transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                Export All Data
              </button>
              <button
                onClick={() => handleExport('lms')}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#7c3aed] transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Export for LMS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total', value: dynamicStats.total, icon: Users, bg: 'bg-purple-50', iconBg: 'bg-[#7c3aed]', sub: 'Matching results' },
          { label: 'Passed', value: dynamicStats.passed, icon: CheckCircle, bg: 'bg-green-50', iconBg: 'bg-green-500', sub: `${dynamicStats.passRate}% success rate` },
          { label: 'Failed', value: dynamicStats.failed, icon: XCircle, bg: 'bg-red-50', iconBg: 'bg-red-500', sub: 'Below threshold' },
          { label: 'Pending', value: dynamicStats.pending, icon: Clock, bg: 'bg-amber-50', iconBg: 'bg-amber-500', sub: 'In progress' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-5 border border-white shadow-sm transition-transform hover:scale-[1.02]`}>
            <div className={`${s.iconBg} p-2.5 rounded-xl w-fit mb-3`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{s.value}</h3>
            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</p>
                <span className="text-[9px] text-gray-400 font-medium">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, or application ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all"
              />
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[160px]">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-semibold text-gray-700 outline-none w-full cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="asc">A-Z (Name)</option>
                <option value="desc">Z-A (Name)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Date Range */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="bg-transparent text-xs font-medium outline-none text-gray-700"
                />
                <span className="text-gray-300">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="bg-transparent text-xs font-medium outline-none text-gray-700"
                />
                {(startDate || endDate) && (
                  <button onClick={() => { setStartDate(''); setEndDate(''); }} className="text-[10px] text-red-500 font-bold ml-2 underline">Clear</button>
                )}
              </div>
            </div>

            {/* Existing Filters */}
            <select
              value={cohortFilter}
              onChange={e => setCohortFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 outline-none hover:border-[#7c3aed] transition-colors cursor-pointer"
            >
              <option value="All">All Cohorts</option>
              {cohorts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={referralFilter}
              onChange={e => setReferralFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 outline-none hover:border-[#7c3aed] transition-colors cursor-pointer"
            >
              <option value="All">All Referrals</option>
              {referrals.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
              {['All', 'Pass', 'Fail', 'Pending'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === s ? 'bg-white text-[#7c3aed] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                {['Applicant', 'Contact Details', 'ID / Cohort', 'Status', 'Score', 'Actions'].map(col => (
                  <th key={col} className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((app, i) => (
                <tr key={app.id} className="hover:bg-purple-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-[#7c3aed] font-bold text-sm">
                        {app.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#7c3aed] transition-colors">{app.full_name}</p>
                        <p className="text-[10px] text-gray-400">
                          Applied {new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700 font-medium">{app.email}</p>
                    <p className="text-gray-400 text-xs">{app.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold text-[#7c3aed] bg-purple-50 px-2 py-0.5 rounded w-fit">{app.application_id}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {app.cohort || 'Genesis'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      app.scholarship_status === 'Pass' ? 'bg-green-100 text-green-700' :
                      app.scholarship_status === 'Fail' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {app.scholarship_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{app.test_score ?? '–'} <span className="text-gray-400 text-[10px]">/25</span></span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/khrienadmin/applications/${app.application_id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg border border-gray-100 hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all text-xs font-bold"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedData.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-200" />
              </div>
              <p className="text-gray-400 font-bold">No results matching your filters.</p>
              <p className="text-gray-300 text-xs mt-1">Try resetting your date range or search query.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
              Showing <span className="text-gray-700 font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-gray-700 font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, sorted.length)}</span> of <span className="text-gray-700 font-bold">{sorted.length}</span> results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-[#7c3aed] disabled:opacity-50 disabled:hover:text-gray-400 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page ? 'bg-[#7c3aed] text-white shadow-md' : 'bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-[#7c3aed] disabled:opacity-50 disabled:hover:text-gray-400 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
