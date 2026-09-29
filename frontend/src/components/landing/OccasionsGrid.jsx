import React from 'react';
import { OCCASIONS } from '../../constants';
import { RiHeartLine, RiBuilding2Line, RiUserAddLine, RiGiftLine, RiBookOpenLine, RiCalendarScheduleLine, RiArrowRightLine } from 'react-icons/ri';

const ICONS = {
  nikah: <RiHeartLine size={28} />,
  walima: <RiBuilding2Line size={28} />,
  aqiqah: <RiUserAddLine size={28} />,
  engagement: <RiGiftLine size={28} />,
  mahfil: <RiBookOpenLine size={28} />,
  custom: <RiCalendarScheduleLine size={28} />,
};

export default function OccasionsGrid({ onSelectOccasion }) {
  return (
    <section id="occasions" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08 bg-[#020c1b]/50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="label-caps mb-3">Occasions We Craft For</p>
          <h2 className="display-lg text-white">
            Every Blessed<br />
            <em className="not-italic text-[#b5e8c5]">Celebration</em>
          </h2>
        </div>

        {/* Occasions — horizontal scrollable row on mobile, grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {OCCASIONS.map(occ => (
            <button
              key={occ.id}
              onClick={() => onSelectOccasion(occ.title)}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-[#b5e8c5]/10 hover:border-[#b5e8c5]/35 bg-[#041525]/60 hover:bg-[#051d36]/80 transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer"
            >
              <div className="text-[#b5e8c5]/60 group-hover:text-[#b5e8c5] transition-colors">
                {ICONS[occ.id]}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#b5e8c5] transition-colors mb-1 leading-snug">{occ.title}</h3>
                <p className="text-[11px] text-[#5e7d6a] font-light leading-snug">{occ.desc}</p>
              </div>
              <RiArrowRightLine size={14} className="text-[#b5e8c5]/0 group-hover:text-[#b5e8c5]/60 transition-all translate-x-0 group-hover:translate-x-1" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
