'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Icon } from '@/components/icons/Icon'
import { Logo } from '@/components/ui/logo'

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
    <div className="min-h-screen flex w-full">
      
      {/* ─── SHARED LEFT PANEL ─── */}
      <AuthLeftPanel pageLabel="Authentication" />

      {/* ─── RIGHT PANEL (AUTH FORM) ─── */}
      <div className="w-full lg:w-1/2 bg-[var(--bg-base)] flex items-center justify-center p-6">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[var(--bg-surface)] shadow-[var(--shadow-lg)] rounded-2xl p-10 border border-[var(--border-default)]"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Logo className="text-[var(--text-primary)] h-12 w-[160px]" />
            </div>
            <h2 className="font-display text-[32px] font-bold text-[var(--text-primary)] leading-tight mb-2">
              Welcome back
            </h2>
            <p className="text-[var(--text-secondary)]">
              Continue your learning journey.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full bg-[#24292F] hover:bg-[#3d444d] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 cursor-pointer"
            >
              <GitHubLogoIcon className="w-5 h-5" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-default)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 cursor-pointer"
            >
              <GoogleIcon className="w-5 h-5 text-blue-500" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center py-2 mb-8">
            <div className="flex-grow border-t border-[var(--border-default)]"></div>
            <span className="shrink-0 px-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              Or
            </span>
            <div className="flex-grow border-t border-[var(--border-default)]"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-default)] rounded-xl px-4 py-3 text-[15px] font-body text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-brand)] focus:shadow-[0_0_0_3px_rgba(27,107,69,0.12)] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--brand-primary)] hover:bg-[#22885A] text-white font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {loading ? 'Sending link...' : 'Send Magic Link'}
              {!loading && <Icon name="Dashboard" size={20} />}
            </button>
          </form>

          {/* Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 p-4 rounded-xl text-sm font-medium text-center ${
                message.type === 'success'
                  ? 'bg-[var(--brand-dim)] text-[var(--brand-primary)] border border-[var(--brand-primary)]/20'
                  : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/20'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Terms */}
          <p className="text-center text-xs text-[var(--text-muted)] mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
