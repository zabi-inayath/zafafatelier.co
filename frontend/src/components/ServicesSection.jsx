import React from 'react';
import { SERVICES } from '../constants';
import { RiCheckLine, RiArrowRightLine, RiGlobalLine, RiImageLine, RiFilmLine } from 'react-icons/ri';

const SERVICE_ICONS = {
  'web-invitations': <RiGlobalLine size={28} className="text-[#b5e8c5]" />,
  'e-invites': <RiImageLine size={28} className="text-[#b5e8c5]" />,
  'video-invites': <RiFilmLine size={28} className="text-[#b5e8c5]" />,
};

export default function ServicesSection({ onSelectService, onOpenInteractiveDemo }) {
  return (
    <section id="services" className="relative py-24 sm:py-32 border-t border-[#b5e8c5]/08">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* ── HEADER row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <p className="label-caps mb-3">Our Services</p>
            <h2 className="display-lg text-white">
              Invitations for Every<br />
              <em className="not-italic text-[#b5e8c5]">Blessed Occasion</em>
            </h2>
          </div>
          <p className="text-[#7fa38f] text-sm max-w-xs leading-relaxed md:text-right font-light">
            Thoughtfully designed for Nikah, Walima &amp; Islamic celebrations worldwide.
          </p>
        </div>

        {/* ── SERVICES STACK — editorial alternating layout ── */}
        <div className="space-y-8">
          {SERVICES.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className={`group grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#b5e8c5]/12 hover:border-[#b5e8c5]/28 transition-all duration-500 bg-[#051525]/60 hover:shadow-2xl hover:shadow-black/60`}
              >
                {/* Image side */}
                <div className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#020b17]/70 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020b17]/85 border border-[#b5e8c5]/30 text-[11px] font-semibold text-[#b5e8c5]">
                    {SERVICE_ICONS[service.id]}
                    <span>{service.badge}</span>
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col justify-between p-8 lg:p-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <h3 className="display-md text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#8aaa97] font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Feature list — not a card grid, just raw lines */}
                    <ul className="space-y-2.5">
                      {service.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-[13px] text-[#c5e2ce]">
                          <RiCheckLine size={16} className="text-[#b5e8c5] shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-[#b5e8c5]/10">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="btn-mint"
                    >
                      {service.ctaText} <RiArrowRightLine size={16} />
                    </button>

                    {service.id === 'web-invitations' && (
                      <button
                        onClick={onOpenInteractiveDemo}
                        className="btn-outline"
                      >
                        Live RSVP Demo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
