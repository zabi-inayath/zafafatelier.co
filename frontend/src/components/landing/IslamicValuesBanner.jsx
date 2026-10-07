import React from 'react';
import { RiVolumeMuteLine, RiSafeLine, RiHeartLine } from 'react-icons/ri';

const PILLARS = [
  {
    icon: <RiVolumeMuteLine size={30} className="text-mint" />,
    no: '01',
    title: 'Strictly Zero Music',
    body: 'We respect the sacredness of your union. Every digital card, website, and video is 100% free of musical instruments and songs — by design, not as an afterthought.',
  },
  {
    icon: <RiSafeLine size={30} className="text-mint" />,
    no: '02',
    title: 'Modest & Halal Content',
    body: 'Zero inappropriate imagery, animated figures, or conflicting themes. Designed with dignified Islamic modesty so you never have to compromise your deen for modern design.',
  },
  {
    icon: <RiHeartLine size={30} className="text-mint" />,
    no: '03',
    title: 'Barakah from the First Word',
    body: 'Every creation opens with Bismillah and is adorned with duas for everlasting love and mercy. A blessed start deserves a blessed announcement.',
  },
];

export default function IslamicValuesBanner() {
  return (
    <section className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <p className="poppins text-[10px] sm:text-xs text-mint tracking-[0.25em] uppercase font-semibold opacity-65 mb-4">
            Our Commitment
          </p>
          <h2 className="MiguErsansRegular text-[clamp(3rem,7vw,7.5rem)] text-white leading-none">
            Built on<br />
            <span className="text-mint">Islamic</span><br />
            <span className="text-white/35">Values</span>
          </h2>
        </div>

        {/* Pillars — numbered editorial list */}
        <div className="divide-y divide-mint/[0.06]">
          {PILLARS.map((p, i) => (
            <div
              key={p.no}
              className="group grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-16 items-start py-10 hover:bg-navy-mid/30 transition-colors duration-300 rounded-2xl px-4 -mx-4"
            >
              {/* Number */}
              <span className="MiguErsansRegular text-5xl font-light text-mint/12 group-hover:text-mint/25 transition-colors leading-none">
                {p.no}
              </span>

              {/* Icon + Title */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-navy border border-mint/15 flex items-center justify-center shrink-0 group-hover:border-mint/35 transition-colors">
                  {p.icon}
                </div>
                <h3 className="MiguErsansRegular text-xl sm:text-2xl text-white font-light leading-snug mt-2">
                  {p.title}
                </h3>
              </div>

              {/* Body */}
              <p className="dm-sans text-sm text-mint-dim/60 font-light leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
