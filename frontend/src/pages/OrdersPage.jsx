import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import AppHeader from '../components/common/AppHeader';
import {
  RiShoppingBagLine,
  RiCalendarLine,
  RiMapPinLine,
  RiWhatsappLine,
  RiAddLine,
  RiFilter3Line,
  RiSparklingLine,
  RiCheckLine,
  RiTimeLine,
  RiArrowRightLine,
  RiEyeLine,
  RiCompass3Line
} from 'react-icons/ri';
import { BRAND } from '../constants';

export default function OrdersPage() {
  const { user, myOrders, loadingOrders, fetchMyOrders } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'in_progress', 'delivered'

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const filteredOrders = myOrders.filter((ord) => {
    if (filter === 'all') return true;
    return ord.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <RiCheckLine size={13} />
            <span>Confirmed</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <RiTimeLine size={13} />
            <span>Crafting in Progress</span>
          </span>
        );
      case 'ready_for_review':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <RiSparklingLine size={13} />
            <span>Ready for Preview</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#b5e8c5]/25 text-[#b5e8c5] border border-[#b5e8c5]/40">
            <RiCheckLine size={13} />
            <span>Completed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">
            <span>Inquiry Received</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#031327] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Background glow */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      {/* Global Navbar */}
      <AppHeader current="orders" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-10 anim-app-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#b5e8c5]/15">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#b5e8c5] font-bold mb-2">
            
              <span>Dashboard</span>
            </div>
            <h1
              className="text-4xl md:text-5xl text-white font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              My Wedding Invitations
            </h1>
            <p className="text-sm text-[#8ab89c] mt-2 font-light max-w-xl">
              Salam Alaikum, <strong className="text-white">{user?.name}</strong>. <br/> Track your bespoke invitation orders, revisions, and artisan correspondence.
            </p>
          </div>

          <Link
            to="/order"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#b5e8c5]/15 cursor-pointer shrink-0"
          >
            <RiAddLine size={18} />
            <span>Order New Invitation</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 ">
          <div className="p-5 rounded-2xl bg-[#031221] border border-[#b5e8c5]/15">
            <p className="text-[10px] uppercase tracking-wider text-[#8ab89c] font-semibold">Total Orders</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">{myOrders.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#031221] border border-[#b5e8c5]/15">
            <p className="text-[10px] uppercase tracking-wider text-[#8ab89c] font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-blue-300 mt-1 font-mono">
              {myOrders.filter(o => o.status === 'in_progress' || o.status === 'confirmed').length}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#031221] border border-[#b5e8c5]/15 col-span-2 sm:col-span-1">
            <p className="text-[10px] uppercase tracking-wider text-[#8ab89c] font-semibold">Completed</p>
            <p className="text-2xl font-bold text-[#b5e8c5] mt-1 font-mono">
              {myOrders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          <span className="text-xs text-[#8ab89c] flex items-center gap-1 mr-2">
            <RiFilter3Line size={14} /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'delivered', label: 'Completed' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === f.id
                  ? 'bg-[#b5e8c5] text-[#020b17] shadow-sm'
                  : 'bg-[#031221] border border-[#b5e8c5]/15 text-[#8ab89c] hover:text-[#b5e8c5]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Order Cards / Skeletons */}
        {loadingOrders ? (
          <div className="py-20 flex items-center justify-center">
            <DotMatrixLoader text="Loading Your Orders..." />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#031221] border border-dashed border-[#b5e8c5]/20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#b5e8c5]/10 text-[#b5e8c5] flex items-center justify-center mx-auto border border-[#b5e8c5]/25">
              <RiShoppingBagLine size={30} />
            </div>
            <h3
              className="text-2xl text-white font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {filter === 'all' ? 'No invitations ordered yet' : `No ${filter} orders`}
            </h3>
            <p className="text-xs text-[#8ab89c] max-w-md mx-auto font-light">
              Begin crafting your bespoke Islamic wedding web invitation or digital card suite. Our artisans are ready to assist.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#b5e8c5] text-[#020b17] font-semibold text-xs uppercase tracking-wider hover:bg-[#cbf4d8] transition-all cursor-pointer"
            >
              Start Your First Invitation
            </Link>
          </div>
        ) : (
          <div className="space-y-4 ">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#031221] border border-[#b5e8c5]/20 hover:border-[#b5e8c5]/40 transition-all space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-mono text-sm font-bold text-[#b5e8c5] tracking-wider">
                        #{ord.order_number}
                      </span>
                      {getStatusBadge(ord.status)}
                    </div>
                    <h3
                      className="text-2xl text-white font-normal"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {ord.product_type} · {ord.occasion}
                    </h3>
                    {ord.couple_names && (
                      <p className="text-sm text-[#b5e8c5] font-semibold mt-0.5">
                        Couple: {ord.couple_names}
                      </p>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(
                      `Assalamu Alaikum Zafaf Atelier! Inquiring regarding order #${ord.order_number} (${ord.product_type} - ${ord.occasion})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366]/15 border border-[#25d366]/40 text-[#25d366] text-xs font-bold hover:bg-[#25d366]/25 transition-all self-start"
                  >
                    <RiWhatsappLine size={16} />
                    <span>Chat with Artisan</span>
                  </a>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-[#b5e8c5]/10">
                  {ord.event_date && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#8ab89c] uppercase tracking-wider block font-semibold">Event Date</span>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <RiCalendarLine size={14} className="text-[#b5e8c5]/60" />
                        <span>{ord.event_date}</span>
                      </div>
                    </div>
                  )}

                  {ord.city_venue && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#8ab89c] uppercase tracking-wider block font-semibold">City / Venue</span>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <RiMapPinLine size={14} className="text-[#b5e8c5]/60" />
                        <span>{ord.city_venue}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#8ab89c] uppercase tracking-wider block font-semibold">Calligraphy Style</span>
                    <span className="text-slate-200 truncate block">{ord.language_calligraphy || 'Bilingual'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[#8ab89c] uppercase tracking-wider block font-semibold">Registered On</span>
                    <span className="text-slate-300 font-mono">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {ord.notes && (
                  <div className="p-3.5 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/10 text-xs text-[#8ab89c]">
                    <strong className="text-white">Artisan Notes:</strong> {ord.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      
        {/* Atelier Invitation Templates Showcase Section */}
        <div className="mt-14 pt-10 border-t border-[#b5e8c5]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-bold mb-1">
                <RiSparklingLine size={13} />
                <span>Featured Invitation Suite</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl text-white font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Atelier Wedding Invitation Templates
              </h2>
              <p className="text-xs text-[#8ab89c] mt-1 font-light">
                Explore our signature live interactive digital invitation portals crafted for sacred Islamic unions.
              </p>
            </div>

            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 text-xs text-[#b5e8c5] hover:underline font-semibold self-start sm:self-auto"
            >
              <span>Explore All Suites</span>
              <RiArrowRightLine size={13} />
            </Link>
          </div>

          {/* Mizaan Royal Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#031424] border border-[#b5e8c5]/25 shadow-2xl relative overflow-hidden group hover:border-[#b5e8c5]/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#b5e8c5]/10 via-[#d4af37]/05 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
                    Live Demo Ready
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                    Nikah &amp; Walima
                  </span>
                  <span className="text-xs text-[#8ab89c] font-light">
                    Royal Emerald, Gold &amp; Cream
                  </span>
                </div>

                <div>
                  <h3
                    className="text-2xl sm:text-3xl text-white font-light tracking-wide"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    Mizaan Royal Web Suite
                  </h3>
                  <p
                    className="text-lg text-[#d4af37] font-light mt-0.5"
                    style={{ fontFamily: 'Amiri, serif' }}
                  >
                    الميزان الملكي
                  </p>
                  <p className="text-xs text-[#8ab89c] font-light leading-relaxed mt-2 max-w-xl">
                    Our flagship bespoke Islamic web invitation. Features majestic Thuluth Bismillah calligraphy, sacred Surah Ar-Rum verses, live countdown timer, dual ceremony itinerary (Nikah &amp; Walima), Google Maps navigation, and instant WhatsApp RSVP.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] text-[#c8e2d2]">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">✨ Live Countdown</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">💬 WhatsApp RSVP</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">📍 Google Maps Directions</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">🎵 100% Music-Free</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/mizaan-royal"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#b5e8c5]/15 cursor-pointer"
                  >
                    <RiEyeLine size={15} />
                    <span>View Live Template</span>
                  </Link>

                  <Link
                    to="/templates/mizaan-royal"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold transition-all cursor-pointer"
                  >
                    <RiCompass3Line size={15} />
                    <span>Template Preview Mode</span>
                  </Link>

                  <Link
                    to="/order?template=mizaan-royal&type=Web+Invitation"
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-[#8ab89c] hover:text-white transition-colors"
                  >
                    <span>Order for Your Wedding</span>
                    <RiArrowRightLine size={13} />
                  </Link>
                </div>
              </div>

              {/* Sample Card */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#020b17]/90 border border-[#d4af37]/30 text-center space-y-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37]">
                  <RiSparklingLine size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Sample Couple</span>
                  <h4 className="text-xl text-white font-serif mt-0.5">Zayd &amp; Maryam</h4>
                  <p className="text-[11px] text-[#8ab89c] mt-1">Saturday, 28th November 2026</p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] text-[#8ab89c] block">Dedicated Route</span>
                  <span className="font-mono text-xs text-[#b5e8c5] font-semibold">/mizaan-royal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

          </div>
  );
}
