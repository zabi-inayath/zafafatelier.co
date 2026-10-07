import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiCalendarLine,
  RiTimeLine,
  RiMapPinLine,
  RiWhatsappLine,
  RiHeartLine,
  RiSparklingLine,
  RiCheckLine,
  RiShareLine,
  RiFileCopyLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiArrowRightLine,
  RiUserLine,
  RiMailLine,
  RiCloseLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';

export default function MizaanRoyal({ isPreview = false }) {
  // Wedding details
  const weddingDate = new Date('2026-11-28T11:30:00');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ambient Audio Player state (Music-Free Chime/Ambience)
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast.success('Spiritual wedding ambience enabled (Music-Free)', { icon: '✨' });
    }
  };

  // RSVP Form state
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState('attending'); // 'attending' | 'declining'
  const [guestCount, setGuestCount] = useState('2');
  const [ceremonies, setCeremonies] = useState('both'); // 'nikah', 'walima', 'both'
  const [duaMessage, setDuaMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Link copy
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Invitation link copied! Share with your loved ones.');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (title, details, location, start, end) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${start}/${end}`;
  };

  const nikahCalUrl = getGoogleCalendarUrl(
    'Nikah Ceremony — Zayd & Maryam',
    'Blessed Nikah union of Zayd Ibrahim and Maryam Al-Zahra. Join us for the sacred ceremony and lunch reception.',
    'The Royal Grand Ballroom, Taj Falaknuma Palace, Hyderabad',
    '20261128T060000Z',
    '20261128T100000Z'
  );

  const walimaCalUrl = getGoogleCalendarUrl(
    'Walima Reception — Zayd & Maryam',
    'Celebration banquet in honor of the newlyweds Zayd & Maryam.',
    'The Crystal Lawns & Pavilion, Jubilee Hills, Hyderabad',
    '20261129T140000Z',
    '20261129T180000Z'
  );

  // Handle WhatsApp RSVP
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const attendanceText = attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Unable to Attend';
    const ceremonyText = ceremonies === 'both' ? 'Both Nikah & Walima' : ceremonies === 'nikah' ? 'Nikah Ceremony Only' : 'Walima Reception Only';

    const rsvpDetails = `*RSVP for Zayd & Maryam\'s Wedding*\n\n` +
      `*Guest Name:* ${guestName}\n` +
      `*Attendance:* ${attendanceText}\n` +
      (attendance === 'attending' ? `*Number of Guests:* ${guestCount}\n*Ceremonies:* ${ceremonyText}\n` : '') +
      (duaMessage ? `*Dua / Blessing:* "${duaMessage}"\n\n` : '\n') +
      `_Sent via Zafaf Atelier Digital Invitation_`;

    const whatsappUrl = `https://wa.me/917448552778?text=${encodeURIComponent(rsvpDetails)}`;
    
    setRsvpSubmitted(true);
    toast.success('Blessings received! Opening WhatsApp confirmation...');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e8f4ec] relative overflow-x-clip selection:bg-[#d4af37]/30 selection:text-[#f8e7b9]">
      {/* Background Ambience Layers */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-[#113d29]/30 via-[#0d2e1f]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-gradient-to-l from-[#d4af37]/08 via-transparent to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-gradient-to-r from-[#0d3b25]/15 via-transparent to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Subtle Islamic Arabesque Dot Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#d4af37 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION: BISMILLAH & SACRED AYAH
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-10 pt-16 sm:pt-20 pb-12 sm:pb-16 px-6 text-center max-w-4xl mx-auto">
        {/* Islamic Opening Flourish */}
        <div className="inline-flex flex-col items-center mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-3" />
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold">
            In The Name of Allah, The Most Gracious, The Most Merciful
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-3" />
        </div>

        {/* Sacred Bismillah Calligraphy */}
        <div className="my-6">
          <p 
            className="text-3xl sm:text-4xl md:text-5xl text-[#e8f4ec] font-normal tracking-wide drop-shadow-md py-2"
            style={{ fontFamily: 'Amiri, serif', lineHeight: 1.6 }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        {/* Sacred Quranic Ayah on Marriage (Surah Ar-Rum 30:21) */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-[#031527]/70 border border-[#d4af37]/25 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Subtle Arch glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

          <p 
            className="text-lg sm:text-xl md:text-2xl text-[#f3eedb] font-light leading-relaxed mb-4"
            style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto my-4" />

          <p className="text-xs sm:text-sm text-[#a4c5b2] font-light italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
          </p>
          <span className="block text-[10px] uppercase tracking-[0.25em] text-[#d4af37]/90 mt-2 font-semibold">
            — Surah Ar-Rum [30:21]
          </span>
        </div>

        {/* Families Invitation Header */}
        <div className="space-y-3 mt-12 mb-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#8ab89c] font-medium">
            Under the grace and blessings of Almighty Allah
          </p>
          <p className="text-xs sm:text-sm text-[#c8e2d2] font-light max-w-md mx-auto">
            Mr. &amp; Mrs. Ibrahim Khan <br />
            <span className="text-[11px] text-[#8ab89c] italic">&amp;</span> <br />
            Dr. &amp; Mrs. Tariq Al-Hashimi
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#d4af37] font-semibold pt-2">
            Joyfully invite you to the blessed wedding celebration of
          </p>
        </div>

        {/* Couple Names - Signature Centerpiece */}
        <div className="py-6 sm:py-10">
          <div className="space-y-4">
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Zayd Ibrahim
            </h1>
            <p 
              className="text-xl sm:text-2xl text-[#d4af37] font-light"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              زَيْد إِبْرَاهِيم
            </p>

            <div className="flex items-center justify-center gap-4 py-2">
              <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
              <span className="text-xl sm:text-2xl text-[#d4af37] font-serif italic">&amp;</span>
              <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
            </div>

            <h1 
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Maryam Al-Zahra
            </h1>
            <p 
              className="text-xl sm:text-2xl text-[#d4af37] font-light"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              مَرْيَم الزَّهْرَاء
            </p>
          </div>
        </div>

        {/* Save The Date Pill */}
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#031527] border border-[#d4af37]/35 shadow-lg shadow-black/40 mt-6">
          <RiCalendarLine size={16} className="text-[#d4af37]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#e8f4ec]">
            Saturday, 28th November 2026
          </span>
          <span className="text-[#d4af37]/60">•</span>
          <span className="text-xs text-[#a4c5b2] font-mono">
            18 Jumada al-Awwal 1448 AH
          </span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          LIVE COUNTDOWN TIMER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-6">
          Countdown to The Sacred Union
        </p>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-5 rounded-2xl bg-[#031424]/80 border border-[#b5e8c5]/20 backdrop-blur-md shadow-xl"
            >
              <p className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8ab89c] mt-1 font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CEREMONY ITINERARY & VENUE (NIKAH & WALIMA)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
            Order of Celebrations
          </p>
          <h2 
            className="text-3xl sm:text-4xl text-white font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Wedding Itinerary
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#b5e8c5]/40 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Nikah Ceremony */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#031424]/90 border border-[#b5e8c5]/25 shadow-2xl backdrop-blur-xl space-y-6 flex flex-col justify-between hover:border-[#b5e8c5]/50 transition-all">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
                  Aqd al-Nikah (Sacred Contract)
                </span>
                <span className="text-xs text-[#d4af37] font-mono font-semibold">
                  Part I
                </span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl text-white font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Nikah Ceremony
              </h3>
              <p 
                className="text-base text-[#d4af37] font-light mt-0.5"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                عَقْدُ النِّكَاحِ الْمُبَارَك
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-[#c8e2d2]">
                <div className="flex items-start gap-3">
                  <RiCalendarLine size={16} className="text-[#b5e8c5] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Saturday, 28th November 2026</strong>
                    <span className="text-[#8ab89c]">18 Jumada al-Awwal 1448 AH</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RiTimeLine size={16} className="text-[#b5e8c5] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">11:30 AM (Morning)</strong>
                    <span className="text-[#8ab89c]">Baraat: 11:00 AM • Nikah: 11:30 AM • Dawat: 01:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RiMapPinLine size={16} className="text-[#b5e8c5] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">The Grand Royal Ballroom</strong>
                    <span className="text-[#8ab89c]">Taj Falaknuma Palace, Falaknuma, Hyderabad</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#b5e8c5]/15 flex flex-wrap gap-2.5">
              <a
                href={nikahCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold transition-all"
              >
                <RiCalendarLine size={14} />
                <span>Add to Calendar</span>
              </a>

              <a
                href="https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#b5e8c5]/15 hover:bg-[#b5e8c5]/25 border border-[#b5e8c5]/35 text-[#b5e8c5] text-xs font-semibold transition-all"
              >
                <RiMapPinLine size={14} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Walima Reception */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#031424]/90 border border-[#d4af37]/25 shadow-2xl backdrop-blur-xl space-y-6 flex flex-col justify-between hover:border-[#d4af37]/50 transition-all">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                  Sunnah Banquet
                </span>
                <span className="text-xs text-[#d4af37] font-mono font-semibold">
                  Part II
                </span>
              </div>

              <h3 
                className="text-2xl sm:text-3xl text-white font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Walima Reception
              </h3>
              <p 
                className="text-base text-[#d4af37] font-light mt-0.5"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                وَلِيمَةُ النِّكَاح
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-[#c8e2d2]">
                <div className="flex items-start gap-3">
                  <RiCalendarLine size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Sunday, 29th November 2026</strong>
                    <span className="text-[#8ab89c]">19 Jumada al-Awwal 1448 AH</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RiTimeLine size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">07:30 PM (Evening)</strong>
                    <span className="text-[#8ab89c]">Guest Reception &amp; Celebratory Dinner</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RiMapPinLine size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">The Crystal Pavilion &amp; Lawns</strong>
                    <span className="text-[#8ab89c]">Road No. 36, Jubilee Hills, Hyderabad</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#d4af37]/15 flex flex-wrap gap-2.5">
              <a
                href={walimaCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[#d4af37]/25 text-[#d4af37] text-xs font-semibold transition-all"
              >
                <RiCalendarLine size={14} />
                <span>Add to Calendar</span>
              </a>

              <a
                href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/25 border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold transition-all"
              >
                <RiMapPinLine size={14} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SUNNAH WEDDING DUA SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031527]/70 border border-[#d4af37]/25 shadow-2xl backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            Prophetic Sunnah Dua for The Newlyweds
          </p>
          <p 
            className="text-2xl sm:text-3xl md:text-4xl text-[#f3eedb] font-normal my-4 leading-relaxed"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="text-xs sm:text-sm text-[#8ab89c] font-mono italic">
            &ldquo;Barakallahu laka wa baraka &lsquo;alayka wa jama&lsquo;a baynakuma fee khayr&rdquo;
          </p>
          <p className="text-xs text-[#c8e2d2] font-light max-w-lg mx-auto mt-2">
            &ldquo;May Allah bless you, bestow His blessings upon you, and unite you both in goodness.&rdquo;
          </p>
          <span className="block text-[10px] text-[#d4af37]/80 uppercase tracking-widest mt-3">
            — Sunan Abi Dawud
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE RSVP ACTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031424] border border-[#b5e8c5]/25 shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#b5e8c5]/15 border border-[#b5e8c5]/30 flex items-center justify-center mx-auto text-[#b5e8c5]">
            <RiHeartLine size={26} />
          </div>

          <div>
            <h3 
              className="text-3xl text-white font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Confirm Your Blessed Presence
            </h3>
            <p className="text-xs text-[#8ab89c] mt-2 font-light max-w-md mx-auto">
              Your prayers and attendance are requested. Kindly RSVP by 15th November 2026 to assist with catering arrangements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowRsvpModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#b5e8c5]/20 cursor-pointer"
            >
              <RiSparklingLine size={16} />
              <span>Confirm RSVP Online</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#b5e8c5]/25 text-[#b5e8c5] text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <RiCheckLine size={16} /> : <RiFileCopyLine size={16} />}
              <span>{copied ? 'Link Copied' : 'Share Invitation'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ETIQUETTE & WARM REQUESTS
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-xl mx-auto px-6 py-8 text-center text-xs text-[#8ab89c] space-y-2">
        <p className="font-semibold text-[#d4af37] uppercase tracking-wider text-[10px]">
          Event Etiquette &amp; Warm Requests
        </p>
        <p className="font-light">
          • Modest Islamic formal attire is requested for both ceremonies.
        </p>
        <p className="font-light">
          • Kindly avoid photography during ladies&apos; private gatherings.
        </p>
        <p className="font-light">
          • In accordance with Sunnah values, our celebrations are strictly music-free.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER / ATELIER SEAL
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-12 px-6 text-center border-t border-[#b5e8c5]/15 mt-12 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img src="/zafaf-trans.png" alt="Zafaf Atelier" className="h-7 w-auto object-contain" />
          <span className="text-xs font-serif text-[#d4af37]">Zafaf Atelier</span>
        </div>
        <p className="text-[11px] text-[#8ab89c]/80 font-light">
          Bespoke Islamic Web Invitations &amp; Digital Suites
        </p>
        <div>
          <Link
            to="/order?template=mizaan-royal&type=Web+Invitation"
            className="inline-flex items-center gap-1.5 text-xs text-[#b5e8c5] hover:underline font-semibold"
          >
            <span>Commission your own bespoke wedding invitation</span>
            <RiArrowRightLine size={13} />
          </Link>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING AMBIENT AUDIO TOGGLE
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-xl transition-all text-xs font-semibold cursor-pointer ${
            isPlaying
              ? 'bg-[#113d29] border-[#b5e8c5] text-[#b5e8c5]'
              : 'bg-[#031424]/90 border-[#b5e8c5]/25 text-[#8ab89c] hover:text-white'
          }`}
          title="Toggle music-free spiritual wedding ambience"
        >
          {isPlaying ? <RiVolumeUpLine size={16} /> : <RiVolumeMuteLine size={16} />}
          <span className="hidden xs:inline">
            {isPlaying ? 'Ambience On' : 'Music-Free Ambience'}
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RSVP MODAL
      ───────────────────────────────────────────────────────────── */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 bg-[#020b17]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#031424] rounded-3xl border border-[#b5e8c5]/30 p-6 sm:p-8 shadow-2xl text-left animate-app-screen">
            <button
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#8ab89c] hover:text-white transition-colors"
            >
              <RiCloseLine size={18} />
            </button>

            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                Guest Response
              </span>
              <h3 
                className="text-2xl text-white font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                RSVP for Zayd &amp; Maryam
              </h3>
              <p className="text-xs text-[#8ab89c] mt-1">
                Please let the families know your attendance details.
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#020b17] border border-[#b5e8c5]/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#b5e8c5]/20 text-[#b5e8c5] flex items-center justify-center mx-auto">
                  <RiCheckLine size={24} />
                </div>
                <h4 className="text-lg text-white font-serif">JazakAllahu Khairan!</h4>
                <p className="text-xs text-[#8ab89c]">
                  Your RSVP details have been recorded and WhatsApp has been initiated to notify the families.
                </p>
                <button
                  onClick={() => {
                    setShowRsvpModal(false);
                    setRsvpSubmitted(false);
                  }}
                  className="px-6 py-2 rounded-xl bg-[#b5e8c5] text-[#020b17] text-xs font-bold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8ab89c] mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Farhan & Family"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#8ab89c]/40 focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8ab89c] mb-1 font-semibold">
                    Will You Be Attending?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendance('attending')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        attendance === 'attending'
                          ? 'bg-[#b5e8c5] text-[#020b17] border-[#b5e8c5]'
                          : 'bg-[#020b17] text-[#8ab89c] border-[#b5e8c5]/20 hover:text-white'
                      }`}
                    >
                      Joyfully Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendance('declining')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        attendance === 'declining'
                          ? 'bg-[#d4af37] text-[#020b17] border-[#d4af37]'
                          : 'bg-[#020b17] text-[#8ab89c] border-[#b5e8c5]/20 hover:text-white'
                      }`}
                    >
                      Regretfully Declining
                    </button>
                  </div>
                </div>

                {attendance === 'attending' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8ab89c] mb-1 font-semibold">
                          Total Guests
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#b5e8c5]/60"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Family Members</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8ab89c] mb-1 font-semibold">
                          Ceremonies
                        </label>
                        <select
                          value={ceremonies}
                          onChange={(e) => setCeremonies(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#b5e8c5]/60"
                        >
                          <option value="both">Both Nikah &amp; Walima</option>
                          <option value="nikah">Nikah Only</option>
                          <option value="walima">Walima Only</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#8ab89c] mb-1 font-semibold">
                    Dua / Blessing for Newlyweds (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={duaMessage}
                    onChange={(e) => setDuaMessage(e.target.value)}
                    placeholder="BarakAllahu feekum, warmest congratulations..."
                    className="w-full px-4 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white placeholder-[#8ab89c]/40 focus:outline-none focus:border-[#b5e8c5]/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25d366]/20 cursor-pointer mt-2"
                >
                  <RiWhatsappLine size={17} />
                  <span>Send RSVP via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
