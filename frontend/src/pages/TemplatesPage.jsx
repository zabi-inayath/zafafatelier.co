import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/common/AppHeader';
import { getAllTemplates, UPCOMING_TEMPLATES } from '../templates/registry';
import {
  RiSparklingLine,
  RiCheckLine,
  RiArrowRightLine,
  RiEyeLine,
  RiCalendarLine,
  RiHeartLine,
  RiCompass3Line
} from 'react-icons/ri';

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Global Header */}
      <AppHeader current="templates" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 anim-app-screen">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold uppercase tracking-widest">
            <RiSparklingLine size={13} />
            <span>Atelier Collection</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Wedding Invitation Suites
          </h1>

          <p className="text-sm sm:text-base text-[#8ab89c] font-light leading-relaxed">
            Explore our curated catalog of bespoke Islamic wedding web portals. Each suite is meticulously crafted with authentic Arabic calligraphy, live RSVP management, dual ceremony itineraries, and strictly music-free elegance.
          </p>
        </div>

        {/* Featured Live Template: Mizaan Royal */}
        <div className="space-y-12 mb-20">
          <div className="flex items-center justify-between pb-4 border-b border-[#b5e8c5]/15">
            <div>
              <h2 className="text-xl sm:text-2xl text-white font-serif">
                Featured Live Suites
              </h2>
              <p className="text-xs text-[#8ab89c] mt-0.5">
                Ready for immediate commission and guest deployment
              </p>
            </div>
            <span className="text-xs font-mono text-[#b5e8c5] px-3 py-1 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/20">
              {templates.length} Active Suite
            </span>
          </div>

          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#031424] border border-[#b5e8c5]/25 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#b5e8c5]/45 transition-all"
            >
              {/* Subtle top corner ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#b5e8c5]/10 via-[#d4af37]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
                      {tpl.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                      {tpl.occasion}
                    </span>
                    <span className="text-xs text-[#8ab89c] font-light">
                      {tpl.aesthetic}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-3xl sm:text-4xl text-white font-light tracking-wide"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {tpl.name}
                    </h3>
                    <p
                      className="text-xl text-[#d4af37] font-light mt-1"
                      style={{ fontFamily: 'Amiri, serif' }}
                    >
                      {tpl.arabicTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#8ab89c] font-light leading-relaxed mt-3">
                      {tpl.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#c8e2d2] pt-2">
                    {tpl.features.slice(0, 6).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <RiCheckLine size={15} className="text-[#b5e8c5] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to={tpl.route}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#b5e8c5]/20 cursor-pointer"
                    >
                      <RiEyeLine size={16} />
                      <span>Live Invitation View</span>
                    </Link>

                    <Link
                      to={tpl.templateRoute}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/30 text-[#b5e8c5] font-semibold text-xs transition-all cursor-pointer"
                    >
                      <RiCompass3Line size={16} />
                      <span>Template Mode</span>
                    </Link>

                    <Link
                      to={`/order?template=${encodeURIComponent(tpl.slug)}&type=Web+Invitation`}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-semibold text-[#8ab89c] hover:text-white transition-colors"
                    >
                      <span>Commission Suite</span>
                      <RiArrowRightLine size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right Visual Mockup Card */}
                <div className="lg:col-span-5">
                  <div className="relative p-6 sm:p-7 rounded-2xl bg-[#020b17]/90 border border-[#d4af37]/30 shadow-2xl text-center space-y-4 group-hover:border-[#d4af37]/50 transition-all">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37]">
                      <RiSparklingLine size={22} />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                        Preview Sample
                      </p>
                      <h4
                        className="text-2xl text-white font-light mt-1"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {tpl.sampleCouple.groom} <br />
                        <span className="text-base text-[#d4af37] font-serif">&amp;</span> <br />
                        {tpl.sampleCouple.bride}
                      </h4>
                      <p className="text-[11px] text-[#8ab89c] mt-2">
                        {tpl.sampleEvent.dateFormatted}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#8ab89c] flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Direct Dedicated Route: <strong className="text-white font-mono">{tpl.route}</strong></span>
                    </div>

                    <Link
                      to={tpl.route}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all"
                    >
                      <span>Open Fullscreen Screen</span>
                      <RiArrowRightLine size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Suites / Artisan Drafting Section */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#b5e8c5]/15">
            <h2 className="text-xl sm:text-2xl text-white font-serif">
              Upcoming Atelier Suites
            </h2>
            <p className="text-xs text-[#8ab89c] mt-0.5">
              Our master artisans are currently drafting these upcoming aesthetic wedding portals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_TEMPLATES.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-[#031424]/60 border border-dashed border-[#b5e8c5]/20 space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {item.status}
                  </span>
                  <span className="text-xs text-[#8ab89c]">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-2xl text-white font-light"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-lg text-[#d4af37] font-light mt-0.5"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    {item.arabicTitle}
                  </p>
                  <p className="text-xs text-[#8ab89c] font-light mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-[#b5e8c5]/70 italic">
                  Palette: {item.aesthetic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
