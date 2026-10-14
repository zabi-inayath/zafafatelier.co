import { RiQuillPenLine } from "react-icons/ri";
import { FaGoogle, FaDirections } from "react-icons/fa";
import { FaMosque } from "react-icons/fa6";
import { PiClockBold } from "react-icons/pi";

// Serif used for display text. Load it once in your layout/_document:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet" />
const serif = "font-['Cormorant_Garamond',Georgia,serif]";

// Soft 8-point star lattice, used very faintly behind the card
const lattice = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4l4.5 11.5L40 20l-11.5 4.5L24 36l-4.5-11.5L8 20l11.5-4.5z' fill='none' stroke='%23C49A45' stroke-opacity='.10' stroke-width='.8'/%3E%3C/svg%3E")`;

export default function NikahCeremonyCard({ nikahCalUrl }) {
  const venue = "Masjid-e-Quba, Banjara Hills, Hyderabad";
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(venue)}`;

  return (
    <div className="mx-auto w-full max-w-[380px]">
      {/* Outer mihrab arch */}
      <div
        className="relative overflow-hidden rounded-t-[190px] rounded-b-[32px] bg-[#C49A45]/50 p-px shadow-[0_30px_70px_-30px_rgba(59,11,11,0.7)]"
        style={{
          background:
            "linear-gradient(160deg,#E7CF98 0%,#C49A45 35%,#7a5a1f 70%,#D4B36D 100%)",
        }}
      >
        {/* Inner body */}
        <div
          className="relative rounded-t-[189px] rounded-b-[31px] px-6 pb-7 pt-14"
          style={{
            backgroundColor: "#3b0b0b",
            backgroundImage: `radial-gradient(120% 60% at 50% 0%, rgba(196,154,69,0.22), transparent 60%), ${lattice}`,
          }}
        >
          {/* Inset gold hairline following the arch */}
          <div className="pointer-events-none absolute inset-2.5 rounded-t-[180px] rounded-b-[22px] border border-[#C49A45]/30" />

          <div className="relative flex flex-col items-center text-center">
            {/* Crest */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C49A45]/50 text-[#D4B36D]">
              <RiQuillPenLine size={22} />
            </div>

            <h3
              className={`${serif} mt-5 text-[40px] font-medium leading-none tracking-wide text-[#FAF8F5]`}
            >
              Nikah Ceremony
            </h3>

            {/* Divider with diamond */}
            <div className="mt-5 flex w-full max-w-[220px] items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C49A45]/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C49A45]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C49A45]/70" />
            </div>

            {/* Date: the hero */}
            <div className="mt-7">
              <p className="text-sm tracking-wide text-[#FAF8F5]/60">
                Saturday
              </p>
              <div className="mt-1 flex items-center justify-center gap-4">
                <span
                  className={`${serif} bg-gradient-to-b from-[#F0DBA6] to-[#B8892F] bg-clip-text text-[96px] font-semibold leading-[0.85] text-transparent`}
                >
                  28
                </span>
                <span className="h-16 w-px bg-[#C49A45]/40" />
                <span
                  className={`${serif} text-left text-[28px] font-medium leading-[1.05] text-[#FAF8F5]`}
                >
                  November
                  <br />
                  2026
                </span>
              </div>
              <p className="mt-3 text-xs tracking-wide text-[#D4B36D]/80">
                18 Jumada II 1448 AH
              </p>
            </div>

            {/* Time + Venue panel */}
            <div className="mt-7 w-full overflow-hidden rounded-3xl border border-[#C49A45]/30 bg-[#FAF8F5]/[0.04] backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 px-5 py-4">
                <PiClockBold size={22} className="text-[#D4B36D]" />
                <p className="text-[#FAF8F5]">
                  <span className={`${serif} text-2xl font-semibold`}>
                    11:30 AM
                  </span>
                  <span className="ml-2 text-xs text-[#FAF8F5]/60">
                    Nikah time
                  </span>
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#C49A45]/40 to-transparent" />

              <div className="flex items-center gap-4 px-5 py-4 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C49A45] text-[#3b0b0b]">
                  <FaMosque size={22} />
                </div>
                <div className="min-w-0">
                  <h4
                    className={`${serif} text-[22px] font-semibold leading-6 text-[#FAF8F5]`}
                  >
                    Masjid-e-Quba
                  </h4>
                  <p className="mt-0.5 text-sm text-[#FAF8F5]/60">
                    Banjara Hills, Hyderabad
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 w-full space-y-2.5">
              <a
                href={nikahCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-[#D9B765] to-[#B8892F] px-5 text-sm font-semibold text-[#3b0b0b] shadow-[0_10px_24px_-10px_rgba(196,154,69,0.8)] transition active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0DBA6]"
              >
                <FaGoogle size={16} />
                Add to calendar
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-[#C49A45]/50 px-5 text-sm font-semibold text-[#F0DBA6] transition hover:bg-[#C49A45]/10 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0DBA6]"
              >
                <FaDirections size={17} />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}