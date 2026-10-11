import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiSparklingLine,
  RiFilePdfLine,
} from 'react-icons/ri';
import Footer from '../components/landing/Footer';

export default function PdfInvitation() {
  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-10 sm:pt-14 pb-24 anim-app-screen">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#b5e8c5] hover:text-[#cbf4d8] uppercase tracking-wider transition-colors group"
          >
            <RiArrowLeftLine
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>All Categories</span>
          </Link>
        </div>

        {/* Category Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold uppercase tracking-widest">
            <RiSparklingLine size={13} />
            <span>Smart Interactive PDFs</span>
          </div>

          <div className="space-y-1">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              PDF Invitations
            </h1>
            <p
              className="text-xl text-[#d4af37] font-light"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              بطاقات إلكترونية تفاعلية
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#8ab89c] font-light leading-relaxed max-w-2xl">
            High-resolution multi-page electronic wedding brochures featuring clickable links for RSVP, location navigation, and gift registry notes.
          </p>
        </div>

        {/* Bespoke PDF Invitation Showcase Card */}
        <div className="p-10 sm:p-14 rounded-3xl bg-[#031424]/80 border border-[#b5e8c5]/25 backdrop-blur-xl max-w-3xl mx-auto text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#b5e8c5]/10 via-[#d4af37]/05 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="w-18 h-18 rounded-3xl bg-[#b5e8c5]/10 border border-[#b5e8c5]/20 text-[#b5e8c5] flex items-center justify-center mx-auto shadow-inner">
            <RiFilePdfLine size={34} />
          </div>

          <div className="space-y-3">
            <h2
              className="text-3xl sm:text-4xl text-white font-light tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Interactive Digital PDF Suites
            </h2>
            <p className="text-sm text-[#8ab89c] font-light leading-relaxed max-w-lg mx-auto">
              Deliver luxurious multi-page wedding itineraries straight into WhatsApp or email with tap-to-open map directions, calendar reminders, and contact buttons.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#c8e2d2] max-w-lg mx-auto">
            <span className="p-3 rounded-xl bg-white/5 border border-white/10">📍 Clickable Map Links</span>
            <span className="p-3 rounded-xl bg-white/5 border border-white/10">✨ Tap-to-RSVP Buttons</span>
            <span className="p-3 rounded-xl bg-white/5 border border-white/10">🖨️ Print-Ready Vector PDF</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/917448552778?text=${encodeURIComponent(
                'Assalamu Alaikum Zafaf Atelier, I would like to inquire about commissioning an interactive PDF Invitation suite for our wedding.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <span>Commission PDF Suite on WhatsApp</span>
              <RiArrowRightLine size={15} />
            </a>

            <Link
              to="/templates"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/30 text-[#b5e8c5] font-semibold text-xs transition-all"
            >
              <span>Browse Other Categories</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
