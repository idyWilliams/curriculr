'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Icon } from '@/components/icons/Icon'

// ─── Types ───────────────────────────────────────────────────
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
  track_id: string
  progress_percent: number
  current_lesson_id: string | null
  status: string
}

// ─── Static Seed (shown while data loads) ────────────────────
const STATIC_TRACKS: Track[] = [
  { id: '11111111-1111-1111-1111-111111111111', name: 'Frontend Engineering', slug: 'frontend-engineering', category: 'Development', color: '#2563EB', emoji: '⚡', description: 'Master modern frontend development with React, TypeScript, and Next.js. Build production-ready UIs.', lesson_count: 36, level: 'Beginner → Advanced', hours: 60, skills: ['React', 'TypeScript', 'Next.js'], enrolled_count: 3240, module_count: 8 },
  { id: '22222222-2222-2222-2222-222222222222', name: 'Backend Engineering', slug: 'backend-engineering', category: 'Development', color: '#1B6B45', emoji: '🔧', description: 'Build scalable APIs and server-side systems with Node.js, PostgreSQL, and cloud deployment.', lesson_count: 32, level: 'Intermediate', hours: 55, skills: ['Node.js', 'PostgreSQL', 'Docker'], enrolled_count: 2100, module_count: 7 },
  { id: '33333333-3333-3333-3333-333333333333', name: 'Generative AI', slug: 'generative-ai', category: 'Data & AI', color: '#EC4899', emoji: '🤖', description: 'Build with LLMs, prompt engineering, RAG pipelines, and AI agents from first principles.', lesson_count: 28, level: 'Intermediate', hours: 48, skills: ['Python', 'LangChain', 'OpenAI'], enrolled_count: 4100, module_count: 6 },
  { id: '44444444-4444-4444-4444-444444444444', name: 'UI/UX Design', slug: 'ui-ux-design', category: 'Design', color: '#7C6AF7', emoji: '🎨', description: 'Design beautiful, usable products. From wireframes to high-fidelity Figma prototypes.', lesson_count: 24, level: 'Beginner', hours: 36, skills: ['Figma', 'Prototyping', 'Design Systems'], enrolled_count: 1890, module_count: 5 },
  { id: '55555555-5555-5555-5555-555555555555', name: 'Data Analysis', slug: 'data-analysis', category: 'Data & AI', color: '#F97316', emoji: '📊', description: 'Turn raw data into insights using Python, SQL, and data visualization tools.', lesson_count: 26, level: 'Beginner', hours: 42, skills: ['Python', 'SQL', 'Pandas'], enrolled_count: 2670, module_count: 6 },
  { id: '66666666-6666-6666-6666-666666666666', name: 'DevOps & Cloud', slug: 'devops-cloud', category: 'DevOps', color: '#F59E0B', emoji: '☁️', description: 'Ship faster with CI/CD, Docker, Kubernetes, and cloud infrastructure on AWS and GCP.', lesson_count: 30, level: 'Intermediate', hours: 52, skills: ['Docker', 'AWS', 'GitHub Actions'], enrolled_count: 1450, module_count: 7 },
  { id: '77777777-7777-7777-7777-777777777777', name: 'Systems Design', slug: 'systems-design', category: 'Development', color: '#F97316', emoji: '🏗️', description: 'Design systems that scale to millions. Architecture patterns, databases, caching, queues.', lesson_count: 24, level: 'Advanced', hours: 40, skills: ['Architecture', 'Redis', 'Message Queues'], enrolled_count: 980, module_count: 5 },
  { id: '88888888-8888-8888-8888-888888888888', name: 'Product Management', slug: 'product-management', category: 'Product', color: '#6BAE8F', emoji: '🧭', description: 'Build products people love. PRDs, roadmaps, user research, metrics, and stakeholder alignment.', lesson_count: 20, level: 'Beginner', hours: 32, skills: ['Strategy', 'Roadmapping', 'User Research'], enrolled_count: 1120, module_count: 4 },
  { id: '99999999-9999-9999-9999-999999999999', name: 'Mobile with Flutter', slug: 'mobile-flutter', category: 'Development', color: '#2563EB', emoji: '📱', description: 'Build beautiful cross-platform mobile apps for iOS and Android using Flutter and Dart.', lesson_count: 28, level: 'Beginner → Intermediate', hours: 45, skills: ['Flutter', 'Dart', 'Firebase'], enrolled_count: 1780, module_count: 6 },
]

const CATEGORIES = ['All', 'Development', 'Data & AI', 'Design', 'DevOps', 'Product', 'Security', 'Web3']

const INITIALS_COLORS = ['#1B6B45', '#2563EB', '#7C6AF7']

// ─── Track Card Skeleton ──────────────────────────────────────
function TrackCardSkeleton() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[20px] overflow-hidden animate-pulse">
      <div className="h-2 w-full bg-[var(--bg-elevated)]" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)]" />
          <div className="h-4 w-24 bg-[var(--bg-elevated)] rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-[var(--bg-elevated)] rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-[var(--bg-elevated)] rounded-lg" />
          <div className="h-4 w-2/3 bg-[var(--bg-elevated)] rounded-lg" />
        </div>
        <div className="h-4 w-1/2 bg-[var(--bg-elevated)] rounded-lg" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-[var(--bg-elevated)] rounded-full" />
          <div className="h-6 w-20 bg-[var(--bg-elevated)] rounded-full" />
          <div className="h-6 w-14 bg-[var(--bg-elevated)] rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-1">
            {[0,1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-[var(--bg-elevated)]" style={{ marginLeft: i > 0 ? -8 : 0 }} />)}
          </div>
          <div className="h-8 w-28 bg-[var(--bg-elevated)] rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// ─── Enrolled Track Card ──────────────────────────────────────
function EnrolledTrackCard({ track, enrollment }: { track: Track; enrollment: Enrollment }) {
  return (
    <Link
      href={enrollment.current_lesson_id
        ? `/tracks/${track.slug}/lessons/${enrollment.current_lesson_id}`
        : `/tracks/${track.slug}`}
      className="group flex-shrink-0 w-[280px] bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 overflow-hidden cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex gap-3">
        <div className="w-1.5 rounded-full shrink-0 self-stretch" style={{ backgroundColor: track.color }} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[15px] text-[var(--text-primary)] truncate">{track.name}</div>
          <div className="text-[13px] text-[var(--text-muted)] mt-0.5 truncate">
            {enrollment.progress_percent}% complete
          </div>
          <div className="mt-3 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: track.color }}
              initial={{ width: 0 }}
              animate={{ width: `${enrollment.progress_percent}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <div className="mt-2 text-[13px] font-semibold text-[var(--brand-primary)]">Resume →</div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main Track Card ──────────────────────────────────────────
function TrackCard({
  track,
  enrollment,
  onEnroll,
  isEnrolling,
  index,
}: {
  track: Track
  enrollment: Enrollment | undefined
  onEnroll: (trackId: string, slug: string) => void
  isEnrolling: boolean
  index: number
}) {
  const isEnrolled = !!enrollment

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[20px] overflow-hidden shadow-[var(--shadow-sm)] cursor-pointer transition-shadow duration-200 hover:shadow-[var(--shadow-md)] flex flex-col"
      style={{
        '--hover-border-color': `${track.color}66`,
      } as React.CSSProperties}
      onClick={() => { /* navigate on click */ }}
    >
      {/* Top color bar */}
      <div className="h-2 w-full" style={{ backgroundColor: track.color }} />

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Row 1 – Icon + Category */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
            style={{ backgroundColor: `${track.color}1F` }}
          >
            {track.emoji}
          </div>
          <span
            className="text-[10px] font-semibold tracking-[0.15em] rounded-full px-3 py-1"
            style={{
              color: track.color,
              backgroundColor: `${track.color}14`,
            }}
          >
            {track.category.toUpperCase()}
          </span>
        </div>

        {/* Row 2 – Title */}
        <h2 className="font-display text-xl text-[var(--text-primary)] mt-3 leading-snug">{track.name}</h2>

        {/* Row 3 – Description */}
        <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-2">{track.description}</p>

        {/* Row 4 – Meta */}
        <div className="flex items-center gap-1.5 mt-4 text-xs text-[var(--text-muted)]">
          <span>{track.lesson_count} lessons</span>
          <span className="opacity-40">·</span>
          <span>{track.level}</span>
          <span className="opacity-40">·</span>
          <span>~{track.hours} hrs</span>
        </div>

        {/* Row 5 – Skills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {track.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded-full px-2 py-0.5"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Row 6 – Bottom */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-default)]">
          {/* Stacked avatars */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[var(--bg-surface)] flex items-center justify-center text-[9px] font-bold text-white"
                  style={{
                    backgroundColor: INITIALS_COLORS[i],
                    marginLeft: i > 0 ? -8 : 0,
                    zIndex: 3 - i,
                    position: 'relative',
                  }}
                >
                  {['AM', 'CI', 'EK'][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-[var(--text-muted)]">
              +{(track.enrolled_count / 1000).toFixed(1)}k enrolled
            </span>
          </div>

          {/* CTA */}
          {isEnrolled ? (
            <Link
              href={`/tracks/${track.slug}`}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--brand-dim)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
            >
              Continue →
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEnroll(track.id, track.slug)
              }}
              disabled={isEnrolling}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--brand-primary)] text-white hover:bg-[#22885A] hover:shadow-[var(--shadow-brand)] transition-all disabled:opacity-60"
            >
              {isEnrolling ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                  Enrolling
                </span>
              ) : 'Enroll Free →'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>(STATIC_TRACKS)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [enrollingId, setEnrollingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [, startTransition] = useTransition()

  // Fetch tracks + enrollments from Supabase
  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: tracksData } = await supabase
        .from('tracks')
        .select('*')
        .eq('is_published', true)
        .order('enrolled_count', { ascending: false })

      if (tracksData && tracksData.length > 0) setTracks(tracksData)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: enrollData } = await supabase
          .from('enrollments')
          .select('track_id, progress_percent, current_lesson_id, status')
          .eq('user_id', user.id)
        if (enrollData) setEnrollments(enrollData)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleEnroll = async (trackId: string, slug: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setEnrollingId(trackId)
    // Optimistic update
    setEnrollments((prev) => [
      ...prev,
      { track_id: trackId, progress_percent: 0, current_lesson_id: null, status: 'active' },
    ])

    await supabase.from('enrollments').insert({
      user_id: user.id,
      track_id: trackId,
      status: 'active',
      progress_percent: 0,
    })
    setEnrollingId(null)

    startTransition(() => {
      window.location.href = `/tracks/${slug}`
    })
  }

  // Filtered tracks
  const filteredTracks = tracks.filter((t) => {
    const matchCat = category === 'All' || t.category === category
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const enrolledTracks = tracks.filter((t) =>
    enrollments.some((e) => e.track_id === t.id)
  )

  return (
    <div>
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-[32px] text-[var(--text-primary)] leading-tight">
            Learning Tracks
          </h1>
          <p className="text-base text-[var(--text-secondary)] mt-1">
            Build real skills. Earn verified certificates.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-[280px] shrink-0">
          <Icon
            name="Module"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search tracks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Pills ──────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
              category === cat
                ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Continue Learning Section ─────────────────────────── */}
      {enrolledTracks.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl text-[var(--text-primary)] mb-4">Continue Learning</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {enrolledTracks.map((track) => {
              const enrollment = enrollments.find((e) => e.track_id === track.id)!
              return <EnrolledTrackCard key={track.id} track={track} enrollment={enrollment} />
            })}
          </div>
        </div>
      )}

      {/* ── All Tracks Grid ───────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => <TrackCardSkeleton key={i} />)}
        </div>
      ) : filteredTracks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <Icon name="Tracks" size={48} className="text-[var(--text-muted)] mb-4" />
          <p className="text-lg font-semibold text-[var(--text-secondary)]">
            No tracks found{search ? ` for "${search}"` : ''}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Try a different search or category</p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-sm font-semibold text-[var(--brand-primary)] hover:underline"
            >
              Clear search
            </button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${search}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredTracks.map((track, i) => (
              <Link key={track.id} href={`/tracks/${track.slug}`} className="contents">
                <TrackCard
                  track={track}
                  enrollment={enrollments.find((e) => e.track_id === track.id)}
                  onEnroll={handleEnroll}
                  isEnrolling={enrollingId === track.id}
                  index={i}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
