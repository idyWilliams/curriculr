'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface TopBarProps {
  streak?: number
  xp?: number
  xpMax?: number
  userName?: string
  userAvatar?: string
}

export function TopBar({
  streak = 7,
  xp = 3240,
  xpMax = 5000,
  userName = 'Idyke',
  userAvatar,
}: TopBarProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const xpPct = Math.round((xp / xpMax) * 100)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="fixed top-0 left-60 right-0 h-14 z-20 border-b border-border bg-bg-base/80 backdrop-blur-xl flex items-center px-6 gap-6">
      {/* Streak */}
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <span className="text-lg leading-none">🔥</span>
        <span>{streak}</span>
        <span className="text-text-muted font-normal text-xs">day streak</span>
      </div>

      <div className="w-px h-5 bg-border" />

      {/* XP Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xs">
        <span className="text-xs font-mono text-brand-primary shrink-0">{xp.toLocaleString()} XP</span>
        <div className="relative flex-1 h-1.5 bg-surface-raised rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C6AF7, #00D4B1)', boxShadow: '0 0 8px rgba(124,106,247,0.5)' }}
          />
        </div>
        <span className="text-[10px] text-text-muted font-mono shrink-0">{xpMax.toLocaleString()}</span>
      </div>

      <div className="ml-auto" />

      {/* Avatar dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(p => !p)}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-surface-raised transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-xs font-bold text-brand-primary">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              userName[0].toUpperCase()
            )}
          </div>
          <span className="text-sm font-medium text-text-primary">{userName}</span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-text-muted transition-transform', open && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-surface-raised shadow-2xl overflow-hidden z-50"
            >
              {[
                { icon: User, label: 'Profile', href: '/profile' },
                { icon: Settings, label: 'Settings', href: '/settings' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
              <div className="h-px bg-border mx-3" />
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
