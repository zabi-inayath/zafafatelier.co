import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiMapPinLine, RiCalendarLine, RiSendPlaneLine, RiCheckboxCircleFill, RiVolumeMuteLine } from 'react-icons/ri';

export default function InteractiveDemoModal({ isOpen, onClose, onOrderThis }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const [t, setT] = useState({ d: 48, h: 14, m: 32, s: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setT(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { ...prev, d: Math.max(0, prev.d - 1), h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#020b17]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-sm bg-[#020f1d] rounded-3xl border border-[#b5e8c5]/20 overflow-hidden shadow-2xl my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-[#b5e8c5]/20 flex items-center justify-center text-[#b5e8c5]/60 hover:text-[#b5e8c5] hover:border-[#b5e8c5]/50 transition-all cursor-pointer"
        >
          <RiCloseLine size={18} />
        </button>

        {/* Screen body */}
        <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto max-h-[90vh]">

          {/* Demo label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#b5e8c5]/20 text-[10px] label-caps">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-ping shrink-0" />
            Interactive Web Invite Preview
          </div>

          {/* Bismillah */}
          <p className="text-xl text-[#b5e8c5]/70" style={{ fontFamily: 'Amiri, serif' }}>
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          {/* Couple */}
          <div>
            <p className="label-caps mb-2 text-[#c9a84c]">Walimatul Nikah</p>
            <h2 className="text-4xl text-white font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Zayd &amp; Sophia
            </h2>
            <p className="text-xs text-[#7a9d89] font-light mt-2 italic">
              Request the honour of your presence &amp; prayers
            </p>
          </div>

          {/* Countdown */}
          <div className="p-4 rounded-2xl bg-[#031429] border border-[#b5e8c5]/12">
            <p className="label-caps mb-3 text-center">Days Until Blessed Occasion</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: t.d, label: 'Days' },
                { val: t.h, label: 'Hrs' },
                { val: t.m, label: 'Min' },
                { val: t.s, label: 'Sec' },
              ].map(unit => (
                <div key={unit.label} className="bg-[#020b17] rounded-xl py-3 border border-[#b5e8c5]/08">
                  <div className="text-xl font-light text-[#b5e8c5]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-[#3a5244] uppercase tracking-wider">{unit.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event info */}
          <div className="space-y-2.5 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031429]/80 border border-[#b5e8c5]/10">
              <RiCalendarLine size={20} className="text-[#b5e8c5] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Saturday, 24th October 2026</p>
                <p className="text-[11px] text-[#5e7d6a]">Nikah 5:00 PM · Walima Dinner 7:30 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#031429]/80 border border-[#b5e8c5]/10">
              <RiMapPinLine size={20} className="text-[#b5e8c5] shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">The Grand Palace Ballroom, London</p>
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="text-[10px] px-2 py-1 rounded-md bg-[#b5e8c5]/12 text-[#b5e8c5] border border-[#b5e8c5]/20 hover:bg-[#b5e8c5] hover:text-[#020b17] transition-all">
                Maps
              </a>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="p-4 rounded-2xl bg-[#031429] border border-[#b5e8c5]/12 text-left">
            <p className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Interactive RSVP</p>
            {submitted ? (
              <div className="py-4 text-center">
                <RiCheckboxCircleFill size={36} className="text-[#25d366] mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">RSVP Received, Alhamdulillah!</p>
                <p className="text-[11px] text-[#5e7d6a] mt-1">Thank you, {name}.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="text-[10px] text-[#b5e8c5]/60 underline mt-2 cursor-pointer">Edit</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); name.trim() && setSubmitted(true); }} className="space-y-3">
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Your name…"
                  className="w-full px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/18 text-xs text-white placeholder-[#3a5244] focus:outline-hidden focus:border-[#b5e8c5]/50"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select value={attending} onChange={e => setAttending(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/18 text-xs text-white focus:outline-hidden">
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                  <input type="number" min="1" max="10" value={guests} onChange={e => setGuests(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/18 text-xs text-white focus:outline-hidden" />
                </div>
                <button type="submit" className="btn-mint w-full justify-center text-[11px]">
                  <RiSendPlaneLine size={16} /> Submit RSVP
                </button>
              </form>
            )}
          </div>

          {/* No music badge */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#3a5244]">
            <RiVolumeMuteLine size={14} className="text-[#b5e8c5]/50" />
            This celebration is strictly music-free &amp; halal compliant.
          </div>

          {/* Order CTA */}
          <button
            onClick={() => { onClose(); onOrderThis(); }}
            className="btn-mint w-full justify-center"
          >
            Order a Web Invitation for Your Event
          </button>

        </div>
      </div>
    </div>
  );
}
