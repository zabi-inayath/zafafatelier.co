import React from 'react';
import { RiSparklingLine } from 'react-icons/ri';
import Navbar from '../components/landing/Navbar';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5] flex flex-col">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Global Header */}
      <Navbar current="templates" />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-8 py-20 anim-app-screen">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold uppercase tracking-widest mx-auto">
          
            <span>Atelier Collection</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Coming Soon
          </h1>

          <p className="text-base sm:text-lg text-[#8ab89c] font-light leading-relaxed">
            Our master artisans are meticulously curating a new collection of bespoke Islamic wedding web portals. Please check back soon for our latest suites.
          </p>
        </div>
      </main>
    </div>
  );
}
