import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiVolumeMuteLine, RiSafeLine, RiLeafLine, RiArrowRightLine } from 'react-icons/ri';
import { BRAND } from '../../constants';

const VALUES = [
  { icon: <RiVolumeMuteLine size={22} />, label: 'No Music', sub: 'Halal audio only' },
  { icon: <RiSafeLine size={22} />, label: 'No Haram', sub: 'Modest & appropriate' },
  { icon: <RiLeafLine size={22} />, label: '100% Halal', sub: 'Sunnah aligned' },
];

export default function Hero({ onOpenOrderModal, onOpenInteractiveDemo }) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Dot field */}
      <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" />

      {/* Atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#b5e8c5]/[0.055] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#031d3d]/60 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 pb-16 sm:pb-20 w-full">

        {/* ── BISMILLAH ── */}
        <div className="mb-5 sm:mb-6 text-center">
          <span
            className="text-xl sm:text-3xl text-[#b5e8c5]/70 tracking-widest"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </span>
        </div>

        {/* ── TWO-COLUMN: text | phone ── */}
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 xl:gap-16 items-center">

          {/* ───── LEFT — content ───── */}
          <div className="text-center lg:text-left">

            {/* Headline */}
            <h1 className="display-xl text-white mb-4 sm:mb-6">
              Beautiful<br />
              <em className="not-italic text-[#b5e8c5]">Invitations</em><br />
              <span className="text-white/55">for Blessed</span><br />
              Moments <span className="text-[#b5e8c5]/45 text-4xl sm:text-5xl lg:text-6xl">🤍</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#8aaa97] text-sm sm:text-base font-light max-w-md mx-auto lg:mx-0 leading-relaxed mb-7 sm:mb-8">
              Web Invitations, E-Invites &amp; Cinematic Video Invites
              crafted with barakah — zero music, zero haram content.
            </p>

            {/* ── 3-COL VALUE BAR ── */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-7 sm:mb-8 max-w-sm mx-auto lg:mx-0 sm:max-w-md">
              {VALUES.map(item => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border border-[#b5e8c5]/12 bg-[#031a2e]/60 hover:border-[#b5e8c5]/28 hover:bg-[#041d36]/80 transition-all duration-200 group cursor-default"
                >
                  <span className="text-[#b5e8c5] group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <p className="text-white font-semibold text-[11px] sm:text-xs leading-tight text-center">{item.label}</p>
                  <p className="text-[#5e7d6a] text-[9px] sm:text-[10px] font-light leading-tight text-center hidden sm:block">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* ── CTA BUTTONS ── */}
            <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start">
              <button className="btn-mint" onClick={onOpenOrderModal}>
                Order Invitation <RiArrowRightLine size={15} />
              </button>
              <button onClick={onOpenInteractiveDemo} className="btn-outline">
                Live RSVP Demo
              </button>
            </div>

            {/* Quranic verse — hidden on mobile to save space */}
            <div className="hidden sm:block mt-8 pt-7 border-t border-[#b5e8c5]/10 max-w-lg mx-auto lg:mx-0">
              <p
                className="text-[#b5e8c5]/60 text-base sm:text-lg leading-relaxed text-right mb-1"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا"
              </p>
              <p className="text-[11px] text-[#566e5e] italic font-light">
                Surah Ar-Rum: 21 — "Among His signs is that He created for you mates…"
              </p>
            </div>
          </div>

          {/* ───── RIGHT — iPhone 17 Pro (desktop only) ───── */}
          <div className="hidden lg:flex relative justify-center items-center">

            {/* Glow rings */}
            <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-[#b5e8c5]/08 anim-spin-slow pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] rounded-full border border-[#b5e8c5]/05 pointer-events-none" />

            {/* Phone frame */}
            <div
              className="relative anim-breath"
              style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.85)) drop-shadow(0 0 60px rgba(181,232,197,0.06))' }}
            >
              <svg
                width="290" height="608"
                viewBox="0 0 290 608"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                <defs>
                  <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3a3d42" />
                    <stop offset="25%" stopColor="#5c6068" />
                    <stop offset="50%" stopColor="#2e3035" />
                    <stop offset="75%" stopColor="#48494e" />
                    <stop offset="100%" stopColor="#2a2b2f" />
                  </linearGradient>
                  <linearGradient id="innerBezel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1b1e" />
                    <stop offset="100%" stopColor="#111215" />
                  </linearGradient>
                  <clipPath id="screenClip">
                    <rect x="13" y="18" width="264" height="572" rx="44" ry="44" />
                  </clipPath>
                  <linearGradient id="sheen" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.06" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.01" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <filter id="diBlur">
                    <feGaussianBlur stdDeviation="0.5" />
                  </filter>
                </defs>

                {/* Titanium body */}
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="url(#titanium)" />
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" />

                {/* Inner bezel */}
                <rect x="6" y="6" width="278" height="596" rx="48" ry="48" fill="url(#innerBezel)" />

                {/* Screen */}
                <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="#020b17" />

                {/* Video */}
                <foreignObject x="13" y="18" width="264" height="572" clipPath="url(#screenClip)">
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '44px', background: '#020b17' }}>
                    <video
                      id="hero-invitation-video"
                      autoPlay loop muted playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    >
                      <source src="/videos/hero-invite.mp4" type="video/mp4" />
                    </video>
                  </div>
                </foreignObject>

                {/* Dynamic Island */}
                <rect x="101" y="28" width="88" height="28" rx="14" ry="14" fill="#090a0d" filter="url(#diBlur)" />
                <rect x="102" y="29" width="86" height="26" rx="13" ry="13" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <circle cx="172" cy="42" r="5" fill="#0d0e10" />
                <circle cx="172" cy="42" r="2.5" fill="#1a1c22" />
                <circle cx="173.5" cy="40.5" r="0.8" fill="rgba(255,255,255,0.15)" />

                {/* Sheen */}
                <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="url(#sheen)" />

                {/* Right: power */}
                <rect x="286" y="180" width="4" height="76" rx="2" fill="#444649" />
                <rect x="286.5" y="181" width="3" height="74" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

                {/* Left: volume up */}
                <rect x="0" y="168" width="4" height="52" rx="2" fill="#444649" />
                <rect x="0.5" y="169" width="3" height="50" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* volume down */}
                <rect x="0" y="232" width="4" height="52" rx="2" fill="#444649" />
                <rect x="0.5" y="233" width="3" height="50" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* action */}
                <rect x="0" y="138" width="4" height="24" rx="2" fill="#3f4144" />
                <rect x="0.5" y="139" width="3" height="22" rx="1.5" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />

                {/* Home bar */}
                <rect x="107" y="573" width="76" height="4" rx="2" fill="rgba(255,255,255,0.18)" />

                {/* Outer bevel */}
                <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="2.5" />
              </svg>

              {/* Floating tag — delivery */}
              <div className="absolute -top-4 -right-5 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#031327] border border-[#b5e8c5]/30 shadow-xl text-xs font-medium text-[#b5e8c5]">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping shrink-0" />
                24–48h Delivery
              </div>

              {/* Floating tag — halal */}
              <div className="absolute -bottom-4 left-14 px-4 py-2 rounded-full bg-[#031327] border border-[#c9a84c]/30 shadow-xl text-xs font-medium text-[#c9a84c]">
                🤍 Halal &amp; Sunnah Aligned
              </div>

            </div>
          </div>

        </div>

        {/* ── Scroll hint ── */}
        <div className="mt-10 sm:mt-14 flex items-center gap-3 text-[#4a6655] text-xs font-medium justify-center lg:justify-start">
          <div className="w-10 h-px bg-[#b5e8c5]/20" />
          <span>Scroll to explore</span>
        </div>

      </div>
    </section>
  );
}
