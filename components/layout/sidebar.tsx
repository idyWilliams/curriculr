'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/icons/Icon'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: 'Dashboard' },
  { href: '/tracks', label: 'Tracks', icon: 'Tracks' },
  { href: '/profile#heatmap', label: 'My Progress', icon: 'Progress' },
  { href: '/cohorts', label: 'Cohorts', icon: 'Cohorts' },
  { href: '/community', label: 'Community', icon: 'Community' },
  { href: '/profile', label: 'Profile', icon: 'Profile' },
] as const

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-[var(--border-default)] bg-[var(--bg-elevated)] flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-[var(--border-default)]">
        <Logo className="text-[var(--text-primary)] h-8 w-auto" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV.map(({ href, label, icon }) => {
          // Special case for hash links so they don't break active state logic
          const baseHref = href.split('#')[0]
          const active = pathname === baseHref || pathname.startsWith(baseHref + '/')
          
          return (
            <Link
              key={href}
              href={href}
              className="group relative block"
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-[var(--brand-dim)] rounded-xl border border-[var(--brand-primary)]/20"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3 px-3 py-2">
                <Icon name={icon as any} size={20} className={cn(
                  'transition-colors',
                  active ? 'text-[var(--brand-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                )} />
                <span className={cn(
                  'text-sm font-medium transition-colors',
                  active ? 'text-[var(--brand-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                )}>
                  {label}
                </span>
              </div>
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
