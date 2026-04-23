'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import confetti from 'canvas-confetti'
import { createClient } from '@/lib/supabase/client'
import { Icon } from '@/components/icons/Icon'
import { toastXP } from '@/components/shared/XPToast'
import { cn } from '@/lib/utils'
import {
  LessonData, ModuleData, TrackData, TYPE_COLORS,
  STATIC_TRACK, STATIC_MODULES, STATIC_LESSONS,
} from '@/lib/lesson-data'

// ─── Video Player Placeholder ─────────────────────────────────
function VideoPlayer({ title, color }: { title: string; color: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setPlaying(!playing)}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}22, #000 70%)` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {!playing ? (
          <>
            <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1.5" />
            </motion.div>
            <p className="font-display text-white/80 text-lg text-center px-8">{title}</p>
          </>
        ) : (
          <p className="text-white/60 text-sm">Video playing — placeholder</p>
        )}
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: '#24C97E' }}
          animate={playing ? { width: '100%' } : { width: '0%' }}
          transition={playing ? { duration: 30, ease: 'linear' } : {}} />
      </div>
    </div>
  )
}

// ─── Quiz Component ───────────────────────────────────────────
function QuizView({ content }: { content: { questions: { q: string; options: string[]; correct: number }[] } }) {
  const [qi, setQi] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const question = content.questions[qi]
  if (!question) return null

  const check = () => { setAnswered(true) }
  const next = () => { setQi(qi + 1); setSelected(null); setAnswered(false) }

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-semibold text-[var(--text-secondary)]">Question {qi + 1} of {content.questions.length}</span>
        <div className="flex gap-1 ml-auto">
          {content.questions.map((_, i) => (
            <div key={i} className={cn('w-2 h-2 rounded-full', i <= qi ? 'bg-[var(--brand-primary)]' : 'bg-[var(--bg-elevated)]')} />
          ))}
        </div>
      </div>
      <h3 className="font-display text-[22px] text-[var(--text-primary)] mb-6">{question.q}</h3>
      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => {
          const isCorrect = answered && i === question.correct
          const isWrong = answered && i === selected && i !== question.correct
          return (
            <button key={i} onClick={() => !answered && setSelected(i)}
              className={cn(
                'w-full text-left px-5 py-4 rounded-xl border transition-all',
                !answered && selected === i && 'border-[var(--brand-primary)] bg-[var(--brand-dim)]',
                !answered && selected !== i && 'border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]',
                isCorrect && 'border-green-500 bg-green-500/10',
                isWrong && 'border-red-500 bg-red-500/10',
              )}>
              <span className="text-sm text-[var(--text-primary)]">{opt}</span>
              {isCorrect && <span className="float-right text-green-500 font-bold">✓</span>}
              {isWrong && <span className="float-right text-red-500 font-bold">✕</span>}
            </button>
          )
        })}
      </div>
      {!answered ? (
        <button onClick={check} disabled={selected === null}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-[var(--brand-primary)] hover:bg-[#22885A] disabled:opacity-40 transition-all">
          Check Answer
        </button>
      ) : qi < content.questions.length - 1 ? (
        <button onClick={next} className="px-6 py-3 rounded-xl font-semibold text-white bg-[var(--brand-primary)] hover:bg-[#22885A] transition-all">
          Next Question →
        </button>
      ) : (
        <p className="text-sm font-semibold text-[#24C97E]">Quiz complete!</p>
      )}
    </div>
  )
}

// ─── Project View ─────────────────────────────────────────────
function ProjectView({ content, onSubmit }: { content: { brief: string; requirements: string[] }; onSubmit: () => void }) {
  const [url, setUrl] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const submit = () => { setSubmitted(true); onSubmit() }

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8">
      <span className="text-xs font-semibold text-[#F97316] bg-[#F97316]/10 rounded-full px-3 py-1">PROJECT</span>
      <p className="text-[var(--text-secondary)] mt-4 leading-relaxed">{content.brief}</p>
      <h4 className="font-semibold text-[var(--text-primary)] mt-6 mb-3">Requirements</h4>
      <div className="space-y-2 mb-8">
        {content.requirements.map((r, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border border-[var(--border-default)] shrink-0 mt-0.5" />
            <span className="text-sm text-[var(--text-secondary)]">{i + 1}. {r}</span>
          </div>
        ))}
      </div>
      {submitted ? (
        <div className="text-center py-6">
          <p className="font-display text-xl text-[#24C97E]">Submitted! Under review 🎉</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">+100 XP earned</p>
        </div>
      ) : (
        <>
          <h4 className="font-semibold text-[var(--text-primary)] mb-3">Submission</h4>
          <textarea value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste your GitHub repo URL or deployed link"
            className="w-full h-20 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-primary)] resize-none" />
          <button onClick={submit} disabled={!url.trim()}
            className="mt-4 px-6 py-3 rounded-xl font-semibold text-white bg-[var(--brand-primary)] hover:bg-[#22885A] disabled:opacity-40 transition-all">
            Submit Project →
          </button>
        </>
      )}
    </div>
  )
}

// ─── Track Completion Overlay ─────────────────────────────────
function CompletionOverlay({ track, onClose }: { track: TrackData; onClose: () => void }) {
  useEffect(() => {
    const fire = () => confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#1B6B45', '#24C97E', '#F59E0B', '#FFFFFF', '#D1FAE5'] })
    fire()
    setTimeout(fire, 200)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#141410]/95 backdrop-blur-md flex items-center justify-center" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}
        className="text-center max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h1 className="font-display text-5xl text-white mb-2">Track Complete! 🎓</h1>
        <p className="text-2xl text-[#24C97E] font-display mb-4">{track.name}</p>
        <p className="text-white/60 mb-8">{track.lesson_count} lessons · +1,200 XP</p>
        <div className="flex gap-4 justify-center">
          <Link href="/profile" className="px-6 py-3 rounded-xl font-semibold bg-white text-[#141410] hover:bg-white/90 transition-colors">View Certificate</Link>
          <button onClick={onClose} className="px-6 py-3 rounded-xl font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">Continue Exploring →</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const [track, setTrack] = useState<TrackData>(STATIC_TRACK)
  const [modules, setModules] = useState<ModuleData[]>(STATIC_MODULES)
  const [lessons, setLessons] = useState<LessonData[]>(STATIC_LESSONS)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [completing, setCompleting] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const [hintsVisible, setHintsVisible] = useState(false)

  const currentLesson = lessons.find(l => l.id === params.lessonId) ?? lessons[0]
  const allFlat = lessons
  const currentIndex = allFlat.findIndex(l => l.id === currentLesson?.id)
  const prevLesson = currentIndex > 0 ? allFlat[currentIndex - 1] : null
  const nextLesson = currentIndex < allFlat.length - 1 ? allFlat[currentIndex + 1] : null
  const currentModule = modules.find(m => m.id === currentLesson?.module_id)
  const isDone = completedIds.has(currentLesson?.id ?? '')
  const progress = allFlat.length > 0 ? Math.round((completedIds.size / allFlat.length) * 100) : 0

  // Load data
  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: t } = await supabase.from('tracks').select('id,name,slug,color,lesson_count').eq('slug', params.slug).single()
      if (t) setTrack(t)
      const trackId = t?.id ?? STATIC_TRACK.id
      const [{ data: mods }, { data: lsns }] = await Promise.all([
        supabase.from('modules').select('id,title,order_index').eq('track_id', trackId).order('order_index'),
        supabase.from('lessons').select('id,title,type,duration_minutes,xp_reward,order_index,content,module_id').eq('track_id', trackId).order('order_index'),
      ])
      if (mods?.length) setModules(mods)
      if (lsns?.length) setLessons(lsns)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: comps } = await supabase.from('lesson_completions').select('lesson_id').eq('user_id', user.id).eq('track_id', trackId)
        if (comps) setCompletedIds(new Set(comps.map(c => c.lesson_id)))
      }
    }
    load()
  }, [params.slug])

  // Keyboard shortcuts
  useEffect(() => {
    const seen = localStorage.getItem('curriculr_hints_seen')
    if (!seen) { setHintsVisible(true); setTimeout(() => { setHintsVisible(false); localStorage.setItem('curriculr_hints_seen', '1') }, 4000) }
  }, [])

  const markComplete = useCallback(async () => {
    if (!currentLesson || isDone || completing) return
    setCompleting(true)
    setCompletedIds(prev => new Set([...prev, currentLesson.id]))
    toastXP(currentLesson.xp_reward, 'Lesson complete')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('lesson_completions').insert({ user_id: user.id, lesson_id: currentLesson.id, track_id: track.id, xp_earned: currentLesson.xp_reward })
      if (nextLesson) await supabase.from('enrollments').update({ current_lesson_id: nextLesson.id }).eq('user_id', user.id).eq('track_id', track.id)

      // Check module completion
      const moduleLessons = lessons.filter(l => l.module_id === currentLesson.module_id)
      const newCompleted = new Set([...completedIds, currentLesson.id])
      if (moduleLessons.every(l => newCompleted.has(l.id))) {
        setTimeout(() => toastXP(100, 'Module Complete 🎯', true), 600)
      }
      // Check track completion
      if (lessons.every(l => newCompleted.has(l.id))) {
        setTimeout(() => { toastXP(500, 'Track Complete 🎓', true); setShowCompletion(true) }, 1000)
      }
    }
    setCompleting(false)
  }, [currentLesson, isDone, completing, track.id, nextLesson, lessons, completedIds])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'l') { if (nextLesson) window.location.href = `/tracks/${params.slug}/lessons/${nextLesson.id}` }
      if (e.key === 'ArrowLeft' || e.key === 'j') { if (prevLesson) window.location.href = `/tracks/${params.slug}/lessons/${prevLesson.id}` }
      if (e.key === 'c' || e.key === 'C') { markComplete() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [nextLesson, prevLesson, params.slug, markComplete])

  if (!currentLesson) return <div className="p-8 text-[var(--text-muted)]">Lesson not found</div>

  const typeColor = TYPE_COLORS[currentLesson.type] ?? '#888'

  return (
    <div className="flex flex-col h-screen">
      {/* ── Top Nav ──────────────────────────────────────────── */}
      <header className="h-14 bg-[var(--bg-surface)] border-b border-[var(--border-default)] flex items-center px-6 shrink-0 z-50">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <Link href="/tracks" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0">← Tracks</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <Link href={`/tracks/${params.slug}`} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors truncate max-w-[140px]">{track.name}</Link>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">{currentLesson.title}</span>
        </div>
        <div className="flex-1 flex flex-col items-center mx-8">
          <div className="w-full max-w-xs h-1.5 bg-[var(--border-default)] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[var(--brand-primary)] rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1">Lesson {currentIndex + 1} of {allFlat.length}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold bg-amber-500/10 text-amber-500 rounded-full px-2.5 py-1 flex items-center gap-1">
            <Icon name="Flame" size={12} /> 7
          </span>
          <span className="text-xs font-semibold bg-[#24C97E]/10 text-[#24C97E] rounded-full px-2.5 py-1 flex items-center gap-1">
            <Icon name="XP" size={12} /> 3,240
          </span>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Nav */}
        <aside className="w-[280px] bg-[var(--bg-elevated)] border-r border-[var(--border-default)] overflow-y-auto shrink-0 p-4">
          <h3 className="text-[13px] font-semibold text-[var(--text-primary)] mb-4 truncate">{track.name}</h3>
          {modules.map(mod => {
            const modLessons = lessons.filter(l => l.module_id === mod.id)
            return (
              <div key={mod.id} className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-2">{mod.title}</p>
                {modLessons.map(l => {
                  const done = completedIds.has(l.id)
                  const active = l.id === currentLesson.id
                  return (
                    <Link key={l.id} href={`/tracks/${params.slug}/lessons/${l.id}`}
                      className={cn(
                        'flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm transition-colors mb-0.5',
                        active && 'bg-[var(--brand-dim)] font-semibold text-[var(--text-primary)]',
                        !active && done && 'text-[var(--text-muted)] line-through',
                        !active && !done && 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-base)]',
                      )}>
                      <div className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        done && 'bg-[#24C97E]',
                        active && !done && 'ring-2 ring-offset-1 ring-offset-[var(--bg-elevated)]',
                        !active && !done && 'bg-[var(--text-muted)]/30',
                      )} style={active && !done ? { backgroundColor: track.color } : undefined} />
                      <span className="truncate flex-1">{l.title}</span>
                      <span className="text-[10px] text-[var(--text-muted)] shrink-0">{l.duration_minutes}m</span>
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </aside>

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[760px] mx-auto px-6 py-10">
            {/* Header */}
            <p className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
              Module {currentModule?.order_index} · {currentModule?.title}
            </p>
            <div className="flex items-center gap-2 text-[13px] mb-2">
              <span className="font-semibold rounded px-1.5 py-0.5" style={{ color: typeColor, backgroundColor: `${typeColor}18` }}>{currentLesson.type.toUpperCase()}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)]">{currentLesson.duration_minutes} min</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[#24C97E] font-semibold">+{currentLesson.xp_reward} XP on completion</span>
            </div>
            <h1 className="font-display text-4xl text-[var(--text-primary)] mb-6">{currentLesson.title}</h1>
            <hr className="border-[var(--border-default)] mb-8" />

            {/* Content by Type */}
            {currentLesson.type === 'video' && (
              <>
                <VideoPlayer title={currentLesson.title} color={track.color} />
                {currentLesson.content && typeof currentLesson.content === 'object' && 'notes' in currentLesson.content && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-4">Lesson Notes</h3>
                    <div className="prose prose-neutral max-w-none [&_code]:font-mono [&_code]:text-[#24C97E] [&_pre]:bg-[#141410] [&_pre]:rounded-xl [&_pre]:p-4 text-[var(--text-secondary)]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(currentLesson.content.notes)}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </>
            )}

            {currentLesson.type === 'article' && currentLesson.content && 'markdown' in currentLesson.content && (
              <div className="prose prose-neutral max-w-none [&_code]:font-mono [&_code]:text-[#24C97E] [&_pre]:bg-[#141410] [&_pre]:rounded-xl [&_pre]:p-4 text-[var(--text-secondary)] leading-[1.8]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(currentLesson.content.markdown)}</ReactMarkdown>
              </div>
            )}

            {currentLesson.type === 'project' && currentLesson.content && 'brief' in currentLesson.content && (
              <ProjectView
                content={currentLesson.content as { brief: string; requirements: string[] }}
                onSubmit={() => toastXP(100, 'Project submitted')}
              />
            )}

            {currentLesson.type === 'quiz' && currentLesson.content && 'questions' in currentLesson.content && (
              <QuizView content={currentLesson.content as { questions: { q: string; options: string[]; correct: number }[] }} />
            )}
          </div>
        </main>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────── */}
      <footer className="h-[72px] bg-[var(--bg-surface)] border-t border-[var(--border-default)] flex items-center justify-between px-6 shrink-0 z-40">
        {prevLesson ? (
          <Link href={`/tracks/${params.slug}/lessons/${prevLesson.id}`}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            ← Previous: {prevLesson.title}
          </Link>
        ) : <div />}

        <button onClick={markComplete} disabled={isDone || completing}
          className={cn(
            'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all',
            isDone ? 'bg-[#24C97E]/10 text-[#24C97E] cursor-default' : 'bg-[var(--brand-primary)] text-white hover:bg-[#22885A] active:scale-95',
          )}>
          {isDone ? 'Completed ✓' : completing ? 'Saving…' : 'Mark as Complete ✓'}
        </button>

        {nextLesson ? (
          <Link href={`/tracks/${params.slug}/lessons/${nextLesson.id}`}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-[var(--brand-primary)] text-white hover:bg-[#22885A] transition-all">
            Next: {nextLesson.title} →
          </Link>
        ) : (
          <Link href="/profile" className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-[var(--brand-primary)] text-white hover:bg-[#22885A] transition-all">
            View Certificate →
          </Link>
        )}
      </footer>

      {/* Keyboard Hints */}
      <AnimatePresence>
        {hintsVisible && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 left-[300px] bg-[var(--bg-elevated)] text-xs text-[var(--text-muted)] rounded-full px-3 py-1.5 z-50">
            ← → to navigate · C to complete
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track Completion Overlay */}
      <AnimatePresence>
        {showCompletion && <CompletionOverlay track={track} onClose={() => setShowCompletion(false)} />}
      </AnimatePresence>
    </div>
  )
}
