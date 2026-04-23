'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Icon } from '@/components/icons/Icon'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────
interface Lesson {
  id: string
  title: string
  type: 'video' | 'article' | 'project' | 'quiz'
  duration_minutes: number
  xp_reward: number
  order_index: number
}

interface Module {
  id: string
  title: string
  order_index: number
  lessons: Lesson[]
}

interface Track {
  id: string
  name: string
  slug: string
  category: string
  color: string
  emoji: string
  description: string
  lesson_count: number
  level: string
  hours: number
  skills: string[]
  enrolled_count: number
  module_count: number
}

interface Enrollment {
  progress_percent: number
  current_lesson_id: string | null
  status: string
}

// ─── Helpers ──────────────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  video: '#2563EB', article: '#7C6AF7', project: '#F97316', quiz: '#EC4899'
}

function darken(hex: string, amount = 0.4): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 0xff) * (1 - amount))
  const g = Math.round(((n >> 8) & 0xff) * (1 - amount))
  const b = Math.round((n & 0xff) * (1 - amount))
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`
}

// Static fallback
const STATIC_TRACK: Track = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Frontend Engineering', slug: 'frontend-engineering',
  category: 'Development', color: '#2563EB', emoji: '⚡',
  description: 'Master modern frontend development with React, TypeScript, and Next.js. Build production-ready UIs.',
  lesson_count: 36, level: 'Beginner → Advanced', hours: 60,
  skills: ['React', 'TypeScript', 'Next.js'], enrolled_count: 3240, module_count: 8,
}

const STATIC_MODULES: Module[] = [
  { id: 'm1', title: 'Foundations', order_index: 1, lessons: [
    { id: 'l1', title: 'HTML & CSS Fundamentals', type: 'video', duration_minutes: 15, xp_reward: 50, order_index: 1 },
    { id: 'l2', title: 'The Box Model & Layouts', type: 'video', duration_minutes: 12, xp_reward: 50, order_index: 2 },
    { id: 'l3', title: 'CSS Flexbox Mastery', type: 'article', duration_minutes: 10, xp_reward: 50, order_index: 3 },
    { id: 'l4', title: 'CSS Grid Complete Guide', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 4 },
    { id: 'l5', title: 'Responsive Design Principles', type: 'video', duration_minutes: 14, xp_reward: 50, order_index: 5 },
    { id: 'l6', title: 'Build a Portfolio Layout', type: 'project', duration_minutes: 45, xp_reward: 100, order_index: 6 },
  ]},
  { id: 'm2', title: 'JavaScript Core', order_index: 2, lessons: [
    { id: 'l7', title: 'JavaScript Deep Dive', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 1 },
    { id: 'l8', title: 'DOM Manipulation', type: 'video', duration_minutes: 16, xp_reward: 50, order_index: 2 },
    { id: 'l9', title: 'Async JavaScript & Promises', type: 'video', duration_minutes: 22, xp_reward: 50, order_index: 3 },
    { id: 'l10', title: 'ES6+ Modern Syntax', type: 'article', duration_minutes: 15, xp_reward: 50, order_index: 4 },
    { id: 'l11', title: 'Error Handling Patterns', type: 'video', duration_minutes: 12, xp_reward: 50, order_index: 5 },
    { id: 'l12', title: 'Interactive Todo App', type: 'project', duration_minutes: 60, xp_reward: 100, order_index: 6 },
  ]},
  { id: 'm3', title: 'React Fundamentals', order_index: 3, lessons: [
    { id: 'l13', title: 'Why React? Component Thinking', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 1 },
    { id: 'l14', title: 'JSX, Props & State', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 2 },
    { id: 'l15', title: 'Hooks Deep Dive', type: 'video', duration_minutes: 25, xp_reward: 50, order_index: 3 },
    { id: 'l16', title: 'Component Patterns', type: 'article', duration_minutes: 15, xp_reward: 50, order_index: 4 },
    { id: 'l17', title: 'Build a Dashboard UI', type: 'project', duration_minutes: 90, xp_reward: 100, order_index: 5 },
  ]},
  { id: 'm4', title: 'Next.js Patterns', order_index: 4, lessons: [
    { id: 'l18', title: 'Next.js App Router', type: 'video', duration_minutes: 22, xp_reward: 50, order_index: 1 },
    { id: 'l19', title: 'Server vs Client Components', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 2 },
    { id: 'l20', title: 'Server Actions & Mutations', type: 'video', duration_minutes: 24, xp_reward: 50, order_index: 3 },
    { id: 'l21', title: 'Data Fetching Patterns', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 4 },
    { id: 'l22', title: 'Full-Stack Feature', type: 'project', duration_minutes: 120, xp_reward: 100, order_index: 5 },
  ]},
  { id: 'm5', title: 'TypeScript', order_index: 5, lessons: [
    { id: 'l23', title: 'TypeScript Fundamentals', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 1 },
    { id: 'l24', title: 'Types, Interfaces & Generics', type: 'video', duration_minutes: 25, xp_reward: 50, order_index: 2 },
    { id: 'l25', title: 'TypeScript with React', type: 'video', duration_minutes: 18, xp_reward: 50, order_index: 3 },
    { id: 'l26', title: 'Type Your Dashboard', type: 'project', duration_minutes: 60, xp_reward: 100, order_index: 4 },
  ]},
  { id: 'm6', title: 'State Management', order_index: 6, lessons: [
    { id: 'l27', title: 'Global State Patterns', type: 'video', duration_minutes: 22, xp_reward: 50, order_index: 1 },
    { id: 'l28', title: 'Zustand in Practice', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 2 },
    { id: 'l29', title: 'Server State with React Query', type: 'video', duration_minutes: 24, xp_reward: 50, order_index: 3 },
    { id: 'l30', title: 'State Architecture', type: 'project', duration_minutes: 75, xp_reward: 100, order_index: 4 },
  ]},
  { id: 'm7', title: 'Performance & Testing', order_index: 7, lessons: [
    { id: 'l31', title: 'React Performance Optimization', type: 'video', duration_minutes: 20, xp_reward: 50, order_index: 1 },
    { id: 'l32', title: 'Core Web Vitals', type: 'article', duration_minutes: 15, xp_reward: 50, order_index: 2 },
    { id: 'l33', title: 'Testing with Vitest', type: 'video', duration_minutes: 22, xp_reward: 50, order_index: 3 },
    { id: 'l34', title: 'Audit & Fix', type: 'project', duration_minutes: 90, xp_reward: 100, order_index: 4 },
  ]},
  { id: 'm8', title: 'Capstone', order_index: 8, lessons: [
    { id: 'l35', title: 'Capstone Project Brief', type: 'article', duration_minutes: 10, xp_reward: 50, order_index: 1 },
    { id: 'l36', title: 'Capstone: Production App', type: 'project', duration_minutes: 240, xp_reward: 500, order_index: 2 },
  ]},
]

// ─── Progress Ring ────────────────────────────────────────────
function ProgressRing({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={8} />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
}

// ─── Module Accordion Row ─────────────────────────────────────
function ModuleRow({ mod, index, color, completedIds, firstLesson }: {
  mod: Module; index: number; color: string; completedIds: Set<string>; firstLesson: Lesson | null
}) {
  const [open, setOpen] = useState(index === 0)
  const allDone = mod.lessons.every(l => completedIds.has(l.id))

  return (
    <div className={cn(
      'border rounded-xl overflow-hidden transition-colors',
      open ? 'border-[var(--border-strong)]' : 'border-[var(--border-default)]',
      allDone && 'border-[#24C97E]/40'
    )}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: allDone ? '#24C97E' : color }}>
          {allDone ? '✓' : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--text-primary)]">{mod.title}</div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5">
            {mod.lessons.length} lessons · {Math.round(mod.lessons.reduce((a, l) => a + l.duration_minutes, 0) / 60 * 10) / 10}h
          </div>
        </div>
        <Icon name="Progress" size={16} className={cn('text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {/* Lessons */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border-default)]">
              {mod.lessons.map((lesson) => {
                const done = completedIds.has(lesson.id)
                const isCurrent = firstLesson?.id === lesson.id
                return (
                  <Link
                    key={lesson.id}
                    href={`/tracks/frontend-engineering/lessons/${lesson.id}`}
                    className="group flex items-center gap-3 px-6 py-3 border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--bg-elevated)] transition-colors"
                  >
                    {/* Status */}
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold',
                      done ? 'bg-[#24C97E] text-white' : isCurrent ? 'text-white' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                    )} style={isCurrent && !done ? { backgroundColor: color } : undefined}>
                      {done ? '✓' : isCurrent ? '▶' : ''}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className={cn('text-sm truncate', done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]')}>
                        {lesson.title}
                      </div>
                    </div>
                    {/* Meta */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-semibold rounded px-1.5 py-0.5 uppercase tracking-wide"
                        style={{ color: TYPE_COLORS[lesson.type], backgroundColor: `${TYPE_COLORS[lesson.type]}18` }}>
                        {lesson.type}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{lesson.duration_minutes}m</span>
                      {done && <span className="text-xs font-semibold text-[#24C97E]">+{lesson.xp_reward}XP</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function TrackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params)
  const slug = unwrappedParams.slug

  const [track, setTrack] = useState<Track>(STATIC_TRACK)
  const [modules, setModules] = useState<Module[]>(STATIC_MODULES)
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const [{ data: t }, { data: { user } }] = await Promise.all([
        supabase.from('tracks').select('*').eq('slug', slug).single(),
        supabase.auth.getUser(),
      ])
      if (t) setTrack(t)

      const [{ data: mods }, { data: lessons }] = await Promise.all([
        supabase.from('modules').select('*').eq('track_id', t?.id ?? STATIC_TRACK.id).order('order_index'),
        supabase.from('lessons').select('*').eq('track_id', t?.id ?? STATIC_TRACK.id).order('order_index'),
      ])

      if (mods && lessons) {
        const assembled: Module[] = mods.map((m: { id: string; title: string; order_index: number }) => ({
          ...m,
          lessons: lessons.filter((l: Lesson & { module_id: string }) => l.module_id === m.id)
            .sort((a: Lesson, b: Lesson) => a.order_index - b.order_index),
        }))
        if (assembled.length > 0) setModules(assembled)
      }

      if (user) {
        const [{ data: enroll }, { data: completions }] = await Promise.all([
          supabase.from('enrollments').select('*').eq('user_id', user.id).eq('track_id', t?.id ?? STATIC_TRACK.id).single(),
          supabase.from('lesson_completions').select('lesson_id').eq('user_id', user.id).eq('track_id', t?.id ?? STATIC_TRACK.id),
        ])
        if (enroll) setEnrollment(enroll)
        if (completions) setCompletedIds(new Set(completions.map((c: { lesson_id: string }) => c.lesson_id)))
      }
    }
    load()
  }, [slug])

  const handleEnroll = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setEnrolling(true)
    setEnrollment({ progress_percent: 0, current_lesson_id: null, status: 'active' })
    await supabase.from('enrollments').insert({ user_id: user.id, track_id: track.id, status: 'active', progress_percent: 0 })
    setEnrolling(false)
  }

  const allLessons = modules.flatMap(m => m.lessons)
  const totalLessons = allLessons.length
  const resumeLesson = enrollment?.current_lesson_id
    ? allLessons.find(l => l.id === enrollment.current_lesson_id)
    : allLessons[0]
  const firstLesson = allLessons[0] ?? null
  const pct = enrollment?.progress_percent ?? 0

  const darkColor = darken(track.color)

  return (
    <div className="-m-8">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${track.color} 0%, ${darkColor} 60%, #141410 100%)` }}
      >
        <div className="max-w-6xl mx-auto px-8 py-16 relative z-10">
          {/* Breadcrumb */}
          <div className="text-white/50 text-[13px] mb-4">
            <Link href="/tracks" className="hover:text-white/80 transition-colors">Tracks</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{track.name}</span>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold rounded-full px-3 py-1 mb-4">
            {track.emoji} {track.category.toUpperCase()}
          </span>

          <h1 className="font-display text-5xl text-white font-bold leading-tight max-w-2xl">{track.name}</h1>
          <p className="text-[18px] text-white/80 mt-3 max-w-2xl leading-relaxed">{track.description}</p>

          <div className="flex flex-wrap items-center gap-6 mt-6 text-white/70 text-sm">
            <span>📚 {track.lesson_count} lessons</span>
            <span>⏱ ~{track.hours} hours</span>
            <span>📶 {track.level}</span>
            <span>👥 {track.enrolled_count.toLocaleString()} enrolled</span>
          </div>

          <div className="flex items-center gap-4 mt-8">
            {enrollment ? (
              <div>
                <Link
                  href={resumeLesson ? `/tracks/${slug}/lessons/${resumeLesson.id}` : '#'}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: 'white', color: track.color }}
                >
                  Resume: {resumeLesson?.title ?? 'Continue'} →
                </Link>
                <div className="mt-3">
                  <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full bg-white"
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                  </div>
                  <p className="text-white/60 text-sm mt-1.5">{pct}% complete · {completedIds.size} of {totalLessons} lessons done</p>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleEnroll} disabled={enrolling}
                  className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:shadow-lg hover:bg-white/90 disabled:opacity-60"
                  style={{ backgroundColor: 'white', color: track.color }}
                >
                  {enrolling ? 'Enrolling…' : 'Start Learning Free'}
                </button>
                <Link href={`/tracks/${slug}`}
                  className="px-8 py-4 rounded-xl font-bold text-base border border-white/40 text-white hover:bg-white/10 transition-colors">
                  Preview Track
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Decorative blur circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: track.color }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 bg-white" />
      </motion.div>

      {/* ── Curriculum + Sidebar ─────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* LEFT – Module Accordion */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-2xl text-[var(--text-primary)]">Curriculum</h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {modules.length} modules · {totalLessons} lessons · ~{track.hours} hours
              </p>
            </div>
            <div className="space-y-3">
              {modules.map((mod, i) => (
                <ModuleRow
                  key={mod.id} mod={mod} index={i} color={track.color}
                  completedIds={completedIds} firstLesson={firstLesson}
                />
              ))}
            </div>
          </div>

          {/* RIGHT – Sticky Sidebar */}
          <div className="sticky top-6">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6">
              {enrollment ? (
                <>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <ProgressRing pct={pct} color={track.color} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-2xl text-[var(--text-primary)]">{pct}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-2">{completedIds.size} of {totalLessons} lessons</p>
                    <div className="w-full h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden mt-3">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: track.color }}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.5 }} />
                    </div>
                  </div>
                  {resumeLesson && (
                    <Link
                      href={`/tracks/${slug}/lessons/${resumeLesson.id}`}
                      className="w-full flex items-center gap-2 justify-center py-3 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
                      style={{ backgroundColor: '#1B6B45' }}
                    >
                      ▶ {resumeLesson.title}
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">Start this track</h3>
                  <div className="space-y-2 mb-6 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2"><span className="text-[#24C97E]">✓</span> Free forever</div>
                    <div className="flex items-center gap-2"><span className="text-[#24C97E]">✓</span> Verified certificate</div>
                    <div className="flex items-center gap-2"><span className="text-[#24C97E]">✓</span> Track via API</div>
                  </div>
                  <button onClick={handleEnroll} disabled={enrolling}
                    className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-[#1B6B45] hover:bg-[#22885A] transition-colors disabled:opacity-60">
                    {enrolling ? 'Enrolling…' : 'Start Learning Free →'}
                  </button>
                </>
              )}

              {/* Skills */}
              <div className="mt-6 pt-6 border-t border-[var(--border-default)]">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Skills you&apos;ll learn</p>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map(s => (
                    <span key={s} className="text-xs bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded-full px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-6 pt-6 border-t border-[var(--border-default)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B6B45] flex items-center justify-center text-white font-bold text-sm shrink-0">CT</div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Curriculr Team</div>
                  <div className="text-xs text-[var(--text-muted)]">Maintained by practitioners</div>
                  <div className="text-xs text-[var(--text-muted)]">12 tracks published</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
