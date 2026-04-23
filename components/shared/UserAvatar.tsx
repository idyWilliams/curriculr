import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface UserAvatarProps {
  name: string
  avatarUrl?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: { width: 28, height: 28, textClass: 'text-[11px]' },
  md: { width: 36, height: 36, textClass: 'text-[13px]' },
  lg: { width: 48, height: 48, textClass: 'text-lg' },
  xl: { width: 80, height: 80, textClass: 'text-2xl' },
}

export function UserAvatar({ name, avatarUrl, size = 'md', className }: UserAvatarProps) {
  const dimensions = sizeMap[size]

  // Get initials (up to 2 letters)
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .substring(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full flex items-center justify-center overflow-hidden',
        !avatarUrl && 'bg-[var(--brand-primary)] text-white font-display font-bold',
        dimensions.textClass,
        className
      )}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: !avatarUrl ? '#1B6B45' : undefined,
      }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={dimensions.width}
          height={dimensions.height}
          className="object-cover w-full h-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
