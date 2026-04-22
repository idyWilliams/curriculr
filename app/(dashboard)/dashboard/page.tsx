'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Award, Clock, TrendingUp, Play, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Mock Data ────────────────────────────────────────────────
const CURRENT_LESSON = {
  title: 'Server Actions & Mutations',
  track: 'Fullstack Mastery',
  module: 'Module 4 — Next.js 15 Patterns',
  progress: 68,
  timeLeft: '14 min left',
}

const TRACKS = [
  {
    id: 'fullstack',
    title: 'Fullstack Mastery',
    tag: 'DEV',
    progress: 68,
    lessons: { done: 24, total: 36 },
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    bar: '#7C6AF7',
    glow: 'rgba(124,106,247,0.3)',
  },
  {
    id: 'ai',
    title: 'Generative AI',
    tag: 'DATA',
    progress: 31,
    lessons: { done: 9, total: 28 },
    color: 'text-brand-accent',
    bg: 'bg-brand-accent/10',
    bar: '#00D4B1',
    glow: 'rgba(0,212,177,0.25)',
  },
  {
    id: 'systems',
    title: 'Systems Design',
    tag: 'ENG',
    progress: 12,
    lessons: { done: 3, total: 24 },
    color: 'text-brand-warm',
    bg: 'bg-brand-warm/10',
    bar: '#F0A500',
    glow: 'rgba(240,165,0,0.25)',
  },
]

const ACTIVITY = [
  { id: 1, type: 'lesson', icon: '✅', label: 'Completed', title: 'React Server Components Deep Dive', track: 'Fullstack Mastery', time: '2 hours ago' },
  { id: 2, type: 'badge', icon: '🏅', label: 'Badge Earned', title: 'API Architect', track: 'Systems Design', time: '5 hours ago' },
  { id: 3, type: 'lesson', icon: '✅', label: 'Completed', title: 'Intro to RAG Pipelines', track: 'Generative AI', time: 'Yesterday' },
  { id: 4, type: 'streak', icon: '🔥', label: 'Streak', title: '7-day learning streak achieved!', track: '', time: 'Yesterday' },
  { id: 5, type: 'lesson', icon: '✅', label: 'Completed', title: 'Database Indexing Strategies', track: 'Fullstack Mastery', time: '2 days ago' },
]

const LEADERBOARD = [
  { rank: 1, name: 'Olivia Chen', xp: 12_480, avatar: 'OC', color: 'bg-brand-warm/20 text-brand-warm', medal: '🥇' },
  { rank: 2, name: 'Marcus Webb', xp: 10_920, avatar: 'MW', color: 'bg-brand-primary/20 text-brand-primary', medal: '🥈' },
  { rank: 3, name: 'Aisha Diallo', xp: 9_750, avatar: 'AD', color: 'bg-brand-accent/20 text-brand-accent', medal: '🥉' },
  { rank: 4, name: 'Ryan Nguyen', xp: 7_300, avatar: 'RN', color: 'bg-surface-overlay text-text-secondary', medal: '' },
  { rank: 5, name: 'Sophia Patel', xp: 6_820, avatar: 'SP', color: 'bg-surface-overlay text-text-secondary', medal: '' },
]

// ─── Animation helpers ────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

// ─── Sub-components ───────────────────────────────────────────

function ProgressRing({ pct }: { pct: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width="88" height="88" className="-rotate-90" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
      <motion.circle
        cx="44" cy="44" r={r}
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-screen-xl mx-auto">

      {/* ── Header ── */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-text-primary">
          Good afternoon, Idyke 👋
        </h1>
        <p className="text-sm text-text-muted mt-1">You're on a 7-day streak. Keep the momentum going.</p>
      </motion.div>

      <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
        {/* ── Left column ── */}
        <div className="space-y-6">

          {/* ── Continue Learning Hero ── */}
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #1B6B45 0%, #0F4C2E 55%, #0A2E1C 100%)'
            }}
          >
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '24px 24px'}} />

            <div className="relative flex items-center justify-between gap-6 z-10">
              {/* Left Info */}
              <div className="flex-1 min-w-0">
                <div className="inline-block bg-white/15 text-white rounded-full px-3 py-1 text-xs font-semibold mb-4">
                  {CURRENT_LESSON.track}
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-2 truncate">
                  {CURRENT_LESSON.title}
                </h2>
                <p className="text-sm text-white/70 flex items-center gap-1.5 mb-6">
                  {CURRENT_LESSON.module} · {CURRENT_LESSON.timeLeft}
                </p>
                
                {/* Progress bar instead of ring for left side? Wait, the prompt says "Progress ring (right): SVG circle, white stroke, animated". I will put the progress bar here, and the ring on the right. */}
                <div className="flex items-center gap-4 mb-8 max-w-md">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${CURRENT_LESSON.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-white rounded-full" 
                    />
                  </div>
                  <span className="text-xs font-bold text-white/90">{CURRENT_LESSON.progress}%</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#1B6B45] font-bold rounded-xl px-6 py-3 hover:bg-white/90 shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#1B6B45]" />
                  Resume Learning
                </motion.button>
              </div>

              {/* Right: Progress Ring */}
              <div className="relative shrink-0 hidden md:block mr-4">
                <ProgressRing pct={CURRENT_LESSON.progress} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-white">{CURRENT_LESSON.progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Your Tracks ── */}
          <motion.section variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Your Tracks</h2>
              <button className="text-xs text-brand-primary hover:text-brand-primary-hover transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {TRACKS.map((track, i) => (
                <motion.div
                  key={track.id}
                  variants={item}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border border-border bg-surface/60 backdrop-blur-sm p-4 cursor-pointer group transition-all hover:border-border-strong"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={cn('text-[10px] font-bold font-mono px-1.5 py-0.5 rounded', track.bg, track.color)}>
                      {track.tag}
                    </span>
                    <span className={cn('text-xs font-bold', track.color)}>{track.progress}%</span>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3 leading-snug group-hover:text-text-primary">
                    {track.title}
                  </h3>
                  {/* Progress bar */}
                  <div className="h-1 bg-surface-raised rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${track.progress}%` }}
                      transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: track.bar, boxShadow: `0 0 6px ${track.glow}` }}
                    />
                  </div>
                  <p className="text-[11px] text-text-muted">
                    {track.lessons.done}/{track.lessons.total} lessons
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Recent Activity ── */}
          <motion.section variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Recent Activity</h2>
              <TrendingUp className="w-4 h-4 text-text-muted" />
            </div>
            <div className="rounded-xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden divide-y divide-border">
              {ACTIVITY.map((act, i) => (
                <motion.div
                  key={act.id}
                  variants={item}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-surface-raised transition-colors"
                >
                  <span className="text-lg shrink-0 leading-none w-6 text-center">{act.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary font-medium truncate">{act.title}</p>
                    {act.track && (
                      <p className="text-xs text-text-muted truncate">{act.track}</p>
                    )}
                  </div>
                  <span className="text-[11px] text-text-muted shrink-0 font-mono">{act.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* ── Right column — Leaderboard ── */}
        <motion.aside variants={item} className="sticky top-[calc(3.5rem+2rem)] space-y-4">
          <div
            className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
          >
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">Leaderboard</h2>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">This week</span>
            </div>
            <div className="divide-y divide-border">
              {LEADERBOARD.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 transition-colors',
                    user.rank <= 3 ? 'hover:bg-surface-raised' : 'hover:bg-surface-raised'
                  )}
                >
                  <span className="text-sm w-5 text-center shrink-0">
                    {user.medal || <span className="text-text-muted font-mono text-xs">{user.rank}</span>}
                  </span>
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0', user.color)}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                    <p className="text-[11px] text-text-muted font-mono">{user.xp.toLocaleString()} XP</p>
                  </div>
                  {user.rank === 1 && (
                    <Award className="w-4 h-4 text-brand-warm shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <button className="w-full text-xs text-brand-primary hover:text-brand-primary-hover font-medium flex items-center justify-center gap-1.5 transition-colors">
                View full leaderboard <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Lessons done', value: '36', icon: '📚' },
              { label: 'Badges earned', value: '8', icon: '🏅' },
              { label: 'Hours learned', value: '42', icon: '⏱' },
              { label: 'Cohort rank', value: '#4', icon: '🏆' },
            ].map(stat => (
              <motion.div
                key={stat.label}
                variants={item}
                className="rounded-xl border border-border bg-surface/60 backdrop-blur-sm p-3 text-center"
              >
                <p className="text-xl mb-1 leading-none">{stat.icon}</p>
                <p className="text-lg font-bold text-text-primary font-display">{stat.value}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </motion.div>
  )
}
