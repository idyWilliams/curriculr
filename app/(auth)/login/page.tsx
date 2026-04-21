'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mail } from 'lucide-react'

// Brand Icons as SVG components to bypass lucide-react limitations
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
  const supabase = createClient()

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
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl font-bold tracking-tight mb-2 text-text-primary"
          >
            Curriculr
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary text-sm font-medium uppercase tracking-[0.2em]"
          >
            Knowledge as a Service.
          </motion.p>
        </div>

        <Card className="border-border/40 bg-bg-overlay/40 backdrop-blur-xl shadow-glow-primary/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Login to access your personalized learning tracks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="default"
                className="w-full h-11 bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center gap-2"
                onClick={() => handleOAuthLogin('github')}
              >
                <GithubIcon className="w-5 h-5 mr-1" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 border-border strong bg-transparent hover:bg-surface-raised text-text-primary flex items-center gap-2"
                onClick={() => handleOAuthLogin('google')}
              >
                <GoogleIcon className="w-5 h-5 mr-1" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-bg-overlay px-2 text-text-muted">Or continue with email</span>
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
                  className="bg-bg-base/50 border-border/50 text-text-primary h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-surface-raised hover:bg-surface-overlay text-text-primary"
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
