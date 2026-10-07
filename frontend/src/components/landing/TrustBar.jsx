import React from 'react';
import { RiSparklingLine, RiPenNibLine, RiLeafLine } from 'react-icons/ri';

const PILLARS = [
  {
    icon: <RiSparklingLine size={26} className="text-mint" />,
    title: 'Elegant Designs',
    desc: 'Bespoke typography, subtle arabesques, timeless aesthetics.',
  },
  {
    icon: <RiPenNibLine size={26} className="text-mint" />,
    title: 'Fully Customised',
    desc: 'Names, dates, Ayat, maps, and event schedules tailored for you.',
  },
  {
    icon: <RiLeafLine size={26} className="text-mint" />,
    title: 'Digital & Eco-Friendly',
    desc: 'Share worldwide instantly — no printing, no delays.',
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-10 border-t border-mint/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-mint/[0.06]">
          {PILLARS.map((p, i) => (
            <div key={i} className="flex items-start gap-5 py-10 px-6 group hover:bg-navy-mid/30 transition-colors duration-300">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-navy border border-mint/15 flex items-center justify-center group-hover:border-mint/35 transition-colors">
                {p.icon}
              </div>
              <div>
                <h3 className="MiguErsansRegular text-base text-white mb-1">{p.title}</h3>
                <p className="dm-sans text-xs text-mint-dim/50 font-light leading-snug">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
