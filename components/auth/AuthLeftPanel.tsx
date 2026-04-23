'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { Icon } from '@/components/icons/Icon'
import { IconName } from '@/components/icons'

/* ─── Floating node data ─── */
const NODES: { id: string; icon: IconName; iconBg: string; iconColor: string; title: string; sub: string; extra?: string; orbit: any; duration: number; initialPos: any }[] = [
  {
    id: 'streak',
    icon: 'Flame',
    iconBg: 'rgba(245,158,11,0.2)',
    iconColor: '#F59E0B',
    title: '7-day streak',
    sub: 'Frontend Engineering',
    // Orbit path — gentle figure-8
    orbit: {
      x: [0, 30, 0, -25, 0],
      y: [0, -18, 5, -12, 0],
      rotate: [0, 2, -1, 1.5, 0],
    },
    duration: 14,
    initialPos: { top: '18%', left: '8%' },
  },
  {
    id: 'cert',
    icon: 'Certificate',
    iconBg: 'rgba(124,106,247,0.2)',
    iconColor: '#7C6AF7',
    title: 'Certificate Earned',
    sub: 'UI/UX Design',
    extra: 'Chioma A.',
    orbit: {
      x: [0, -20, 10, -30, 0],
      y: [0, 15, -10, 20, 0],
      rotate: [0, -1.5, 1, -2, 0],
    },
    duration: 18,
    initialPos: { top: '42%', right: '6%' },
  },
  {
    id: 'xp',
    icon: 'XP',
    iconBg: 'rgba(36,201,126,0.2)',
    iconColor: '#24C97E',
    title: '+200 XP',
    sub: 'Project Approved',
    orbit: {
      x: [0, 25, -15, 20, 0],
      y: [0, -25, 10, -15, 0],
      rotate: [0, 1, -2, 0.5, 0],
    },
    duration: 16,
    initialPos: { top: '68%', left: '12%' },
  },
]

/* ─── Glow that follows each node ─── */
function NodeGlow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-48 h-48 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(36,201,126,0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

/* ─── Single floating node card ─── */
function FloatingNode({
  node,
  index,
}: {
  node: (typeof NODES)[number]
  index: number
}) {
  // Pop-in with stagger
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400 + index * 600)
    return () => clearTimeout(t)
  }, [index])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute z-10"
          style={node.initialPos as React.CSSProperties}
          // Pop-in
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            // Continuous orbit after pop-in
            x: node.orbit.x,
            rotate: node.orbit.rotate,
          }}
          transition={{
            // Pop-in
            opacity: { duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
            y: { duration: 0.5, ease: 'easeOut' },
            // Orbit
            x: { duration: node.duration, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: node.duration, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Glow behind card */}
          <NodeGlow delay={index * 1.5} />

          {/* The card */}
          <motion.div
            className="relative bg-white/[0.07] backdrop-blur-md border border-white/[0.15] rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4 min-w-[220px]"
            // Gentle float on Y axis (separate from orbit X)
            animate={{ y: node.orbit.y }}
            transition={{
              y: { duration: node.duration * 0.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(36,201,126,0.4)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: node.iconBg }}
            >
              <Icon name={node.icon} size={20} color={node.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm leading-tight">{node.title}</div>
              <div className="text-white/50 text-xs mt-0.5">{node.sub}</div>
            </div>
            {node.extra && (
              <div className="text-right flex flex-col items-end shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#24C97E] mb-0.5" />
                <div className="text-white/35 text-[10px]">{node.extra}</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Animated background lines (subtle pulse on the image) ─── */
function PulsingLines() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: 200 + i * 60,
            height: 200 + i * 60,
            borderRadius: '50%',
            border: '1px solid rgba(36,201,126,0.06)',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 10}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.95, 1.1, 0.95],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   SHARED AUTH LEFT PANEL
   ═══════════════════════════════════════════════════════════ */
export function AuthLeftPanel({ pageLabel }: { pageLabel: string }) {
  return (
    <div
      className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
      style={{ background: 'linear-gradient(160deg, #1B6B45 0%, #0F4C2E 40%, #141410 100%)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'url(/login-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Pulsing line rings */}
      <PulsingLines />

      {/* ── Top: Logo + Page Label ── */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center text-white opacity-90">
          <Logo className="text-white h-18 w-[120px]" />
        </div>
        <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
          {pageLabel}
        </span>
      </div>

      {/* ── Middle: Floating Nodes ── */}
      <div className="relative z-10 flex-1">
        {NODES.map((node, i) => (
          <FloatingNode key={node.id} node={node} index={i} />
        ))}
      </div>

      {/* ── Bottom ── */}
      <div className="relative z-20 text-white/80 text-sm font-medium">
        Join 12,400+ learners 🌍
      </div>
    </div>
  )
}
