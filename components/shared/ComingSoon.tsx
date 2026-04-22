'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center p-8 bg-[var(--bg-base)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-10 text-center shadow-[var(--shadow-md)]"
      >
        <div className="w-16 h-16 rounded-full bg-[var(--brand-dim)] flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-[var(--brand-primary)]" />
        </div>
        
        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
          {title}
        </h2>
        
        <p className="text-[var(--text-secondary)] mb-8">
          This section is coming soon 🚀 We're working hard to get it ready for you.
        </p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center bg-[var(--brand-primary)] hover:bg-[#22885A] text-white font-semibold rounded-xl px-6 py-3 shadow-[var(--shadow-brand)] transition-all hover:-translate-y-0.5"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
