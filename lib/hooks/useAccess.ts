'use client'

import { useUser } from './useUser'
import { Lesson, Track } from '@/lib/tracks'

export type AccessLevel = 'guest' | 'free' | 'pro' | 'school' | 'team'

interface UseAccessReturn {
  canAccess: (lesson: Lesson) => boolean
  accessLevel: AccessLevel
  showSoftWall: boolean
  showProWall: boolean
  shouldPromptSignup: boolean
  triggerSoftWall: () => void
  isGuest: boolean
  isFree: boolean
  isPro: boolean
}

/**
 * Access control hook for Curriculr content
 *
 * Access Rules:
 * - Lesson 1 (index 0) of Module 1: ALWAYS free (guest ok)
 * - Lessons 2-3 (index 1-2) of Module 1: Free but requires account
 * - All other lessons: Pro required
 * - Projects: Pro required
 * - Quizzes: Free account required
 */
export function useAccess(): UseAccessReturn {
  const { user, profile, loading } = useUser()

  // Determine access level based on user state and profile
  const accessLevel: AccessLevel = (() => {
    if (!user) return 'guest'

    // Check for pro/school/team roles in profile
    const role = profile?.role?.toLowerCase() || ''
    if (role === 'pro') return 'pro'
    if (role === 'school') return 'school'
    if (role === 'team') return 'team'

    // Default free account
    return 'free'
  })()

  const isGuest = accessLevel === 'guest'
  const isFree = accessLevel === 'free'
  const isPro = ['pro', 'school', 'team'].includes(accessLevel)

  /**
   * Check if user can access a specific lesson
   */
  const canAccess = (lesson: Lesson): boolean => {
    // Projects always require Pro
    if (lesson.type === 'project') {
      return isPro
    }

    // Quizzes require at least free account
    if (lesson.type === 'quiz') {
      return !isGuest
    }

    // Check lesson-specific access rules
    if (lesson.requiresPro) {
      return isPro
    }

    if (lesson.requiresAccount) {
      return !isGuest
    }

    // Free preview lessons (lesson.isFree === true)
    return true
  }

  // Soft wall state (for tracking scroll progress on guest users)
  const showSoftWall = isGuest // Will be controlled by scroll in lesson page
  const showProWall = isFree // Free users seeing Pro content
  const shouldPromptSignup = isGuest // Guest viewing free lesson

  const triggerSoftWall = () => {
    // This will be controlled by scroll listener in lesson page
  }

  return {
    canAccess,
    accessLevel,
    showSoftWall,
    showProWall,
    shouldPromptSignup,
    triggerSoftWall,
    isGuest,
    isFree,
    isPro,
  }
}

/**
 * Get access status message for a lesson
 */
export function getAccessMessage(lesson: Lesson, accessLevel: AccessLevel): string {
  if (lesson.type === 'project') {
    return 'Projects are available for Pro members'
  }

  if (lesson.type === 'quiz') {
    return accessLevel === 'guest'
      ? 'Create a free account to take this quiz'
      : 'Quiz available'
  }

  if (lesson.requiresPro) {
    return 'Upgrade to Pro to access this lesson'
  }

  if (lesson.requiresAccount) {
    return accessLevel === 'guest'
      ? 'Create a free account to access this lesson'
      : 'Lesson available'
  }

  return 'Free preview available'
}

/**
 * Check if a lesson should show a lock icon
 */
export function isLessonLocked(lesson: Lesson, accessLevel: AccessLevel): boolean {
  return !canAccessHelper(lesson, accessLevel)
}

function canAccessHelper(lesson: Lesson, accessLevel: AccessLevel): boolean {
  if (lesson.type === 'project') return ['pro', 'school', 'team'].includes(accessLevel)
  if (lesson.type === 'quiz') return accessLevel !== 'guest'
  if (lesson.requiresPro) return ['pro', 'school', 'team'].includes(accessLevel)
  if (lesson.requiresAccount) return accessLevel !== 'guest'
  return true
}
