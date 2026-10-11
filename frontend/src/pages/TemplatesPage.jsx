import React from 'react';
import { Link } from 'react-router-dom';
import { RiLockLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
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
      image: '/web.png',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      isLocked: false,
    },
    {
      id: 'video',
      name: 'Video Invitations',
      firstLine: 'Video',
      secondLine: 'Invitations',
      route: '/templates/videos',
      image: '/video.png',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      isLocked: true,
    },
    {
      id: 'pdf',
      name: 'PDF Invitations',
      firstLine: 'PDF',
      secondLine: 'Invitations',
      route: '/templates/pdfs',
      image: '/pdf.png',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      isLocked: true,
    },
    {
      id: 'photo',
      name: 'Photo Invitations',
      firstLine: 'Photo',
      secondLine: 'Invitations',
      route: '/templates/photos',
      image: '/photo.png',
      gradient: 'from-[#b6e6b5] to-[#b6e6b5]',
      shadow: 'shadow-[#b6e6b5]/25',
      isLocked: true,
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
          {categories.map((cat) => {
            if (cat.isLocked) {
              return (
                <div
                  key={cat.id}
                  onClick={() =>
                    toast('Available soon, In Sha Allah ✨', {
                      icon: '🔒',
                      style: {
                        background: '#031424',
                        color: '#b5e8c5',
                        border: '1px solid rgba(181, 232, 197, 0.3)',
                        fontSize: '13px',
                        fontWeight: '500',
                      },
                    })
                  }
                  className={`relative overflow-hidden rounded-[24px] sm:rounded-[30px] pb-5 pl-5 aspect-square bg-gradient-to-br ${cat.gradient} cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98] flex flex-col justify-between group select-none`}
                >
                  {/* Top-Right Image Slot */}
                  <div className="self-end relative z-10 w-25 h-25 flex items-center justify-center opacity-60">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    ) : null}
                  </div>

                  {/* Bottom-Left Category Title */}
                  <div className="relative z-10 select-none">
                    <h3 className="text-black font-bold text-xl md:text-2xl leading-[1.12] tracking-tight">
                      <span className="block">{cat.firstLine}</span>
                      <span className="block">{cat.secondLine}</span>
                    </h3>
                  </div>

                  {/* Locked Overlay with Message */}
                  <div className="absolute inset-0 z-20 bg-[#020b17]/55 backdrop-blur-[1px] flex flex-col items-center justify-center text-center transition-all duration-300">
                    <div className="w-10 h-10 text-[#031424] flex items-center justify-center mb-2.5">
                      <RiLockLine size={28} />
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#031424]/95 text-[#e4f4ea] text-[10px] sm:text-xs font-semibold tracking-wide border border-[#b5e8c5]/30">
                      Coming soon
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={cat.id}
                to={cat.route}
                className={`relative overflow-hidden rounded-[24px] sm:rounded-[30px] pb-5 pl-5 aspect-square bg-gradient-to-br ${cat.gradient} shadow-lg ${cat.shadow} cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] flex flex-col justify-between group block`}
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
                  <h3 className="text-black font-bold text-xl md:text-2xl leading-[1.12] tracking-tight">
                    <span className="block">{cat.firstLine}</span>
                    <span className="block">{cat.secondLine}</span>
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
