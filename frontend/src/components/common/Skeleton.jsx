import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClasses = 'relative overflow-hidden bg-[#031527] border border-[#b5e8c5]/10';

  const variantClasses = {
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
    text: 'rounded-md h-4',
  }[variant] || 'rounded-2xl';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#b5e8c5]/10 to-transparent animate-[shimmer_1.8s_infinite]" />
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-[#031327] border border-[#b5e8c5]/15 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
          <Skeleton className="w-48 h-7" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-28 h-9 rounded-xl" />
      </div>

      <div className="pt-3 border-t border-[#b5e8c5]/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="p-8 rounded-3xl bg-[#031327] border border-[#b5e8c5]/20 space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16" variant="circular" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-56 h-4" />
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-[#b5e8c5]/10">
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-full h-11" />
        <Skeleton className="w-40 h-11" />
      </div>
    </div>
  );
}
