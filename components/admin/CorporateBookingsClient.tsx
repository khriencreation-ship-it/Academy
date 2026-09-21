'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Search, Download, Building2, Laptop, Calendar, 
  Eye, ArrowUpDown, ChevronLeft, ChevronRight, X, Mail, Phone, Users, CheckCircle2, MessageSquare
} from 'lucide-react'
import { CorporateEnquiry } from '@/types/admin'

interface Props {
  enquiries: CorporateEnquiry[]
}

type SortOption = 'recent' | 'company' | 'name'

export default function CorporateBookingsClient({ enquiries }: Props) {
  const [search, setSearch] = useState('')
  const [deliveryFilter, setDeliveryFilter] = useState<string>('All')
  const [staffFilter, setStaffFilter] = useState<string>('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEnquiry, setSelectedEnquiry] = useState<CorporateEnquiry | null>(null)
  
  const ITEMS_PER_PAGE = 25

  // Filtering Logic
  const filtered = enquiries.filter(item => {
    const matchesSearch =
      item.company_name.toLowerCase().includes(search.toLowerCase()) ||
      item.full_name.toLowerCase().includes(search.toLowerCase()) ||
      item.work_email.toLowerCase().includes(search.toLowerCase()) ||
      item.enquiry_id.toLowerCase().includes(search.toLowerCase()) ||
      (item.phone || '').includes(search)

    const matchesDelivery = deliveryFilter === 'All' || item.delivery_mode.toLowerCase().includes(deliveryFilter.toLowerCase())
    const matchesStaff = staffFilter === 'All' || item.staff_count.toLowerCase().includes(staffFilter.toLowerCase())
    
    // Date Filtering
    let matchesDate = true
    const itemDate = new Date(item.created_at)
    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      matchesDate = matchesDate && itemDate >= start
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      matchesDate = matchesDate && itemDate <= end
    }

    return matchesSearch && matchesDelivery && matchesStaff && matchesDate
  })

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    if (sortBy === 'company') {
      return a.company_name.localeCompare(b.company_name)
    }
    if (sortBy === 'name') {
      return a.full_name.localeCompare(b.full_name)
    }
    return 0
  })

  // Pagination Logic
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginatedData = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, deliveryFilter, staffFilter, startDate, endDate, sortBy])

  // CSV Export
  const handleExport = () => {
    const headers = [
      'Enquiry ID', 'Company Name', 'Full Name', 'Work Email', 'Phone',
      'Staff Count', 'Delivery Mode', 'Departments', 'Goals & Needs',
      'Preferred Start Date', 'Date Submitted'
    ]

    const rows = sorted.map(item => [
      item.enquiry_id,
      `"${item.company_name.replace(/"/g, '""')}"`,
      `"${item.full_name.replace(/"/g, '""')}"`,
      `"${item.work_email}"`,
      `"${item.phone || ''}"`,
      `"${item.staff_count}"`,
      `"${item.delivery_mode}"`,
      `"${(item.departments || '').replace(/"/g, '""')}"`,
      `"${(item.goals || '').replace(/"/g, '""')}"`,
      `"${item.start_date || 'N/A'}"`,
      new Date(item.created_at).toLocaleDateString('en-GB'),
    ])

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `khrien-corporate-bookings-${Date.now()}.csv`
    a.click()
  }

  // Stats
  const totalBookings = filtered.length
  const virtualBookings = filtered.filter(i => i.delivery_mode.toLowerCase().includes('virtual')).length
  const officeBookings = filtered.filter(i => i.delivery_mode.toLowerCase().includes('office') || i.delivery_mode.toLowerCase().includes('person')).length

  return (
    <div className="p-8 space-y-8 bg-[#f5f6fa] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage corporate AI training team enquiries.</p>
        </div>
        
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#7c3aed] text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all shadow-md shadow-purple-200"
        >
          <Download className="w-4 h-4" />
          Export Bookings CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-purple-50 rounded-2xl p-5 border border-white shadow-sm transition-transform hover:scale-[1.02]">
          <div className="bg-[#7c3aed] p-2.5 rounded-xl w-fit mb-3">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{totalBookings}</h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">Total Organization Enquiries</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-5 border border-white shadow-sm transition-transform hover:scale-[1.02]">
          <div className="bg-blue-600 p-2.5 rounded-xl w-fit mb-3">
            <Laptop className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{virtualBookings}</h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">Virtual Online Sessions</p>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 border border-white shadow-sm transition-transform hover:scale-[1.02] col-span-2 lg:col-span-1">
          <div className="bg-emerald-600 p-2.5 rounded-xl w-fit mb-3">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{officeBookings}</h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">At Office (In-Person)</p>
        </div>
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
                placeholder="Search company, contact name, email, or enquiry ID..."
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
                <option value="company">Company (A-Z)</option>
                <option value="name">Contact Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Delivery Filter */}
            <select
              value={deliveryFilter}
              onChange={e => setDeliveryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 outline-none hover:border-[#7c3aed] transition-colors cursor-pointer"
            >
              <option value="All">All Delivery Modes</option>
              <option value="Virtual">Virtual Online</option>
              <option value="office">At Our Office</option>
            </select>

            {/* Staff Filter */}
            <select
              value={staffFilter}
              onChange={e => setStaffFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 outline-none hover:border-[#7c3aed] transition-colors cursor-pointer"
            >
              <option value="All">All Team Sizes</option>
              <option value="Individual">Individual (1 staff)</option>
              <option value="1 to 5">1 to 5 staff</option>
              <option value="6 to 10">6 to 10 staff</option>
              <option value="11">11+ staff</option>
            </select>

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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                {['Company & Contact', 'Contact Details', 'Team Size & Delivery', 'Departments', 'Date Submitted', 'Actions'].map(col => (
                  <th key={col} className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((item) => (
                <tr key={item.enquiry_id || item.id} className="hover:bg-purple-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7c3aed] flex items-center justify-center font-bold text-base flex-shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#7c3aed] transition-colors">{item.company_name}</p>
                        <p className="text-xs text-gray-500 font-medium">{item.full_name}</p>
                        <span className="text-[10px] font-mono font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {item.enquiry_id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-700 font-medium text-xs flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {item.work_email}
                    </p>
                    <p className="text-gray-500 text-xs flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {item.phone}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-[#7c3aed]">
                        {item.staff_count}
                      </span>
                      <div className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Laptop className="w-3 h-3 text-gray-400" />
                        {item.delivery_mode}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 line-clamp-1 max-w-[180px]">
                      {item.departments || 'General Staff'}
                    </p>
                    {item.start_date && (
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Start: {item.start_date}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedEnquiry(item)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg border border-gray-100 hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all text-xs font-bold"
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedData.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-bold">No organization bookings found.</p>
              <p className="text-gray-400 text-xs mt-1">Bookings submitted via the corporate training page will appear here.</p>
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
                className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-[#7c3aed] disabled:opacity-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-[#7c3aed] disabled:opacity-50 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7c3aed] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#7c3aed] bg-purple-50 px-2 py-0.5 rounded">
                  {selectedEnquiry.enquiry_id}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-0.5">{selectedEnquiry.company_name}</h2>
              </div>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Person</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5">{selectedEnquiry.full_name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Work Email</p>
                  <a href={`mailto:${selectedEnquiry.work_email}`} className="font-semibold text-[#7c3aed] text-sm mt-0.5 hover:underline block truncate">
                    {selectedEnquiry.work_email}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone / WhatsApp</p>
                  <a 
                    href={`https://wa.me/${(selectedEnquiry.phone || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer" 
                    className="font-semibold text-emerald-600 text-sm mt-0.5 hover:underline flex items-center gap-1"
                  >
                    {selectedEnquiry.phone}
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date Submitted</p>
                  <p className="font-semibold text-gray-900 text-sm mt-0.5">
                    {new Date(selectedEnquiry.created_at).toLocaleString('en-GB')}
                  </p>
                </div>
              </div>

              {/* Training Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Team Size</p>
                  <p className="font-bold text-gray-900 text-sm mt-1">{selectedEnquiry.staff_count}</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Delivery Mode</p>
                  <p className="font-bold text-gray-900 text-sm mt-1">{selectedEnquiry.delivery_mode}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Preferred Start</p>
                  <p className="font-bold text-gray-900 text-sm mt-1">{selectedEnquiry.start_date || 'Flexible'}</p>
                </div>
              </div>

              {/* Departments */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Departments / Roles Involved</h4>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 font-medium">
                  {selectedEnquiry.departments || 'Not specified'}
                </div>
              </div>

              {/* Goals */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">What they want to achieve with AI</h4>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedEnquiry.goals || 'No additional details provided.'}
                </div>
              </div>

              {/* Quick Action Footer */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-end gap-3">
                <a
                  href={`mailto:${selectedEnquiry.work_email}?subject=Khrien%20Academy%20Corporate%20AI%20Training%20Proposal`}
                  className="px-5 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Proposal Email
                </a>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
