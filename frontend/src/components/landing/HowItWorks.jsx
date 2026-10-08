import React from 'react';
import { PROCESS_STEPS } from '../../constants';
import { RiMessage3Line, RiFileTextLine, RiPaletteLine, RiSendPlaneLine, RiArrowRightLine } from 'react-icons/ri';

const STEP_ICONS = [
  <RiMessage3Line size={28} className="text-mint" />,
  <RiFileTextLine size={28} className="text-mint" />,
  <RiPaletteLine size={28} className="text-mint" />,
  <RiSendPlaneLine size={28} className="text-mint" />,
];

function Eyebrow({ children }) {
  return (
    <p className="text-md sm:text-xl tracking-[0.25em] poppins uppercase font-semibold mb-8 text-center">
      {children}
    </p>
  );
}

export default function HowItWorks({ onOpenOrderModal }) {
  return (
    <section id="process" className="relative py-20 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full bg-mint/[0.025] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Eyebrow>How It Works</Eyebrow>
        <div className="flex justify-center items-center flex-col text-center mb-14 text-5xl font-semibold dm-sans">
          <h2 className="text-white leading-none">
            Your Custom Invite in 4 <br />
            <span className="text-mint">Simple Steps</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-mint/[0.06] rounded-3xl overflow-hidden border border-mint/[0.06]">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="relative bg-ink p-8 flex flex-col gap-6 hover:bg-navy-mid/80 transition-colors duration-300 group"
            >
              {/* Big faded step number */}
              <span className="absolute top-4 right-5 MiguErsansRegular text-[5rem] text-mint/[0.04] leading-none pointer-events-none select-none">
                {step.step}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-navy border border-mint/15 flex items-center justify-center group-hover:border-mint/35 transition-colors">
                {STEP_ICONS[i]}
              </div>

              {/* Text */}
              <div>
                <h3 className="MiguErsansRegular text-lg text-white mb-2 leading-snug">{step.title}</h3>
                <p className="dm-sans text-xs text-mint-dim/60 font-light leading-relaxed">{step.desc}</p>
              </div>

              {/* Arrow connector */}
              {i < 3 && (
                <RiArrowRightLine
                  size={18}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 text-mint/20 hidden lg:block z-10"
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button className="btn-mint" onClick={onOpenOrderModal}>
            Start Your Invitation <RiArrowRightLine size={16} />
          </button>
          <span className="dm-sans text-mint-dim/50 text-xs">First design preview in 24–48 hours</span>
        </div>

      </div>
    </section>
  );
}
