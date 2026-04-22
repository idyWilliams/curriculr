'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail, Sun, Moon } from 'lucide-react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.688-7.392 2.688-6.36 0-11.232-5.16-11.232-11.52s4.872-11.52 11.232-11.52c3.456 0 6.024 1.344 7.92 3.12l2.304-2.304c-2.616-2.52-6.024-4.44-10.224-4.44-7.944 0-14.4 6.456-14.4 14.4s6.456 14.4 14.4 14.4c4.344 0 7.632-1.416 10.128-4.032 2.616-2.616 3.456-6.288 3.456-9.12 0-.864-.072-1.68-.192-2.4h-13.416z" />
  </svg>
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isDark, setIsDark] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setMessage({ type: 'error', text: error.message })
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Check your email for the login link!' })
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base text-text-primary px-4">
      {/* Warm gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-light/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -25, 0],
            y: [0, 35, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-accent/8 blur-[100px]"
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-3 rounded-full bg-bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-brand-primary transition-all duration-200 shadow-card z-20"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-5xl font-bold tracking-tight mb-2 text-text-primary"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            Curriculr
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary text-sm font-medium uppercase tracking-[0.2em]"
          >
            Knowledge as a Service.
          </motion.p>
        </div>

        <Card className="border-border bg-bg-surface shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-text-primary">Welcome back</CardTitle>
            <CardDescription className="text-center text-text-secondary">
              Login to access your personalized learning tracks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="default"
                className="w-full h-11 bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center gap-2 transition-all shadow-sm hover:shadow"
                onClick={() => handleOAuthLogin('github')}
              >
                <GithubIcon className="w-5 h-5" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 border-border bg-bg-surface hover:bg-bg-elevated text-text-primary flex items-center gap-2 transition-all"
                onClick={() => handleOAuthLogin('google')}
              >
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-bg-surface px-2 text-text-muted">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleMagicLink} className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-bg-surface border-border text-text-primary h-11 placeholder:text-text-muted"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-brand-primary hover:bg-brand-primary-hover text-white transition-all shadow-sm hover:shadow"
                disabled={loading}
              >
                {loading ? 'Sending link...' : 'Send Magic Link'}
                <Mail className="ml-2 w-4 h-4" />
              </Button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-3 rounded-md text-sm text-center ${message.type === 'success'
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-error/10 text-error border border-error/20'
                  }`}
              >
                {message.text}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
