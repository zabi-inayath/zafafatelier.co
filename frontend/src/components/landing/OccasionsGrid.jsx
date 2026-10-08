import React from 'react';
import { OCCASIONS } from '../../constants';
import { RiHeartLine, RiBuilding2Line, RiUserAddLine, RiCalendarScheduleLine } from 'react-icons/ri';

const ICONS = {
  nikah: RiHeartLine,
  walima: RiBuilding2Line,
  aqiqah: RiUserAddLine,
  custom: RiCalendarScheduleLine,
};

function Eyebrow({ children }) {
  return (
    <p className="text-md sm:text-xl tracking-[0.25em] poppins uppercase font-semibold mb-8 text-center text-white">
      {children}
    </p>
  );
}

export default function OccasionsGrid({ onSelectOccasion }) {
  return (
    <section id="occasions" className="relative py-24 border-y border-white/[0.06] bg-navy/40 overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* Header */}
        <Eyebrow>Occasions We Craft For</Eyebrow>
        <div className="flex justify-center items-center flex-col text-center mb-16 text-5xl font-semibold dm-sans">
          <h2 className="text-white leading-tight">
            Every Blessed<br />
            <span className="text-mint">Celebration</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.06]">
          {OCCASIONS.map((occ) => {
            const Icon = ICONS[occ.id];

            return (
              <article
                key={occ.id}
                onClick={() => onSelectOccasion(occ.title)}
                className="
                  group relative
                  px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14
                  transition-all duration-500
                  hover:bg-white/[0.015]
                  cursor-pointer text-left
                  border-b border-r border-white/[0.06]
                "
              >
                {/* Soft hover glow */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-[radial-gradient(circle_at_20%_20%,rgba(173,255,224,0.045),transparent_55%)]
                    opacity-0 transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="
                      mb-8 flex h-18 w-18 items-center justify-start
                      text-mint/60
                      transition-all duration-500
                      group-hover:-translate-y-1 group-hover:text-mint
                    "
                  >
                    <Icon className="h-16 w-16" />
                  </div>

                  {/* Content */}
                  <div className="max-w-sm">
                    <h3
                      className="
                        font-['DM_Sans']
                        text-[20px]
                        font-medium
                        text-white
                        transition-colors
                        group-hover:text-mint
                      "
                    >
                      {occ.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        poppins
                        text-[14px]
                        font-medium
                        leading-[1.7]
                        text-white/50
                        transition-colors duration-300
                        group-hover:text-white/65
                      "
                    >
                      {occ.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
