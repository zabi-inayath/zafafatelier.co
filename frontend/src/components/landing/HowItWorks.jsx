import React from 'react';
import { PROCESS_STEPS } from '../../constants';
import { RiMessage3Line, RiFileTextLine, RiPaletteLine, RiSendPlaneLine, RiArrowRightLine } from 'react-icons/ri';

const STEP_ICONS = [
  <RiMessage3Line size={32} className="text-[#b5e8c5]" />,
  <RiFileTextLine size={32} className="text-[#b5e8c5]" />,
  <RiPaletteLine size={32} className="text-[#b5e8c5]" />,
  <RiSendPlaneLine size={32} className="text-[#b5e8c5]" />,
];

export default function HowItWorks({ onOpenOrderModal }) {
  return (
    <section id="process" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16">
          <p className="label-caps mb-3">How It Works</p>
          <h2 className="display-lg text-white max-w-xl">
            Custom Invitation<br />
            <em className="not-italic text-[#b5e8c5]">in 4 Simple Steps</em>
          </h2>
        </div>

        {/* Steps — horizontal numbered list, editorial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#b5e8c5]/08 rounded-2xl overflow-hidden border border-[#b5e8c5]/08">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="relative bg-[#020d1c] p-8 flex flex-col gap-6 hover:bg-[#041929] transition-colors duration-300 group"
            >
              {/* Step number — huge, faded */}
              <span
                className="absolute top-4 right-5 text-[5rem] font-bold text-[#b5e8c5]/04 leading-none pointer-events-none select-none"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {step.step}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#031a31] border border-[#b5e8c5]/16 flex items-center justify-center group-hover:border-[#b5e8c5]/35 transition-colors">
                {STEP_ICONS[i]}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">{step.title}</h3>
                <p className="text-xs text-[#7a9d89] font-light leading-relaxed">{step.desc}</p>
              </div>

              {/* Arrow connector on non-last items */}
              {i < 3 && (
                <RiArrowRightLine
                  size={18}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 text-[#b5e8c5]/20 hidden lg:block"
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex items-center gap-4">
          <button className="btn-mint" onClick={onOpenOrderModal}>
            Start Your Invitation <RiArrowRightLine size={16} />
          </button>
          <span className="text-[#4a6655] text-xs">First design preview in 24–48 hours</span>
        </div>

      </div>
    </section>
  );
}
