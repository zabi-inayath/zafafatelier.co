import React, { useState, useCallback } from 'react';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaEnvelope, 
  FaCheck, 
  FaCopy, 
  FaArrowUpRightFromSquare
} from 'react-icons/fa6';

const CONTACT_INFO = {
  phone: {
    raw: "+91 744 855 2778",
    formatted: "+91 744 855 2778",
    whatsappUrl: `https://wa.me/917448552778?text=${encodeURIComponent(
      "Assalamu Alaikum! I would like to inquire about bespoke Islamic digital invitations from Zafaf Atelier."
    )}`,
  },
  email: {
    address: "salam@mizaantech.co.in",
    mailtoUrl: `mailto:salam@mizaantech.co.in?subject=${encodeURIComponent(
      "Inquiry — Bespoke Digital Invitation | Zafaf Atelier"
    )}`,
  },
  instagram: {
    handle: "@zafafatelier.co",
    url: "https://instagram.com/zafafatelier.co",
  },
};

export default function App() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = useCallback((text, key, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-[#031327] text-[#e4f4ea] flex flex-col justify-between items-center px-4 sm:px-6 py-4 sm:py-6 md:py-8 select-none overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[650px] h-[300px] sm:h-[400px] bg-[#b5e8c5]/[0.08] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Top Header: Centered Bismillah */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-center text-center pt-1 sm:pt-2">
        <div className="font-['Amiri'] text-base sm:text-lg md:text-xl text-[#b5e8c5]/80 tracking-widest drop-shadow-sm">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      </header>

      {/* Main Centerpiece */}
      <main className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center py-2 sm:py-4">
        
        {/* Brand Logo with ambient halo */}
        <div className="relative mb-3 sm:mb-5 md:mb-6 animate-soft-breath">
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#b5e8c5]/20 via-[#b5e8c5]/10 to-transparent rounded-full blur-xl opacity-60 pointer-events-none" />
          <div className="relative p-1 rounded-2xl sm:rounded-3xl bg-[#041a33]/60 border border-[#b5e8c5]/20 backdrop-blur-md shadow-2xl shadow-black/70">
            <img
              src="/zafaf-logo.png"
              alt="Zafaf Atelier"
              className="w-36 sm:w-48 md:w-56 lg:w-60 h-auto rounded-xl sm:rounded-2xl object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-['Cinzel'] text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-medium tracking-wide text-white leading-tight mb-2 sm:mb-3 px-2">
          <span className="bg-gradient-to-r from-white via-[#ddfae8] to-[#b5e8c5] bg-clip-text text-transparent">
            Islamic Digital Invitations
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-[15px] text-[#91b8a3] font-light leading-relaxed max-w-md sm:max-w-lg mb-5 sm:mb-7 px-4">
          Crafting bespoke, interactive digital invitation suites & RSVP experiences for Nikah, Walima, and celebrated Islamic occasions.
        </p>

        {/* Contact Action List - Fully Responsive, No Truncation */}
        <div className="w-full max-w-md space-y-2.5 sm:space-y-3 px-1">
          
          {/* WhatsApp CTA */}
          <a
            href={CONTACT_INFO.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0a2f20]/90 via-[#052119]/90 to-[#041d33]/90 border border-[#25d366]/35 hover:border-[#25d366] text-white flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#25d366]/15 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 text-left min-w-0">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#25d366]/15 border border-[#25d366]/30 text-[#25d366] shrink-0 group-hover:scale-105 transition-transform">
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  WhatsApp Inquiry
                </div>
                <div className="text-[11px] sm:text-xs text-[#86c59f] font-mono">
                  {CONTACT_INFO.phone.formatted}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => handleCopy(CONTACT_INFO.phone.raw, 'phone', e)}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#25d366]/20 text-[#8ec8a5] hover:text-[#25d366] border border-white/5 hover:border-[#25d366]/30 transition-all shrink-0 ml-2"
              title="Copy phone number"
              aria-label="Copy phone number"
            >
              {copiedKey === 'phone' ? (
                <div className="flex items-center gap-1 text-[#25d366] text-[10px] font-medium px-1">
                  <FaCheck className="w-3 h-3" />
                  <span className="hidden xs:inline">Copied</span>
                </div>
              ) : (
                <FaCopy className="w-3.5 h-3.5" />
              )}
            </button>
          </a>

          {/* Instagram CTA */}
          <a
            href={CONTACT_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#041a32]/85 hover:bg-[#062445] border border-[#e1306c]/30 hover:border-[#e1306c] text-white flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#e1306c]/15 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 text-left min-w-0">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#e1306c]/15 border border-[#e1306c]/30 text-[#e1306c] shrink-0 group-hover:scale-105 transition-transform">
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  Instagram Studio
                </div>
                <div className="text-[11px] sm:text-xs text-[#a1c4b2]">
                  {CONTACT_INFO.instagram.handle}
                </div>
              </div>
            </div>

            <div className="p-2 rounded-lg text-[#e1306c] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
              <FaArrowUpRightFromSquare className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Email CTA */}
          <a
            href={CONTACT_INFO.email.mailtoUrl}
            className="group relative w-full p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#041a32]/85 hover:bg-[#072a4d] border border-[#b5e8c5]/25 hover:border-[#b5e8c5] text-white flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#b5e8c5]/15 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 text-left min-w-0">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#b5e8c5]/15 border border-[#b5e8c5]/30 text-[#b5e8c5] shrink-0 group-hover:scale-105 transition-transform">
                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-medium text-white tracking-wide">
                  Email Studio
                </div>
                <div className="text-[11px] sm:text-xs text-[#95bfa8] font-mono break-all sm:break-normal">
                  {CONTACT_INFO.email.address}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => handleCopy(CONTACT_INFO.email.address, 'email', e)}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#b5e8c5]/20 text-[#8ec8a5] hover:text-[#b5e8c5] border border-white/5 hover:border-[#b5e8c5]/30 transition-all shrink-0 ml-2"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedKey === 'email' ? (
                <div className="flex items-center gap-1 text-[#b5e8c5] text-[10px] font-medium px-1">
                  <FaCheck className="w-3 h-3" />
                  <span className="hidden xs:inline">Copied</span>
                </div>
              ) : (
                <FaCopy className="w-3.5 h-3.5" />
              )}
            </button>
          </a>

        </div>

      </main>

      {/* Studio Footer */}
      <footer className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5e836f] gap-1.5 pt-3 border-t border-[#b5e8c5]/10 text-center">
        <div>
          © {new Date().getFullYear()} Zafaf Atelier. All rights reserved.
        </div>
        <div className="flex items-center justify-center gap-1">
          <span>Developed by</span>
          <a 
            href='https://mizaantech.co.in/'
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b5e8c5] hover:underline font-medium"
          >
            Mizaan Tech
          </a>
        </div>
      </footer>

    </div>
  );
}
