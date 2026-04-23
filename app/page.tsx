'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  GraduationCap,
  Code2,
  Building2,
  Users,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Zap,
  Code,
  Award,
  CheckCircle2,
  Star
} from 'lucide-react'
import {
  GitHubLogoIcon as Github,
  TwitterLogoIcon as Twitter,
  LinkedInLogoIcon as Linkedin
} from '@radix-ui/react-icons'
import { Logo } from '@/components/ui/logo'

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const SparkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

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
          ? 'bg-bg-base/80 backdrop-blur-xl border-b border-border-default'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center group">
          <Logo className="text-text-primary h-8 w-auto group-hover:scale-105 transition-transform" />
        </a>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-elevated transition-all duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Sign in
          </button>
          <button className="bg-brand-primary hover:bg-brand-light text-bg-surface rounded-xl px-5 py-2 text-sm font-medium shadow-brand hover:shadow-lg transition-all duration-200">
            Start Learning — Free
          </button>
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-bg-base">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 800px at 50% -20%, var(--brand-light), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content (approx 60%) */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-default bg-bg-surface text-text-secondary text-sm font-medium mb-8"
            >
              <span>✦</span>
              <span>Open Source</span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span>Free Forever</span>
              <span className="w-1 h-1 rounded-full bg-border-strong" />
              <span>Built in Africa</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl md:text-[72px] font-bold text-text-primary leading-[1.05] tracking-tight mb-6"
            >
              <span className="block">Knowledge as</span>
              <span className="block">
                a <span className="text-brand-primary">Service.</span>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-text-secondary max-w-[520px] leading-relaxed mb-8"
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
              <button className="bg-brand-primary hover:bg-brand-light text-bg-surface rounded-xl px-6 py-3 text-base font-medium shadow-brand hover:scale-[1.02] transition-all duration-200 flex items-center justify-center">
                Start Learning Free
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
              <button className="border border-text-primary bg-transparent text-text-primary rounded-xl px-6 py-3 text-base font-medium hover:bg-bg-elevated transition-all duration-200 flex items-center justify-center">
                View API Docs
              </button>
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
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-brand-primary border-2 border-bg-base flex items-center justify-center text-xs font-medium text-bg-surface shadow-sm"
                      style={{ zIndex: 10 - i }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-muted">
                  <span className="text-text-primary mr-1">★★★★★</span>
                  Loved by 12,400+ learners across Africa
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating UI Mockup (approx 40%) */}
          <div className="lg:col-span-5 relative">
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
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="bg-bg-surface border border-border-default shadow-lg rounded-2xl overflow-hidden relative z-10">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-default bg-bg-surface">
            <div className="text-sm font-semibold text-text-primary">Frontend Engineering Track</div>
            <div className="px-2.5 py-1 rounded-full bg-brand-dim text-brand-primary text-xs font-medium">
              68% complete
            </div>
          </div>

          {/* Card Content (Mockup of React Flow) */}
          <div className="p-6 space-y-4 bg-bg-base h-64 relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Visualizer Nodes */}
            <div className="flex flex-col items-center gap-6 w-full">
              
              {/* Node 1: Completed */}
              <div className="flex items-center gap-3 bg-bg-surface border border-brand-light shadow-sm rounded-lg px-4 py-3 w-4/5 relative z-10">
                <div className="w-6 h-6 rounded-full bg-brand-light flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-bg-surface" />
                </div>
                <div className="text-sm font-medium text-text-primary">HTML & CSS</div>
              </div>

              {/* Connecting Line */}
              <div className="absolute w-0.5 h-10 bg-brand-light top-12 left-1/2 -translate-x-1/2 z-0" />

              {/* Node 2: Current */}
              <div className="flex items-center gap-3 bg-bg-surface border-2 border-accent-violet shadow-md rounded-lg px-4 py-3 w-4/5 relative z-10 shadow-[0_0_15px_rgba(124,106,247,0.3)]">
                <div className="w-6 h-6 rounded-full bg-accent-violet/20 flex items-center justify-center animate-pulse">
                  <Zap className="w-4 h-4 text-accent-violet" />
                </div>
                <div className="text-sm font-medium text-text-primary">JavaScript Deep Dive</div>
              </div>

              {/* Connecting Line */}
              <div className="absolute w-0.5 h-10 bg-border-strong top-[120px] left-1/2 -translate-x-1/2 z-0" />

              {/* Node 3: Locked */}
              <div className="flex items-center gap-3 bg-bg-elevated border border-border-default rounded-lg px-4 py-3 w-4/5 opacity-60 relative z-10">
                <div className="w-6 h-6 rounded-full bg-border-strong flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-text-ghost" />
                </div>
                <div className="text-sm font-medium text-text-muted">React & State</div>
              </div>

            </div>
          </div>
        </div>
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

  // Double the array to ensure smooth infinite scrolling
  const items = [...logos, ...logos]

  return (
    <section className="w-full bg-bg-elevated border-y border-border-default py-6 overflow-hidden flex items-center">
      <div className="shrink-0 flex items-center pr-8 pl-6 text-sm font-medium text-text-muted whitespace-nowrap bg-bg-elevated z-10 relative shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)]">
        Trusted by learners at <ChevronRight className="w-4 h-4 ml-1 inline" />
      </div>
      <div className="flex-1 overflow-hidden relative w-full">
        <div className="flex w-[200%] animate-marquee items-center gap-12 px-4">
          {items.map((logo, i) => (
            <div key={i} className="text-text-muted font-display text-lg font-semibold tracking-wide whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
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
      icon: GraduationCap,
      color: 'text-brand-primary',
      title: 'Curriculr Learn',
      tag: 'For Students & Self-Learners',
      desc: 'Follow structured learning paths. Complete lessons, build projects, earn certificates, and grow your public learner profile.',
      linkText: 'Explore Tracks →'
    },
    {
      icon: Code2,
      color: 'text-accent-orange',
      title: 'Curriculr API',
      tag: 'For Developers',
      desc: 'Integrate structured curriculum data into your own products. REST + GraphQL. Learner progress, certificates, enrollments — all via API.',
      linkText: 'View API Docs →'
    },
    {
      icon: Building2,
      color: 'text-accent-blue',
      title: 'For Schools',
      tag: 'For Educational Institutions',
      desc: 'Deploy curriculum to students, manage cohorts, track class-wide progress, and generate school-branded certificates.',
      linkText: 'Learn More →'
    },
    {
      icon: Users,
      color: 'text-accent-violet',
      title: 'For Teams',
      tag: 'For Companies & HR Teams',
      desc: 'Onboard developers, run internal training programs, assign learning paths, and track your team’s growth — all in one place.',
      linkText: 'Learn More →'
    }
  ]

  return (
    <section className="py-24 bg-bg-surface w-full" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm tracking-widest uppercase font-semibold text-brand-primary mb-4">
            The Platform
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
            One platform. Four powerful products.
          </h2>
          <p className="text-lg text-text-secondary">
            Whether you're learning solo, running a school, training a team, 
            or building a product — Curriculr has an entry point for you.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-surface border border-border-default rounded-2xl p-8 hover:shadow-lg hover:border-brand-light transition-all duration-300 group"
            >
              <p.icon className={`w-8 h-8 mb-6 ${p.color}`} />
              <h3 className="font-display text-2xl font-bold text-text-primary mb-1">
                {p.title}
              </h3>
              <div className="text-sm font-medium text-text-muted mb-4">{p.tag}</div>
              <p className="text-text-secondary leading-relaxed mb-8">
                {p.desc}
              </p>
              <a href="#" className={`font-medium ${p.color} group-hover:underline`}>
                {p.linkText}
              </a>
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
    { title: 'Frontend Engineering', meta: '24 lessons · 6 projects', badge: 'Most Popular', badgeColor: 'bg-brand-dim text-brand-primary', level: 'Beginner' },
    { title: 'Backend Engineering', meta: '18 lessons · 5 projects', level: 'Intermediate' },
    { title: 'Data Analysis', meta: '20 lessons · 4 projects', level: 'Beginner' },
    { title: 'UI/UX Design', meta: '16 lessons · 5 projects', level: 'Beginner' },
    { title: 'Generative AI', meta: '14 lessons · 3 projects', badge: 'New', badgeColor: 'bg-accent-orange/10 text-accent-orange', level: 'Advanced' },
    { title: 'Kids Coding', meta: '12 lessons · 4 projects', badge: 'Ages 8–14', badgeColor: 'bg-accent-amber/10 text-accent-amber', level: 'Beginner' },
  ]

  return (
    <section className="py-24 bg-bg-base overflow-hidden" id="tracks">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm tracking-widest uppercase font-semibold text-brand-primary mb-4">
            Learning Tracks
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Pick your path. Build real skills.
          </h2>
          <p className="text-lg text-text-secondary">
            Every track is structured, project-based, and taught by practitioners.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 px-6 md:px-12 gap-6 hide-scrollbar max-w-[100vw]">
        {/* Empty space for alignment */}
        <div className="w-[calc(50vw-40rem)] shrink-0 hidden xl:block" />
        
        {tracks.map((t, i) => (
          <div key={i} className="bg-bg-surface border border-border-default rounded-2xl w-[280px] shrink-0 p-6 snap-center hover:border-brand-primary transition-colors flex flex-col h-full shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="px-2.5 py-1 rounded bg-bg-elevated text-text-secondary text-xs font-semibold uppercase tracking-wider">
                {t.level}
              </div>
              {t.badge && (
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${t.badgeColor}`}>
                  {t.badge}
                </div>
              )}
            </div>
            <h3 className="font-body font-semibold text-lg text-text-primary mb-1">
              {t.title}
            </h3>
            <p className="text-sm text-text-muted mb-8">{t.meta}</p>
            
            <div className="mt-auto pt-4 space-y-4">
              <div className="w-full bg-bg-elevated h-1.5 rounded-full overflow-hidden">
                <div className="w-0 bg-brand-primary h-full" />
              </div>
              <button className="w-full py-2 border border-brand-primary text-brand-primary rounded-xl text-sm font-medium hover:bg-brand-primary hover:text-bg-surface transition-colors">
                Enroll Free →
              </button>
            </div>
          </div>
        ))}

        <div className="w-6 shrink-0" />
      </div>

      <div className="text-center mt-8">
        <a href="#" className="font-medium text-brand-primary hover:underline">
          View all 18 tracks →
        </a>
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
    <section className="py-24 bg-bg-inverse text-text-inverse" id="api">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="text-sm tracking-widest uppercase font-semibold text-brand-primary mb-4">
              Curriculr API
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Learning infrastructure. For everyone.
            </h2>
            <p className="text-lg text-[#8B949E] mb-8 leading-relaxed">
              Embed structured curriculum into your school portal, company LMS, or 
              product. The Curriculr API gives you full access to tracks, lessons, 
              learner progress, and certificates — REST + GraphQL.
            </p>
            
            <ul className="space-y-3 mb-10">
              {[
                'REST + GraphQL endpoints',
                'Learner progress tracking',
                'Certificate issuance & verification',
                'Cohort enrollment at scale',
                'Webhook support for LMS integration',
                'Open source — self-hostable'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[#8B949E]">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="bg-brand-primary hover:bg-brand-light text-bg-surface rounded-xl px-6 py-3 text-base font-medium transition-all">
              Get API Key Free →
            </button>
          </div>

          {/* Right: Code Block */}
          <div className="bg-[#0D1117] rounded-2xl border border-[#21262D] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#21262D] bg-[#161B22]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="ml-4 text-xs font-mono text-[#8B949E]">GET /v1/tracks/frontend-engineering</div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code dangerouslySetInnerHTML={{
                  __html: jsonCode
                    .replace(/"([^"]+)":/g, '<span style="color:#79B8FF">"$1"</span>:')
                    .replace(/: "([^"]+)"/g, ': <span style="color:#9ECBFF">"$1"</span>')
                    .replace(/: ([0-9]+)/g, ': <span style="color:#F97316">$1</span>')
                    .replace(/: (true|false)/g, ': <span style="color:#FF7B72">$1</span>')
                    .replace(/[{}[\]]/g, '<span style="color:#E6EDF3">$&</span>')
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
    <section className="py-24 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm tracking-widest uppercase font-semibold text-brand-primary mb-4">
            Community
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary">
            Built for learners. Loved by learners.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-bg-base border border-border-default rounded-2xl p-8 flex flex-col h-full shadow-sm">
              <div className="flex gap-1 mb-6 text-accent-amber">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="text-lg text-text-primary font-medium leading-relaxed mb-8 flex-1">
                "{r.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-text-primary">{r.author}</div>
                <div className="text-sm text-text-muted">{r.role}</div>
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
    <section className="py-24 bg-bg-base" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm tracking-widest uppercase font-semibold text-brand-primary mb-4">
            Pricing
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Free to learn. Flexible to scale.
          </h2>
          <p className="text-lg text-text-secondary">
            Start for free — no credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Card 1: Free */}
          <div className="bg-bg-surface border border-border-default rounded-2xl p-8 shadow-sm h-full flex flex-col">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Free</h3>
            <div className="text-3xl font-display font-bold text-text-primary mb-2">₦0 <span className="text-lg text-text-muted font-normal">/ month</span></div>
            <p className="text-text-secondary mb-6">For individual learners</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Access to all free tracks', 'Public learner profile', '3 project submissions/month', 'Community access'].map(feat => (
                <li key={feat} className="flex gap-3 text-text-secondary"><CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" /> {feat}</li>
              ))}
              <li className="flex gap-3 text-text-ghost"><span className="w-5 h-5 flex items-center justify-center shrink-0">✗</span> Certificates</li>
              <li className="flex gap-3 text-text-ghost"><span className="w-5 h-5 flex items-center justify-center shrink-0">✗</span> API access</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-border-strong text-text-primary font-medium hover:bg-bg-elevated transition-colors mt-auto">
              Get Started Free
            </button>
          </div>

          {/* Card 2: Pro (Highlighted) */}
          <div className="bg-bg-surface border-2 border-brand-primary rounded-2xl p-8 shadow-lg md:scale-105 z-10 h-[calc(100%+2rem)] flex flex-col relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-primary text-bg-surface px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Pro</h3>
            <div className="text-3xl font-display font-bold text-text-primary mb-2">₦4,999 <span className="text-lg text-text-muted font-normal">/ month</span></div>
            <p className="text-text-secondary mb-6">For serious learners</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['All tracks + premium content', 'Unlimited project submissions', 'Certificates on completion', 'Portfolio builder', 'Priority support', 'API access (100 req/day)'].map(feat => (
                <li key={feat} className="flex gap-3 text-text-secondary"><CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" /> {feat}</li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-brand-primary text-bg-surface font-medium hover:bg-brand-light transition-colors mt-auto shadow-brand">
              Start Pro Free for 7 Days
            </button>
          </div>

          {/* Card 3: Teams */}
          <div className="bg-bg-surface border border-border-default rounded-2xl p-8 shadow-sm h-full flex flex-col">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Teams / Schools</h3>
            <div className="text-3xl font-display font-bold text-text-primary mb-2">Custom</div>
            <p className="text-text-secondary mb-6">For organisations</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Everything in Pro', 'Cohort management', 'Progress reporting', 'Branded certificates', 'Dedicated API access', 'SLA + account manager'].map(feat => (
                <li key={feat} className="flex gap-3 text-text-secondary"><CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" /> {feat}</li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-border-strong text-text-primary font-medium hover:bg-bg-elevated transition-colors mt-auto">
              Contact Us
            </button>
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
    <section className="py-24 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-light p-12 md:p-20 shadow-brand flex flex-col items-center">
          <h2 className="font-display text-4xl md:text-[56px] font-bold text-bg-surface mb-6 leading-tight">
            Ready to start learning?
          </h2>
          <p className="text-xl text-bg-surface/80 max-w-2xl mb-10">
            Join 12,400+ learners across Africa building real skills on Curriculr. 
            Free to start. Open forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-bg-surface text-brand-primary font-bold rounded-xl px-8 py-4 hover:scale-105 transition-transform flex items-center justify-center">
              Start Learning Free <ChevronRight className="w-5 h-5 ml-1" />
            </button>
            <button className="bg-transparent border-2 border-bg-surface text-bg-surface font-bold rounded-xl px-8 py-4 hover:bg-bg-surface/10 transition-colors flex items-center justify-center">
              Star us on GitHub ★
            </button>
          </div>
          
          <p className="text-sm text-bg-surface/70 font-medium tracking-wide">
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
    <footer className="bg-bg-inverse text-text-inverse py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 */}
          <div>
            <a href="/" className="flex items-center mb-6 opacity-90 hover:opacity-100 transition-opacity">
              <Logo className="text-text-inverse h-8 w-auto" />
            </a>
            <p className="text-[#8B949E] mb-6 font-medium">Knowledge as a Service.</p>
            <div className="flex items-center gap-4 text-[#8B949E]">
              <a href="#" className="hover:text-bg-surface transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-bg-surface transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-bg-surface transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-[#8B949E]">
              {['Learn', 'Tracks', 'API Docs', 'Pricing', 'Changelog'].map(link => (
                <li key={link}><a href="#" className="hover:text-bg-surface transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-[#8B949E]">
              {['About', 'Blog', 'Careers', 'Contact', 'Open Source'].map(link => (
                <li key={link}><a href="#" className="hover:text-bg-surface transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold mb-6">For Organizations</h4>
            <ul className="space-y-4 text-[#8B949E]">
              {['For Schools', 'For Teams', 'Case Studies', 'Enterprise'].map(link => (
                <li key={link}><a href="#" className="hover:text-bg-surface transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#21262D] text-sm text-[#8B949E] text-center md:text-left">
          © {new Date().getFullYear()} Isentry Technologies. Built with ♥ in Abuja, Nigeria 🇳🇬
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
    <div className="min-h-screen bg-bg-base font-body text-text-primary selection:bg-brand-dim selection:text-text-primary">
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
