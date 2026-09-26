import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiCloseLine, RiFileCopyLine, RiCheckLine } from 'react-icons/ri';
import { BRAND } from '../constants';

export default function OrderModal({ isOpen, onClose, initialData = {} }) {
  const [type, setType] = useState('Web Invitation');
  const [occasion, setOccasion] = useState('Nikah & Walima');
  const [clientName, setClientName] = useState('');
  const [coupleNames, setCoupleNames] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState('');
  const [lang, setLang] = useState('English + Arabic Bismillah');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialData.serviceId === 'web-invitations') setType('Web Invitation');
    else if (initialData.serviceId === 'e-invites') setType('E-Invite (Digital Card)');
    else if (initialData.serviceId === 'video-invites') setType('Video Wedding Invitation');
    if (initialData.templateTitle) setNotes(`Interested in: ${initialData.templateTitle}`);
    if (initialData.occasionTitle) setOccasion(initialData.occasionTitle);
  }, [initialData]);

  if (!isOpen) return null;

  const buildMsg = () => {
    let m = `*Assalamu Alaikum Zafaf Atelier!* 🤍\n\n`;
    m += `Invitation Inquiry:\n`;
    m += `• *Format:* ${type}\n`;
    m += `• *Occasion:* ${occasion}\n`;
    if (clientName) m += `• *Contact:* ${clientName}\n`;
    if (coupleNames) m += `• *Names:* ${coupleNames}\n`;
    if (eventDate) m += `• *Date:* ${eventDate}\n`;
    if (city) m += `• *City/Venue:* ${city}\n`;
    m += `• *Language:* ${lang}\n`;
    if (notes) m += `• *Notes:* ${notes}\n`;
    m += `\nKindly share process, timeline &amp; pricing. JazakAllah khair!`;
    return m;
  };

  const handleWhatsapp = e => {
    e.preventDefault();
    window.open(`https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(buildMsg())}`, '_blank');
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildMsg());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls = 'w-full px-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-sm text-white placeholder-[#2f4d3a] focus:outline-hidden focus:border-[#b5e8c5]/45 transition-colors';
  const labelCls = 'block text-[11px] text-[#4a6655] uppercase tracking-wider mb-1.5 font-medium';

  return (
    <div className="fixed inset-0 z-50 bg-[#020b17]/92 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#031221] rounded-3xl border border-[#b5e8c5]/18 p-7 sm:p-10 shadow-2xl my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[#b5e8c5]/18 flex items-center justify-center text-[#b5e8c5]/50 hover:text-[#b5e8c5] hover:border-[#b5e8c5]/40 transition-all cursor-pointer"
        >
          <RiCloseLine size={18} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="label-caps mb-2">Bespoke Invitation Inquiry</p>
          <h3 className="text-3xl text-white font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Start Your Blessed Invitation
          </h3>
          <p className="text-xs text-[#4a6655] mt-2 font-light">
            We'll connect directly on WhatsApp and have your first design preview ready in 24–48 hours.
          </p>
        </div>

        <form onSubmit={handleWhatsapp} className="space-y-5">
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Format Needed</label>
              <select value={type} onChange={e => setType(e.target.value)} className={inputCls}>
                <option value="Web Invitation">Wedding Web Invitation</option>
                <option value="E-Invite (Digital Card)">E-Invite (Digital Card)</option>
                <option value="Video Wedding Invitation">Video Invitation (No Music)</option>
                <option value="Complete Suite">Complete Suite (All 3)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Occasion</label>
              <select value={occasion} onChange={e => setOccasion(e.target.value)} className={inputCls}>
                <option value="Nikah">Nikah Ceremony</option>
                <option value="Walima">Walimatul Nikah</option>
                <option value="Nikah & Walima">Nikah &amp; Walima Combined</option>
                <option value="Aqiqah">Aqiqah Celebration</option>
                <option value="Islamic Engagement">Islamic Engagement</option>
                <option value="Mahfil / Khatam">Mahfil / Khatam</option>
                <option value="Custom">Custom Occasion</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Bride &amp; Groom Names</label>
              <input type="text" placeholder="e.g. Farhan &amp; Zahra" value={coupleNames} onChange={e => setCoupleNames(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Your Name</label>
              <input type="text" placeholder="Contact person" value={clientName} onChange={e => setClientName(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Event Date</label>
              <input type="text" placeholder="e.g. Nov 2026 or DD/MM/YYYY" value={eventDate} onChange={e => setEventDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>City / Venue</label>
              <input type="text" placeholder="e.g. Mumbai, Dubai, London" value={city} onChange={e => setCity(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className={labelCls}>Language &amp; Calligraphy</label>
            <select value={lang} onChange={e => setLang(e.target.value)} className={inputCls}>
              <option value="English + Arabic Bismillah">English with Arabic Bismillah</option>
              <option value="Dual Language (English + Urdu)">Dual Language (English + Urdu)</option>
              <option value="Arabic Only">Full Arabic Calligraphy</option>
              <option value="Urdu Only">Full Urdu Nastaliq</option>
              <option value="Custom Multilingual">Custom Multilingual</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className={labelCls}>Special Notes / Preferences</label>
            <textarea rows={2} placeholder="Theme, Ayat, rush delivery, guest count…" value={notes} onChange={e => setNotes(e.target.value)}
              className={`${inputCls} resize-none`} />
          </div>

          {/* Islamic guarantee */}
          <div className="p-3.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/10 text-[11px] text-[#3a5244] font-light">
            <span className="text-[#b5e8c5]/80 font-semibold">Zafaf Guarantee —</span>{' '}
            100% music-free, halal compliant, crafted with reverence for your occasion.
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-[#25d366]/20">
              <FaWhatsapp size={18} /> Connect on WhatsApp
            </button>
            <button type="button" onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#b5e8c5]/20 text-[#b5e8c5]/70 hover:text-[#b5e8c5] hover:border-[#b5e8c5]/40 text-xs font-semibold transition-all cursor-pointer">
              {copied ? <RiCheckLine size={16} className="text-[#25d366]" /> : <RiFileCopyLine size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
