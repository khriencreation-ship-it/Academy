'use client'

import { useState, useTransition } from 'react'
import { login } from './actions'
import { motion } from 'framer-motion'
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 selection:bg-purple-500/30">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 mb-6 shadow-lg shadow-purple-500/20"
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Gate</h1>
            <p className="text-white/50 mt-2 text-sm">Authorized Khrien Personnel Only</p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-400 text-white/30">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="admin@khrien.com"
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 outline-none transition-all focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-purple-400 text-white/30">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-white/10 outline-none transition-all focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 group"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Khrien Academy. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
