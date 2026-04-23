import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  sparkColor?: string;
}

// ── NAVIGATION (8 icons) ──────────────────────────────

export function IconDashboard({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <circle cx="21" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconTracks({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="18" x2="8" y2="18" />
      <circle cx="20" cy="6" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconProgress({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 17 9 11 15 13 21 5" />
      <circle cx="3" cy="17" r="1.5" />
      <circle cx="9" cy="11" r="1.5" />
      <circle cx="15" cy="13" r="1.5" />
      <circle cx="21" cy="5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconCohorts({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="5" />
      <circle cx="8" cy="16" r="5" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="12" cy="13" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconCommunity({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 10c0-3.3-3.1-6-7-6S3 6.7 3 10c0 1.9 1 3.5 2.6 4.6l-1.4 3 3.3-1.4c.8.3 1.6.5 2.5.5" />
      <path d="M21 14c0-2.8-2.5-5-5.5-5-.2 0-.4 0-.6.1" />
      <path d="M15.5 19c.7 0 1.4-.2 2.1-.5l2.8 1.2-1.2-2.5c1.2-.9 2-2.2 2-3.7 0-2.5-2-4.5-4.6-4.9" />
      <circle cx="14" cy="7" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconProfile({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="15.5" cy="5.5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconSettings({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c-.6 0-1.1-.4-1.2-1l-.5-2.8c-.5-.2-1-.5-1.4-.8l-2.6 1.1c-.6.2-1.2 0-1.5-.5l-2-3.5c-.3-.5-.1-1.1.3-1.5l2.2-1.7c-.1-.3-.1-.6-.1-1s0-.7.1-1l-2.2-1.7c-.5-.4-.6-1-.3-1.5l2-3.5c.3-.5.9-.7 1.5-.5l2.6 1.1c.4-.3.9-.6 1.4-.8l.5-2.8c.1-.6.6-1 1.2-1h4c.6 0 1.1.4 1.2 1l.5 2.8c.5.2 1 .5 1.4.8l2.6-1.1c.6-.2 1.2 0 1.5.5l2 3.5c.3.5.1 1.1-.3 1.5l-2.2 1.7c.1.3.1.6.1 1s0 .7-.1 1l2.2 1.7c.5.4.6 1 .3 1.5l-2 3.5c-.3.5-.9.7-1.5.5l-2.6-1.1c-.4.3-.9.6-1.4.8l-.5 2.8c-.1.6-.6 1-1.2 1h-4z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="3.5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconNotifications({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <circle cx="12" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── LEARNING (12 icons) ───────────────────────────────

export function IconLesson({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H12" />
      <path d="M20 19.5v-15A2.5 2.5 0 0 0 17.5 2H12" />
      <path d="M12 2v20" />
      <path d="M12 22c-2-1.5-4.5-2.5-8-2.5" />
      <path d="M12 22c2-1.5 4.5-2.5 8-2.5" />
      <line x1="7" y1="7" x2="10" y2="7" />
      <line x1="7" y1="11" x2="9" y2="11" />
      <line x1="14" y1="7" x2="17" y2="7" />
      <line x1="14" y1="11" x2="16" y2="11" />
      <circle cx="20" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconModule({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="8" width="16" height="14" rx="2" />
      <path d="M8 4h8a2 2 0 0 1 2 2v2" />
      <path d="M6 8V6a2 2 0 0 1 2-2h8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
      <circle cx="20" cy="8" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconTrackMap({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 18c0-3 3-4 6-4s6-1 6-4" />
      <circle cx="6" cy="18" r="3" fill="currentColor" />
      <path d="M12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M12 11v6" />
      <circle cx="18" cy="10" r="3" />
      <circle cx="12" cy="14" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconCertificate({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="12" y2="13" />
      <circle cx="12" cy="18" r="3" />
      <path d="M10.5 20.5l-1 2.5 2.5-1 2.5 1-1-2.5" />
      <circle cx="12" cy="18" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconStreak({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c0 0-5 4-5 10a5 5 0 0 0 10 0c0-6-5-10-5-10Z" />
      <path d="M12 10c-1.5 1.5-1.5 3.5 0 5 1.5-1.5 1.5-3.5 0-5Z" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconXP({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      <circle cx="11" cy="22" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconBadge({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconQuiz({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
      <circle cx="19" cy="5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconProject({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <line x1="15" y1="13" x2="21" y2="13" />
      <line x1="18" y1="10" x2="18" y2="16" />
      <circle cx="18" cy="13" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconVideo({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polygon points="10 9 15 12 10 15 10 9" />
      <circle cx="22" cy="4" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconArticle({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
      <circle cx="20" cy="8" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconCode({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
      <circle cx="21" cy="12" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── GAMIFICATION (8 icons) ────────────────────────────

export function IconTrophy({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 1.1-.9 2-2 2H6" />
      <path d="M14 14.66V17c0 1.1.9 2 2 2h2" />
      <path d="M10 22v-3" />
      <path d="M14 22v-3" />
      <path d="M15 4H9v6a3 3 0 0 0 6 0V4z" />
      <path d="M12 9l.5-1.5 1.5-.5-1.5-.5L12 5l-.5 1.5L10 7l1.5.5z" />
      <circle cx="12" cy="4" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconLeaderboard({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="14" width="4" height="8" rx="1" />
      <rect x="10" y="6" width="4" height="16" rx="1" />
      <rect x="16" y="10" width="4" height="12" rx="1" />
      <circle cx="12" cy="6" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconRank({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20V4" />
      <path d="M6 10l6-6 6 6" />
      <line x1="16" y1="16" x2="22" y2="16" />
      <line x1="16" y1="20" x2="22" y2="20" />
      <line x1="18" y1="14" x2="18" y2="22" />
      <line x1="20" y1="14" x2="20" y2="22" />
      <circle cx="12" cy="4" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconLevelUp({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="18 15 12 9 6 15" />
      <polyline points="18 21 12 15 6 21" />
      <circle cx="12" cy="9" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconMilestone({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 22h14" />
      <path d="M9 22V2l11 5-11 5" />
      <circle cx="20" cy="7" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconAchievement({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconPassport({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <circle cx="16" cy="8" r="2" />
      <line x1="15" y1="13" x2="18" y2="13" />
      <line x1="15" y1="16" x2="17" y2="16" />
      <circle cx="20" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconFlame({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c0 0-5 4-5 10a5 5 0 0 0 10 0c0-6-5-10-5-10Z" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── PLATFORM / API (8 icons) ─────────────────────────

export function IconAPI({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 10H3l4-4" />
      <path d="M16 14h5l-4 4" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <circle cx="12" cy="12" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconWebhook({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12A9 9 0 1 1 12 3c2.4 0 4.6.9 6.2 2.4" />
      <polyline points="14 5.4 18.2 5.4 18.2 1.2" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
      <circle cx="18.2" cy="5.4" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconKey({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M11.5 11.5L21 2v4l-2 2v3l-2 2" />
      <circle cx="7.5" cy="15.5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconTerminal({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <circle cx="12" cy="19" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconDatabase({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconSDK({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19.07 4.93a10 10 0 0 0-14.14 0l-1.42 1.42a1 1 0 0 0 0 1.41l1.42 1.42" />
      <path d="M4.93 19.07a10 10 0 0 0 14.14 0l1.42-1.42a1 1 0 0 0 0-1.41l-1.42-1.42" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <circle cx="19.07" cy="4.93" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconEndpoint({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M22 12h-4" />
      <path d="M18 9l-3 3 3 3" />
      <circle cx="12" cy="12" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconRateLimit({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
      <path d="M15 14v-1a2 2 0 1 1 4 0v1" />
      <circle cx="12" cy="12" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── FOR SCHOOLS & TEAMS (8 icons) ────────────────────

export function IconSchool({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3L2 10h4v11h12V10h4L12 3z" />
      <path d="M10 21v-6h4v6" />
      <path d="M8 12h8" />
      <circle cx="12" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconTeam({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="9" r="3" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="13" cy="8" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconReport({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <rect x="9" y="10" width="2" height="6" />
      <rect x="13" y="12" width="2" height="4" />
      <circle cx="10" cy="10" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconEnroll({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10" cy="8" r="4" />
      <path d="M4 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <line x1="19" y1="11" x2="19" y2="17" />
      <line x1="16" y1="14" x2="22" y2="14" />
      <circle cx="19" cy="14" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconAssignment({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="18" rx="2" />
      <path d="M9 4v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <rect x="7" y="10" width="2" height="2" />
      <line x1="11" y1="11" x2="17" y2="11" />
      <rect x="7" y="15" width="2" height="2" />
      <line x1="11" y1="16" x2="17" y2="16" />
      <circle cx="12" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconReview({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8l.9 1.8 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" />
      <circle cx="11" cy="11" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconExport({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconBranding({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l9 10-9 10-9-10 9-10z" />
      <path d="M12 7l4 5-4 5-4-5 4-5z" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── STATUS (6 icons) ──────────────────────────────────

export function IconCompleted({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
      <circle cx="19" cy="5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconLocked({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconVerified({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="2" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconInfo({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
      <circle cx="19" cy="5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconWarning({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
      <circle cx="12" cy="3.86" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconLoading({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <circle cx="16.5" cy="4.5" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

// ── BRANDING (3 icons) ────────────────────────────────

export function IconCurriculrSpark({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="#24C97E" stroke="none" />
    </svg>
  );
}

export function IconLearnInPublic({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="14" r="8" />
      <path d="M4 14h16" />
      <path d="M12 6a10.6 10.6 0 0 0-4 8 10.6 10.6 0 0 0 4 8 10.6 10.6 0 0 0 4-8 10.6 10.6 0 0 0-4-8z" />
      <path d="M14 6l-4-3-4 3 4 3z" />
      <line x1="10" y1="9" x2="10" y2="13" />
      <circle cx="10" cy="3" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export function IconBuiltInAfrica({ size = 24, className, color, sparkColor = '#24C97E' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2L7 4l-2 5 2 2-2 5 3 4h4l4-3 1-5-1-4h-3L10 2z" />
      <circle cx="9" cy="11" r="2" fill={sparkColor} stroke="none" />
    </svg>
  );
}

export const CurriculrIcons = {
  Dashboard: IconDashboard,
  Tracks: IconTracks,
  Progress: IconProgress,
  Cohorts: IconCohorts,
  Community: IconCommunity,
  Profile: IconProfile,
  Settings: IconSettings,
  Notifications: IconNotifications,
  Lesson: IconLesson,
  Module: IconModule,
  TrackMap: IconTrackMap,
  Certificate: IconCertificate,
  Streak: IconStreak,
  XP: IconXP,
  Badge: IconBadge,
  Quiz: IconQuiz,
  Project: IconProject,
  Video: IconVideo,
  Article: IconArticle,
  Code: IconCode,
  Trophy: IconTrophy,
  Leaderboard: IconLeaderboard,
  Rank: IconRank,
  LevelUp: IconLevelUp,
  Milestone: IconMilestone,
  Achievement: IconAchievement,
  Passport: IconPassport,
  Flame: IconFlame,
  API: IconAPI,
  Webhook: IconWebhook,
  Key: IconKey,
  Terminal: IconTerminal,
  Database: IconDatabase,
  SDK: IconSDK,
  Endpoint: IconEndpoint,
  RateLimit: IconRateLimit,
  School: IconSchool,
  Team: IconTeam,
  Report: IconReport,
  Enroll: IconEnroll,
  Assignment: IconAssignment,
  Review: IconReview,
  Export: IconExport,
  Branding: IconBranding,
  Completed: IconCompleted,
  Locked: IconLocked,
  Verified: IconVerified,
  Info: IconInfo,
  Warning: IconWarning,
  Loading: IconLoading,
  CurriculrSpark: IconCurriculrSpark,
  LearnInPublic: IconLearnInPublic,
  BuiltInAfrica: IconBuiltInAfrica,
} as const;

export type IconName = keyof typeof CurriculrIcons;
