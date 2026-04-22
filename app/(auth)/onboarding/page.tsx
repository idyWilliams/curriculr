'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { GraduationCap, Building2, Terminal, Rocket, Users, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const SparkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap, desc: 'Learning at my own pace', color: '#1B6B45' },
  { id: 'school', label: 'School', icon: Building2, desc: 'Managing educational tracks', color: '#2563EB' },
  { id: 'company', label: 'Company', icon: Users, desc: 'Upskilling our team', color: '#F97316' },
  { id: 'developer', label: 'Developer', icon: Terminal, desc: 'Building the future', color: '#7C6AF7' },
]

const TRACKS = [
  { id: 'fullstack', title: 'Fullstack Mastery', tag: 'DEV', desc: 'React, Node, databases, and deployment', color: '#1B6B45' },
  { id: 'ai', title: 'Generative AI', tag: 'DATA', desc: 'LLMs, agents, RAG, and fine-tuning', color: '#EC4899' },
  { id: 'systems', title: 'Systems Design', tag: 'ENG', desc: 'Scalability, reliability, distributed systems', color: '#F97316' },
  { id: 'product', title: 'Product Strategy', tag: 'BIZ', desc: 'Roadmaps, metrics, and go-to-market', color: '#7C6AF7' },
  { id: 'frontend', title: 'Frontend Engineering', tag: 'DEV', desc: 'CSS, React, Next.js, and performance', color: '#2563EB' },
  { id: 'uiux', title: 'UI/UX Design', tag: 'DESIGN', desc: 'Figma, prototyping, and design systems', color: '#F59E0B' },
]

const STEP_LABELS = ['Identity', 'Track', 'GitHub', 'Style']
const STEP_SUBTITLES = [
  'Tell us who you are',
  'Choose your first track',
  'Connect your tools',
  'Set your pace',
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const } }),
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

  return (
    <div className="min-h-screen flex w-full">
      
      {/* ─── LEFT PANEL ─── */}
      <div 
        className="hidden lg:flex w-[420px] relative overflow-hidden flex-col p-10"
        style={{ background: 'linear-gradient(160deg, #1B6B45 0%, #0F4C2E 40%, #141410 100%)' }}
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-[0.08]"
             style={{
               backgroundImage: 'url(/login-bg.png)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
             }} />
        <div className="absolute inset-0 opacity-[0.03]"
              style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '24px 24px'}} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <SparkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-semibold text-xl text-white tracking-tight">Curriculr</span>
          </div>

          {/* Step Progress Sidebar */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-0">
              {STEP_LABELS.map((label, i) => {
                const n = i + 1
                const done = step > n
                const active = step === n
                return (
                  <div key={label} className="flex items-start gap-4 relative">
                    {/* Vertical connector line */}
                    {i < 3 && (
                      <div className="absolute left-[15px] top-[36px] w-[2px] h-[48px]"
                        style={{ background: done ? '#24C97E' : 'rgba(255,255,255,0.1)' }} />
                    )}
                    {/* Circle */}
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all border-2',
                      done ? 'bg-[#24C97E] border-[#24C97E] text-white' :
                      active ? 'bg-transparent border-white text-white' :
                      'bg-transparent border-white/20 text-white/30'
                    )}>
                      {done ? <Check className="w-4 h-4" /> : n}
                    </div>
                    {/* Label */}
                    <div className="pb-12">
                      <div className={cn(
                        'text-sm font-semibold transition-colors',
                        active ? 'text-white' : done ? 'text-white/70' : 'text-white/30'
                      )}>{label}</div>
                      <div className={cn(
                        'text-xs mt-0.5 transition-colors',
                        active ? 'text-white/60' : 'text-white/20'
                      )}>{STEP_SUBTITLES[i]}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="text-white/40 text-xs">
            <p>Built in Africa, for the world 🌍</p>
            <p className="text-white/25 mt-1">Knowledge as a Service.</p>
          </div>
        </div>
      </div>


      {/* ─── RIGHT PANEL (CONTENT) ─── */}
      <div className="flex-1 bg-[var(--bg-base)] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">

          {/* Mobile step indicator */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center">
                <SparkIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)]">Curriculr</span>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">Step {step} of 4</span>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-10">
            <motion.div
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-[var(--brand-primary)]"
            />
          </div>

          {/* Card container */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden"
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

                {/* ── STEP 1: WHO ARE YOU? ── */}
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">Who are you?</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-8">We&apos;ll personalize your learning experience.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ROLES.map(role => {
                        const Icon = role.icon
                        const selected = form.role === role.id
                        return (
                          <button
                            key={role.id}
                            onClick={() => { setForm({ ...form, role: role.id }); goTo(2) }}
                            className={cn(
                              'group relative flex flex-col items-start p-5 rounded-xl border-[1.5px] transition-all duration-200 text-left cursor-pointer',
                              selected
                                ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)]'
                                : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
                            )}
                            style={selected ? { boxShadow: `0 0 16px ${role.color}30` } : {}}
                          >
                            {selected && (
                              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="mb-3 transition-transform group-hover:scale-110" style={{ color: role.color }}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{role.label}</p>
                            <p className="text-xs text-[var(--text-muted)] leading-snug">{role.desc}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ── STEP 2: PICK YOUR TRACK ── */}
                {step === 2 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">Pick your first track</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-8">Start with one. You can always add more later.</p>
                    <div className="grid gap-3">
                      {TRACKS.map(track => {
                        const selected = form.track === track.id
                        return (
                          <button
                            key={track.id}
                            onClick={() => { setForm({ ...form, track: track.id }); goTo(3) }}
                            className={cn(
                              'flex items-center gap-4 p-4 rounded-xl border-[1.5px] transition-all duration-200 text-left group cursor-pointer',
                              selected
                                ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)]'
                                : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
                            )}
                          >
                            {/* Color dot */}
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: track.color }} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[var(--text-primary)]">{track.title}</p>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                                  {track.tag}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] mt-0.5">{track.desc}</p>
                            </div>
                            <ChevronRight className={cn('w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5', 
                              selected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-muted)]')} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ── STEP 3: GITHUB ── */}
                {step === 3 && (
                  <div className="flex flex-col items-center text-center py-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]">
                      <GithubIcon className="w-10 h-10 text-[var(--text-primary)]" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Connect GitHub</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xs">
                      Auto-sync your commits, PRs, and repos to trigger learning milestones automatically.
                    </p>
                    <button
                      onClick={() => goTo(4)}
                      className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-[#24292f] hover:bg-[#3d444d] text-white font-semibold text-sm transition-all mb-4 cursor-pointer"
                    >
                      <GithubIcon className="w-5 h-5" />
                      Connect with GitHub
                    </button>
                    <button
                      onClick={() => goTo(4)}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      I&apos;ll do this later
                    </button>
                  </div>
                )}

                {/* ── STEP 4: LEARNING STYLE ── */}
                {step === 4 && (
                  <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">Your learning style</h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-8">How would you like to progress through your track?</p>

                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                      {[
                        { id: 'solo', label: 'Go Solo', icon: Rocket, desc: 'Self-paced, your schedule', color: '#1B6B45' },
                        { id: 'cohort', label: 'Join Cohort', icon: Users, desc: 'Peer learning & accountability', color: '#2563EB' },
                      ].map(opt => {
                        const Icon = opt.icon
                        const selected = form.mode === opt.id
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setForm({ ...form, mode: opt.id })}
                            className={cn(
                              'flex flex-col items-center gap-3 p-6 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer',
                              selected
                                ? 'border-[var(--brand-primary)] bg-[var(--brand-dim)]'
                                : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]'
                            )}
                            style={selected ? { boxShadow: `0 0 20px ${opt.color}25` } : {}}
                          >
                            <Icon className={cn('w-7 h-7', selected ? 'text-[var(--brand-primary)]' : 'text-[var(--text-muted)]')} />
                            <div>
                              <p className={cn('text-sm font-semibold', selected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>{opt.label}</p>
                              <p className="text-xs text-[var(--text-muted)] mt-0.5">{opt.desc}</p>
                            </div>
                            {selected && (
                              <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
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
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 bg-[var(--brand-primary)] hover:bg-[#22885A] shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                    >
                      {loading ? 'Setting up your account…' : 'Launch Dashboard'}
                      {!loading && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => goTo(step - 1)}
              disabled={step === 1}
              className={cn(
                'flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer',
                step === 1 && 'invisible'
              )}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs text-[var(--text-muted)] font-mono">{step} / 4</span>
            {step === 3 ? (
              <button
                onClick={() => goTo(4)}
                className="flex items-center gap-1.5 text-sm text-[var(--brand-primary)] hover:underline transition-colors cursor-pointer"
              >
                Skip <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-12" />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
