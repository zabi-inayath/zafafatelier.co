import React, { useState } from 'react';
import { FAQS } from '../constants';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="label-caps mb-3">FAQ</p>
          <h2 className="display-lg text-white">
            Got a<br />
            <em className="not-italic text-[#b5e8c5]">Question?</em>
          </h2>
        </div>

        {/* Accordion — raw divider style */}
        <div className="max-w-3xl divide-y divide-[#b5e8c5]/08">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-light leading-snug transition-colors duration-200 ${isOpen ? 'text-[#b5e8c5]' : 'text-white group-hover:text-[#b5e8c5]'}`}
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {f.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
                    isOpen
                      ? 'bg-[#b5e8c5] border-[#b5e8c5] text-[#020b17]'
                      : 'border-[#b5e8c5]/25 text-[#b5e8c5]/60 group-hover:border-[#b5e8c5]/50'
                  }`}>
                    {isOpen ? <RiSubtractLine size={16} /> : <RiAddLine size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-7 pr-14 text-sm text-[#7a9d89] font-light leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
