import React from 'react';
import { RiVolumeMuteLine, RiSafeLine, RiLeafLine, RiArrowRightLine } from 'react-icons/ri';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const VALUES = [
  {
    icon: <RiVolumeMuteLine size={32} />,
    label: 'No Music',
    sub: 'Every invite is silent — free from haram audio, rooted in dignity.',
  },
  {
    icon: <RiSafeLine size={32} />,
    label: 'No Haram Elements',
    sub: 'No inappropriate imagery, no mixed content. Modest & purposeful.',
  },
  {
    icon: <RiLeafLine size={32} />,
    label: '100% Halal',
    sub: 'Crafted with barakah — Sunnah aligned from concept to delivery.',
  },
];

/* ─────────────────────────────────────────────
   Sub-component: iPhone frame
───────────────────────────────────────────── */
function PhoneFrame() {
  return (
    <div className="relative flex justify-center items-center">

      {/* Decorative rings — desktop only */}
      <div className="absolute hidden lg:block w-[520px] h-[520px] rounded-full border border-dashed border-mint/[0.08] animate-hero-spin pointer-events-none" />
      <div className="absolute hidden lg:block w-[400px] h-[400px] rounded-full border border-mint/[0.04] pointer-events-none" />

      {/* Phone + shadow */}
      <div
        className="relative animate-hero-breathe"
        style={{
          filter:
            'drop-shadow(0 40px 90px rgba(0,0,0,0.9)) drop-shadow(0 0 70px rgba(181,232,197,0.07))',
        }}
      >
        <svg
          className="block w-[220px] sm:w-[240px] lg:w-[260px] xl:w-[260px] h-auto"
          viewBox="0 0 290 608"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '44px', background: '#020b17' }}
            >
              <video
                id="hero-invitation-video"
                autoPlay loop muted playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="/videos/zafaf-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </foreignObject>

          {/* Dynamic Island */}
          <rect x="101" y="28" width="88" height="28" rx="14" ry="14" fill="#090a0d" filter="url(#diBlur)" />
          <rect x="102" y="29" width="86" height="26" rx="13" ry="13" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="172" cy="42" r="5" fill="#0d0e10" />
          <circle cx="172" cy="42" r="2.5" fill="#1a1c22" />
          <circle cx="173.5" cy="40.5" r="0.8" fill="rgba(255,255,255,0.15)" />

          {/* Screen sheen */}
          <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="url(#sheen)" />

          {/* Power button */}
          <rect x="286" y="180" width="4" height="76" rx="2" fill="#444649" />
          <rect x="286.5" y="181" width="3" height="74" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

          {/* Volume up */}
          <rect x="0" y="168" width="4" height="52" rx="2" fill="#444649" />
          <rect x="0.5" y="169" width="3" height="50" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

          {/* Volume down */}
          <rect x="0" y="232" width="4" height="52" rx="2" fill="#444649" />
          <rect x="0.5" y="233" width="3" height="50" rx="1.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

          {/* Action button */}
          <rect x="0" y="138" width="4" height="24" rx="2" fill="#3f4144" />
          <rect x="0.5" y="139" width="3" height="22" rx="1.5" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />

          {/* Home bar */}
          <rect x="107" y="573" width="76" height="4" rx="2" fill="rgba(255,255,255,0.18)" />

          {/* Outer bevel */}
          <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="2.5" />
        </svg>

        {/* Floating badge — halal */}
        {/* <div className="absolute -bottom-4 md:left-12 flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/30 shadow-xl text-[11px] font-semibold text-gold whitespace-nowrap">
          🤍 Halal &amp; Sunnah Aligned
        </div> */}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: section block wrapper
───────────────────────────────────────────── */
function Block({ className = '', children }) {
  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center border-t border-mint/[0.06] ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: eyebrow label
───────────────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <p className="text-[11px] sm:text-sm tracking-[0.25em] poppins uppercase font-semibold mb-7 text-center">
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function Hero({ onOpenOrderModal, onOpenInteractiveDemo }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#020d1a 0%,#010a14 60%,#020d1a 100%)' }}
    >
      {/* Dot field */}
      <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" />

      {/* Atmospheric glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-mint/[0.045] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full bg-[#031d3d]/50 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-mint/[0.025] blur-[120px] pointer-events-none" />

      {/* ══════════════════════════════════════════
          BLOCK 1 — Phone + flanking headline text
      ══════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex items-center justify-center border-t-0 pt-28 pb-20 px-5 md:px-10">
        <div className="w-full max-width-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-0">

          {/* LEFT — "Beautiful Invitations" */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right md:pr-10 lg:pr-14 xl:pr-16 order-1">
            <h1 className="MiguErsansRegular text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none">
              Beautiful
            </h1>
            <h1 className="MiguErsansRegular text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              Invitations
            </h1>
          </div>

          {/* CENTRE — Phone */}
          <div className="order-2 flex justify-center">
            <PhoneFrame />
          </div>

          {/* RIGHT — "for Blessed Moments 🤍" */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-10 lg:pl-14 xl:pl-16 order-3">
            <p className="MiguErsansRegular text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none">
              for Blessed
            </p>
            <p className="MiguErsansRegular text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
              Moments
            </p>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          BLOCK 2 — Full-screen Tagline
      ══════════════════════════════════════════ */}
      <Block className="px-6 py-20">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-mint/[0.03] blur-[120px] pointer-events-none" />

        <Eyebrow>What we craft</Eyebrow>

        <h2 className="dm-sans text-[clamp(28px,5vw,88px)] font-semibold text-white text-center leading-[1.18] max-w-6xl mx-auto">
          Web Invitations, E-Invites &amp;{' '}
          <em className="not-italic text-mint">Cinematic Video Invites</em>{' '}
          crafted with{' '}
          <span
            className="font-bold"
            style={{
              background: 'linear-gradient(90deg, #c9a84c, #e8d08a, #c9a84c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            barakah
          </span>{' '}
          <br /> zero music, zero haram content.
        </h2>

        <div className="mt-11 w-28 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />
      </Block>

      {/* ══════════════════════════════════════════
          BLOCK 3 — Full-screen Value Cards
      ══════════════════════════════════════════ */}
      <Block className="px-6 py-20">
        <Eyebrow>Our promise</Eyebrow>
        <h2 className="dm-sans text-[clamp(22px,3vw,48px)] font-semibold text-white/90 text-center mb-14">
          Built on principles, not just design.
        </h2>

        <div className="dm-sans grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {VALUES.map((item) => (
            <div
              key={item.label}
              className="group relative flex flex-col items-center text-center px-8 py-11 rounded-3xl bg-navy-mid/65 border border-mint/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-mint/30 hover:-translate-y-1.5 cursor-default"
            >
              {/* Card glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-mint/[0.04] blur-[40px] pointer-events-none" />

              {/* Icon */}
              <div className="w-17 h-17 rounded-[18px] bg-mint/[0.07] border border-mint/15 flex items-center justify-center text-mint mb-6 shrink-0 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Label */}
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-[clamp(13px,1vw,15px)] text-mint-dim/90 font-light leading-relaxed max-w-[240px]">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </Block>

      {/* ══════════════════════════════════════════
          BLOCK 4 — Centered CTAs
      ══════════════════════════════════════════ */}
      <Block className="px-6 py-15">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-72 bg-mint/[0.03] blur-[100px] pointer-events-none" />

        <Eyebrow>Ready to begin?</Eyebrow>

        <h2 className="dm-sans text-[clamp(26px,4vw,64px)] font-semibold text-white text-center mb-3 leading-tight">
          Your invitation awaits.
        </h2>
        <p className="dm-sans text-[clamp(14px,1.1vw,17px)] text-mint-dim/80 font-light text-center max-w-md leading-relaxed mb-11">
          Join hundreds of families who chose elegance with barakah for their blessed day.
        </p>

        <div className="poppins flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xs sm:max-w-none">
          <button
            className="btn-mint flex items-center gap-2 px-8 py-3.5 text-[15px] w-full sm:w-auto justify-center"
            onClick={onOpenOrderModal}
          >
            Order Invitation <RiArrowRightLine size={16} />
          </button>
          <button
            className="btn-outline px-8 py-3.5 text-[15px] w-full sm:w-auto justify-center"
            onClick={onOpenInteractiveDemo}
          >
            Live RSVP Demo
          </button>
        </div>

      </Block>

    </section>
  );
}
