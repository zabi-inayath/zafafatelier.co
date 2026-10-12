import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftLine, RiEyeLine } from 'react-icons/ri';
import Footer from '../components/landing/Footer';
import { getAllTemplates } from '../templates/registry';

export default function WebInvitation() {
  const allTemplates = getAllTemplates();
  const webTemplates = allTemplates.filter((tpl) =>
    tpl.category?.toLowerCase().includes('web')
  );

  // Group templates by invitationType (Category)
  const categories = React.useMemo(() => {
    const map = new Map();
    webTemplates.forEach((tpl) => {
      const typeName = tpl.invitationType || 'Zafaf Signature';
      if (!map.has(typeName)) {
        map.set(typeName, []);
      }
      map.get(typeName).push(tpl);
    });

    return Array.from(map.entries()).map(([name, templates]) => ({
      name,
      templates,
    }));
  }, [webTemplates]);

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      <main className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 pt-6 sm:pt-12 pb-24 anim-app-screen">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/20 hover:border-[#b5e8c5]/50 text-[#b5e8c5] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] group"
          >
            <RiArrowLeftLine
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Web Invitations</span>
          </Link>
        </div>

        {/* Grouped by Category - 2 Templates Per Row */}
        <div className="space-y-12 sm:space-y-16">
          {categories.map((category) => (
            <section key={category.name} className="flex flex-col">
              {/* Category Header - Centered Above the Templates */}
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="text-2xl SpaceGrotesk sm:text-3xl md:text-4xl text-[#d4af37] font-light tracking-wide">
                  {category.name}
                </h2>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-px w-28 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-[#d4af37]/70" />
                  <span className="h-px w-28 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                </div>
              </div>

              {/* 2 Templates Per Row Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {category.templates.map((tpl) => {
                  const whatsappText = `Assalamu Alaikum Zafaf Atelier! I would like to inquire about ordering the "${tpl.name}" (${category.name}) suite for our wedding.`;
                  const whatsappUrl = `https://wa.me/917448552778?text=${encodeURIComponent(whatsappText)}`;

                  // Badge tone styling
                  const badgeBg =
                    tpl.badge === 'Cinematic'
                      ? 'bg-[#c87a14]'
                      : tpl.badge === 'New'
                        ? 'bg-[#b8860b]'
                        : 'bg-[#966b1d]';

                  return (
                    <div
                      key={tpl.id}
                      className="w-full rounded-2xl sm:rounded-3xl bg-[#111827] border border-white/10 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-[#d4af37]/40"
                    >
                      {/* Image Preview Area with floating badge and View Demo */}
                      <div className="relative w-full aspect-[4/6] sm:aspect-[3/4] overflow-hidden bg-[#0a0f18]">
                        <img
                          src={tpl.image || '/images/web-invite.jpg'}
                          alt={tpl.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

                        {/* Top-left Pill Badge */}
                        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10">
                          <span
                            className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-md tracking-wide ${badgeBg}`}
                          >
                            {tpl.badge || 'Premium'}
                          </span>
                        </div>

                        {/* Floating "View Demo" Button */}
                        {/* <div className="absolute bottom-3 sm:bottom-4 inset-x-0 flex justify-center z-10 px-2">
                          <Link
                            to={tpl.templateRoute || `/templates/webpage/${tpl.slug}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#1e2634]/85 hover:bg-[#0c121e] backdrop-blur-md border border-white/25 hover:border-white/50 text-white text-[10px] sm:text-xs font-medium tracking-wide shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
                          >
                            <RiEyeLine size={13} className="shrink-0" />
                            <span>View Demo</span>
                          </Link>
                        </div> */}
                      </div>

                      {/* Details Area */}
                      <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-b from-[#182132] to-[#111827] flex flex-col justify-between flex-1 border-t border-white/5">
                        <div className="space-y-1">
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-wide truncate">
                            {tpl.name}
                          </h3>

                          {/* Price */}
                          <p className="text-md md:text-base font-semibold text-[#b5e8c5]">
                            ₹{tpl.price}
                          </p>

                          {/* One-time payment label */}
                          <p className="text-[10px] sm:text-xs font-medium tracking-wide text-white/60">
                            One-time payment · No subscription
                          </p>
                        </div>

                        {/* USE THIS DESIGN Button */}
                        <Link
                          to={tpl.templateRoute || `/templates/webpage/${tpl.slug}`}
                          className="mt-3 sm:mt-4 w-full py-2 sm:py-2.5 px-2 rounded-xl border border-[#d4af37]/35 bg-[#172030] hover:bg-[#d4af37]/20 text-[#d4af37] hover:text-[#faebd0] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 block shadow-sm active:scale-95 cursor-pointer"
                        >
                          View Demo
                        </Link>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 sm:mt-4 w-full py-2 sm:py-2.5 px-2 rounded-xl border border-[#d4af37]/35 bg-[#172030] hover:bg-[#d4af37]/20 text-[#d4af37] hover:text-[#faebd0] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 block shadow-sm active:scale-95 cursor-pointer"
                        >
                          ORDER NOW
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
