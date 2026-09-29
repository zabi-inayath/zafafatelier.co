import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiArrowRightLine } from 'react-icons/ri';
import { BRAND } from '../../constants';

export default function CtaBanner({ onOpenOrderModal, onOpenInteractiveDemo }) {
  return (
    <section className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08 overflow-hidden">

      {/* Big ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031d3d]/50 to-[#020b17]/80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#b5e8c5]/[0.07] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 text-center">

        {/* Bismillah */}
        <p className="font-arabic text-2xl text-[#b5e8c5]/50 mb-6" style={{ fontFamily: 'Amiri, serif' }}>
          بِسْمِ ٱللَّٰهِ
        </p>

        {/* Giant statement */}
        <h2 className="display-xl text-white mb-6">
          Let's Make Your<br />
          <em className="not-italic text-[#b5e8c5]">Special Moment</em><br />
          <span className="text-white/50">Memorable</span>
        </h2>

        <p className="text-sm sm:text-base text-[#8aaa97] font-light max-w-lg mx-auto mb-10 leading-relaxed">
          Get a beautiful, Islamic-friendly invitation suite crafted for your blessed occasion.
          Zero music. 100% barakah.
        </p>

        {/* CTA buttons */}
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

        {/* Direct line */}
        <p className="mt-8 text-xs text-[#3f5e4d] font-mono">
          Studio line: <span className="text-[#b5e8c5]/60">{BRAND.whatsappNumber}</span>
        </p>

      </div>
    </section>
  );
}
