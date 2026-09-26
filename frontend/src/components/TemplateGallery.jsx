import React, { useState } from 'react';
import { TEMPLATES } from '../constants';
import { RiArrowRightLine, RiCloseLine } from 'react-icons/ri';

const CATS = ['All', 'Nikah', 'Walima', 'Aqiqah', 'Video Invites', 'Websites'];

export default function TemplateGallery({ onOrderTemplate }) {
  const [cat, setCat] = useState('All');
  const [preview, setPreview] = useState(null);

  const items = cat === 'All' ? TEMPLATES : TEMPLATES.filter(t =>
    t.category === cat || (cat === 'Websites' && t.type.includes('Web'))
  );

  return (
    <section id="templates" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08 bg-[#020d1c]/60">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="label-caps mb-3">Portfolio</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="display-lg text-white">
              Modern Designs,<br />
              <em className="not-italic text-[#b5e8c5]">Islamic Values</em>
            </h2>

            {/* Category pills — slim & understated */}
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    cat === c
                      ? 'bg-[#b5e8c5] text-[#020b17] font-semibold'
                      : 'border border-[#b5e8c5]/18 text-[#8aaa97] hover:text-[#b5e8c5] hover:border-[#b5e8c5]/35'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry-style grid — unequal heights feel organic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setPreview(t)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden border border-[#b5e8c5]/10 hover:border-[#b5e8c5]/35 transition-all duration-400 hover:-translate-y-1 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image — taller on first card */}
              <div className={`relative overflow-hidden bg-[#020b17] ${i === 0 ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b17]/90 via-[#020b17]/10 to-transparent" />
              </div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="label-caps text-[9px] mb-1 block">{t.category} · {t.type}</span>
                    <h3 className="font-display text-xl text-white font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {t.title}
                    </h3>
                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-full bg-[#b5e8c5]/10 border border-[#b5e8c5]/30 flex items-center justify-center text-[#b5e8c5] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <RiArrowRightLine size={18} />
                  </div>
                </div>

                {/* Palette dots */}
                <div className="flex items-center gap-1.5 mt-2">
                  {t.palette.map((col, ci) => (
                    <span key={ci} className="w-2.5 h-2.5 rounded-full border border-white/15" style={{ background: col }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-md w-full bg-[#041729] rounded-3xl border border-[#b5e8c5]/25 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#020b17]/80 border border-[#b5e8c5]/20 flex items-center justify-center text-[#b5e8c5] hover:bg-[#b5e8c5] hover:text-[#020b17] transition-all cursor-pointer"
            >
              <RiCloseLine size={18} />
            </button>

            <div className="aspect-[3/4] overflow-hidden">
              <img src={preview.image} alt={preview.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <p className="label-caps mb-2">{preview.category} · {preview.type}</p>
              <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                {preview.title}
              </h3>
              <p className="text-xs text-[#8aaa97] font-light mb-5 leading-relaxed">{preview.desc}</p>
              <button
                onClick={() => { setPreview(null); onOrderTemplate(preview); }}
                className="btn-mint w-full justify-center"
              >
                Order This Design <RiArrowRightLine size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
