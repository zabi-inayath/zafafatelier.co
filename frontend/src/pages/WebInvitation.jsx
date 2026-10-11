import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiSparklingLine,
} from 'react-icons/ri';
import Footer from '../components/landing/Footer';
import { getAllTemplates } from '../templates/registry';

export default function WebInvitation() {
  const allTemplates = getAllTemplates();
  const webTemplates = allTemplates.filter((tpl) =>
    tpl.category?.toLowerCase().includes('web')
  );

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-8 sm:pt-14 pb-24 anim-app-screen">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/20 hover:border-[#b5e8c5]/50 text-[#b5e8c5] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] group"
          >
            <RiArrowLeftLine
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Web Invitations</span>
          </Link>
        </div>

        {/* Web Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {webTemplates.map((tpl) => {
            const whatsappText = `Assalamu Alaikum Zafaf Atelier! I would like to inquire about ordering the "${tpl.name}" (${tpl.invitationType || 'Web Invitation'}) suite for our wedding.`;
            const whatsappUrl = `https://wa.me/917448552778?text=${encodeURIComponent(whatsappText)}`;

            return (
              <div key={tpl.id} className="flex flex-col items-center">
                {/* Invitation Type - Centered Above the Template */}
                {/* <div className="mb-6 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#d4af37] backdrop-blur-md bg-[#d4af37]/10 border border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.12)]">
                    <span>{tpl.invitationType || 'Zafaf Signature'}</span>
                  </span>
                </div> */}

                {/* Category Header */}
                <div className="max-w-3xl mb-10 space-y-4">
                  <div className="space-y-2 text-center">
                    <h1
                      className="text-4xl SpaceGrotesk sm:text-5xl md:text-6xl text-[#d4af37] font-light tracking-wide"
                    >
                      {tpl.invitationType || 'Zafaf Signature'}
                    </h1>
                  </div>
                </div>

                {/* Template Card */}
                <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#031424] border border-[#b5e8c5]/25 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#b5e8c5]/50 transition-all flex flex-col justify-between flex-1">
                  {/* Ambient glow accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#b5e8c5]/10 via-[#d4af37]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="space-y-5">
                    {/* Template Image Preview */}
                    <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden relative bg-[#020b17] border border-[#b5e8c5]/15 shadow-md">
                      <img
                        src={tpl.image || '/images/web-invite.jpg'}
                        alt={tpl.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#031424]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
                        {tpl.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                        {tpl.occasion}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl text-white font-light tracking-wide"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {tpl.name}
                      </h3>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to={tpl.templateRoute || `/templates/webpage/${tpl.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 rounded-2xl backdrop-blur-xl bg-[#b5e8c5]/20 hover:bg-[#b5e8c5]/30 border border-[#b5e8c5]/40 hover:border-[#b5e8c5]/80 text-[#e4f4ea] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(181,232,197,0.25)] active:scale-[0.98] cursor-pointer"
                    >
                      <span>View Template</span>
                    </Link>

                    {/* Order Now - Direct WhatsApp Inquiry */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl backdrop-blur-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-[#b5e8c5]/50 text-[#b5e8c5] hover:text-white font-semibold text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_0_20px_rgba(181,232,197,0.2)] active:scale-[0.98] cursor-pointer"
                    >
                      <span>Order Now</span>
                      <RiArrowRightLine size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
