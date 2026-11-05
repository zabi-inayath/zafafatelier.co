import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES_REGISTRY, UPCOMING_TEMPLATES } from '../../templates/registry';
import {
  RiSparklingLine,
  RiAddCircleLine,
  RiExternalLinkLine,
  RiCheckLine,
} from 'react-icons/ri';

export default function AdminTemplatesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8 font-dmsans">
      <div>
        <h1 className="text-2xl font-poppins font-bold text-white tracking-tight">Artisan Template Suites</h1>
        <p className="text-xs font-dmsans text-[#8ab89c]">
          Signature Islamic web invitation suites available for dynamic assembly
        </p>
      </div>

      {/* Active Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES_REGISTRY.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl bg-[#031424] border border-[#b5e8c5]/15 overflow-hidden flex flex-col justify-between shadow-xl group hover:border-[#C49A45]/40 transition-all font-dmsans"
          >
            <div>
              {/* Thumbnail / Header */}
              <div className="h-44 bg-gradient-to-b from-[#082133] to-[#031424] p-5 flex flex-col justify-between border-b border-[#b5e8c5]/10 relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-[#123F36] text-[#b5e8c5] border border-[#b5e8c5]/30">
                    {t.badge || 'Signature'}
                  </span>
                  <span className="text-lg text-[#C49A45]" style={{ fontFamily: 'Amiri, serif' }}>
                    {t.arabicTitle}
                  </span>
                </div>

                <div className="z-10">
                  <h3 className="text-xl font-poppins font-bold text-white group-hover:text-[#b5e8c5] transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-xs font-dmsans text-[#8ab89c]">{t.aesthetic}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 text-xs font-dmsans">
                <p className="text-[#8ab89c] leading-relaxed line-clamp-3">
                  {t.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#b5e8c5]/10">
                  <span className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#C49A45]">
                    Included Features:
                  </span>
                  {t.features?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#8ab89c] font-dmsans">
                      <RiCheckLine size={13} className="text-[#b5e8c5]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center gap-2 font-poppins">
              <Link
                to={`/admin/invitations/new?template=${t.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#E8D5A3] text-[#020b17] font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-md"
              >
                <RiAddCircleLine size={15} />
                <span>Craft Invitation</span>
              </Link>

              <a
                href={t.templateRoute || t.route}
                target="_blank"
                rel="noreferrer"
                title="Public Preview"
                className="p-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-[#b5e8c5] hover:text-white transition-colors"
              >
                <RiExternalLinkLine size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Templates */}
      <div className="pt-6 border-t border-[#b5e8c5]/10 space-y-4 font-dmsans">
        <h2 className="text-lg font-poppins font-semibold text-white">In Artisan Drafting (Upcoming Suites)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {UPCOMING_TEMPLATES.map((u) => (
            <div
              key={u.id}
              className="p-5 rounded-2xl bg-[#031424]/50 border border-[#b5e8c5]/10 space-y-2 opacity-75 font-dmsans"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  {u.status}
                </span>
                <span className="text-sm text-[#C49A45]" style={{ fontFamily: 'Amiri, serif' }}>
                  {u.arabicTitle}
                </span>
              </div>
              <h4 className="text-sm font-poppins font-semibold text-white">{u.name}</h4>
              <p className="text-xs font-dmsans text-[#8ab89c]/80">{u.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
