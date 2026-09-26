import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import { BRAND } from '../constants';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#templates' },
  { label: 'Process', href: '#process' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onOpenOrderModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#020b17]/92 backdrop-blur-xl '
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-[88px] flex items-center justify-between">

          {/* Logo only — text removed per user change */}
          <a href="#top" className="flex items-center shrink-0">
            <img
              src="/zafaf-logo.png"
              alt="Zafaf Atelier"
              className="h-18 w-auto object-contain rounded-2xl py-1"
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-[13px] font-medium text-[#c8e6d4]/70 hover:text-[#b5e8c5] transition-colors duration-200 tracking-wide
                  after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#b5e8c5]/60 hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366]/12 hover:border-[#25d366]/70 transition-all"
            >
              <FaWhatsapp size={18} />
            </a>

            <button
              onClick={onOpenOrderModal}
              className="btn-mint text-[11px] px-4 py-1.5 hidden sm:inline-flex"
            >
             Grap Yours
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(v => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#b5e8c5]/20 text-[#b5e8c5] hover:border-[#b5e8c5]/50 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <RiCloseLine size={20} /> : <RiMenu4Line size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#020b17]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-7 text-center"
          onClick={() => setOpen(false)}
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display-md text-white hover:text-[#b5e8c5] transition-colors"
              style={{ fontSize: '2.4rem', fontWeight: 300 }}
            >
              {l.label}
            </a>
          ))}
          <div className="rule-fade w-48 my-2" />
          <button
            onClick={() => { setOpen(false); onOpenOrderModal(); }}
            className="btn-mint mt-2"
          >
            Order Invitation
          </button>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#25d366] text-sm font-medium"
          >
            <FaWhatsapp size={18} /> {BRAND.whatsappNumber}
          </a>
        </div>
      )}
    </>
  );
}
