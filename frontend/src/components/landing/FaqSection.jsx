import React, { useState } from 'react';
import { FAQS } from '../../constants';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

function Eyebrow({ children }) {
  return (
    <p className="text-md sm:text-xl poppins uppercase font-semibold mb-8 text-center text-white">
      {children}
    </p>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-24 border-y border-white/[0.06] bg-navy/40 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Header */}
        <Eyebrow>FAQ</Eyebrow>
        <div className="flex justify-center items-center flex-col text-center mb-16 text-5xl font-semibold dm-sans">
          <h2 className="text-white leading-tight">
            Got a
            <span className="text-mint"> Question?</span>
          </h2>
          <p className="mt-6 poppins text-[14px] font-medium leading-[1.7] text-white/50 max-w-md text-center">
            Everything you need to know about our bespoke Islamic invitation services.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-white/[0.06]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="group">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left cursor-pointer outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-['DM_Sans'] text-[20px] font-medium transition-colors duration-300 ${
                      isOpen ? 'text-mint' : 'text-white group-hover:text-mint'
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                      isOpen
                        ? 'bg-mint border-mint text-ink'
                        : 'border-white/[0.06] text-white/50 group-hover:border-mint/50 group-hover:text-mint'
                    }`}
                  >
                    {isOpen ? <RiSubtractLine size={16} /> : <RiAddLine size={16} />}
                  </span>
                </button>

                {/* Smooth Animation Wrapper */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pr-14 poppins text-[14px] font-medium leading-[1.7] text-white/50">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
