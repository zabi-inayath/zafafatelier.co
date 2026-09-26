import React from 'react';
import { RiSparklingLine, RiZoomOutLine, RiZoomInLine } from 'react-icons/ri';

const PILLARS = [
  {
    icon: <RiSparklingLine size={28} className="text-[#b5e8c5]" />,
    title: 'Elegant Designs',
    desc: 'Bespoke typography, subtle arabesques, timeless aesthetics.',
  },
  {
    icon: <RiZoomInLine size={28} className="text-[#b5e8c5]" />,
    title: 'Fully Customised',
    desc: 'Names, dates, Ayat, maps, and event schedules tailored for you.',
  },
  {
    icon: <RiZoomOutLine size={28} className="text-[#b5e8c5]" />,
    title: 'Digital & Eco-Friendly',
    desc: 'Share worldwide instantly — no printing, no delays.',
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-10 border-t border-[#b5e8c5]/08">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#b5e8c5]/08">
          {PILLARS.map((p, i) => (
            <div key={i} className="flex items-start gap-5 py-10 px-6 group hover:bg-[#041929]/40 transition-colors duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#031a31] border border-[#b5e8c5]/15 flex items-center justify-center group-hover:border-[#b5e8c5]/35 transition-colors">
                {p.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-xs text-[#5e7d6a] font-light leading-snug">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
