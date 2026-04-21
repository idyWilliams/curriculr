'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, BarChart2, Users, Globe, User, LayoutDashboard, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tracks', label: 'Tracks', icon: BookOpen },
  { href: '/progress', label: 'My Progress', icon: BarChart2 },
  { href: '/cohorts', label: 'Cohorts', icon: Users },
  { href: '/community', label: 'Community', icon: Globe },
  { href: '/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-border bg-bg-subtle flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center shadow-[0_0_14px_rgba(124,106,247,0.5)] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-display text-lg font-semibold text-text-primary tracking-tight">Curriculr</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                active
                  ? 'bg-brand-primary/15 text-brand-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-raised'
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-brand-primary/15 border border-brand-primary/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn('w-4 h-4 shrink-0 relative z-10', active ? 'text-brand-primary' : 'text-text-muted group-hover:text-text-primary')} />
              <span className="relative z-10">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[10px] text-text-muted font-mono">v0.1.0-alpha</p>
      </div>
    </aside>
  )
}
