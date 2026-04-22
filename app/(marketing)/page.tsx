'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Zap, Users, Globe, Code, Award, ChevronRight, ExternalLink } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

const SparkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 100], [0, -10])

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
      style={{ y }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-base/80 backdrop-blur-xl border-b border-border/40'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
            <SparkIcon className="w-5 h-5" />
          </div>
          <span className="font-display text-xl font-semibold text-text-primary tracking-tight">
            Curriculr
          </span>
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
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary"
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg px-4"
          >
            Start Learning — Free
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 80])

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Background: Warm off-white with subtle radial gradient glow */}
      <div className="absolute inset-0 bg-bg-base" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, #22C37A 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Left: Content (60%) */}
          <div className="lg:col-span-3">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E8E0] bg-bg-surface text-text-secondary text-xs font-medium mb-8"
            >
              <span>✦</span>
              <span>Open Source</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Free Forever</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Built in Africa</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight mb-6"
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
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl px-6 py-6 text-base font-medium shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-[1.02] transition-all duration-200"
              >
                Start Learning Free
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#1A1A18] bg-transparent text-text-primary rounded-xl px-6 py-6 text-base font-medium hover:bg-bg-elevated transition-all duration-200"
              >
                View API Docs
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-light border-2 border-bg-base flex items-center justify-center text-xs font-medium text-white"
                      style={{ marginLeft: i > 1 ? '-8px' : '0' }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">★★★★★</span>{' '}
                  Loved by 12,400+ learners across Africa
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating UI Mockup (40%) */}
          <div className="lg:col-span-2">
            <FloatingCard />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function FloatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-light/20 rounded-3xl blur-2xl" />

        {/* Main Card */}
        <Card className="relative bg-bg-surface border-border/60 shadow-2xl overflow-hidden rounded-3xl">
          {/* Card Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-xs font-medium text-text-muted">React Fundamentals</div>
            <div className="w-16" />
          </div>

          {/* Card Content */}
          <CardContent className="p-5 space-y-4">
            {/* Progress Section */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Module Progress</span>
              <span className="text-xs font-medium text-brand-primary">68%</span>
            </div>
            <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-brand-primary to-brand-light rounded-full"
              />
            </div>

            {/* Module List */}
            <div className="space-y-2 mt-4">
              {[
                { icon: BookOpen, label: 'Components & Props', status: 'completed' },
                { icon: Zap, label: 'Hooks & State', status: 'current' },
                { icon: Code, label: 'Effects & Lifecycle', status: 'locked' },
              ].map((module, i) => (
                <motion.div
                  key={module.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${
                    module.status === 'current'
                      ? 'bg-brand-primary/5 border-brand-primary/30'
                      : 'bg-bg-elevated border-border/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      module.status === 'completed'
                        ? 'bg-brand-primary text-white'
                        : module.status === 'current'
                        ? 'bg-brand-light text-white'
                        : 'bg-bg-base text-text-muted'
                    }`}
                  >
                    <module.icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      module.status === 'locked'
                        ? 'text-text-muted'
                        : 'text-text-primary'
                    }`}
                  >
                    {module.label}
                  </span>
                  {module.status === 'completed' && (
                    <Award className="w-4 h-4 ml-auto text-brand-primary" />
                  )}
                  {module.status === 'current' && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* XP Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-bg-elevated border border-border/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <div className="text-xs text-text-muted">Current Streak</div>
                  <div className="text-sm font-semibold text-text-primary">12 days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-muted">Total XP</div>
                <div className="text-sm font-semibold text-brand-primary">2,450</div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-accent to-orange-300 flex items-center justify-center shadow-lg"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: FEATURES GRID
// ─────────────────────────────────────────────────────────────────────────────

function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Structured Learning Paths',
      description:
        'Follow expertly crafted curricula or build your own. From React to Rust, we have you covered.',
    },
    {
      icon: Users,
      title: 'Built for Teams',
      description:
        'Onboard new engineers, upskill your team, or run a study group. Learning is better together.',
    },
    {
      icon: Globe,
      title: 'Open Source',
      description:
        'Contributed to by developers worldwide. Transparent, community-driven, and always improving.',
    },
    {
      icon: Code,
      title: 'Developer API',
      description:
        'Integrate Curriculr into your apps, tools, or workflows. Build on our platform.',
    },
    {
      icon: Zap,
      title: 'Gamified Progress',
      description:
        'Earn XP, maintain streaks, and unlock achievements. Stay motivated with built-in game mechanics.',
    },
    {
      icon: Award,
      title: 'Track Mastery',
      description:
        'Visualize your growth with detailed progress tracking. Know exactly what you have learned.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-bg-surface" id="features">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Everything you need to{' '}
            <span className="text-brand-primary">level up</span>
          </h2>
          <p className="text-lg text-text-secondary">
            A complete learning platform designed for modern developers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="h-full bg-bg-base border-border/60 hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: STATS / SOCIAL PROOF
// ─────────────────────────────────────────────────────────────────────────────

function Stats() {
  const stats = [
    { value: '12,400+', label: 'Active Learners' },
    { value: '50+', label: 'Learning Tracks' },
    { value: '100%', label: 'Free Forever' },
    { value: '24/7', label: 'Community Support' },
  ]

  return (
    <section className="py-20 bg-bg-elevated">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                {stat.value}
              </div>
              <div className="text-text-secondary font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: CTA
// ─────────────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-24 md:py-32 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Ready to start learning?
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
            Join thousands of developers building real skills with Curriculr.
            No credit card required.
          </p>
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl px-8 py-6 text-lg font-medium shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: FOOTER
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  const footerLinks = {
    Product: ['Tracks', 'Features', 'API', 'Pricing'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
  }

  return (
    <footer className="bg-bg-surface border-t border-border/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                <SparkIcon className="w-5 h-5" />
              </div>
              <span className="font-display text-lg font-semibold text-text-primary">
                Curriculr
              </span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed">
              Knowledge as a Service.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-text-primary mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} Curriculr. Built in Africa.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="#" className="text-text-muted hover:text-text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
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
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
