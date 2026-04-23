import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <div 
        className="w-full h-full bg-current"
        style={{
          maskImage: 'url(/logo.png)',
          WebkitMaskImage: 'url(/logo.png)',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'left center',
          WebkitMaskPosition: 'left center',
          maskType: 'luminance',
          WebkitMaskType: 'luminance'
        } as React.CSSProperties}
      />
    </div>
  );
}
