import React from 'react';
import { OCCASIONS } from '../../constants';
import { RiHeartLine, RiBuilding2Line, RiUserAddLine, RiGiftLine, RiBookOpenLine, RiCalendarScheduleLine, RiArrowRightLine } from 'react-icons/ri';

const ICONS = {
  nikah:      <RiHeartLine              size={26} />,
  walima:     <RiBuilding2Line          size={26} />,
  aqiqah:     <RiUserAddLine            size={26} />,
  engagement: <RiGiftLine               size={26} />,
  mahfil:     <RiBookOpenLine           size={26} />,
  custom:     <RiCalendarScheduleLine   size={26} />,
};

export default function OccasionsGrid({ onSelectOccasion }) {
  return (
    <section id="occasions" className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="poppins text-[10px] sm:text-xs text-mint tracking-[0.25em] uppercase font-semibold opacity-65 mb-4">
            Occasions We Craft For
          </p>
          <h2 className="MiguErsansRegular text-[clamp(2.4rem,5vw,5rem)] text-white leading-none">
            Every Blessed<br />
            <span className="text-mint">Celebration</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OCCASIONS.map(occ => (
            <button
              key={occ.id}
              onClick={() => onSelectOccasion(occ.title)}
              className="group flex flex-col gap-4 p-6 rounded-3xl border border-mint/10 hover:border-mint/30 bg-navy-mid/40 hover:bg-navy-mid/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer"
            >
              <div className="text-mint/50 group-hover:text-mint transition-colors">
                {ICONS[occ.id]}
              </div>
              <div>
                <h3 className="MiguErsansRegular text-sm text-white group-hover:text-mint transition-colors mb-1 leading-snug">
                  {occ.title}
                </h3>
                <p className="dm-sans text-[11px] text-mint-dim/45 font-light leading-snug">{occ.desc}</p>
              </div>
              <RiArrowRightLine
                size={14}
                className="text-mint/0 group-hover:text-mint/60 transition-all translate-x-0 group-hover:translate-x-1"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
