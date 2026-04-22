'use client'

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

/* ─── Types ─── */
interface PassportData {
  name: string
  username: string
  title: string
  location: string
  initials: string
  level: string
  streak: number
  longestStreak: number
  passportId: string
  issuedDate: string
  totalXp: number
  lessonsDone: number
  badgesEarned: number
  hoursLearned: number
  cohortRank: number
  completedTracks: { name: string; lessons: number; color: string }[]
  badges: { emoji: string; name: string; bg: string }[]
}

const DEFAULT_DATA: PassportData = {
  name: 'Idorenyin Williams',
  username: 'idorenyin',
  title: 'AI/ML Software Engineer',
  location: '📍 Abuja, Nigeria 🇳🇬',
  initials: 'IW',
  level: '🔨 Builder Level',
  streak: 21,
  longestStreak: 21,
  passportId: 'CUR-2026-00847',
  issuedDate: 'April 22, 2026',
  totalXp: 3240,
  lessonsDone: 36,
  badgesEarned: 8,
  hoursLearned: 42,
  cohortRank: 4,
  completedTracks: [
    { name: 'Frontend Engineering', lessons: 24, color: '#2563EB' },
    { name: 'UI/UX Design', lessons: 16, color: '#7C6AF7' },
    { name: 'Generative AI', lessons: 14, color: '#EC4899' },
  ],
  badges: [
    { emoji: '🏁', name: 'First Step', bg: 'rgba(36,201,126,0.12)' },
    { emoji: '🔥', name: 'On Fire', bg: 'rgba(245,158,11,0.12)' },
    { emoji: '⚡', name: 'Speed Learner', bg: 'rgba(37,99,235,0.12)' },
    { emoji: '🏗️', name: 'Builder', bg: 'rgba(249,115,22,0.12)' },
    { emoji: '🎓', name: 'Graduate', bg: 'rgba(124,106,247,0.12)' },
    { emoji: '🌍', name: 'African Pride', bg: 'rgba(36,201,126,0.12)' },
    { emoji: '⚡', name: 'Streak Pro', bg: 'rgba(245,158,11,0.12)' },
    { emoji: '🔓', name: 'Open Source', bg: 'rgba(255,255,255,0.06)' },
  ],
}

/* ─── Spark Icon (inline SVG) ─── */
const SparkSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════
   PASSPORT DOCUMENT (1200 × 760)
   ═══════════════════════════════════════════════════════════ */
function PassportDocument({ data }: { data: PassportData }) {
  return (
    <div
      style={{
        width: 1200,
        height: 760,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0F1A14',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Background layers ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(circle at 15% 50%, rgba(27,107,69,0.18) 0%, transparent 55%)',
          'radial-gradient(circle at 85% 20%, rgba(36,201,126,0.08) 0%, transparent 40%)',
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '100% 100%, 100% 100%, 28px 28px',
      }} />
      {/* Top brand crown line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, rgba(27,107,69,0.8), rgba(36,201,126,0.4), transparent)',
      }} />

      {/* ── Content Row ── */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', zIndex: 1 }}>

        {/* ════ LEFT PANEL ════ */}
        <div style={{
          width: 320, padding: '48px 40px', borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0,
        }}>
          {/* TOP: Branding */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <SparkSVG />
              <span style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em' }}>
                Curriculr
              </span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(36,201,126,0.8)', letterSpacing: '0.25em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              LEARNER PASSPORT
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 32 }} />

            {/* Avatar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B6B45, #24C97E)',
                border: '2px solid rgba(36,201,126,0.4)',
                boxShadow: '0 0 0 6px rgba(27,107,69,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 28, color: '#FFFFFF', fontWeight: 700 }}>
                  {data.initials}
                </span>
              </div>
            </div>

            {/* Name block */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                {data.name}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                @{data.username}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                {data.title}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {data.location}
              </div>
            </div>

            {/* Level & Streak badges */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 8, marginTop: 20 }}>
              <span style={{
                background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: 999, padding: '5px 14px', fontSize: 11, fontWeight: 600, color: '#F59E0B',
              }}>
                {data.level}
              </span>
              <span style={{
                background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
                borderRadius: 999, padding: '5px 14px', fontSize: 11, fontWeight: 600, color: '#F97316',
              }}>
                🔥 {data.streak} Day Streak
              </span>
            </div>
          </div>

          {/* BOTTOM: Verification */}
          <div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 4 }}>
              Passport ID
            </div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: 'rgba(36,201,126,0.7)', marginBottom: 8 }}>
              {data.passportId}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              Issued: {data.issuedDate}
            </div>
            {/* Seal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const,
              }}>
                <span style={{ color: '#24C97E', fontSize: 14 }}>✦</span>
              </div>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div style={{ flex: 1, padding: '48px 52px', display: 'flex', flexDirection: 'column' as const }}>

          {/* TOP ROW: Headline + XP */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(36,201,126,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>
                KNOWLEDGE AS A SERVICE.
              </div>
              <div style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 38, fontWeight: 700, lineHeight: 1.1, marginTop: 8 }}>
                <div>Certified Learning</div>
                <div style={{ color: '#24C97E' }}>Achievement Record</div>
              </div>
            </div>
            {/* XP Card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: '20px 28px', textAlign: 'center' as const, minWidth: 140,
            }}>
              <div style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 44, fontWeight: 700, color: '#24C97E', lineHeight: 1 }}>
                {data.totalXp.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, marginTop: 4, letterSpacing: '0.05em' }}>
                Total XP
              </div>
              {/* Level progress */}
              <div style={{ marginTop: 10, fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Level 3 of 5</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'rgba(36,201,126,0.8)', borderRadius: 999 }} />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

          {/* STATS ROW */}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 24 }}>
            {[
              { value: String(data.lessonsDone), label: 'Lessons Done', accent: '#24C97E' },
              { value: String(data.badgesEarned), label: 'Badges Earned', accent: '#F59E0B' },
              { value: String(data.hoursLearned), label: 'Hours Learned', accent: '#7C6AF7' },
              { value: `#${data.cohortRank}`, label: 'Cohort Rank', accent: '#F97316' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div style={{ textAlign: 'center' as const, flex: 1 }}>
                  <div style={{ width: 24, height: 2, background: s.accent, margin: '0 auto 10px', borderRadius: 2 }} />
                  <div style={{ fontFamily: "'Cal Sans', 'Inter', sans-serif", fontSize: 28, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

          {/* BOTTOM TWO COLUMNS */}
          <div style={{ display: 'flex', gap: 40, flex: 1 }}>
            {/* LEFT: Completed Tracks */}
            <div style={{ flex: '0 0 52%' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 16 }}>
                COMPLETED TRACKS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                {data.completedTracks.map((t) => (
                  <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.lessons} lessons</div>
                    </div>
                    <span style={{
                      background: 'rgba(36,201,126,0.12)', border: '1px solid rgba(36,201,126,0.25)',
                      borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 600, color: '#24C97E',
                    }}>
                      ✓ Certified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Badges */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 16 }}>
                ACHIEVEMENTS UNLOCKED
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px 8px' }}>
                {data.badges.map((b) => (
                  <div key={b.name} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%', background: b.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 20 }}>{b.emoji}</span>
                    </div>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textAlign: 'center' as const, lineHeight: 1.2 }}>
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Strip ── */}
      <div style={{
        height: 48, padding: '0 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          curriculr.dev/u/{data.username}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#24C97E' }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', maxWidth: 300, textAlign: 'right' as const, lineHeight: 1.3 }}>
          This document certifies the learning achievements of the named learner on the Curriculr open learning platform.
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   EXPORTED WRAPPER WITH DOWNLOAD + SHARE
   ═══════════════════════════════════════════════════════════ */
export function LearnerPassport({ data = DEFAULT_DATA }: { data?: PassportData }) {
  const passportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async () => {
    if (!passportRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(passportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0F1A14',
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `curriculr-passport-${data.username}-2026.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } finally {
      setIsExporting(false)
    }
  }

  const shareTwitter = () => {
    const text = encodeURIComponent(
      `I just earned my Curriculr Learner Passport 🎓\n${data.totalXp.toLocaleString()} XP · Builder Level · ${data.completedTracks.length} tracks certified\nBuilt in Africa, for the world.\ncurriculr.dev/u/${data.username}\n#Curriculr #LearnInPublic #BuiltInAfrica`
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://curriculr.dev/u/${data.username}`, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`https://curriculr.dev/u/${data.username}`)
    alert('Profile link copied! ✓')
  }

  return (
    <div>
      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' as const }}>
        <button
          onClick={handleDownload}
          disabled={isExporting}
          style={{
            background: '#1B6B45', color: '#fff', fontWeight: 600, fontSize: 14,
            borderRadius: 10, padding: '12px 24px', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(27,107,69,0.25)',
            opacity: isExporting ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          {isExporting ? '⏳ Generating...' : '⬇ Download Passport'}
        </button>

        <button onClick={shareTwitter} style={{
          background: '#24292F', color: '#fff', fontWeight: 600, fontSize: 13,
          borderRadius: 10, padding: '10px 18px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          𝕏 Share on Twitter
        </button>

        <button onClick={shareLinkedIn} style={{
          background: '#0A66C2', color: '#fff', fontWeight: 600, fontSize: 13,
          borderRadius: 10, padding: '10px 18px', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          in Share on LinkedIn
        </button>

        <button onClick={copyLink} style={{
          background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13,
          borderRadius: 10, padding: '10px 18px', border: '1.5px solid var(--border-default)', cursor: 'pointer',
        }}>
          🔗 Copy Link
        </button>
      </div>

      {/* Passport Preview (scrollable container) */}
      <div style={{ overflowX: 'auto', borderRadius: 20, border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}>
        <div ref={passportRef}>
          <PassportDocument data={data} />
        </div>
      </div>
    </div>
  )
}
