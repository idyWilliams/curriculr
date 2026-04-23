'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ChevronRight, ChevronLeft, Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Icon } from '@/components/icons/Icon'
import { Logo } from '@/components/ui/logo'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

/* ─── Data ─── */
const ROLES = [
  { id: 'student', label: 'Student', icon: 'Profile', desc: 'Learning at my own pace, building skills for the future.', color: '#1B6B45' },
  { id: 'school', label: 'School / Educator', icon: 'School', desc: 'Managing tracks and curriculum for my students.', color: '#2563EB' },
  { id: 'company', label: 'Team / Company', icon: 'Team', desc: 'Upskilling my engineering team with structured learning.', color: '#F97316' },
  { id: 'developer', label: 'Developer', icon: 'Terminal', desc: 'Building integrations with the Curriculr API.', color: '#7C6AF7' },
] as const

const TRACKS = [
  { id: 'fullstack', title: 'Fullstack Mastery', desc: 'React · Node · Databases · Deployment', icon: 'Module', color: '#1B6B45', lessons: 36 },
  { id: 'frontend', title: 'Frontend Engineering', desc: 'CSS · React · Next.js · Performance', icon: 'Terminal', color: '#2563EB', lessons: 28 },
  { id: 'ai', title: 'Generative AI', desc: 'LLMs · Agents · RAG · Fine-tuning', icon: 'Lesson', color: '#EC4899', lessons: 24 },
  { id: 'systems', title: 'Systems Design', desc: 'Scalability · Reliability · Distributed Systems', icon: 'Database', color: '#F97316', lessons: 20 },
  { id: 'uiux', title: 'UI/UX Design', desc: 'Figma · Prototyping · Design Systems', icon: 'Article', color: '#F59E0B', lessons: 16 },
  { id: 'product', title: 'Product Strategy', desc: 'Roadmaps · Metrics · Go-to-Market', icon: 'BuiltInAfrica', color: '#7C6AF7', lessons: 18 },
] as const

/* ─── Animations ─── */
const pageTransition = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 40 : -40,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -30 : 30,
    scale: 0.98,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  }),
}

/* ═══════════════════════════════════════════════════════════
   ONBOARDING WIZARD
   ═══════════════════════════════════════════════════════════ */
export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState({ role: '', track: '', mode: 'solo' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const totalSteps = 4
  const progress = ((step - 1) / (totalSteps - 1)) * 100

  const goTo = (next: number) => {
    if (next < 1 || next > totalSteps) return
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const handleComplete = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').upsert({
        user_id: user.id,
        role: form.role,
        interested_tracks: [form.track],
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col relative overflow-hidden">

      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'rgba(27,107,69,0.08)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full blur-[120px]"
          style={{ background: 'rgba(36,201,126,0.06)' }}
        />
      </div>

      {/* ── TOP BAR ── */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <div className="flex items-center">
          <Logo className="text-[var(--text-primary)] h-8 w-[120px]" />
        </div>

        {/* Step counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {step} of {totalSteps}
          </span>
          {step > 1 && (
            <button
              onClick={() => goTo(step - 1)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
      </header>

      {/* ── PROGRESS BAR (full width, thin, top) ── */}
      <div className="relative z-20 h-[3px] bg-[var(--bg-elevated)] mx-8 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="h-full rounded-full bg-[var(--brand-primary)]"
          style={{ boxShadow: '0 0 8px rgba(27,107,69,0.4)' }}
        />
      </div>

      {/* ── MAIN CONTENT (centered, full height) ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>

            {/* ════════ STEP 1: IDENTITY ════════ */}
            {step === 1 && (
              <motion.div key="step1" custom={dir} variants={pageTransition} initial="enter" animate="center" exit="exit">
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-2xl bg-[var(--brand-dim)] flex items-center justify-center mx-auto mb-5"
                  >
                    <Icon name="XP" size={28} className="text-[var(--brand-primary)]" />
                  </motion.div>
                  <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">
                    How will you use Curriculr?
                  </h1>
                  <p className="text-[var(--text-secondary)] text-base max-w-md mx-auto">
                    This helps us personalize your entire experience.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {ROLES.map((role, i) => {
                    const selected = form.role === role.id
                    return (
                      <motion.button
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        onClick={() => { setForm({ ...form, role: role.id }); setTimeout(() => goTo(2), 200) }}
                        className={cn(
                          'group relative text-left p-6 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer',
                          selected
                            ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)] shadow-[var(--shadow-brand)]'
                            : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5'
                        )}
                      >
                        {selected && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <div className="mb-4 bg-[var(--bg-elevated)] w-10 h-10 rounded-full flex items-center justify-center">
                          <Icon name={role.icon as any} size={20} color={role.color} />
                        </div>
                        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5">{role.label}</h3>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{role.desc}</p>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ════════ STEP 2: TRACK ════════ */}
            {step === 2 && (
              <motion.div key="step2" custom={dir} variants={pageTransition} initial="enter" animate="center" exit="exit">
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-2xl bg-[var(--brand-dim)] flex items-center justify-center mx-auto mb-5"
                  >
                    <span className="text-2xl">🎯</span>
                  </motion.div>
                  <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Pick your first track
                  </h1>
                  <p className="text-[var(--text-secondary)] text-base max-w-md mx-auto">
                    Don&apos;t worry — you can always add more tracks later.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {TRACKS.map((track, i) => {
                    const selected = form.track === track.id
                    return (
                      <motion.button
                        key={track.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.06 }}
                        onClick={() => { setForm({ ...form, track: track.id }); setTimeout(() => goTo(3), 200) }}
                        className={cn(
                          'group text-left p-5 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer relative',
                          selected
                            ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)] shadow-[var(--shadow-brand)]'
                            : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5'
                        )}
                      >
                        {selected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-2">
                          <Icon name={track.icon as any} size={24} color={track.color} />
                          <h3 className="text-sm font-bold text-[var(--text-primary)]">{track.title}</h3>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">{track.desc}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
                          <span className="text-[11px] text-[var(--text-muted)]">{track.lessons} lessons</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ════════ STEP 3: GITHUB ════════ */}
            {step === 3 && (
              <motion.div key="step3" custom={dir} variants={pageTransition} initial="enter" animate="center" exit="exit">
                <div className="max-w-sm mx-auto text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-lg)] flex items-center justify-center mx-auto mb-8"
                  >
                    <GithubIcon className="w-12 h-12 text-[var(--text-primary)]" />
                  </motion.div>
                  
                  <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">
                    Connect GitHub
                  </h1>
                  <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10">
                    Auto-sync your commits and PRs to unlock learning milestones and earn XP automatically.
                  </p>

                  <button
                    onClick={() => goTo(4)}
                    className="w-full flex items-center justify-center gap-3 h-13 rounded-xl bg-[#24292f] hover:bg-[#3d444d] text-white font-semibold text-[15px] transition-all mb-4 cursor-pointer py-3.5"
                  >
                    <GithubIcon className="w-5 h-5" />
                    Connect with GitHub
                  </button>
                  
                  <button
                    onClick={() => goTo(4)}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
                  >
                    Skip for now →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ════════ STEP 4: LEARNING STYLE ════════ */}
            {step === 4 && (
              <motion.div key="step4" custom={dir} variants={pageTransition} initial="enter" animate="center" exit="exit">
                <div className="max-w-md mx-auto text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-2xl bg-[var(--brand-dim)] flex items-center justify-center mx-auto mb-5"
                  >
                    <span className="text-2xl">🎯</span>
                  </motion.div>
                  
                  <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-2">
                    Set your pace
                  </h1>
                  <p className="text-[var(--text-secondary)] text-base mb-10">
                    Choose how you want to learn. You can change this anytime.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                      {
                        id: 'solo', icon: 'LevelUp', label: 'Go Solo',
                        desc: 'Self-paced learning on your own schedule. Complete lessons whenever you want.',
                        color: '#1B6B45',
                      },
                      {
                        id: 'cohort', icon: 'Team', label: 'Join a Cohort',
                        desc: 'Learn with peers on a structured timeline. Accountability and community.',
                        color: '#2563EB',
                      },
                    ].map((opt, i) => {
                      const selected = form.mode === opt.id
                      return (
                        <motion.button
                          key={opt.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          onClick={() => setForm({ ...form, mode: opt.id })}
                          className={cn(
                            'relative text-center p-7 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer',
                            selected
                              ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)] shadow-[var(--shadow-brand)]'
                              : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]'
                          )}
                        >
                          {selected && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="mb-4 bg-[var(--bg-elevated)] w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                            <Icon name={opt.icon as any} size={24} color={opt.color} />
                          </div>
                          <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{opt.label}</h3>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{opt.desc}</p>
                        </motion.button>
                      )
                    })}
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    disabled={loading}
                    onClick={handleComplete}
                    className="w-full flex items-center justify-center gap-2.5 h-14 rounded-xl font-bold text-base text-white transition-all disabled:opacity-50 bg-[var(--brand-primary)] hover:bg-[#22885A] shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Setting up your dashboard…
                      </>
                    ) : (
                      <>
                        Launch Dashboard
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 px-8 py-4 flex items-center justify-between">
        <span className="text-xs text-[var(--text-ghost)]">Knowledge as a Service.</span>
        <span className="text-xs text-[var(--text-ghost)]">Built in Africa, for the world 🌍</span>
      </footer>
    </div>
  )
}
