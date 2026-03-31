'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, LogOut, BarChart3, MessageSquare, Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '/khrienadmin/dashboard', icon: LayoutDashboard },
  { label: 'Applications', href: '/khrienadmin/applications', icon: Users },
  { label: 'Analytics', href: '/khrienadmin/analytics', icon: BarChart3 },
  { label: 'Outreach', href: '/khrienadmin/outreach', icon: MessageSquare },
]

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/khrienadmin/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile Toggle Button - Floating Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-[40] p-3 bg-[#7c3aed] text-white rounded-2xl shadow-xl md:hidden hover:bg-[#6d28d9] transition-all active:scale-95"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#7c3aed] flex flex-col z-[50] shadow-2xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="relative w-36 h-9">
              <Image
                src="/academyyyy logoooootrew.png"
                alt="Khrien Academy"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
            <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-semibold mt-2">
              Admin Portal
            </p>
          </div>
          
          {/* Internal Close Button (Mobile Only) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 md:hidden hover:bg-white/10 rounded-xl transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-[#7c3aed] shadow-lg shadow-purple-900/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-5 border-t border-white/10 space-y-3">
          <div className="px-4 py-3 rounded-xl bg-white/10">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-0.5">Signed in as</p>
            <p className="text-white text-xs font-medium truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 font-semibold text-sm transition-all duration-150"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
