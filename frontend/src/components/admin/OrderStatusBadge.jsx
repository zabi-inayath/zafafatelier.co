import React from 'react';

export default function OrderStatusBadge({ status, type = 'status' }) {
  const s = (status || '').toLowerCase();

  if (type === 'payment') {
    if (s === 'paid') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Paid
        </span>
      );
    }
    if (s === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-zinc-500/15 text-zinc-300 border border-zinc-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
        {status || 'Unpaid'}
      </span>
    );
  }

  // General Order / Invitation Status
  if (s === 'published' || s === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-[#123F36]/60 text-[#b5e8c5] border border-[#b5e8c5]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b5e8c5]" />
        {s === 'published' ? 'Live Published' : 'Completed'}
      </span>
    );
  }

  if (s === 'draft' || s === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-amber-500/15 text-amber-200 border border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        {s === 'draft' ? 'Draft' : 'Pending Review'}
      </span>
    );
  }

  if (s === 'in_progress') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-sky-500/15 text-sky-200 border border-sky-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        Artisan In-Progress
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-poppins font-medium tracking-wide bg-zinc-700/30 text-zinc-300 border border-zinc-600/30">
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
      {status || 'Unknown'}
    </span>
  );
}
