import React from 'react';
import { Link } from 'react-router-dom';
import { RiSparklingLine, RiArrowRightLine, RiEyeLine } from 'react-icons/ri';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { getAllTemplates } from '../templates/registry';

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Global Header */}
      <Navbar current="templates" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20 anim-app-screen">
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-8 rounded-3xl bg-[#031424] border border-[#b5e8c5]/25 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#b5e8c5]/50 transition-all flex flex-col justify-between"
            >
              {/* Subtle top corner ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#b5e8c5]/10 via-[#d4af37]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
                    {tpl.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                    {tpl.occasion}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-3xl text-white font-light tracking-wide"
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
                  <p className="text-sm text-[#8ab89c] font-light leading-relaxed mt-3">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={tpl.templateRoute}
                  className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#b5e8c5]/20 cursor-pointer"
                >
                  <RiEyeLine size={16} />
                  <span>View Template</span>
                </Link>
                <Link
                  to={`/order?template=${encodeURIComponent(tpl.slug)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/30 text-[#b5e8c5] font-semibold text-xs transition-all cursor-pointer"
                >
                  <span>Order Now</span>
                  <RiArrowRightLine size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
