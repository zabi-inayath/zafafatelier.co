import React from 'react';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { BRAND } from '../../constants';

const NAV_LINKS = [
  { label: 'Home',      href: '#top' },
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#templates' },
  { label: 'Process',   href: '#process' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'FAQ',       href: '#faq' },
];

const SERVICES_LIST = [
  'Wedding Web Invitations',
  'E-Invites (Digital Cards)',
  'Video Invitations',
  'Nikah Digital Suites',
  'Walima E-Invites',
  'Aqiqah Announcements',
];

export default function Footer({ onOpenOrderModal }) {
  return (
    <footer className="relative border-t border-mint/10 bg-ink pt-20 pb-10 overflow-hidden">

      {/* Subtle ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-mint/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/zafaf-trans.png" alt="Zafaf Atelier" className="h-16 w-auto mb-5 object-contain" />
            <p className="MiguErsansRegular text-2xl text-white font-light mb-2 leading-tight">
              Islamic E-Invitations<br />
              <span className="text-mint">&amp; Wedding Websites</span>
            </p>
            <p className="dm-sans text-xs text-mint-dim/35 leading-relaxed max-w-xs mb-7 font-light mt-3">
              Bespoke, modern digital invitations crafted with Islamic values.
              No music. No haram content. Just beautiful barakah.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: BRAND.whatsappUrl,              icon: <FaWhatsapp  size={18} />, color: '#25d366', label: 'WhatsApp' },
                { href: BRAND.instagramUrl,             icon: <FaInstagram size={18} />, color: '#e1306c', label: 'Instagram' },
                { href: `mailto:${BRAND.email}`,        icon: <FaEnvelope  size={18} />, color: '#b5e8c5', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-mint/15 flex items-center justify-center transition-all hover:border-mint/40 hover:scale-105"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h5 className="poppins text-[10px] text-mint tracking-[0.22em] uppercase font-semibold opacity-65 mb-5">Navigate</h5>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="dm-sans text-xs text-mint-dim/40 hover:text-mint transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h5 className="poppins text-[10px] text-mint tracking-[0.22em] uppercase font-semibold opacity-65 mb-5">Services</h5>
            <ul className="space-y-3">
              {SERVICES_LIST.map(s => (
                <li key={s} className="dm-sans text-xs text-mint-dim/40">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h5 className="poppins text-[10px] text-mint tracking-[0.22em] uppercase font-semibold opacity-65 mb-5">Get in Touch</h5>
            <div className="space-y-4">
              <div>
                <span className="poppins text-[9px] text-mint-dim/30 uppercase tracking-widest block mb-0.5">WhatsApp</span>
                <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer" className="dm-sans text-xs text-white hover:text-mint transition-colors font-mono">
                  {BRAND.whatsappNumber}
                </a>
              </div>
              <div>
                <span className="poppins text-[9px] text-mint-dim/30 uppercase tracking-widest block mb-0.5">Email</span>
                <a href={`mailto:${BRAND.email}`} className="dm-sans text-xs text-white hover:text-mint transition-colors break-all">
                  {BRAND.email}
                </a>
              </div>
              <div>
                <span className="poppins text-[9px] text-mint-dim/30 uppercase tracking-widest block mb-0.5">Website</span>
                <a href={`https://${BRAND.website}`} target="_blank" rel="noopener noreferrer" className="dm-sans text-xs text-white hover:text-mint transition-colors">
                  {BRAND.website}
                </a>
              </div>
            </div>

            <button onClick={onOpenOrderModal} className="btn-mint mt-7 text-[11px] px-5 py-2.5">
              Order Invitation
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="rule-fade mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="dm-sans text-[11px] text-mint-dim/25">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <span className="dm-sans text-[11px] text-mint-dim/25 text-center">
            A proud initiative of{' '}
            <a href={BRAND.parentCompanyUrl} target="_blank" rel="noopener noreferrer" className="text-mint/40 hover:text-mint transition-colors font-medium">
              {BRAND.parentCompany}
            </a>
          </span>
          <span className="dm-sans text-[11px] text-mint-dim/25">Crafted with barakah 🤍</span>
        </div>

      </div>
    </footer>
  );
}
