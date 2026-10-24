import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'sample' | 'verify' | 'success' | 'warning' | 'info' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info', className = '' }) => {
  const styles = {
    live: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 animate-pulse',
    sample: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
    verify: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-semibold',
    success: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
    info: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
    danger: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
      )}
      {children}
    </span>
  );
};
