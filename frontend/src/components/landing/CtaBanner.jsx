import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiArrowRightLine } from 'react-icons/ri';
import { BRAND } from '../../constants';

export default function CtaBanner({ onOpenOrderModal, onOpenInteractiveDemo }) {
  return (
    <section className="relative py-28 sm:py-40 border-t border-mint/[0.06] overflow-hidden">

      {/* Big ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-ink/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-mint/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold/[0.04] blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">

        {/* Bismillah */}
        <p className="font-arabic text-2xl text-mint/45 mb-6" style={{ fontFamily: 'Amiri, serif' }}>
          بِسْمِ ٱللَّٰهِ
        </p>

        {/* Eyebrow */}
        <p className="poppins text-[10px] sm:text-xs text-mint tracking-[0.25em] uppercase font-semibold opacity-65 mb-6">
          Begin Your Journey
        </p>

        {/* Headline */}
        <h2 className="MiguErsansRegular text-[clamp(2.8rem,7vw,7.5rem)] text-white leading-none mb-8">
          Let's Make Your<br />
          <span className="text-mint">Special Moment</span><br />
          <span className="text-white/40">Memorable</span>
        </h2>

        <p className="dm-sans text-sm sm:text-base text-mint-dim/60 font-light max-w-lg mx-auto mb-12 leading-relaxed">
          Get a beautiful, Islamic-friendly invitation suite crafted for your blessed occasion.
          Zero music. 100% barakah.
        </p>

        {/* Divider */}
        <div className="mx-auto mb-12 w-28 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="btn-mint" onClick={onOpenOrderModal}>
            Order Your Invitation <RiArrowRightLine size={18} />
          </button>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <FaWhatsapp size={18} />
            Order on WhatsApp
          </a>
          <button onClick={onOpenInteractiveDemo} className="btn-outline">
            View Live Demo
          </button>
        </div>

        {/* Studio line */}
        <p className="dm-sans mt-10 text-xs text-mint-dim/30 font-mono">
          Studio line: <span className="text-mint/50">{BRAND.whatsappNumber}</span>
        </p>

      </div>
    </section>
  );
}
