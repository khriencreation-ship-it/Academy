'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, LogOut, BarChart3, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Home', href: '/khrienadmin/dashboard', icon: LayoutDashboard },
  { label: 'Applications', href: '/khrienadmin/applications', icon: Users },
  { label: 'Analytics', href: '/khrienadmin/analytics', icon: BarChart3 },
  { label: 'Outreach', href: '/khrienadmin/outreach', icon: MessageSquare },
]

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/khrienadmin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#7c3aed] flex flex-col z-40 shadow-2xl">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
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
  )
}
