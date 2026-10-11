import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { BRAND } from '../../constants';

const messages = [
  'Order yours',
  'Chat with us',
  'We’re online',
];

export default function FloatingWhatsApp() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let hideTimer;
    let showTimer;
    let cancelled = false;

    const runCycle = () => {
      if (cancelled) return;

      setShowMessage(true);

      hideTimer = window.setTimeout(() => {
        setShowMessage(false);

        setMessageIndex((prev) => (prev + 1) % messages.length);

        showTimer = window.setTimeout(runCycle, 10000);
      }, 5000);
    };

    // Show immediately when the website loads.
    runCycle();

    return () => {
      cancelled = true;
      window.clearTimeout(hideTimer);
      window.clearTimeout(showTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-[9999] flex items-center justify-end gap-3">

      {/* Animated message pill */}
      <div
        className={`pointer-events-none transition-all duration-500 ease-out ${
          showMessage
            ? 'translate-x-0 scale-100 opacity-100'
            : 'translate-x-3 scale-95 opacity-0'
        }`}
        aria-hidden={!showMessage}
      >
        <div className="relative rounded-full border border-[#25D366]/20 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
            </span>

            <span className="text-sm font-semibold tracking-tight text-[#193B2B]">
              {messages[messageIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:bg-[#20BD5A] active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />

        <FaWhatsapp
          size={29}
          className="relative z-10 transition-transform duration-300 group-hover:rotate-[-8deg]"
        />
      </a>
    </div>
  );
}