import React from 'react';
import { TESTIMONIALS } from '../../constants';
import { RiStarFill, RiDoubleQuotesR, RiArrowRightLine } from 'react-icons/ri';

export default function Testimonials({ onOpenOrderModal }) {
  return (
    <section id="reviews" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08 bg-[#020c1b]/50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="label-caps mb-3">Client Love</p>
            <h2 className="display-lg text-white">
              What They<br />
              <em className="not-italic text-[#b5e8c5]">Said</em>
            </h2>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="self-start sm:self-end btn-outline"
          >
            Create Your Invitation <RiArrowRightLine size={16} />
          </button>
        </div>

        {/* Testimonials — editorial horizontal cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl bg-[#041525]/80 border border-[#b5e8c5]/10 hover:border-[#b5e8c5]/28 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-8 group"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <RiStarFill key={si} size={16} className="text-[#c9a84c]" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <RiDoubleQuotesR size={40} className="absolute -top-3 -left-2 text-[#b5e8c5]/06 pointer-events-none" />
                <p className="text-sm text-[#cde7d6] font-light leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-5 border-t border-[#b5e8c5]/10 flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-[#b5e8c5]/70 font-medium">{t.event}</p>
                </div>
                <span className="text-[11px] text-[#3f5e4d] font-mono">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
