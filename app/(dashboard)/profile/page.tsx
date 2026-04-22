'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Share2, Download, Lock, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { LearnerPassport } from '@/components/profile/LearnerPassport'

// ─── Seeded random for consistent heatmap data ───
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function generateHeatmapData() {
  const rand = seededRandom(42)
  const data: number[] = []
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dow = d.getDay()
    const isWeekend = dow === 0 || dow === 6
    const r = rand()
    if (r < (isWeekend ? 0.45 : 0.2)) { data.push(0) }
    else if (r < (isWeekend ? 0.7 : 0.45)) { data.push(1) }
    else if (r < (isWeekend ? 0.85 : 0.7)) { data.push(2) }
    else if (r < 0.9) { data.push(3) }
    else { data.push(4) }
  }
  // Fill current week
  for (let i = 0; i < 7 && i < data.length; i++) {
    if (data[data.length - 1 - i] === 0) data[data.length - 1 - i] = Math.ceil(rand() * 4)
  }
  return data
}

const HEATMAP_COLORS = ['#EFEDE8', '#A7F3D0', '#6EE7B7', '#34D399', '#1B6B45']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// ─── Mock Data ───
const ACTIVE_TRACKS = [
  { name: 'Frontend Engineering', slug: 'frontend', done: 18, total: 28, pct: 64, color: '#2563EB' },
  { name: 'Generative AI', slug: 'generative-ai', done: 9, total: 24, pct: 38, color: '#EC4899' },
  { name: 'Systems Design', slug: 'systems-design', done: 4, total: 20, pct: 20, color: '#F97316' },
]
const COMPLETED_TRACKS = [
  { name: 'Backend Engineering', slug: 'backend', color: '#1B6B45' },
  { name: 'UI/UX Design', slug: 'ui-ux', color: '#7C6AF7' },
]
const BADGES = [
  { emoji: '🏁', name: 'First Step', earned: true, bg: '#D1FAE5', desc: 'Complete your first lesson' },
  { emoji: '🔥', name: 'On Fire', earned: true, bg: '#FEF3C7', desc: '7-day learning streak' },
  { emoji: '⚡', name: 'Speed Learner', earned: true, bg: '#DBEAFE', desc: 'Complete 5 lessons in one day' },
  { emoji: '🏗️', name: 'Builder', earned: true, bg: '#FFF3E0', desc: 'Submit 3 projects' },
  { emoji: '🎓', name: 'Graduate', earned: true, bg: '#EDE9FE', desc: 'Complete a full track' },
  { emoji: '🌍', name: 'African Pride', earned: true, bg: '#D1FAE5', desc: 'Join from an African country' },
  { emoji: '👥', name: 'Cohort Champion', earned: false, bg: '#EFEDE8', desc: 'Top your cohort leaderboard' },
  { emoji: '🔓', name: 'Open Source Hero', earned: false, bg: '#EFEDE8', desc: 'Contribute to an open source project' },
  { emoji: '🤝', name: 'Connector', earned: false, bg: '#EFEDE8', desc: 'Refer 5 friends' },
]
const ACTIVITY = [
  { dot: '#1B6B45', title: 'Completed React Server Components', sub: 'Fullstack Mastery · +50 XP', time: '2 hours ago' },
  { dot: '#F59E0B', title: 'Badge Unlocked: On Fire 🔥', sub: '7-day streak achieved', time: '5 hours ago' },
  { dot: '#1B6B45', title: 'Completed Intro to RAG Pipelines', sub: 'Generative AI · +50 XP', time: 'Yesterday' },
  { dot: '#F97316', title: 'Earned +200 XP Bonus', sub: 'Weekly challenge completed', time: 'Yesterday' },
  { dot: '#1B6B45', title: 'Completed Database Indexing', sub: 'Backend Engineering · +50 XP', time: '2 days ago' },
  { dot: '#7C6AF7', title: 'Certificate Earned: UI/UX Design', sub: 'Full track completed', time: '3 days ago' },
  { dot: '#1B6B45', title: 'Completed API Authentication', sub: 'Backend Engineering · +50 XP', time: '4 days ago' },
  { dot: '#2563EB', title: 'Started Frontend Engineering', sub: 'New track enrolled', time: '1 week ago' },
]

// ─── Count-up hook ───
function useCountUp(end: number, duration = 1200) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.floor(end / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return { val, ref }
}

function StatNum({ value, label }: { value: number; label: string }) {
  const { val, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-bold text-white">{val.toLocaleString()}</div>
      <div className="text-white/60 text-xs mt-1">{label}</div>
    </div>
  )
}

export default function ProfilePage() {
  const [hireMe, setHireMe] = useState(false)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)
  const heatmapData = useMemo(() => generateHeatmapData(), [])

  const handleShare = () => {
    navigator.clipboard.writeText('https://curriculr.dev/u/idorenyin')
    alert('Profile link copied! ✓')
  }

  // Build heatmap grid: 52 cols x 7 rows
  const weeks: number[][] = []
  for (let w = 0; w < 52; w++) {
    weeks.push(heatmapData.slice(w * 7, w * 7 + 7))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-screen-xl mx-auto space-y-8">

      {/* ══════════ PASSPORT HEADER ══════════ */}
      <div
        className="relative overflow-hidden rounded-3xl p-10 md:p-12"
        style={{ background: 'linear-gradient(135deg, #1B6B45 0%, #0A2E1C 60%, #141410 100%)' }}
      >
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)',
        }} />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
          {/* LEFT */}
          <div className="flex-1">
            <div className="flex items-start gap-5 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 border-[3px] border-white/40 flex items-center justify-center">
                  <span className="font-display text-3xl text-white font-bold">IW</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-[#141410] text-[10px] font-bold rounded-full px-2 py-0.5">
                  🔨 Builder
                </div>
              </div>
              <div>
                <h1 className="font-display text-[28px] text-white font-bold leading-tight">Idorenyin Williams</h1>
                <p className="text-white/60 text-sm">@idorenyin</p>
                <p className="text-white/70 text-sm mt-1">AI/ML Software Engineer</p>
                <p className="text-white/60 text-xs mt-1">📍 Abuja, Nigeria 🇳🇬</p>
              </div>
            </div>
            {/* Badge pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-semibold rounded-full px-3 py-1">🔥 7 day streak</span>
              <span className="bg-white/10 text-white text-xs font-semibold rounded-full px-3 py-1">⚡ Builder</span>
              <span className="bg-white/10 text-white text-xs font-semibold rounded-full px-3 py-1">🌍 African Pride</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end justify-between gap-6">
            {/* Hire Me Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-xs">{hireMe ? '🟢 Open to Work' : 'Available for hire: Off'}</span>
              <button
                onClick={() => setHireMe(!hireMe)}
                className={`relative w-12 h-6 rounded-full transition-colors ${hireMe ? 'bg-[#24C97E]' : 'bg-white/20'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${hireMe ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Stamps grid */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'FE', color: '#2563EB' },
                { label: 'BE', color: '#1B6B45' },
                { label: 'AI', color: '#EC4899' },
                { label: '+', color: '#A8A89A' },
              ].map((s) => (
                <div key={s.label} className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="font-display font-bold text-sm" style={{ color: s.color }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              <StatNum value={36} label="Lessons" />
              <StatNum value={8} label="Badges" />
              <StatNum value={3240} label="XP" />
              <StatNum value={42} label="Hours" />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button onClick={handleShare} className="bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/30 transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share Profile
              </button>
              <button onClick={() => window.print()} className="bg-white/10 text-white/80 text-xs font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download Passport
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ STUDY HEATMAP ══════════ */}
      <div id="heatmap" className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Study Commitment</h2>
          <p className="text-sm text-[var(--text-muted)]">2026 · 187 days studied · 🔥 longest streak: 21 days</p>
        </div>
        {/* Month labels */}
        <div className="flex mb-1 ml-8">
          {MONTHS.map((m, i) => (
            <span key={m} className="text-[10px] text-[var(--text-muted)]" style={{ width: `${100/12}%` }}>{m}</span>
          ))}
        </div>
        {/* Grid */}
        <div className="flex gap-0.5 relative" onMouseLeave={() => setTooltip(null)}>
          {/* Day labels */}
          <div className="flex flex-col justify-around pr-1 shrink-0" style={{ height: `${7 * 17}px` }}>
            {['Mon','','Wed','','Fri','',''].map((d, i) => (
              <span key={i} className="text-[10px] text-[var(--text-muted)] h-[14px] leading-[14px]">{d}</span>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((val, di) => {
                const dayIndex = wi * 7 + di
                const date = new Date()
                date.setDate(date.getDate() - (364 - dayIndex))
                const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                return (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: wi * 0.002 }}
                    className="w-[14px] h-[14px] rounded-[3px] cursor-pointer"
                    style={{ backgroundColor: HEATMAP_COLORS[val] }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setTooltip({ x: rect.left, y: rect.top - 40, text: `${dateStr} · ${val} lessons · +${val * 50} XP` })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })}
            </div>
          ))}
        </div>
        {/* Tooltip */}
        {tooltip && (
          <div className="fixed z-50 bg-[var(--bg-inverse)] text-[var(--text-inverse)] text-xs rounded-md px-3 py-1.5 pointer-events-none shadow-lg" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.text}
          </div>
        )}
        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-xs text-[var(--text-muted)]">Less</span>
          {HEATMAP_COLORS.map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span className="text-xs text-[var(--text-muted)]">More</span>
        </div>
      </div>

      {/* ══════════ TWO COLUMN LAYOUT ══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        {/* LEFT COL */}
        <div className="space-y-8">
          {/* Active Tracks */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">Active Tracks</h2>
            <div className="space-y-1">
              {ACTIVE_TRACKS.map((t) => (
                <Link key={t.slug} href={`/tracks/${t.slug}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors group">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">{t.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{t.done}/{t.total} lessons</div>
                  </div>
                  <div className="w-32 h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden shrink-0">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${t.pct}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full" style={{ backgroundColor: t.color }} />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-secondary)] w-10 text-right">{t.pct}%</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Completed Tracks */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">Completed Tracks</h2>
            <div className="space-y-1">
              {COMPLETED_TRACKS.map((t) => (
                <div key={t.slug} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                  </div>
                  <span className="bg-[var(--brand-dim)] text-[var(--brand-primary)] text-xs font-semibold rounded-full px-3 py-1">✓ Completed</span>
                  <button className="text-xs text-[var(--brand-primary)] font-semibold hover:underline flex items-center gap-1">
                    View Certificate <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL */}
        <div className="space-y-8">
          {/* Badge Wall */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">Badges Earned (6)</h2>
            <div className="grid grid-cols-3 gap-4">
              {BADGES.map((b) => (
                <motion.div
                  key={b.name}
                  whileHover={b.earned ? { scale: 1.1 } : {}}
                  className={`relative flex flex-col items-center p-3 rounded-xl cursor-pointer transition-colors group ${!b.earned ? 'opacity-40 grayscale' : ''}`}
                  title={b.desc}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: b.bg }}>
                    {b.earned ? (
                      <span className="text-3xl">{b.emoji}</span>
                    ) : (
                      <Lock className="w-5 h-5 text-[var(--text-muted)]" />
                    )}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] text-center font-medium">{b.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">Activity</h2>
            <div className="space-y-0">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3 pb-4 relative">
                  {/* Vertical line */}
                  {i < ACTIVITY.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-[2px] bg-[var(--border-default)]" />
                  )}
                  <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 relative z-10 border-2 border-[var(--bg-surface)]" style={{ backgroundColor: a.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{a.title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.sub}</p>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] shrink-0 mt-0.5">{a.time}</span>
                </div>
              ))}
            </div>
            <Link href="/dashboard" className="text-sm text-[var(--brand-primary)] font-semibold hover:underline flex items-center gap-1 mt-2">
              View full history <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════ LEARNER PASSPORT (Exportable) ══════════ */}
      <div className="mt-4">
        <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4">Your Learner Passport</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Download or share your achievement document — it&apos;s beautiful enough for LinkedIn.</p>
        <LearnerPassport />
      </div>

    </motion.div>
  )
}
