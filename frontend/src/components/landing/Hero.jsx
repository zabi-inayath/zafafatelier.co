import React, { useRef, useEffect } from 'react';
import { RiVolumeMuteLine, RiSafeLine, RiLeafLine, RiArrowRightLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { getAllTemplates } from '../../templates/registry';

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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center">
      {/* Decorative rings — desktop only */}
      <div className="absolute hidden lg:block w-[520px] h-[520px] rounded-full border border-dashed border-mint/[0.08] animate-hero-spin pointer-events-none" />
      <div className="absolute hidden lg:block w-[400px] h-[400px] rounded-full border border-mint/[0.04] pointer-events-none" />

      {/* Phone container with drop-shadow */}
      <div
        className="relative animate-hero-breathe w-[220px] sm:w-[240px] lg:w-[260px] xl:w-[260px] aspect-[290/608] select-none"
        style={{
          filter:
            'drop-shadow(0 40px 90px rgba(0,0,0,0.9)) drop-shadow(0 0 70px rgba(181,232,197,0.07))',
        }}
      >
        {/* Layer 1: Titanium Body & Inner Bezel */}
        <svg
          className="absolute inset-0 w-full h-full block"
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
          </defs>

          {/* Titanium body */}
          <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="url(#titanium)" />
          <rect x="0" y="0" width="290" height="608" rx="52" ry="52" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" />

          {/* Inner bezel */}
          <rect x="6" y="6" width="278" height="596" rx="48" ry="48" fill="url(#innerBezel)" />

          {/* Screen background */}
          <rect x="13" y="18" width="264" height="572" rx="44" ry="44" fill="#020b17" />
        </svg>

        {/* Layer 2: Video (Native HTML5 container - completely fixes iOS Safari foreignObject bug) */}
        <div
          className="absolute z-10 overflow-hidden rounded-[33px] sm:rounded-[36px] lg:rounded-[39px]"
          style={{
            left: '4.4827%',
            top: '2.9605%',
            width: '91.0345%',
            height: '94.0789%',
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            background: '#020b17',
          }}
        >
          <video
            ref={videoRef}
            id="hero-invitation-video"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            className="w-full h-full object-cover block pointer-events-none"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/videos/zafaf-demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 3: Glass Sheen, Dynamic Island, Home Bar & Hardware Buttons */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20 block"
          viewBox="0 0 290 608"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sheen" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.06" />
              <stop offset="40%" stopColor="white" stopOpacity="0.01" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="diBlur">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>

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
  const featuredTemplates = getAllTemplates().filter((tpl) => tpl.isAvailable);

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
          FEATURED PRODUCTS — Zafaf Signature
      ══════════════════════════════════════════ */}
      <Block className="px-4 sm:px-6 py-16 sm:py-24 w-full">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-3xl SpaceGrotesk sm:text-4xl text-[#d4af37] font-light tracking-wide">
            Zafaf Signature
          </h2>
          <div className="mt-2 w-10 h-0.5 bg-[#d4af37]/35 mx-auto rounded-full" />
        </div>

        {/* Products Grid (2 to 4 products responsive) */}
        <div
          className={`w-full mx-auto grid grid-cols-2 ${
            featuredTemplates.length > 2
              ? 'lg:grid-cols-4 max-w-6xl'
              : 'max-w-md sm:max-w-xl md:max-w-2xl'
          } gap-3 sm:gap-6`}
        >
          {featuredTemplates.map((tpl) => {
            const whatsappText = `Assalamu Alaikum Zafaf Atelier! I would like to inquire about ordering the "${tpl.name}" (${tpl.invitationType || 'Zafaf Signature'}) suite for our wedding.`;
            const whatsappUrl = `https://wa.me/917448552778?text=${encodeURIComponent(whatsappText)}`;

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
                {/* Image Preview Area with floating badge */}
                <div className="relative w-full aspect-[4/6] sm:aspect-[3/4] overflow-hidden bg-[#0a0f18]">
                  <img
                    src={tpl.image || '/images/web-invite.jpg'}
                    alt={tpl.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-left Pill Badge */}
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 z-10">
                    <span
                      className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-md tracking-wide ${badgeBg}`}
                    >
                      {tpl.badge || 'New'}
                    </span>
                  </div>
                </div>

                {/* Details Area */}
                <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-b from-[#182132] to-[#111827] flex flex-col justify-between flex-1 border-t border-white/5">
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-wide truncate">
                      {tpl.name}
                    </h3>
                    <p className="text-sm md:text-base font-semibold text-[#b5e8c5]">
                      ₹{tpl.price}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 mt-3 sm:mt-4 relative z-20 pointer-events-auto">
                    <Link
                      to={tpl.templateRoute || `/templates/webpage/${tpl.slug}`}
                      className="w-full py-2 sm:py-2.5 px-2 rounded-xl border border-[#d4af37]/35 bg-[#172030] hover:bg-[#d4af37]/20 text-[#d4af37] hover:text-[#faebd0] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 block shadow-sm active:scale-95 cursor-pointer touch-manipulation select-none"
                    >
                      VIEW DEMO
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2 sm:py-2.5 px-2 rounded-xl border border-[#d4af37]/35 bg-[#172030] hover:bg-[#d4af37]/20 text-[#d4af37] hover:text-[#faebd0] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 block shadow-sm active:scale-95 cursor-pointer touch-manipulation select-none"
                    >
                      ORDER NOW
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
          <a
            href="https://wa.me/917448552778?text=Assalamualaikum%2C%20I%20would%20like%20to%20order%20an%20invitation%20for%20my%20wedding"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mint flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 text-[15px]"
          >
            Order Invitation <RiArrowRightLine size={16} />
          </a>

          <Link
            to="/templates/webpage/mizaan-royal"
            className="btn-outline px-8 py-3.5 text-[15px] w-full sm:w-auto justify-center"
          >
            Live RSVP Demo
          </Link>
        </div>

      </Block>

    </section>
  );
}
