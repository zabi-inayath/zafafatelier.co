import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome4Line, RiArrowLeftLine } from 'react-icons/ri';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip flex flex-col justify-center items-center px-6 selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />
      <div className="absolute top-8 left-8 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8ab89c] hover:text-[#b5e8c5] transition-colors"
        >
          <RiArrowLeftLine size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      <main className="relative z-10 max-w-md mx-auto text-center space-y-6 anim-app-screen">
        <div className="w-20 h-20 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/25 flex items-center justify-center mx-auto text-[#b5e8c5] font-serif text-3xl">
          404
        </div>
        <div className="space-y-2">
          <h1
            className="text-4xl text-white font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Page Not Found
          </h1>
          <p className="text-xs text-[#8ab89c] font-light leading-relaxed">
            The page you are looking for has been moved or does not exist in Zafaf Atelier.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#b5e8c5] text-[#020b17] font-bold text-xs uppercase tracking-wider hover:bg-[#cbf4d8] transition-all cursor-pointer shadow-lg shadow-[#b5e8c5]/15"
        >
          <RiHome4Line size={16} />
          <span>Return to Atelier Home</span>
        </Link>
      </main>
    </div>
  );
}