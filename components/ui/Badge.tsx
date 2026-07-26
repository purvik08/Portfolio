import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'cyan' | 'outline' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className
}) => {
  const variants = {
    gold: "bg-gold-500/10 text-gold-400 border-gold-500/30",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    outline: "bg-white/5 text-gray-300 border-white/10",
    dark: "bg-charcoal-800 text-gray-400 border-charcoal-700"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
