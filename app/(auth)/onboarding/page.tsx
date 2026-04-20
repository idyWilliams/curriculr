'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { GraduationCap, Building2, Terminal, Rocket, Users, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

// Brand Icons as SVG components to bypass lucide-react limitations
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const ROLES = [
  { id: 'student', title: 'Student', icon: <GraduationCap className="w-8 h-8" />, desc: 'I want to learn and grow.' },
  { id: 'school', title: 'School', icon: <Building2 className="w-8 h-8" />, desc: 'Managing educational tracks.' },
  { id: 'company', title: 'Company', icon: <Users className="w-8 h-8" />, desc: 'Upskilling our employees.' },
  { id: 'developer', title: 'Developer', icon: <Terminal className="w-8 h-8" />, desc: 'Building the future of learning.' }
]

const TRACKS = [
  { id: 'fullstack', title: 'Fullstack Mastery', category: 'Dev' },
  { id: 'ai', title: 'Generative AI', category: 'Data' },
  { id: 'systems', title: 'Systems Design', category: 'Eng' },
  { id: 'product', title: 'Product Strategy', category: 'Business' }
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    role: '',
    track: '',
    githubConnected: false,
    mode: 'solo'
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const nextStep = () => setStep(s => Math.min(s + 1, 4))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleComplete = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { error } = await supabase.from('profiles').upsert({
        user_id: user.id,
        role: formData.role,
        interested_tracks: [formData.track],
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })

      if (!error) {
        router.push('/dashboard')
      }
    }
    setLoading(false)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid gap-4">
            <h2 className="text-2xl font-display font-bold text-center mb-6">Who are you?</h2>
            <div className="grid grid-cols-2 gap-4">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setFormData({ ...formData, role: role.id })
                    nextStep()
                  }}
                  className={cn(
                    "flex flex-col items-center p-6 rounded-xl border transition-all duration-300 group",
                    formData.role === role.id 
                      ? "border-brand-primary bg-brand-primary/10" 
                      : "border-border bg-bg-overlay/40 hover:border-brand-primary/50"
                  )}
                >
                  <div className={cn(
                    "mb-4 transition-transform group-hover:scale-110",
                    formData.role === role.id ? "text-brand-primary" : "text-text-muted"
                  )}>
                    {role.icon}
                  </div>
                  <span className="font-bold mb-1">{role.title}</span>
                  <p className="text-xs text-text-muted text-center">{role.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="grid gap-4">
            <h2 className="text-2xl font-display font-bold text-center mb-6">Pick your first track</h2>
            <div className="grid gap-3">
              {TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setFormData({ ...formData, track: track.id })
                    nextStep()
                  }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all",
                    formData.track === track.id 
                      ? "border-brand-primary bg-brand-primary/10" 
                      : "border-border bg-bg-overlay/40 hover:bg-surface-raised"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px] font-mono border-brand-accent/50 text-brand-accent">
                      {track.category}
                    </Badge>
                    <span className="font-medium">{track.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
              <GithubIcon className="w-8 h-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">Connect GitHub</h2>
            <p className="text-text-secondary text-sm mb-8 leading-relaxed">
              Curriculr syncs with your GitHub profile to track your progress and automate learning milestones.
            </p>
            <Button
              className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold mb-4"
              onClick={() => {
                setFormData({ ...formData, githubConnected: true })
                nextStep()
              }}
            >
              <GithubIcon className="w-5 h-5 mr-3" />
              Connect with GitHub
            </Button>
            <button onClick={nextStep} className="text-xs text-text-muted hover:text-text-secondary underline">
              I'll do this later
            </button>
          </div>
        )
      case 4:
        return (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-display font-bold mb-6">Learning Style</h2>
            <div className="flex w-full p-1 bg-surface-raised rounded-xl mb-8">
              <button
                onClick={() => setFormData({ ...formData, mode: 'solo' })}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all",
                  formData.mode === 'solo' ? "bg-bg-overlay shadow-sm text-text-primary" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <Rocket className="w-4 h-4" />
                <span className="font-medium text-sm">Go Solo</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, mode: 'cohort' })}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all",
                  formData.mode === 'cohort' ? "bg-bg-overlay shadow-sm text-text-primary" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium text-sm">Join Cohort</span>
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-10 leading-relaxed italic">
              {formData.mode === 'solo' 
                ? "Self-paced progress. Your own schedule, your own goals." 
                : "Learn with a community. Peer reviews and group milestones."}
            </p>
            <Button
              disabled={loading}
              onClick={handleComplete}
              className="w-full h-12 bg-brand-primary text-white hover:bg-brand-primary-hover font-bold"
            >
              {loading ? 'Finalizing...' : 'Launch Dashboard'}
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 text-[10px] font-mono uppercase tracking-widest text-text-muted">
            <span>Step {step} of 4</span>
            <span className="text-brand-primary">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-border/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-brand-primary shadow-glow-primary"
            />
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Card className="border-border/40 bg-bg-overlay/40 backdrop-blur-xl shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  {renderStep()}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1 || loading}
            className={cn("text-text-muted hover:text-text-primary", step === 1 && "invisible")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {step < 4 && formData.role && step !== 1 && step !== 2 && (
            <Button
              variant="ghost"
              onClick={nextStep}
              className="text-brand-primary"
            >
              Skip <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
