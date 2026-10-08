import React from 'react';

/* -------------------------------------------------------------------------- */
/* Custom Zafaf Atelier Icons                                                 */
/* -------------------------------------------------------------------------- */

const ElegantDesignIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer invitation frame */}
    <rect
      x="9"
      y="7"
      width="30"
      height="34"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.35"
    />

    {/* Islamic arch */}
    <path
      d="
        M14 34
        V20
        C14 15.8 18.5 12.5 24 12.5
        C29.5 12.5 34 15.8 34 20
        V34
      "
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />

    {/* Inner arch */}
    <path
      d="
        M18 34
        V21
        C18 18.2 20.7 16 24 16
        C27.3 16 30 18.2 30 21
        V34
      "
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.55"
    />

    {/* Eight-point Islamic geometric star */}
    <path
      d="
        M24 18.5
        L25.4 21.1
        L28 22.5
        L25.4 23.9
        L24 26.5
        L22.6 23.9
        L20 22.5
        L22.6 21.1
        Z
      "
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Geometric divider */}
    <path
      d="M15.5 29.5H32.5"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />

    {/* Small geometric ornaments */}
    <path
      d="M12.5 11L14.5 13M35.5 13L37.5 11"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.55"
    />

    {/* Bottom architectural detail */}
    <path
      d="M18 34L20.5 31.5L24 34L27.5 31.5L30 34"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      opacity="0.65"
    />
  </svg>
);

const CustomisedIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Pen */}
    <path
      d="M29.5 10.5L37.5 18.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M27.2 12.8L34.8 20.4L20.1 35.1L11.5 36.5L12.9 27.9L27.2 12.8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />

    {/* Pen nib */}
    <path
      d="M12.9 27.9L20.1 35.1"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Custom content lines */}
    <path
      d="M10 15H20"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.55"
    />

    <path
      d="M10 19H17"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.55"
    />

    <path
      d="M10 23H15"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.55"
    />

    {/* Spark */}
    <path
      d="M36 27V32M33.5 29.5H38.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

const DigitalEcoIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Phone */}
    <rect
      x="12"
      y="7"
      width="20"
      height="34"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Screen */}
    <rect
      x="15.5"
      y="11"
      width="13"
      height="23"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.55"
    />

    {/* Leaf */}
    <path
      d="M34.5 17.5C39.5 17.5 41.5 14.5 41.5 10.5C37.5 10.5 34.5 12.5 34.5 17.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />

    <path
      d="M34.5 17.5C36.2 15.7 38 14.2 40.5 12.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Share / connection */}
    <path
      d="M32 22C35 22 37 23.5 38 26"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />

    <circle
      cx="39"
      cy="28"
      r="2"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    {/* Home button */}
    <circle
      cx="22"
      cy="37"
      r="1.2"
      fill="currentColor"
      opacity="0.55"
    />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const PILLARS = [
  {
    icon: ElegantDesignIcon,
    eyebrow: '01',
    title: 'Refined by Design',
    description:
      'Thoughtfully crafted invitations with elegant typography, subtle Islamic details, and timeless visual harmony.',
  },
  {
    icon: CustomisedIcon,
    eyebrow: '02',
    title: 'Made for Your Story',
    description:
      'Every detail is personalised — names, dates, Ayat, locations, schedules, and the moments that matter to you.',
  },
  {
    icon: DigitalEcoIcon,
    eyebrow: '03',
    title: 'Beautifully Digital',
    description:
      'Share your invitation instantly with loved ones around the world — thoughtfully designed without paper or waste.',
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function TrustBar() {
  return (
    <section
      aria-label="Why choose Zafaf Atelier"
      className="relative z-10 border-y border-white/[0.06] bg-navy/40"
    >
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className={`
                  group relative
                  px-5 py-9 sm:px-7 sm:py-10 lg:px-9 lg:py-12
                  transition-all duration-500
                  hover:bg-white/[0.015]
                  ${index !== 0
                    ? 'border-t border-white/[0.06] md:border-l md:border-t-0'
                    : ''
                  }
                `}
              >
                {/* Soft hover glow */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-[radial-gradient(circle_at_20%_20%,rgba(173,255,224,0.045),transparent_55%)]
                    opacity-0 transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="
                      mb-6 flex h-18 w-18 items-center justify-center
                      text-mint
                      transition-all duration-500
                      group-hover:-translate-y-1
                    "
                  >
                    <Icon className="h-20 w-20" />
                  </div>

                  {/* Content */}
                  <div className="max-w-sm">
                    <h3
                      className="
                        font-['DM_Sans']
                        text-[18px]
                        font-medium
                        text-white
                      "
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className="
                        mt-2.5
                        poppins
                        text-[14px]
                        font-medium
                        leading-[1.7]
                        text-white/50
                        transition-colors duration-300
                        group-hover:text-white/65
                      "
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}