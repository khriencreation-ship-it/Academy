'use client'

import { useState, useMemo } from 'react'
import { 
  Users, Search, Clock, Send, CheckCircle, 
  ExternalLink, MessageSquare, Info, AlertCircle 
} from 'lucide-react'
import { Application } from '@/types/admin'
import { markAsRemindedAction } from '@/app/khrienadmin/(admin)/outreach/actions'

interface Props {
  initialApplicants: Application[]
}

const DEFAULT_MESSAGE_TEMPLATE = `Hi {fname}! 👋🏾

Welcome to Khrien Academy — and congratulations on submitting your application for the Genesis Cohort! We are so excited to have you here. You are one of 125 people who applied today alone and that energy is everything. You made a great call. 💜

However, your application is not complete yet — and we really do not want you to lose your spot over a few quick steps.

Here is what you still need to do to secure your place in the Genesis Cohort 👇🏾

✅ Step 1 — Follow us on Instagram
👉🏾 instagram.com/thisis_khrien

This is a required step. Applications without this cannot be processed.

✅ Step 2 — Join our WhatsApp Community
👉🏾 https://chat.whatsapp.com/KavR69S3M3rBox593jkKEw

This is where all cohort updates, resources, and announcements will live. Do not miss out.

✅ Step 3 — Take Your Scholarship Test
This is the final and most important step. Your scholarship test is what confirms your place in the Genesis Cohort.

📧 Check the email we sent to {email} — it contains your unique Application ID and your personal link to take the scholarship test. Check your inbox, spam, and promotions folder.

⚠️ Cannot find the email? 
No problem at all — simply reply to this message with:
"I can't find the email"

and we will assist you directly right here on WhatsApp. 🙏🏾

Spots are limited and filling fast — complete your application today and lock in your place. We are rooting for you! 💜

— The Khrien Academy Team
🌐 academy.khrien.com`

export default function OutreachClient({ initialApplicants }: Props) {
  const [applicants, setApplicants] = useState<Application[]>(initialApplicants)
  const [search, setSearch] = useState('')
  const [template, setTemplate] = useState(DEFAULT_MESSAGE_TEMPLATE)
  const [contactedIds, setContactedIds] = useState<Set<string>>(new Set())
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isQueueMode, setIsQueueMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  // Filtering Logic
  const filtered = useMemo(() => {
    return applicants.filter(app => 
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.application_id.toLowerCase().includes(search.toLowerCase()) ||
      (app.phone || '').includes(search)
    )
  }, [applicants, search])

  const getMessage = (app: Application) => {
    const fname = app.full_name.split(' ')[0]
    return template
      .replace(/{fname}/g, fname)
      .replace(/{name}/g, app.full_name)
      .replace(/{email}/g, app.email)
      .replace(/{app_id}/g, app.application_id)
      .replace(/{test_link}/g, 'https://academy.khrien.com/scholarship-test')
  }

  const handleSend = (app: Application) => {
    const message = getMessage(app)
    const encodedMessage = encodeURIComponent(message)
    
    // Smart Phone Formatting
    let cleanPhone = app.phone.replace(/\D/g, '') // Remove all non-digits
    
    // If it's a standard Nigerian number starting with 0 (e.g. 080...)
    if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
      cleanPhone = '234' + cleanPhone.substring(1)
    } 
    // If it's a 10-digit number missing the leading 0 or country code
    else if (cleanPhone.length === 10) {
      cleanPhone = '234' + cleanPhone
    }
    
    const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
    window.open(url, '_blank')
    
    // Auto-mark as contacted after clicking send
    markAsContacted(app.id)
  }

  const markAsContacted = async (id: string) => {
    setIsUpdating(id)
    
    // Try to update Supabase via Server Action
    const { error } = await markAsRemindedAction(id)

    if (error) {
      console.warn('Could not update last_reminded_at in DB (column might not exist yet):', error)
      // We still update local state for the current session
    }

    setContactedIds(prev => new Set(prev).add(id))
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setIsUpdating(null)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map(app => app.id)))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-8 pb-32 space-y-8 bg-[#f5f6fa] min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Outreach</h1>
          <p className="text-gray-500 text-sm mt-1">Reaching out to {applicants.length} pending applicants who haven't taken the test.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">To be Contacted</p>
            <p className="text-lg font-bold text-gray-900">{applicants.length - contactedIds.size}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <MessageSquare className="w-5 h-5 text-[#7c3aed]" />
              Message Template
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Edit the message below. Use tags like <code className="text-purple-600 font-bold">{'{fname}'}</code>, <code className="text-purple-600 font-bold">{'{email}'}</code>, or <code className="text-purple-600 font-bold">{'{app_id}'}</code> to personalize.
            </p>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full h-96 p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all resize-none font-medium text-gray-700"
              placeholder="Enter your message template here..."
            />
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-relaxed">
                Personalized messages will be generated when you click <b>"Send"</b>. Only applicants with a valid phone number can be reached.
              </p>
            </div>
          </div>
        </div>

        {/* Applicants List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Filter name, email, phone or ID..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#7c3aed] transition-all shadow-sm"
                />
              </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/30 border-b border-gray-50 text-left">
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-[#7c3aed] focus:ring-[#7c3aed]"
                        checked={selectedIds.size > 0 && selectedIds.size === filtered.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[40%]">Applicant</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contacted</th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((app) => (
                    <tr 
                      key={app.id} 
                      className={`group hover:bg-[#7c3aed]/5 transition-all ${
                        contactedIds.has(app.id) ? 'opacity-60 bg-gray-50/50' : selectedIds.has(app.id) ? 'bg-[#7c3aed]/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-[#7c3aed] focus:ring-[#7c3aed]"
                          checked={selectedIds.has(app.id)}
                          disabled={contactedIds.has(app.id)}
                          onChange={() => toggleSelect(app.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${contactedIds.has(app.id) ? 'bg-gray-100 text-gray-400' : 'bg-purple-100 text-[#7c3aed]'}`}>
                            {app.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 truncate max-w-[200px]">{app.full_name}</p>
                            <p className="text-[10px] text-gray-400">{app.application_id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {contactedIds.has(app.id) || app.whatsapp_reminded_at ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] uppercase tracking-wider">
                              <CheckCircle className="w-3 h-3" />
                              Sent
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">
                              { (app.whatsapp_remind_count || 0) + (contactedIds.has(app.id) ? 1 : 0) } { ((app.whatsapp_remind_count || 0) + (contactedIds.has(app.id) ? 1 : 0)) === 1 ? 'time' : 'times' }
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[10px] uppercase tracking-wider">
                            <AlertCircle className="w-3 h-3" />
                            Pending
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSend(app)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                              contactedIds.has(app.id) 
                                ? 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50' 
                                : 'bg-green-500 text-white hover:bg-green-600 shadow-green-100'
                            }`}
                          >
                            <Send className="w-3 h-3" />
                            {contactedIds.has(app.id) ? 'Resend' : 'Send WhatsApp'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-24 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-bold">No results found.</p>
                  <p className="text-gray-300 text-xs mt-1">Try a different search term or check filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
          <div className="bg-[#1e293b] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-6 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center font-bold">
                {selectedIds.size}
              </div>
              <div>
                <p className="text-sm font-bold text-white">Applicants Selected</p>
                <p className="text-xs text-white/50">Ready to start the outreach queue</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedIds(new Set())}
                className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Find the first selected person and start the process
                  const firstId = Array.from(selectedIds)[0]
                  const applicant = applicants.find(a => a.id === firstId)
                  if (applicant) handleSend(applicant)
                }}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-900/40 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Open WhatsApp for Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
