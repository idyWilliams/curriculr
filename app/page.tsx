'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { CurriculrIcons } from '@/components/icons'
import {
  GitHubLogoIcon as Github,
  TwitterLogoIcon as Twitter,
  LinkedInLogoIcon as Linkedin
} from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  const navLinks = ['Tracks', 'For Schools', 'For Teams', 'API', 'Pricing']

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-default)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center group">
          <Logo className="text-[var(--text-primary)] h-8 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)] transition-all duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Sign in
          </Link>
          <Link href="/onboarding" className="bg-[var(--brand-primary)] hover:bg-[#22885A] text-white rounded-xl px-5 py-2 text-sm font-semibold shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
            Start Learning Free
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[var(--bg-base)]">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E4E2DA_1px,transparent_1px),linear-gradient(to_bottom,#E4E2DA_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--brand-sage)]/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-[var(--brand-dim)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content (approx 60%) */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] text-sm font-medium mb-8 shadow-sm"
            >
              <CurriculrIcons.CurriculrSpark size={14} className="text-[var(--brand-primary)]" />
              <span>Open Source</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
              <span>Free Forever</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
              <span>Built in Africa</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl md:text-[72px] lg:text-[80px] font-bold text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6"
            >
              <span className="block">Knowledge as</span>
              <span className="block">
                a <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-sage)]">Service.</span>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-[520px] leading-[1.7] mb-8"
            >
              The open platform for structured learning — for students, schools,
              and teams. Build real skills, track progress, and integrate learning
              into anything with the Curriculr API.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/onboarding" className="bg-[var(--brand-primary)] hover:bg-[#22885A] text-white rounded-xl px-8 py-3.5 text-base font-semibold shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center justify-center group">
                Start Learning Free
                <CurriculrIcons.LevelUp size={18} className="ml-2 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link href="#api" className="border-[1.5px] border-[var(--border-strong)] bg-transparent text-[var(--text-primary)] rounded-xl px-8 py-3.5 text-base font-semibold hover:border-[var(--brand-primary)] hover:bg-[var(--brand-dim)] transition-all duration-200 flex items-center justify-center">
                <CurriculrIcons.API size={18} className="mr-2 opacity-70" />
                View API Docs
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['C', 'D', 'E', 'F', 'G'].map((char, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[var(--brand-primary)] border-2 border-[var(--bg-base)] flex items-center justify-center text-xs font-bold text-white shadow-sm"
                      style={{ zIndex: 10 - i, backgroundColor: `var(--brand-${['primary','sage','light','primary','sage'][i]})` }}
                    >
                      {char}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-[var(--text-muted)]">
                  <span className="text-[var(--accent-amber)] mr-1 tracking-widest text-base">★★★★★</span>
                  Loved by 12,400+ learners
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating UI Mockup (approx 40%) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <FloatingCard />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-lg)] rounded-2xl overflow-hidden relative z-10">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-2">
              <CurriculrIcons.TrackMap size={18} className="text-[var(--brand-primary)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Frontend Engineering</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[var(--brand-dim)] text-[var(--brand-primary)] text-xs font-bold">
              68% complete
            </div>
          </div>

          {/* Card Content (Mockup of React Flow) */}
          <div className="p-6 space-y-4 bg-[var(--bg-base)] h-72 relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Visualizer Nodes */}
            <div className="flex flex-col items-center gap-6 w-full relative z-10">
              
              {/* Node 1: Completed */}
              <div className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[var(--shadow-sm)] rounded-xl px-4 py-3 w-[85%] relative z-10 transition-transform hover:-translate-y-1 cursor-default">
                <div className="w-8 h-8 rounded-full bg-[#24C97E]/10 flex items-center justify-center shrink-0">
                  <CurriculrIcons.Completed size={16} className="text-[#24C97E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[var(--text-primary)] truncate">HTML & CSS Masterclass</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">+50 XP Earned</div>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="absolute w-0.5 h-10 bg-[#24C97E]/30 top-12 left-1/2 -translate-x-1/2 z-0" />

              {/* Node 2: Current */}
              <div className="flex items-center gap-3 bg-[var(--bg-surface)] border-2 border-[var(--brand-primary)] rounded-xl px-4 py-3 w-[95%] relative z-10 shadow-[0_4px_20px_rgba(27,107,69,0.15)] transition-transform hover:-translate-y-1 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center shrink-0 shadow-[var(--shadow-brand)]">
                  <CurriculrIcons.Video size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[var(--text-primary)] truncate">JavaScript Deep Dive</div>
                  <div className="text-[10px] font-semibold text-[var(--brand-primary)] mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" /> In Progress
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="absolute w-0.5 h-10 bg-[var(--border-strong)] top-[132px] left-1/2 -translate-x-1/2 z-0" />

              {/* Node 3: Locked */}
              <div className="flex items-center gap-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-3 w-[85%] relative z-10 opacity-70">
                <div className="w-8 h-8 rounded-full bg-[var(--border-default)] flex items-center justify-center shrink-0">
                  <CurriculrIcons.Locked size={14} className="text-[var(--text-ghost)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--text-muted)] truncate">React Architecture</div>
                  <div className="text-[10px] text-[var(--text-ghost)] font-medium mt-0.5">Locked</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative floating icons */}
      <motion.div animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-xl shadow-[var(--shadow-lg)] border border-[var(--border-default)] flex items-center justify-center">
        <CurriculrIcons.Code size={20} className="text-[var(--accent-violet)]" />
      </motion.div>
      <motion.div animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-8 -left-6 w-14 h-14 bg-white rounded-xl shadow-[var(--shadow-lg)] border border-[var(--border-default)] flex items-center justify-center">
        <CurriculrIcons.Certificate size={24} className="text-[var(--accent-amber)]" />
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: SOCIAL PROOF TICKER
// ─────────────────────────────────────────────────────────────────────────────

function SocialTicker() {
  const logos = [
    'Andela', 'Flutterwave', 'Paystack', 'Access Bank', 'MTN', 
    'Dangote Group', 'NITDA', 'University of Lagos', 'Covenant University', 'ALX Africa'
  ]
  const items = [...logos, ...logos]

  return (
    <section className="w-full bg-[var(--bg-elevated)] border-y border-[var(--border-default)] py-6 overflow-hidden flex items-center">
      <div className="shrink-0 flex items-center pr-8 pl-6 text-sm font-semibold text-[var(--text-muted)] whitespace-nowrap bg-[var(--bg-elevated)] z-10 relative shadow-[10px_0_10px_-10px_rgba(24,24,26,0.06)]">
        Trusted by learners at
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="flex w-[200%] animate-marquee items-center gap-12 px-4">
          {items.map((logo, i) => (
            <div key={i} className="text-[var(--text-muted)] font-display text-lg font-bold tracking-wide whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity cursor-default">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: WHAT IS CURRICULR
// ─────────────────────────────────────────────────────────────────────────────

function ProductsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const products = [
    {
      icon: CurriculrIcons.LearnInPublic,
      colorClass: 'text-[var(--brand-primary)]',
      bgClass: 'bg-[var(--brand-dim)]',
      borderHover: 'hover:border-[var(--brand-primary)]',
      title: 'Curriculr Learn',
      tag: 'For Students & Self-Learners',
      desc: 'Follow structured learning paths. Complete lessons, build projects, earn certificates, and grow your public learner profile.',
      linkText: 'Explore Tracks →',
      linkHref: '/tracks'
    },
    {
      icon: CurriculrIcons.API,
      colorClass: 'text-[var(--accent-violet)]',
      bgClass: 'bg-[#EDE9FE]',
      borderHover: 'hover:border-[var(--accent-violet)]',
      title: 'Curriculr API',
      tag: 'For Developers',
      desc: 'Integrate structured curriculum data into your own products. REST + GraphQL. Learner progress, certificates, enrollments — all via API.',
      linkText: 'View API Docs →',
      linkHref: '#api'
    },
    {
      icon: CurriculrIcons.School,
      colorClass: 'text-[var(--accent-blue)]',
      bgClass: 'bg-[#DBEAFE]',
      borderHover: 'hover:border-[var(--accent-blue)]',
      title: 'For Schools',
      tag: 'For Educational Institutions',
      desc: 'Deploy curriculum to students, manage cohorts, track class-wide progress, and generate school-branded certificates.',
      linkText: 'Learn More →',
      linkHref: '/onboarding'
    },
    {
      icon: CurriculrIcons.Team,
      colorClass: 'text-[var(--accent-orange)]',
      bgClass: 'bg-[#FFF3E0]',
      borderHover: 'hover:border-[var(--accent-orange)]',
      title: 'For Teams',
      tag: 'For Companies & HR Teams',
      desc: 'Onboard developers, run internal training programs, assign learning paths, and track your team’s growth — all in one place.',
      linkText: 'Learn More →',
      linkHref: '/onboarding'
    }
  ]

  return (
    <section className="py-24 bg-[var(--bg-surface)] w-full" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--brand-dim)] text-[var(--brand-primary)] text-xs font-bold tracking-widest uppercase mb-6">
            The Platform
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            One platform. Four powerful products.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-[1.7]">
            Whether you're learning solo, running a school, training a team, 
            or building a product — Curriculr has an entry point for you.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-default)] rounded-[var(--radius-xl)] p-8 md:p-10",
                "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 group relative overflow-hidden",
                p.borderHover
              )}
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", p.bgClass)}>
                <p.icon size={28} className={p.colorClass} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
                {p.title}
              </h3>
              <div className="text-sm font-semibold text-[var(--text-muted)] mb-4">{p.tag}</div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                {p.desc}
              </p>
              <Link href={p.linkHref} className={cn("font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all", p.colorClass)}>
                {p.linkText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: LEARNING TRACKS
// ─────────────────────────────────────────────────────────────────────────────

function Tracks() {
  const tracks = [
    { title: 'Frontend Engineering', meta: '24 lessons · 6 projects', badge: 'Most Popular', badgeColor: 'bg-[var(--brand-dim)] text-[var(--brand-primary)]', level: 'Beginner', topColor: '#2563EB' },
    { title: 'Backend Engineering', meta: '18 lessons · 5 projects', level: 'Intermediate', topColor: '#1B6B45' },
    { title: 'Data Analysis', meta: '20 lessons · 4 projects', level: 'Beginner', topColor: '#F97316' },
    { title: 'UI/UX Design', meta: '16 lessons · 5 projects', level: 'Beginner', topColor: '#7C6AF7' },
    { title: 'Generative AI', meta: '14 lessons · 3 projects', badge: 'New', badgeColor: 'bg-[#FFF3E0] text-[var(--accent-orange)]', level: 'Advanced', topColor: '#EC4899' },
    { title: 'Kids Coding', meta: '12 lessons · 4 projects', badge: 'Ages 8–14', badgeColor: 'bg-[#FEF3C7] text-[var(--accent-amber)]', level: 'Beginner', topColor: '#F59E0B' },
  ]

  return (
    <section className="py-32 bg-[var(--bg-base)] overflow-hidden" id="tracks">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--brand-dim)] text-[var(--brand-primary)] text-xs font-bold tracking-widest uppercase mb-6">
            Learning Tracks
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Pick your path. Build real skills.
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Every track is structured, project-based, and taught by industry practitioners.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 px-6 md:px-12 gap-6 hide-scrollbar max-w-[100vw]">
        <div className="w-[calc(50vw-40rem)] shrink-0 hidden xl:block" />
        
        {tracks.map((t, i) => (
          <Link key={i} href="/tracks" className="group bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-xl)] w-[320px] shrink-0 p-8 snap-center hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-[320px] relative overflow-hidden">
            {/* Top color bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 opacity-80" style={{ backgroundColor: t.topColor }} />
            
            <div className="flex items-start justify-between mb-6">
              <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-wider">
                {t.level}
              </div>
              {t.badge && (
                <div className={cn("px-3 py-1.5 rounded-full text-xs font-bold", t.badgeColor)}>
                  {t.badge}
                </div>
              )}
            </div>
            
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
              {t.title}
            </h3>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-8">{t.meta}</p>
            
            <div className="mt-auto pt-6 border-t border-[var(--border-default)]">
              <div className="w-full py-3 text-center border-[1.5px] border-[var(--border-default)] text-[var(--text-primary)] rounded-xl text-sm font-bold group-hover:border-[var(--brand-primary)] group-hover:bg-[var(--brand-dim)] group-hover:text-[var(--brand-primary)] transition-all">
                View Curriculum →
              </div>
            </div>
          </Link>
        ))}

        <div className="w-6 shrink-0" />
      </div>

      <div className="text-center mt-4">
        <Link href="/tracks" className="inline-flex items-center gap-2 font-bold text-[var(--brand-primary)] hover:underline text-lg">
          Explore all 18 tracks <CurriculrIcons.TrackMap size={20} />
        </Link>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: API SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────

function APIShowcase() {
  const jsonCode = `{
  "id": "fe-001",
  "title": "Frontend Engineering",
  "slug": "frontend-engineering",
  "lessons": 24,
  "projects": 6,
  "enrolled": 3842,
  "certificate": true,
  "modules": [
    { "title": "HTML & CSS Fundamentals", "lessons": 6 },
    { "title": "JavaScript Essentials", "lessons": 8 },
    { "title": "React & TypeScript", "lessons": 10 }
  ]
}`

  return (
    <section className="py-32 bg-[var(--bg-inverse)] text-[var(--text-inverse)] overflow-hidden relative" id="api">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-violet)]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EDE9FE]/10 text-[#EDE9FE] border border-[#EDE9FE]/20 text-xs font-bold tracking-widest uppercase mb-6">
              <CurriculrIcons.API size={14} className="mr-2" /> Curriculr API
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Learning infrastructure.<br/>For everyone.
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-10 leading-[1.8]">
              Embed structured curriculum into your school portal, company LMS, or 
              product. The Curriculr API gives you full access to tracks, lessons, 
              learner progress, and certificates — REST + GraphQL.
            </p>
            
            <ul className="space-y-4 mb-12">
              {[
                'REST + GraphQL endpoints',
                'Learner progress tracking',
                'Certificate issuance & verification',
                'Cohort enrollment at scale',
                'Webhook support for LMS integration',
                'Open source — self-hostable'
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-[var(--text-inverse)] font-medium">
                  <CurriculrIcons.Verified size={20} className="text-[var(--accent-violet)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="#pricing" className="inline-flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-xl px-8 py-4 text-base font-bold transition-all shadow-[var(--shadow-md)] hover:-translate-y-0.5">
              Get API Key Free →
            </Link>
          </div>

          {/* Right: Code Block */}
          <div className="bg-[#0A0A08] rounded-2xl border border-[#2A2A28] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2A2A28] bg-[#141410]">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-red)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-amber)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--brand-light)]" />
              </div>
              <div className="ml-4 text-sm font-mono text-[var(--text-muted)] flex items-center gap-2">
                <span className="text-[var(--brand-light)] font-bold">GET</span>
                /v1/tracks/frontend-engineering
              </div>
            </div>
            <div className="p-8 overflow-x-auto">
              <pre className="font-mono text-[15px] leading-[1.8]">
                <code dangerouslySetInnerHTML={{
                  __html: jsonCode
                    .replace(/"([^"]+)":/g, '<span style="color:var(--accent-violet)">"$1"</span>:')
                    .replace(/: "([^"]+)"/g, ': <span style="color:var(--brand-light)">"$1"</span>')
                    .replace(/: ([0-9]+)/g, ': <span style="color:var(--accent-orange)">$1</span>')
                    .replace(/: (true|false)/g, ': <span style="color:var(--accent-amber)">$1</span>')
                    .replace(/[{}[\]]/g, '<span style="color:var(--text-muted)">$&</span>')
                }} />
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    {
      quote: "Curriculr is the most structured learning experience I've had. The visual learning path actually makes me want to keep going.",
      author: "Chioma A.",
      role: "Frontend Developer, Lagos"
    },
    {
      quote: "We integrated the Curriculr API into our school portal in 2 days. The documentation is incredible and the support is real.",
      author: "Mr. Okafor",
      role: "Tech Lead, Covenant University"
    },
    {
      quote: "Our entire engineering team went through the Backend Engineering track. The progress dashboard made it easy to track who completed what.",
      author: "Funmi B.",
      role: "Engineering Manager, Paystack"
    }
  ]

  return (
    <section className="py-32 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[var(--accent-amber)] text-xs font-bold tracking-widest uppercase mb-6">
            Community
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Built for learners.<br/>Loved by learners.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[var(--bg-base)] border border-[var(--border-default)] rounded-[var(--radius-xl)] p-10 flex flex-col h-full shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
              <div className="flex gap-1.5 mb-8 text-[var(--accent-amber)]">
                {[...Array(5)].map((_, j) => <CurriculrIcons.Flame key={j} size={20} className="fill-[var(--accent-amber)]" />)}
              </div>
              <blockquote className="text-xl text-[var(--text-primary)] font-medium leading-[1.6] mb-10 flex-1">
                "{r.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[var(--text-primary)] text-lg">{r.author}</div>
                  <div className="text-sm font-medium text-[var(--text-muted)] mt-0.5">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: PRICING
// ─────────────────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section className="py-32 bg-[var(--bg-base)]" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--brand-dim)] text-[var(--brand-primary)] text-xs font-bold tracking-widest uppercase mb-6">
            Pricing
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Free to learn. Flexible to scale.
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Start for free — no credit card required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Card 1: Free */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-sm)] h-full flex flex-col">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Free</h3>
            <div className="text-4xl font-display font-bold text-[var(--text-primary)] mb-2">₦0 <span className="text-lg text-[var(--text-muted)] font-medium">/ month</span></div>
            <p className="text-[var(--text-secondary)] font-medium mb-10">For individual learners</p>
            
            <ul className="space-y-5 mb-10 flex-1">
              {['Access to all free tracks', 'Public learner profile', '3 project submissions/month', 'Community access'].map(feat => (
                <li key={feat} className="flex gap-3 text-[var(--text-secondary)] font-medium items-start"><CurriculrIcons.Completed size={20} className="text-[var(--brand-primary)] shrink-0" /> {feat}</li>
              ))}
              <li className="flex gap-3 text-[var(--text-ghost)] font-medium items-start"><span className="w-5 h-5 flex items-center justify-center shrink-0 text-xl">✗</span> Certificates</li>
              <li className="flex gap-3 text-[var(--text-ghost)] font-medium items-start"><span className="w-5 h-5 flex items-center justify-center shrink-0 text-xl">✗</span> API access</li>
            </ul>
            <Link href="/login" className="w-full py-4 text-center rounded-xl border-2 border-[var(--border-default)] text-[var(--text-primary)] font-bold hover:border-[var(--brand-primary)] hover:bg-[var(--brand-dim)] transition-all mt-auto">
              Get Started Free
            </Link>
          </div>

          {/* Card 2: Pro (Highlighted) */}
          <div className="bg-[var(--bg-surface)] border-[3px] border-[var(--brand-primary)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-brand)] lg:scale-105 z-10 h-full flex flex-col relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-[var(--brand-primary)] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Pro</h3>
            <div className="text-4xl font-display font-bold text-[var(--text-primary)] mb-2">₦4,999 <span className="text-lg text-[var(--text-muted)] font-medium">/ month</span></div>
            <p className="text-[var(--text-secondary)] font-medium mb-10">For serious learners</p>
            
            <ul className="space-y-5 mb-10 flex-1">
              {['All tracks + premium content', 'Unlimited project submissions', 'Certificates on completion', 'Portfolio builder', 'Priority support', 'API access (100 req/day)'].map(feat => (
                <li key={feat} className="flex gap-3 text-[var(--text-secondary)] font-medium items-start"><CurriculrIcons.Completed size={20} className="text-[var(--brand-primary)] shrink-0" /> {feat}</li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-[var(--brand-primary)] text-white font-bold hover:bg-[#22885A] transition-colors mt-auto shadow-[var(--shadow-brand)] hover:-translate-y-0.5 active:translate-y-0">
              Start Pro Free for 7 Days
            </button>
          </div>

          {/* Card 3: Teams */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow-sm)] h-full flex flex-col">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Teams / Schools</h3>
            <div className="text-4xl font-display font-bold text-[var(--text-primary)] mb-2">Custom</div>
            <p className="text-[var(--text-secondary)] font-medium mb-10">For organisations</p>
            
            <ul className="space-y-5 mb-10 flex-1">
              {['Everything in Pro', 'Cohort management', 'Progress reporting', 'Branded certificates', 'Dedicated API access', 'SLA + account manager'].map(feat => (
                <li key={feat} className="flex gap-3 text-[var(--text-secondary)] font-medium items-start"><CurriculrIcons.Completed size={20} className="text-[var(--brand-primary)] shrink-0" /> {feat}</li>
              ))}
            </ul>
            <Link href="/onboarding" className="w-full py-4 text-center rounded-xl border-2 border-[var(--border-default)] text-[var(--text-primary)] font-bold hover:border-[var(--brand-primary)] hover:bg-[var(--brand-dim)] transition-all mt-auto">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: CTA BANNER
// ─────────────────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="py-32 text-center bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-sage)] p-12 md:p-24 shadow-[var(--shadow-brand)] flex flex-col items-center relative overflow-hidden">
          {/* Decorative background logo */}
          <CurriculrIcons.CurriculrSpark size={400} className="absolute right-[-10%] top-[-20%] text-white/5 pointer-events-none rotate-12" />
          
          <h2 className="font-display text-4xl md:text-[56px] font-bold text-white mb-8 leading-[1.1] relative z-10">
            Ready to start learning?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mb-12 font-medium relative z-10">
            Join 12,400+ learners across Africa building real skills on Curriculr. 
            Free to start. Open forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-10 relative z-10">
            <Link href="/login" className="bg-white text-[var(--brand-primary)] font-bold rounded-xl px-10 py-5 hover:scale-105 transition-transform flex items-center justify-center shadow-lg">
              Start Learning Free <CurriculrIcons.LevelUp size={20} className="ml-2" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-transparent border-2 border-white text-white font-bold rounded-xl px-10 py-5 hover:bg-white/10 transition-colors flex items-center justify-center">
              <Github className="w-5 h-5 mr-2" /> Star us on GitHub
            </a>
          </div>
          
          <p className="text-sm text-white/70 font-semibold tracking-wide relative z-10">
            Open source · MIT License · Made in Africa 🌍
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10: FOOTER
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[var(--bg-inverse)] text-[var(--text-inverse)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Col 1 */}
          <div>
            <Link href="/" className="flex items-center mb-8 opacity-90 hover:opacity-100 transition-opacity">
              <Logo className="text-[var(--text-inverse)] h-8 w-auto" />
            </Link>
            <p className="text-[var(--text-muted)] mb-8 font-medium">Knowledge as a Service.</p>
            <div className="flex items-center gap-5 text-[var(--text-muted)]">
              <a href="https://github.com" className="hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://twitter.com" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="https://linkedin.com" className="hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Platform</h4>
            <ul className="space-y-4 text-[var(--text-muted)] font-medium">
              {['Learn', 'Tracks', 'API Docs', 'Pricing', 'Changelog'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-[var(--text-muted)] font-medium">
              {['About', 'Blog', 'Careers', 'Contact', 'Open Source'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">For Organizations</h4>
            <ul className="space-y-4 text-[var(--text-muted)] font-medium">
              {[
                { name: 'For Schools', icon: CurriculrIcons.School },
                { name: 'For Teams', icon: CurriculrIcons.Team },
                { name: 'Case Studies', icon: CurriculrIcons.Report },
                { name: 'Enterprise', icon: CurriculrIcons.Branding }
              ].map(item => (
                <li key={item.name}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                    <item.icon size={16} className="opacity-70" /> {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2A2A28] text-sm font-medium text-[var(--text-muted)] text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} Isentry Technologies.</span>
          <span className="mt-2 md:mt-0">Built with ♥ in Abuja, Nigeria 🇳🇬</span>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] font-body text-[var(--text-primary)] selection:bg-[var(--brand-dim)] selection:text-[var(--brand-primary)]">
      <Navbar />
      <main>
        <Hero />
        <SocialTicker />
        <ProductsGrid />
        <Tracks />
        <APIShowcase />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
