import React from 'react';
import { CurriculrIcons, IconName } from './index';

interface Props {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  sparkColor?: string;
}

export function Icon({ name, size = 24, className, color, sparkColor }: Props) {
  const IconComponent = CurriculrIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in CurriculrIcons`);
    return null;
  }

  return <IconComponent size={size} className={className} color={color} sparkColor={sparkColor} />;
}
