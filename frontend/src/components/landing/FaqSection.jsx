import React, { useState } from 'react';
import { FAQS } from '../../constants';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <p className="poppins text-[10px] sm:text-xs text-mint tracking-[0.25em] uppercase font-semibold opacity-65 mb-4">
              FAQ
            </p>
            <h2 className="MiguErsansRegular text-[clamp(2.4rem,4vw,4.5rem)] text-white leading-none mb-6">
              Got a<br />
              <span className="text-mint">Question?</span>
            </h2>
            <p className="dm-sans text-sm text-mint-dim/60 font-light leading-relaxed max-w-xs">
              Everything you need to know about our Islamic invitation services.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-mint/[0.06]">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className={`MiguErsansRegular text-lg sm:text-xl font-light leading-snug transition-colors duration-200 ${isOpen ? 'text-mint' : 'text-white group-hover:text-mint'}`}>
                      {f.q}
                    </span>
                    <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                      isOpen
                        ? 'bg-mint border-mint text-ink'
                        : 'border-mint/25 text-mint/60 group-hover:border-mint/50'
                    }`}>
                      {isOpen ? <RiSubtractLine size={16} /> : <RiAddLine size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-7 pr-14 dm-sans text-sm text-mint-dim/60 font-light leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
