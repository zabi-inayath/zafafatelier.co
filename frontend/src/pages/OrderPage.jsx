import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import { orderApi } from '../services/api';
import AppHeader from '../components/common/AppHeader';
import toast from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  RiSparklingLine,
  RiCheckLine,
  RiFileCopyLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiUserLine,
  RiShieldCheckLine
} from 'react-icons/ri';
import { BRAND } from '../constants';

export default function OrderPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [type, setType] = useState('Web Invitation');
  const [occasion, setOccasion] = useState('Nikah');
  const [coupleNames, setCoupleNames] = useState('');
  const [clientName, setClientName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [eventDate, setEventDate] = useState('');
  const [city, setCity] = useState('');
  const [lang, setLang] = useState('English + Arabic Bismillah');
  const [notes, setNotes] = useState('');

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Prepopulate from state/query
  useEffect(() => {
    const state = location.state || {};
    if (state.serviceId === 'web-invitations') setType('Web Invitation');
    else if (state.serviceId === 'e-invites') setType('E-Invite (Digital Card)');
    else if (state.serviceId === 'video-invites') setType('Video Wedding Invitation');
    if (state.templateTitle) setNotes(`Interested in: ${state.templateTitle}`);
    if (state.occasionTitle) setOccasion(state.occasionTitle);

    if (user) {
      if (!clientName) setClientName(user.name || '');
      if (!contactEmail) setContactEmail(user.email || '');
      if (!contactPhone && user.phone) setContactPhone(user.phone || '');
    }
  }, [location.state, user]);

  const buildMsg = (orderNum = '') => {
    let m = `*Assalamu Alaikum Zafaf Atelier!* ✨\n\n`;
    if (orderNum) {
      m += `*Order Reference:* #${orderNum}\n\n`;
    }
    m += `*Invitation Inquiry:*\n`;
    m += `• *Format:* ${type}\n`;
    m += `• *Occasion:* ${occasion}\n`;
    if (clientName) m += `• *Contact:* ${clientName}\n`;
    if (coupleNames) m += `• *Names:* ${coupleNames}\n`;
    if (eventDate) m += `• *Date:* ${eventDate}\n`;
    if (city) m += `• *City/Venue:* ${city}\n`;
    m += `• *Language:* ${lang}\n`;
    if (notes) m += `• *Notes:* ${notes}\n`;
    m += `\nKindly share process, timeline & pricing. JazakAllah khair!`;
    return m;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await orderApi.create({
        product_type: type,
        occasion,
        couple_names: coupleNames,
        client_name: clientName || user?.name || 'Client',
        contact_email: contactEmail || user?.email || '',
        contact_phone: contactPhone || user?.phone || '',
        event_date: eventDate,
        city_venue: city,
        language_calligraphy: lang,
        notes,
      });

      const orderData = res.data?.order;
      setSubmittedOrder(orderData);
      toast.success('Your invitation inquiry has been registered successfully!');

      const whatsappMsg = buildMsg(orderData?.order_number);
      window.open(
        `https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(whatsappMsg)}`,
        '_blank'
      );
    } catch (err) {
      const fallbackMsg = buildMsg();
      window.open(
        `https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(fallbackMsg)}`,
        '_blank'
      );
      toast.success('Connected to Zafaf WhatsApp artisan!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    const text = buildMsg(submittedOrder?.order_number);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-sm text-white placeholder-[#2f4d3a] focus:outline-none focus:border-[#b5e8c5]/50 transition-colors';
  const labelCls =
    'block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1.5 font-semibold';

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020b17] flex items-center justify-center p-6">
        <DotMatrixLoader text="Preparing Order Studio..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#031327] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      {/* Global Navbar */}
      <AppHeader current="order" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-10 anim-app-screen">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-[#b5e8c5]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#b5e8c5] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#b5e8c5]" />
              <span>Bespoke Order Atelier</span>
            </div>
            <h1
              className="text-4xl md:text-5xl text-white font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Commission Your Blessed Invitation
            </h1>
            <p className="text-sm text-[#8ab89c] mt-2 font-light">
              Crafted exclusively for your sacred occasion. 100% music-free, halal compliant &amp; timeless.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="text-xs text-[#8ab89c] hover:text-[#b5e8c5] inline-flex items-center gap-1.5 underline"
          >
            <span>View All My Orders</span>
            <RiArrowRightLine size={14} />
          </Link>
        </div>

        {submittedOrder ? (
          /* Confirmation Screen */
          <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#031221] border border-[#b5e8c5]/25 shadow-2xl text-center space-y-6 anim-app-screen">
            <div className="w-16 h-16 rounded-full bg-[#b5e8c5]/20 text-[#b5e8c5] flex items-center justify-center mx-auto border border-[#b5e8c5]/40">
              <RiSparklingLine size={32} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#b5e8c5] font-bold mb-1">
                Alhamdulillah · Order Inquiry Confirmed
              </p>
              <h2
                className="text-3xl text-white font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Order #{submittedOrder.order_number}
              </h2>
              <p className="text-xs text-[#8ab89c] mt-2 font-light">
                Your bespoke invitation inquiry has been saved to your account and forwarded to our lead wedding artisan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/15 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8ab89c]">Format:</span>
                <span className="text-white font-semibold">{type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8ab89c]">Occasion:</span>
                <span className="text-white font-semibold">{occasion}</span>
              </div>
              {coupleNames && (
                <div className="flex justify-between">
                  <span className="text-[#8ab89c]">Couple:</span>
                  <span className="text-[#b5e8c5] font-semibold">{coupleNames}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8ab89c]">Status:</span>
                <span className="text-emerald-300 font-semibold">Registered in Studio</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(buildMsg(submittedOrder.order_number))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#25d366]/20 cursor-pointer"
              >
                <FaWhatsapp size={18} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                to="/dashboard"
                className="px-6 py-3.5 rounded-xl border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold hover:bg-[#b5e8c5]/10 transition-all inline-flex items-center justify-center"
              >
                Go to My Orders
              </Link>
            </div>
          </div>
        ) : (
          /* Split Order Builder Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7 bg-[#031221] rounded-3xl border border-[#b5e8c5]/20 p-7 sm:p-9 shadow-2xl space-y-6 ">
              {!isAuthenticated && (
                <div className="p-3.5 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/20 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#8ab89c]">
                    <RiUserLine size={16} className="text-[#b5e8c5]" />
                    <span>Have a Zafaf account? Sign in to save &amp; track this draft live.</span>
                  </div>
                  <Link
                    to="/login"
                    className="px-3 py-1 rounded-lg bg-[#b5e8c5] text-[#020b17] font-bold text-[11px] hover:bg-[#cbf4d8] transition-all whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Format & Occasion */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Format Needed</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className={inputCls}
                    >
                      <option value="Web Invitation">Wedding Web Invitation</option>
                      <option value="E-Invite (Digital Card)">E-Invite (Digital Card)</option>
                      <option value="Video Wedding Invitation">Video Invitation (No Music)</option>
                      <option value="Complete Suite">Complete Suite (All 3)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className={inputCls}
                    >
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

                {/* Names */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Bride &amp; Groom Names</label>
                    <input
                      type="text"
                      placeholder="e.g. Farhan &amp; Zahra"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input
                      type="text"
                      placeholder="Contact person"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Contact Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>WhatsApp Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Date & Venue */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Event Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 2026 or 24/11/2026"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>City / Venue</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Dubai, London"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Calligraphy */}
                <div>
                  <label className={labelCls}>Language &amp; Calligraphy</label>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className={inputCls}
                  >
                    <option value="English + Arabic Bismillah">English with Arabic Bismillah</option>
                    <option value="Dual Language (English + Urdu)">Dual Language (English + Urdu)</option>
                    <option value="Arabic Only">Full Arabic Calligraphy</option>
                    <option value="Urdu Only">Full Urdu Nastaliq</option>
                    <option value="Custom Multilingual">Custom Multilingual</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className={labelCls}>Special Preferences / Quranic Ayats</label>
                  <textarea
                    rows={2}
                    placeholder="Color palette, Surah Ar-Rum Ayat, rush delivery..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#25d366]/20 cursor-pointer disabled:opacity-50"
                  >
                    <FaWhatsapp size={18} />
                    <span>{submitting ? 'Registering Order...' : 'Submit & Connect on WhatsApp'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#b5e8c5]/20 text-[#b5e8c5]/80 hover:text-[#b5e8c5] hover:border-[#b5e8c5]/40 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {copied ? <RiCheckLine size={16} className="text-[#25d366]" /> : <RiFileCopyLine size={16} />}
                    <span>{copied ? 'Copied' : 'Copy Inquiry'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right 5 Columns: Live Preview Summary Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-3xl bg-[#031221] border border-[#b5e8c5]/25 shadow-2xl space-y-5 sticky top-32">
                <div className="flex items-center justify-between border-b border-[#b5e8c5]/15 pb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#b5e8c5] font-semibold">
                      Live Studio Preview
                    </p>
                    <h3
                      className="text-2xl text-white font-light"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      Invitation Summary
                    </h3>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#b5e8c5]/15 text-[#b5e8c5] flex items-center justify-center">
                    <RiSparklingLine size={16} />
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 space-y-2">
                    <p className="text-[10px] text-[#8ab89c] uppercase tracking-wider font-semibold">
                      Selected Invitation
                    </p>
                    <p className="text-base text-white font-semibold">{type}</p>
                    <p className="text-xs text-[#b5e8c5]">{occasion}</p>
                  </div>

                  {coupleNames && (
                    <div className="p-4 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 space-y-1">
                      <p className="text-[10px] text-[#8ab89c] uppercase tracking-wider font-semibold">
                        Honored Couple
                      </p>
                      <p
                        className="text-xl text-white font-light"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {coupleNames}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-[#020b17] border border-[#b5e8c5]/10">
                      <span className="text-[10px] text-[#8ab89c] block">Date</span>
                      <span className="text-white font-medium truncate block">{eventDate || 'To be decided'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#020b17] border border-[#b5e8c5]/10">
                      <span className="text-[10px] text-[#8ab89c] block">Venue / City</span>
                      <span className="text-white font-medium truncate block">{city || 'Worldwide'}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 space-y-1.5 text-[11px] text-[#8ab89c]">
                    <div className="flex items-center gap-1.5 text-[#b5e8c5] font-semibold">
                      <RiShieldCheckLine size={14} />
                      <span>Artisan Guarantee</span>
                    </div>
                    <p className="leading-relaxed">
                      First preview draft ready within 24–48 hours. Unlimited calligraphy adjustments until blessed perfection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
