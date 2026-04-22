'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, BarChart2, Users, Globe, User, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const SparkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tracks', label: 'Tracks', icon: BookOpen },
  { href: '/profile#heatmap', label: 'My Progress', icon: BarChart2 },
  { href: '/cohorts', label: 'Cohorts', icon: Users },
  { href: '/community', label: 'Community', icon: Globe },
  { href: '/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-[var(--border-default)] bg-[var(--bg-elevated)] flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6 border-b border-[var(--border-default)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center shrink-0 shadow-sm">
          <SparkIcon className="w-4 h-4 text-white" />
        </div>
        <span className="font-display text-xl font-semibold text-[var(--text-primary)] tracking-tight">
          Curriculr
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          // Special case for hash links so they don't break active state logic
          const baseHref = href.split('#')[0]
          const active = pathname === baseHref || pathname.startsWith(baseHref + '/')
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 relative',
                active
                  ? 'bg-[var(--brand-dim)] text-[var(--brand-primary)] font-semibold border-l-[3px] border-[var(--brand-primary)] rounded-r-lg mr-4'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] rounded-lg mx-4 px-2'
              )}
            >
              <Icon className={cn('w-5 h-5 shrink-0', active ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]')} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / User Pill */}
      <div className="p-4 border-t border-[var(--border-default)]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-base)] cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center shrink-0">
            <span className="text-white font-display text-sm font-bold">IW</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[var(--text-primary)] leading-tight">Idorenyin W.</span>
            <span className="text-xs text-[var(--text-muted)] mt-0.5">AI/ML Engineer</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
