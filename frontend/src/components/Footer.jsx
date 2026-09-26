import React from 'react';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa6';
import { BRAND } from '../constants';

const COL_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#templates' },
  { label: 'Process', href: '#process' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
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
    <footer className="relative border-t border-[#b5e8c5]/10 bg-[#020b17] pt-20 pb-10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-5">
            <img src="/zafaf-logo.png" alt="Zafaf Atelier" className="h-20 w-auto mb-5 object-contain" />

            <p
              className="text-2xl text-white font-light mb-2 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Islamic E-Invitations<br />
              <em className="not-italic text-[#b5e8c5]">&amp; Wedding Websites</em>
            </p>

            <p className="text-xs text-[#4a6655] leading-relaxed max-w-xs mb-7 font-light mt-3">
              Bespoke, modern digital invitations crafted with Islamic values.
              No music. No haram content. Just beautiful barakah.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-3">
              {[
                { href: BRAND.whatsappUrl, icon: <FaWhatsapp size={18} />, color: '#25d366', label: 'WhatsApp' },
                { href: BRAND.instagramUrl, icon: <FaInstagram size={18} />, color: '#e1306c', label: 'Instagram' },
                { href: `mailto:${BRAND.email}`, icon: <FaEnvelope size={18} />, color: '#b5e8c5', label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-[#b5e8c5]/15 flex items-center justify-center transition-all hover:border-[#b5e8c5]/40 hover:scale-105"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h5 className="label-caps text-white mb-5">Navigate</h5>
            <ul className="space-y-3 text-xs">
              {COL_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#5e7d6a] hover:text-[#b5e8c5] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h5 className="label-caps text-white mb-5">Services</h5>
            <ul className="space-y-3 text-xs text-[#5e7d6a]">
              {SERVICES_LIST.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h5 className="label-caps text-white mb-5">Get in Touch</h5>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#3a5244] uppercase tracking-wider text-[10px] block mb-0.5">WhatsApp</span>
                <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b5e8c5] transition-colors font-mono">
                  {BRAND.whatsappNumber}
                </a>
              </div>
              <div>
                <span className="text-[#3a5244] uppercase tracking-wider text-[10px] block mb-0.5">Email</span>
                <a href={`mailto:${BRAND.email}`} className="text-white hover:text-[#b5e8c5] transition-colors break-all">{BRAND.email}</a>
              </div>
              <div>
                <span className="text-[#3a5244] uppercase tracking-wider text-[10px] block mb-0.5">Website</span>
                <a href={`https://${BRAND.website}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b5e8c5] transition-colors">{BRAND.website}</a>
              </div>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="btn-mint mt-7 text-[11px] px-5 py-2.5"
            >
              Order Invitation
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="rule-fade mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#2e4336]">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span className="text-center">
            A proud initiative of{' '}
            <a href={BRAND.parentCompanyUrl} target="_blank" rel="noopener noreferrer" className="text-[#b5e8c5]/50 hover:text-[#b5e8c5] transition-colors font-medium">
              {BRAND.parentCompany}
            </a>
          </span>
          <span>Crafted with barakah 🤍</span>
        </div>

      </div>
    </footer>
  );
}
