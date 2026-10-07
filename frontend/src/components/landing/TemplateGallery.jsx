import React, { useState } from 'react';
import { TEMPLATES } from '../../constants';
import { RiArrowRightLine, RiCloseLine } from 'react-icons/ri';

const CATS = ['All', 'Nikah', 'Walima', 'Aqiqah', 'Video Invites', 'Websites'];

export default function TemplateGallery({ onOrderTemplate }) {
  const [cat, setCat] = useState('All');
  const [preview, setPreview] = useState(null);

  const items = cat === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === cat || (cat === 'Websites' && t.type.includes('Web')));

  return (
    <section id="templates" className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] rounded-full bg-mint/[0.025] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="poppins text-[10px] sm:text-xs text-mint tracking-[0.25em] uppercase font-semibold opacity-65 mb-4">
            Portfolio
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="MiguErsansRegular text-[clamp(2.4rem,5vw,5rem)] text-white leading-none">
              Modern Designs,<br />
              <span className="text-mint">Islamic Values</span>
            </h2>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`poppins px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    cat === c
                      ? 'bg-mint text-ink font-semibold'
                      : 'border border-mint/18 text-mint-dim/70 hover:text-mint hover:border-mint/35'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setPreview(t)}
              className={`group relative cursor-pointer rounded-3xl overflow-hidden border border-mint/10 hover:border-mint/35 transition-all duration-300 hover:-translate-y-1 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative overflow-hidden bg-ink aspect-[3/4]">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="poppins text-[9px] text-mint/65 tracking-widest uppercase mb-1 block">
                      {t.category} · {t.type}
                    </span>
                    <h3 className="MiguErsansRegular text-xl text-white font-light leading-tight">
                      {t.title}
                    </h3>
                    {/* Palette dots */}
                    <div className="flex items-center gap-1.5 mt-2">
                      {t.palette.map((col, ci) => (
                        <span key={ci} className="w-2.5 h-2.5 rounded-full border border-white/15" style={{ background: col }} />
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center text-mint opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <RiArrowRightLine size={18} />
                  </div>
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
            className="relative max-w-md w-full bg-navy rounded-3xl border border-mint/25 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/80 border border-mint/20 flex items-center justify-center text-mint hover:bg-mint hover:text-ink transition-all cursor-pointer"
            >
              <RiCloseLine size={18} />
            </button>

            <div className="aspect-[3/4] overflow-hidden">
              <img src={preview.image} alt={preview.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <p className="poppins text-[9px] text-mint/65 tracking-widest uppercase mb-2">
                {preview.category} · {preview.type}
              </p>
              <h3 className="MiguErsansRegular text-2xl text-white mb-2 font-light">{preview.title}</h3>
              <p className="dm-sans text-xs text-mint-dim/70 font-light mb-5 leading-relaxed">{preview.desc}</p>
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
