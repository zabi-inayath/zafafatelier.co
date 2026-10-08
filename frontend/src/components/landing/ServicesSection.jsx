import React from 'react';
import { SERVICES } from '../../constants';
import { RiCheckLine, RiArrowRightLine, RiGlobalLine, RiImageLine, RiFilmLine } from 'react-icons/ri';

const SERVICE_ICONS = {
  'web-invitations': <RiGlobalLine size={24} className="text-mint" />,
  'e-invites': <RiImageLine size={24} className="text-mint" />,
  'video-invites': <RiFilmLine size={24} className="text-mint" />,
};

function Eyebrow({ children }) {
  return (
    <p className="text-md sm:text-xl tracking-[0.25em] poppins uppercase font-semibold mb-8 text-center">
      {children}
    </p>
  );
}

export default function ServicesSection({ onSelectService, onOpenInteractiveDemo }) {
  return (
    <section id="services" className="relative py-28 sm:py-36 border-t border-mint/[0.06] overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-mint/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Eyebrow>Our Services</Eyebrow>

        <div className="flex justify-center items-center flex-col text-center mb-14 text-5xl font-semibold dm-sans">
          <h2 className="text-white leading-none">
            Invitations for Every
            <span className="text-mint"> Blessed Occasion</span>
          </h2>
        </div>

        {/* Services stack — editorial alternating */}
        <div className="space-y-6">
          {SERVICES.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className="group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-mint/10 hover:border-mint/25 transition-all duration-500 bg-navy-mid/40 hover:shadow-2xl hover:shadow-black/60 backdrop-blur-sm"
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] lg:aspect-auto overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
                  {/* Badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/85 border border-mint/30 text-[11px] font-semibold text-mint">
                    {SERVICE_ICONS[service.id]}
                    <span className="poppins">{service.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-between p-8 lg:p-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <h3 className="dm-sans font-semibold text-[clamp(1.8rem,3vw,3rem)] text-white mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="poppins text-sm text-mint-dim/70 font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-[13px] text-mint/80">
                          <RiCheckLine size={16} className="text-mint shrink-0 mt-0.5" />
                          <span className="poppins font-light">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-mint/10">
                    <button onClick={() => onSelectService(service.id)} className="btn-mint">
                      {service.ctaText} <RiArrowRightLine size={16} />
                    </button>
                    {service.id === 'web-invitations' && (
                      <button onClick={onOpenInteractiveDemo} className="btn-outline">
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
