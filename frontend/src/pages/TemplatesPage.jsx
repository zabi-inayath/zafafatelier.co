import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function TemplatesPage() {
  const categories = [
    {
      id: 'web',
      name: 'Web Invitations',
      firstLine: 'Web',
      secondLine: 'Invitations',
      route: '/templates/webpage',
      image: '/templates/template1/Thankyoucard1.png',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      bubbles: [
        'w-28 h-28 -top-7 -right-7 bg-[#b6e6b5]/20',
        'w-10 h-10 bottom-3 right-8 bg-[#b6e6b5]/10',
      ],
    },
    {
      id: 'video',
      name: 'Video Invitations',
      firstLine: 'Video',
      secondLine: 'Invitations',
      route: '/templates/videos',
      image: '',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      bubbles: [
        'w-24 h-24 top-2 -right-8 bg-white/25',
        'w-12 h-12 -top-4 left-4 bg-white/15',
      ],
    },
    {
      id: 'pdf',
      name: 'Pdf Invitations',
      firstLine: 'Pdf',
      secondLine: 'Invitations',
      route: '/templates/pdfs',
      image: '',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      bubbles: [
        'w-32 h-32 -top-8 -right-8 bg-white/20',
        'w-14 h-14 -bottom-4 left-6 bg-white/10',
      ],
    },
    {
      id: 'photo',
      name: 'Photo Invitations',
      firstLine: 'Photo',
      secondLine: 'Invitations',
      route: '/templates/photos',
      image: '',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      bubbles: [
        'w-20 h-20 -top-4 -left-4 bg-white/20',
        'w-28 h-28 -bottom-8 -right-8 bg-white/20',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-20 pointer-events-none" />

      {/* Global Header */}
      <Navbar current="templates" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-24 anim-app-screen">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold uppercase tracking-widest">
            <span>Atelier Collection</span>
          </div>

          <p className="text-sm sm:text-base text-[#8ab89c] font-light leading-relaxed">
            Explore our curated catalog of bespoke Islamic wedding suites. Select your preferred invitation format below to discover tailored designs and custom commissions.
          </p>
        </div>

        {/* 4 Categories Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route}
              className={`relative overflow-hidden rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 aspect-square bg-gradient-to-br ${cat.gradient} shadow-lg ${cat.shadow} cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] flex flex-col justify-between group block`}
            >
              {/* Top-Right Image Slot */}
              <div className="self-end relative z-10 w-25 h-25 flex items-center justify-center">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain drop-shadow-md transition-opacity duration-300"
                  />
                ) : null}
              </div>

              {/* Bottom-Left Category Title */}
              <div className="relative z-10 select-none">
                <h3 className="text-black font-bold text-lg sm:text-xl md:text-2xl leading-[1.12] tracking-tight group-hover:translate-x-0.5 transition-transform">
                  <span className="block">{cat.firstLine}</span>
                  <span className="block">{cat.secondLine}</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
