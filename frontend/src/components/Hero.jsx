import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiVolumeMuteLine, RiSafeLine, RiLeafLine, RiArrowRightLine } from 'react-icons/ri';
import { BRAND } from '../constants';

export default function Hero({ onOpenOrderModal, onOpenInteractiveDemo }) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Full-page dot field */}
      <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" />

      {/* Atmospheric radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#b5e8c5]/[0.055] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#031d3d]/60 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">

        {/* ── BISMILLAH ── */}
        <div className="mb-6 text-center lg:text-left">
          <span
            className="font-arabic text-2xl sm:text-3xl text-[#b5e8c5]/75 tracking-widest"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </span>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-16 items-center">

          {/* LEFT — Editorial headline */}
          <div>
            {/* Category label */}
            <p className="label-caps mb-5">Islamic Wedding Atelier · Est. 2024</p>

            {/* Giant display headline */}
            <h1 className="display-xl text-white mb-6">
              Beautiful<br />
              <em className="not-italic text-[#b5e8c5]">Invitations</em><br />
              <span className="text-white/60">for Blessed</span><br />
              Moments <span className="text-[#b5e8c5]/50 text-5xl sm:text-6xl">🤍</span>
            </h1>

            {/* One-line brand credo */}
            <p className="text-[#8aaa97] text-sm sm:text-base font-light max-w-lg leading-relaxed mb-10">
              Web Invitations · E-Invites · Cinematic Video Invites.
              Crafted with barakah — zero music, zero haram content.
            </p>

            {/* Islamic value chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <RiVolumeMuteLine size={16} />, label: 'No Music' },
                { icon: <RiSafeLine size={16} />, label: 'No Haram Content' },
                { icon: <RiLeafLine size={16} />, label: '100% Halal' },
              ].map(chip => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#b5e8c5]/18 bg-[#031327]/50 text-[#b5e8c5]/80 text-xs font-medium"
                >
                  <span className="text-[#b5e8c5]">{chip.icon}</span>
                  {chip.label}
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 items-center">
              <button className="btn-mint" onClick={onOpenOrderModal}>
                Order Invitation <RiArrowRightLine size={16} />
              </button>

              <button
                onClick={onOpenInteractiveDemo}
                className="btn-outline"
              >
                Live RSVP Demo
              </button>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25d366] text-sm font-medium hover:text-[#4ae386] transition-colors"
              >
                <FaWhatsapp size={20} />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>

            {/* Quranic verse */}
            <div className="mt-10 pt-8 border-t border-[#b5e8c5]/10 max-w-lg">
              <p
                className="text-[#b5e8c5]/65 text-base sm:text-lg leading-relaxed text-right mb-1"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا"
              </p>
              <p className="text-[11px] text-[#566e5e] italic font-light">
                Surah Ar-Rum: 21 — "Among His signs is that He created for you mates…"
              </p>
            </div>
          </div>

          {/* RIGHT — Hero visual */}
          <div className="relative flex justify-center items-center">

            {/* Spinning thin ring */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#b5e8c5]/10 anim-spin-slow" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-[#b5e8c5]/08" />

            {/* Image frame */}
            <div className="relative anim-breath">
              <div className="w-72 xl:w-80 rounded-[2.5rem] overflow-hidden border border-[#b5e8c5]/25 shadow-2xl shadow-black/80 bg-[#020b17]">
                <img
                  src="/images/hero-phone.jpg"
                  alt="Zafaf Atelier invitation preview"
                  className="w-full h-auto object-cover"
                />
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b17]/60 via-transparent to-transparent" />
              </div>

              {/* Floating tag — delivery */}
              <div className="absolute -top-4 -right-6 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#031327] border border-[#b5e8c5]/30 shadow-xl text-xs font-medium text-[#b5e8c5]">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping shrink-0" />
                24–48h Delivery
              </div>

              {/* Floating tag — halal */}
              <div className="absolute -bottom-4 -left-6 px-4 py-2 rounded-full bg-[#031327] border border-[#c9a84c]/30 shadow-xl text-xs font-medium text-[#c9a84c]">
                🤍 Halal &amp; Sunnah Aligned
              </div>
            </div>

          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="mt-16 flex items-center gap-3 text-[#4a6655] text-xs font-medium">
          <div className="w-12 h-px bg-[#b5e8c5]/20" />
          <span>Scroll to explore</span>
        </div>

      </div>
    </section>
  );
}
