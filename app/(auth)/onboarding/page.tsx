'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { GraduationCap, Building2, Terminal, Rocket, Users, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    desc: 'Learning at my own pace',
    color: 'from-brand-primary/20 to-brand-primary/5',
    glow: 'rgba(124,106,247,0.3)',
    iconColor: 'text-brand-primary',
  },
  {
    id: 'school',
    label: 'School',
    icon: Building2,
    desc: 'Managing educational tracks',
    color: 'from-brand-accent/20 to-brand-accent/5',
    glow: 'rgba(0,212,177,0.25)',
    iconColor: 'text-brand-accent',
  },
  {
    id: 'company',
    label: 'Company',
    icon: Users,
    desc: 'Upskilling our team',
    color: 'from-brand-warm/20 to-brand-warm/5',
    glow: 'rgba(240,165,0,0.25)',
    iconColor: 'text-brand-warm',
  },
  {
    id: 'developer',
    label: 'Developer',
    icon: Terminal,
    desc: 'Building the future',
    color: 'from-info/20 to-info/5',
    glow: 'rgba(56,189,248,0.25)',
    iconColor: 'text-info',
  },
]

const TRACKS = [
  { id: 'fullstack', title: 'Fullstack Mastery', tag: 'DEV', desc: 'React, Node, databases, and deployment', color: 'text-brand-primary', bg: 'bg-brand-primary/10', border: 'border-brand-primary/30' },
  { id: 'ai', title: 'Generative AI', tag: 'DATA', desc: 'LLMs, agents, RAG, and fine-tuning', color: 'text-brand-accent', bg: 'bg-brand-accent/10', border: 'border-brand-accent/30' },
  { id: 'systems', title: 'Systems Design', tag: 'ENG', desc: 'Scalability, reliability, distributed systems', color: 'text-brand-warm', bg: 'bg-brand-warm/10', border: 'border-brand-warm/30' },
  { id: 'product', title: 'Product Strategy', tag: 'BIZ', desc: 'Roadmaps, metrics, and go-to-market', color: 'text-info', bg: 'bg-info/10', border: 'border-info/30' },
]

const STEP_LABELS = ['Identity', 'Track', 'GitHub', 'Style']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: 'easeOut' as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const } }),
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState({ role: '', track: '', mode: 'solo' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const goTo = (next: number) => {
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

  const progress = ((step - 1) / 3) * 100

  return (
    <div className="relative min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 overflow-hidden">

      {/* ── Background Orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(124,106,247,0.35) 0%, transparent 70%)' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ background: 'radial-gradient(circle, rgba(0,212,177,0.25) 0%, transparent 70%)' }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">

        {/* ── Step Indicator ── */}
        <div className="mb-10">
          {/* Step pills */}
          <div className="flex items-center justify-between mb-5">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1
              const done = step > n
              const active = step === n
              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                      done ? 'bg-brand-primary text-white shadow-[0_0_12px_rgba(124,106,247,0.5)]' :
                      active ? 'bg-brand-primary/20 text-brand-primary border-2 border-brand-primary' :
                      'bg-surface border border-border text-text-muted'
                    )}>
                      {done ? <Check className="w-4 h-4" /> : n}
                    </div>
                    <span className={cn(
                      'text-[10px] font-mono uppercase tracking-widest transition-colors',
                      active ? 'text-brand-primary' : done ? 'text-text-secondary' : 'text-text-muted'
                    )}>
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className="flex-1 relative mx-2 -mt-5">
                      <div className="h-px bg-border" />
                      <motion.div
                        className="absolute inset-0 h-px bg-brand-primary origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: step > n ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-surface-raised rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7C6AF7, #00D4B1)', boxShadow: '0 0 12px rgba(124,106,247,0.5)' }}
            />
          </div>
        </div>

        {/* ── Card ── */}
        <div
          className="rounded-2xl border border-border bg-surface/60 backdrop-blur-2xl overflow-hidden"
          style={{ boxShadow: '0 0 0 1px rgba(124,106,247,0.06), 0 24px 64px rgba(0,0,0,0.45)' }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="p-8"
            >
              {/* ── Step 1: Who are you? ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold text-text-primary mb-1">Who are you?</h2>
                  <p className="text-sm text-text-muted mb-7">We'll personalize your learning experience.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map(role => {
                      const Icon = role.icon
                      const selected = form.role === role.id
                      return (
                        <button
                          key={role.id}
                          onClick={() => { setForm({ ...form, role: role.id }); goTo(2) }}
                          className={cn(
                            'group relative flex flex-col items-start p-4 rounded-xl border transition-all duration-300 text-left overflow-hidden',
                            selected
                              ? 'border-brand-primary/60 bg-brand-primary/10'
                              : 'border-border bg-bg-overlay/30 hover:border-border-strong hover:bg-surface-raised'
                          )}
                          style={selected ? { boxShadow: `0 0 20px ${role.glow}` } : {}}
                        >
                          {selected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className={cn('mb-3 transition-transform group-hover:scale-110', role.iconColor)}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-semibold text-text-primary mb-0.5">{role.label}</p>
                          <p className="text-xs text-text-muted leading-snug">{role.desc}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 2: Track ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-display font-semibold text-text-primary mb-1">Pick your first track</h2>
                  <p className="text-sm text-text-muted mb-7">Start with one. You can add more later.</p>
                  <div className="grid gap-3">
                    {TRACKS.map(track => {
                      const selected = form.track === track.id
                      return (
                        <button
                          key={track.id}
                          onClick={() => { setForm({ ...form, track: track.id }); goTo(3) }}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border transition-all duration-250 text-left group',
                            selected
                              ? `border-brand-primary/50 ${track.bg}`
                              : 'border-border bg-bg-overlay/30 hover:bg-surface-raised hover:border-border-strong'
                          )}
                        >
                          <span className={cn('shrink-0 text-[10px] font-bold font-mono px-2 py-1 rounded-md border', track.color, track.bg, track.border)}>
                            {track.tag}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-text-primary">{track.title}</p>
                            <p className="text-xs text-text-muted mt-0.5">{track.desc}</p>
                          </div>
                          <ChevronRight className={cn('w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5', selected ? 'text-brand-primary' : 'text-text-muted')} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 3: GitHub ── */}
              {step === 3 && (
                <div className="flex flex-col items-center text-center py-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-border-strong"
                    style={{ background: 'linear-gradient(135deg, #1c1c1e, #2c2c2e)', boxShadow: '0 0 32px rgba(124,106,247,0.2)' }}
                  >
                    <GithubIcon className="w-10 h-10 text-text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-text-primary mb-2">Connect GitHub</h2>
                  <p className="text-sm text-text-secondary mb-8 leading-relaxed max-w-xs">
                    Auto-sync your commits, PRs, and repos to trigger learning milestones automatically.
                  </p>
                  <button
                    onClick={() => goTo(4)}
                    className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-[#f5f5f5] hover:bg-white text-black font-semibold text-sm transition-all mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <GithubIcon className="w-5 h-5" />
                    Connect with GitHub
                  </button>
                  <button
                    onClick={() => goTo(4)}
                    className="text-xs text-text-muted hover:text-text-secondary underline underline-offset-4 transition-colors"
                  >
                    I'll do this later
                  </button>
                </div>
              )}

              {/* ── Step 4: Learning Style ── */}
              {step === 4 && (
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-2xl font-display font-semibold text-text-primary mb-1">Your learning style</h2>
                  <p className="text-sm text-text-muted mb-8">How would you like to progress through your track?</p>

                  <div className="grid grid-cols-2 gap-3 w-full mb-8">
                    {[
                      { id: 'solo', label: 'Go Solo', icon: Rocket, desc: 'Self-paced, your schedule', glow: 'rgba(124,106,247,0.3)' },
                      { id: 'cohort', label: 'Join Cohort', icon: Users, desc: 'Peer learning & accountability', glow: 'rgba(0,212,177,0.3)' },
                    ].map(opt => {
                      const Icon = opt.icon
                      const selected = form.mode === opt.id
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setForm({ ...form, mode: opt.id })}
                          className={cn(
                            'flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-250',
                            selected
                              ? 'border-brand-primary/60 bg-brand-primary/10'
                              : 'border-border bg-bg-overlay/30 hover:bg-surface-raised hover:border-border-strong'
                          )}
                          style={selected ? { boxShadow: `0 0 24px ${opt.glow}` } : {}}
                        >
                          <Icon className={cn('w-7 h-7', selected ? 'text-brand-primary' : 'text-text-muted')} />
                          <div>
                            <p className={cn('text-sm font-semibold', selected ? 'text-text-primary' : 'text-text-secondary')}>{opt.label}</p>
                            <p className="text-xs text-text-muted mt-0.5">{opt.desc}</p>
                          </div>
                          {selected && (
                            <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    disabled={loading}
                    onClick={handleComplete}
                    className="w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #7C6AF7, #00D4B1)', boxShadow: '0 0 28px rgba(124,106,247,0.5)' }}
                  >
                    {loading ? 'Setting up your account…' : 'Launch Dashboard'}
                    {!loading && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Nav ── */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => goTo(step - 1)}
            disabled={step === 1}
            className={cn(
              'flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors',
              step === 1 && 'invisible'
            )}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs text-text-muted font-mono">{step} / 4</span>
          {step === 3 && (
            <button
              onClick={() => goTo(4)}
              className="flex items-center gap-1.5 text-sm text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              Skip <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {step !== 3 && <div className="w-12" />}
        </div>
      </div>
    </div>
  )
}
