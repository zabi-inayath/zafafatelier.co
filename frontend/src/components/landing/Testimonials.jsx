import React from 'react';
import { TESTIMONIALS } from '../../constants';
import { RiStarFill, RiDoubleQuotesR, RiArrowRightLine } from 'react-icons/ri';


function Eyebrow({ children }) {
  return (
    <p className="text-md sm:text-xl tracking-[0.25em] poppins uppercase font-semibold mb-8 text-center">
      {children}
    </p>
  );
}

export default function Testimonials({ onOpenOrderModal }) {
  return (
    <section id="reviews" className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-mint/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Eyebrow>Client Love</Eyebrow>
        <div className="flex justify-center items-center flex-col text-center mb-16 text-5xl font-semibold dm-sans">
          <div>
            <h2 className="text-white leading-tight">
              What They
              <span className="text-mint"> Said</span>
            </h2>
          </div>
          <button onClick={onOpenOrderModal} className="btn-outline self-start sm:self-end">
            Create Your Invitation <RiArrowRightLine size={16} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative p-8 rounded-3xl bg-navy-mid/50 border border-mint/10 hover:border-mint/25 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-8 group backdrop-blur-sm overflow-hidden"
            >
              {/* Card glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-mint/[0.04] blur-[30px] pointer-events-none" />

              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <RiStarFill key={si} size={14} className="text-gold" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <RiDoubleQuotesR size={40} className="absolute -top-3 -left-2 text-mint/05 pointer-events-none" />
                <p className="dm-sans text-sm text-mint/80 font-light leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-5 border-t border-mint/10 flex items-end justify-between">
                <div>
                  <p className="MiguErsansRegular text-base text-white">{t.author}</p>
                  <p className="poppins text-xs text-mint/60 font-medium mt-0.5">{t.event}</p>
                </div>
                <span className="dm-sans text-[10px] text-mint-dim/30 font-mono">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
