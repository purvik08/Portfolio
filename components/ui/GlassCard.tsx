import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-charcoal-900/60 backdrop-blur-xl border border-white/10 p-6 shadow-2xl transition-all duration-300 hover:border-gold-500/40 hover:bg-charcoal-800/70",
        glow && "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
