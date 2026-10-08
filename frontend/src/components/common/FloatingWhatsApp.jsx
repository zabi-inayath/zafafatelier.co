import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { BRAND } from '../../constants';

export default function FloatingWhatsApp() {
  return (
    <a
      href={BRAND.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full border border-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
    </a>
  );
}
