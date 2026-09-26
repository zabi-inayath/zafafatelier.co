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
        <div className="mb-6 text-center">
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
            {/* Giant display headline */}
            <h1 className="display-xl text-white mb-6">
              Beautiful<br />
              <em className="not-italic text-[#b5e8c5]">Invitations</em><br />
              <span className="text-white/60">for Blessed</span><br />
              Moments <span className="text-[#b5e8c5]/50 text-5xl sm:text-6xl">🤍</span>
            </h1>

            {/* One-line brand credo */}
            <p className="text-[#8aaa97] text-sm sm:text-base font-light max-w-lg leading-relaxed mb-10">
              Web Invitations, E-Invites and Cinematic Video Invites.<br/>
              Crafted with barakah with zero music and zero haram content.
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

              {/* <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25d366] text-sm font-medium hover:text-[#4ae386] transition-colors"
              >
                <FaWhatsapp size={20} />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a> */}
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

          {/* RIGHT — Hero visual: iPhone 17 Pro SVG mockup */}
          <div className="relative flex justify-center items-center">

            {/* Ambient glow rings */}
            <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-[#b5e8c5]/08 anim-spin-slow pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] rounded-full border border-[#b5e8c5]/05 pointer-events-none" />

            {/* iPhone 17 Pro Frame */}
            <div className="relative anim-breath" style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.85)) drop-shadow(0 0 60px rgba(181,232,197,0.06))' }}>

              {/*
                iPhone 17 Pro dimensions (scaled):
                Frame:  290 × 608  outer  (ratio ≈ 1:2.097)
                Screen: 264 × 570  inner  (10px bezel sides, 18px top, 20px bottom)
                Corner: 52px outer / 44px screen
                Dynamic Island: centered pill 88×28px, 14px from top of screen
              */}
              <svg
                width="290"
                height="608"
                viewBox="0 0 290 608"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                <defs>
                  {/* Titanium body gradient */}
                  <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3a3d42" />
                    <stop offset="25%" stopColor="#5c6068" />
                    <stop offset="50%" stopColor="#2e3035" />
                    <stop offset="75%" stopColor="#48494e" />
                    <stop offset="100%" stopColor="#2a2b2f" />
                  </linearGradient>

                  {/* Inner bezel gradient */}
                  <linearGradient id="innerBezel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1b1e" />
                    <stop offset="100%" stopColor="#111215" />
                  </linearGradient>

                  {/* Screen clip */}
                  <clipPath id="screenClip">
                    <rect x="13" y="18" width="264" height="572" rx="44" ry="44" />
                  </clipPath>

                  {/* Outer phone clip */}
                  <clipPath id="phoneClip">
                    <rect x="0" y="0" width="290" height="608" rx="52" ry="52" />
                  </clipPath>

                  {/* Subtle sheen overlay */}
                  <linearGradient id="sheen" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.06" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.01" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>

                  {/* Dynamic Island blur */}
                  <filter id="diBlur">
                    <feGaussianBlur stdDeviation="0.5" />
                  </filter>
                </defs>

                {/* ── OUTER TITANIUM BODY ── */}
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="url(#titanium)" />

                {/* Subtle edge highlight top-left */}
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52"
                  fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" />

                {/* ── INNER DISPLAY BEZEL ── */}
                <rect x="6" y="6" width="278" height="596" rx="48" ry="48" fill="url(#innerBezel)" />

                {/* ── SCREEN AREA (video goes here) ── */}
                <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="#020b17" />

                {/* foreignObject — video fills the screen rect exactly */}
                <foreignObject x="13" y="18" width="264" height="572" clipPath="url(#screenClip)">
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '44px', background: '#020b17' }}>
                    <video
                      id="hero-invitation-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    >
                      {/* Replace src with your video file once uploaded to /public/videos/ */}
                      <source src="/videos/hero-invite.mp4" type="video/mp4" />
                    </video>
                  </div>
                </foreignObject>

                {/* ── DYNAMIC ISLAND ── */}
                {/* Pill cutout background */}
                <rect x="101" y="28" width="88" height="28" rx="14" ry="14" fill="#090a0d" filter="url(#diBlur)" />
                {/* Subtle inner glow on pill */}
                <rect x="102" y="29" width="86" height="26" rx="13" ry="13"
                  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                {/* Camera dot inside island */}
                <circle cx="172" cy="42" r="5" fill="#0d0e10" />
                <circle cx="172" cy="42" r="2.5" fill="#1a1c22" />
                <circle cx="173.5" cy="40.5" r="0.8" fill="rgba(255,255,255,0.15)" />

                {/* ── SHEEN OVERLAY (glass reflection) ── */}
                <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="url(#sheen)" />

                {/* ── SIDE BUTTONS — RIGHT: Power ── */}
                <rect x="286" y="180" width="4" height="76" rx="2" fill="#444649" />
                <rect x="286.5" y="181" width="3" height="74" rx="1.5"
                  fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

                {/* ── SIDE BUTTONS — LEFT: Volume up ── */}
                <rect x="0" y="168" width="4" height="52" rx="2" fill="#444649" />
                <rect x="0.5" y="169" width="3" height="50" rx="1.5"
                  fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* Volume down */}
                <rect x="0" y="232" width="4" height="52" rx="2" fill="#444649" />
                <rect x="0.5" y="233" width="3" height="50" rx="1.5"
                  fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* Action button */}
                <rect x="0" y="138" width="4" height="24" rx="2" fill="#3f4144" />
                <rect x="0.5" y="139" width="3" height="22" rx="1.5"
                  fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />

                {/* ── BOTTOM HOME BAR ── */}
                <rect x="107" y="573" width="76" height="4" rx="2" fill="rgba(255,255,255,0.18)" />

                {/* ── OUTER EDGE SUBTLE DARK BEVEL ── */}
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52"
                  fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="2.5" />
              </svg>

              {/* Floating tag — halal */}
              <div className="absolute -bottom-4 left-14 px-4 py-2 rounded-full bg-[#031327] border border-[#c9a84c]/30 shadow-xl text-xs font-medium text-[#c9a84c]">
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
