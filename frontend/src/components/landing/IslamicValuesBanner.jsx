import React from 'react';
import { RiVolumeMuteLine, RiSafeLine, RiHeartLine } from 'react-icons/ri';

const PILLARS = [
  {
    icon: <RiVolumeMuteLine size={34} className="text-[#b5e8c5]" />,
    no: '01',
    title: 'Strictly Zero Music',
    body: 'We respect the sacredness of your union. Every digital card, website, and video is 100% free of musical instruments and songs — by design, not as an afterthought.',
  },
  {
    icon: <RiSafeLine size={34} className="text-[#b5e8c5]" />,
    no: '02',
    title: 'Modest & Halal Content',
    body: 'Zero inappropriate imagery, animated figures, or conflicting themes. Designed with dignified Islamic modesty so you never have to compromise your deen for modern design.',
  },
  {
    icon: <RiHeartLine size={34} className="text-[#b5e8c5]" />,
    no: '03',
    title: 'Barakah from the First Word',
    body: 'Every creation opens with Bismillah and is adorned with duas for everlasting love and mercy. A blessed start deserves a blessed announcement.',
  },
];

export default function IslamicValuesBanner() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08 overflow-hidden">

      {/* Faint ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031d3d]/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Big editorial header */}
        <div className="mb-16 sm:mb-20">
          <p className="label-caps mb-3">Our Commitment</p>
          <h2 className="display-xl text-white leading-none">
            Built on<br />
            <em className="not-italic text-[#b5e8c5]">Islamic</em><br />
            <span className="text-white/50">Values</span>
          </h2>
        </div>

        {/* Three pillars — numbered editorial list */}
        <div className="space-y-0 divide-y divide-[#b5e8c5]/08">
          {PILLARS.map((p, i) => (
            <div
              key={p.no}
              className="group grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-12 items-start py-10 hover:bg-[#041929]/40 transition-colors duration-300 rounded-xl px-4 -mx-4"
            >
              {/* Number */}
              <span
                className="text-5xl font-light text-[#b5e8c5]/15 group-hover:text-[#b5e8c5]/30 transition-colors leading-none"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {p.no}
              </span>

              {/* Icon + Title */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-[#031a31] border border-[#b5e8c5]/15 flex items-center justify-center shrink-0 group-hover:border-[#b5e8c5]/35 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-xl sm:text-2xl text-white font-light leading-snug mt-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {p.title}
                </h3>
              </div>

              {/* Body */}
              <p className="text-sm text-[#7a9d89] font-light leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
