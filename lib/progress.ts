// XP Rules
export const XP_RULES = {
  lessonComplete: 50,
  quizPass: 30,
  projectSubmit: 100,
  dailyStreak: 20,
  trackComplete: 500,
} as const

// Level definitions
export const LEVELS = [
  { min: 0, max: 499, name: 'Beginner', icon: '🌱' },
  { min: 500, max: 1499, name: 'Explorer', icon: '🧭' },
  { min: 1500, max: 3499, name: 'Builder', icon: '🔨' },
  { min: 3500, max: 6999, name: 'Architect', icon: '🏗️' },
  { min: 7000, max: Infinity, name: 'Master', icon: '🏆' },
] as const

export type LevelName = (typeof LEVELS)[number]['name']

export interface LevelInfo {
  name: LevelName
  icon: string
  min: number
  max: number
  progress: number // 0-100 progress within current level
  nextLevel: LevelName | null
}

/**
 * Calculate the user's current level based on total XP
 */
export function calculateLevel(totalXp: number): LevelInfo {
  const currentLevel = LEVELS.find(
    (level) => totalXp >= level.min && totalXp <= level.max
  ) || LEVELS[LEVELS.length - 1]

  const nextLevel = LEVELS.find((level) => level.min > currentLevel.max) || null

  // Calculate progress within current level (0-100)
  const range = currentLevel.max - currentLevel.min
  const progressInRange = totalXp - currentLevel.min
  const progress = range === Infinity ? 100 : Math.round((progressInRange / range) * 100)

  return {
    name: currentLevel.name,
    icon: currentLevel.icon,
    min: currentLevel.min,
    max: currentLevel.max,
    progress,
    nextLevel: nextLevel ? nextLevel.name : null,
  }
}

/**
 * Get XP needed to reach next level
 */
export function getXpToNextLevel(totalXp: number): number {
  const level = calculateLevel(totalXp)
  if (level.max === Infinity) return 0
  return level.max - totalXp
}

/**
 * Calculate total XP from completed lessons
 */
export function calculateTotalXp(completedLessons: number, passedQuizzes: number, submittedProjects: number): number {
  return (
    completedLessons * XP_RULES.lessonComplete +
    passedQuizzes * XP_RULES.quizPass +
    submittedProjects * XP_RULES.projectSubmit
  )
}

/**
 * Format XP with comma separator
 */
export function formatXp(xp: number): string {
  return xp.toLocaleString()
}

/**
 * Get streak bonus XP
 */
export function getStreakBonus(consecutiveDays: number): number {
  if (consecutiveDays >= 30) return XP_RULES.dailyStreak * 2 // 2x bonus for month streak
  if (consecutiveDays >= 7) return XP_RULES.dailyStreak + 10 // +10 for week streak
  return XP_RULES.dailyStreak
}
