import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  RiCloseLine,
  RiQuillPenLine,
  RiRestaurantLine,
  RiCalendarEventLine,
  RiDirectionLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import { FaCalendarDays, FaGoogle } from 'react-icons/fa6';
import { PiClockCountdownBold } from "react-icons/pi";
import { FaDirections } from "react-icons/fa";
import { HiGiftTop } from "react-icons/hi2";

// --- STYLES ---
const MizaStyle = () => (
  <style>{`
    @keyframes confettiFall {
      0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
    @keyframes partyBomb {
      0% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(0.3) rotate(0deg);
      }
      25% {
        opacity: 1;
        transform: translate3d(var(--dx), var(--dy), 0) scale(1.3) rotate(calc(var(--rot) * 0.35));
      }
      100% {
        opacity: 0;
        transform: translate3d(calc(var(--dx) * 1.3), calc(var(--dy) + 120px), 0) scale(0.4) rotate(var(--rot));
      }
    }
    .animate-party-bomb {
      animation: partyBomb var(--duration) cubic-bezier(0.12, 0.85, 0.3, 1) forwards;
    }
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .reveal-on-scroll.is-revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .stagger-1 { transition-delay: 100ms; }
    .stagger-2 { transition-delay: 200ms; }
    .stagger-3 { transition-delay: 300ms; }
    .stagger-4 { transition-delay: 400ms; }
    
    @keyframes envelopeFlapOpen {
      0% { transform: rotateX(0deg); z-index: 20; }
      50% { transform: rotateX(-90deg); z-index: 20; }
      51% { z-index: 5; }
      100% { transform: rotateX(-180deg); z-index: 5; }
    }
    .animate-envelope-flap {
      animation: envelopeFlapOpen 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      transform-origin: top;
      transform-style: preserve-3d;
    }
    .envelope-body {
      clip-path: polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%);
    }
    @keyframes smoothScaleUp {
      0% {
        opacity: 0;
        transform: scale(0.85);
      }
      60% {
        opacity: 1;
        transform: scale(1.02);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    .animate-scale-up {
      animation: smoothScaleUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes textPopUp {
      0% {
        opacity: 0;
        transform: scale(0.75) translateY(12px);
      }
      70% {
        opacity: 1;
        transform: scale(1.03) translateY(-2px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .pop-item-1 {
      animation: textPopUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 0.15s;
    }
    .pop-item-2 {
      animation: textPopUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 0.5s;
    }
    .pop-item-3 {
      animation: textPopUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 0.85s;
    }
    .pop-item-4 {
      animation: textPopUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 1.25s;
    }
    .pop-item-5 {
      animation: textPopUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: 1.6s;
    }
  `}</style>
);

// --- CELEBRATION COMPONENT ---
const Celebration = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 2}s`,
      animationDelay: `${Math.random() * 0.8}s`,
      size: `${Math.random() * 8 + 6}px`,
      type: Math.random() > 0.5 ? 'circle' : 'diamond'
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute top-[-10%] bg-gradient-to-br from-[#123F36]/50 to-[#123F36] opacity-90 animate-confetti shadow-[0_0_8px_rgba(212,175,55,0.6)]`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            borderRadius: p.type === 'circle' ? '50%' : '2px',
            transform: p.type === 'diamond' ? 'rotate(45deg)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

// --- SCRATCH CARD COMPONENT ---

const ScratchCard = ({ children, onReveal }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const revealedRef = useRef(false);
  const lastCheckRef = useRef(0);
  const hasScratchedRef = useRef(false);

  const [isRevealed, setIsRevealed] = useState(false);

  const REVEAL_THRESHOLD = 45;
  const BRUSH_RADIUS = 24;
  const CHECK_INTERVAL = 180;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || isRevealed) return;

    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!ctx) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const drawRoundedRect = (context, x, y, w, h, radius) => {
      const r = Math.min(radius, w / 2, h / 2);

      context.beginPath();
      context.moveTo(x + r, y);
      context.lineTo(x + w - r, y);
      context.quadraticCurveTo(x + w, y, x + w, y + r);
      context.lineTo(x + w, y + h - r);
      context.quadraticCurveTo(
        x + w, y + h, x + w - r, y + h
      );
      context.lineTo(x + r, y + h);
      context.quadraticCurveTo(
        x, y + h, x, y + h - r
      );
      context.lineTo(x, y + r);
      context.quadraticCurveTo(x, y, x + r, y);
      context.closePath();
    };

    const drawCover = () => {
      const rect = container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Draw in CSS-pixel coordinates for accurate pointer mapping.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, width, height);

      // Clip the cover to rounded outer corners.
      ctx.save();
      drawRoundedRect(ctx, 0, 0, width, height, 24);
      ctx.clip();

      ctx.fillStyle = '#123F36';
      ctx.fillRect(0, 0, width, height);

      // Lightweight parchment-like grain.
      for (let i = 0; i < width * height * 0.012; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        ctx.fillStyle = `rgba(190, 180, 140, ${Math.random() * 0.09})`;
        ctx.fillRect(x, y, 1, 1);
      }

      // Rounded double borders.
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(190, 180, 140, 0.65)';
      drawRoundedRect(ctx, 15, 15, width - 30, height - 30, 15);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(190, 180, 140, 0.32)';
      drawRoundedRect(ctx, 21, 21, width - 42, height - 42, 11);
      ctx.stroke();

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#D4C9A5';

      const headingSize = Math.min(30, width * 0.065);
      ctx.font = `italic ${headingSize}px "Cormorant Garamond", serif`;

      ctx.fillText(
        'Scratch to Reveal',
        centerX,
        centerY - 20,
        Math.max(0, width - 55)
      );

      const dividerY = centerY + 17;
      const dividerWidth = Math.min(100, width * 0.22);

      ctx.strokeStyle = 'rgba(190, 180, 140, 0.55)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(centerX - dividerWidth, dividerY);
      ctx.lineTo(centerX - 8, dividerY);
      ctx.moveTo(centerX + 8, dividerY);
      ctx.lineTo(centerX + dividerWidth, dividerY);
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, dividerY);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#C5B78D';
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();

      ctx.fillStyle = '#C5BFA7';
      ctx.font = 'italic 12px "Cormorant Garamond", serif';
      ctx.fillText(
        'Uncover your special date',
        centerX,
        centerY + 42,
        Math.max(0, width - 50)
      );

      ctx.restore();

      // Future brush strokes erase the cover.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        if (hasScratchedRef.current || revealedRef.current) return;
        drawCover();
      });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [isRevealed]);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const now = performance.now();
    if (now - lastCheckRef.current < CHECK_INTERVAL) return;

    lastCheckRef.current = now;

    const ctx = canvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!ctx) return;

    // Sample a smaller grid instead of scanning every pixel.
    const sampleWidth = 100;
    const sampleHeight = 100;

    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;

    const sampleCtx = sampleCanvas.getContext('2d', {
      willReadFrequently: true,
    });

    if (!sampleCtx) return;

    sampleCtx.drawImage(canvas, 0, 0, sampleWidth, sampleHeight);

    const pixels = sampleCtx.getImageData(
      0, 0, sampleWidth, sampleHeight
    ).data;

    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparentPixels++;
    }

    const scratchedPercentage =
      (transparentPixels / (sampleWidth * sampleHeight)) * 100;

    if (scratchedPercentage >= REVEAL_THRESHOLD) {
      revealedRef.current = true;
      isDrawingRef.current = false;
      lastPointRef.current = null;

      setIsRevealed(true);
      onReveal?.();
    }
  }, [onReveal]);

  const scratch = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;

    const rect = canvas.getBoundingClientRect();

    // Coordinates stay in CSS pixels, matching the drawing context.
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    hasScratchedRef.current = true;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const lastPoint = lastPointRef.current;

    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    checkReveal();
  }, [checkReveal]);

  const handlePointerDown = (event) => {
    if (revealedRef.current) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawingRef.current = true;
    lastPointRef.current = null;

    scratch(event);
  };

  const handlePointerMove = (event) => {
    if (!isDrawingRef.current) return;

    event.preventDefault();
    scratch(event);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;

    // Check once more at the end of the gesture.
    checkReveal();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[220px] select-none rounded-3xl overflow-hidden shadow-sm border border-[#B9A17A]/40"
    >
      {/* Revealed content (rendered live in the background behind the scratch canvas) */}
      <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-[#F8F5ED] rounded-3xl">
        {children}
      </div>

      {/* Scratchable cover */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-0 z-10 block w-full h-full cursor-crosshair rounded-3xl transition-opacity duration-700 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        style={{
          touchAction: 'none',
        }}
      />
    </div>
  );
};

// --- VIDEO HERO COMPONENT ---
const VideoHero = ({ onUnlock }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const hasUnlockedRef = useRef(false);

  const unlockInvitation = useCallback(() => {
    if (hasUnlockedRef.current) return;
    hasUnlockedRef.current = true;
    setIsUnlocked(true);
    onUnlock();
  }, [onUnlock]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict audio bypass for mobile Safari / Android WebKit
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const handleReady = () => {
      setIsVideoLoaded(true);
      // Pre-warm the video pipeline and force tablet/mobile to render frame 0 instead of black
      if (video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
        } catch (e) { }
      }
    };

    if (video.readyState >= 2) {
      handleReady();
    }

    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('canplaythrough', handleReady);

    // Only mark as actively playing once moving frames are genuinely rendering on screen
    const handlePlaying = () => {
      setIsPlaying(true);
      setIsOpening(false);
    };
    video.addEventListener('playing', handlePlaying);

    // Synchronize the card popup exactly with the video's parchment opening moment (~2.8s)
    const handleTimeUpdate = () => {
      if (video.currentTime >= 2.8) {
        unlockInvitation();
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('canplaythrough', handleReady);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [unlockInvitation]);

  const handleTap = () => {
    if (!isVideoLoaded || isPlaying || isOpening) return;
    const video = videoRef.current;
    if (!video) return;

    setIsOpening(true);

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback initiated successfully
        })
        .catch(e => {
          console.warn("Video playback deferred/blocked", e);
          setTimeout(() => {
            unlockInvitation();
          }, 2000);
        });
    }

    // Safety fallback in case playback stalls or timeupdate doesn't reach 2.8s
    setTimeout(() => {
      unlockInvitation();
    }, 6000);
  };

  const handleScrollDown = (e) => {
    e.stopPropagation();
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="relative w-full h-screen bg-[#010610] cursor-pointer z-[50] flex flex-col items-center overflow-hidden"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src="/templates/template1/openingdemo2.mp4"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      {/* Loading Animation until template video is fully loaded */}
      {!isVideoLoaded && (
        <div className="absolute poppins inset-0 z-40 bg-[#020b17] flex flex-col items-center justify-center p-6 transition-opacity duration-700">
          <DotMatrixLoader text="PREPARING YOUR INVITATION" />
        </div>
      )}

      {/* Tap to Open / Opening overlay */}
      {isVideoLoaded && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 z-10 transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          <div className="DXRigraf text-[#d4af37] font-serif text-lg sm:text-xl tracking-widest uppercase border border-[#d4af37]/50 px-8 py-3.5 rounded-full backdrop-blur-md bg-black/50 shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center space-x-3 transition-all">
            {isOpening ? (
              <>
                <div className="w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
                <span>Opening...</span>
              </>
            ) : (
              <span className="animate-pulse">Tap to Open</span>
            )}
          </div>
        </div>
      )}

      {/* Invitation Card Revealed after 3 seconds with smooth scale up */}
      {isUnlocked && (
        <div className="relative mt-35 z-30 max-w-sm sm:max-w-md w-[88%] px-5 py-6 sm:px-8 sm:py-7 rounded-2xl text-center animate-scale-up select-none pointer-events-auto">
          {/* 1. Top Bismillah (pops up first) */}
          <div className="pop-item-1">
            <p
              className="text-2xl sm:text-3xl text-[#082115] font-normal leading-relaxed tracking-wide mb-1"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />
          </div>

          {/* 2. Invitation Lead Text (pops up second) */}
          <div className="pop-item-2 my-2.5">
            <p className="text-md font-sans text-[#1e3f2d] font-medium leading-relaxed max-w-xs mx-auto">
              With Allah&apos;s blessings, we joyfully invite you to the Nikah ceremony of
            </p>
          </div>

          {/* 3. Groom & Bride Names (pops up third) */}
          <div className="pop-item-3 my-3 space-y-0.5 mt-10">
            <h2
              className="text-3xl DXRigraf md:text-4xl font-serif text-[#082215] tracking-wide"
            >
              Zayd Ibrahim
            </h2>
            <div className="flex items-center justify-center gap-3 py-0.5">
              <span className="h-px w-8 bg-[#9e7d3b]/50" />
              <span className="text-lg sm:text-xl text-[#9e7d3b] font-serif italic">&amp;</span>
              <span className="h-px w-8 bg-[#9e7d3b]/50" />
            </div>
            <h2
              className="text-3xl DXRigraf md:text-4xl text-[#082215] tracking-wide"
            >
              Maryam Al-Zahra
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />

          </div>

          {/* <div className="pop-item-4 mt-4 p-2 rounded-3xl bg-[#faf6f0]/85 border border-[#c8aa62]/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm">
           
            <div className="pop-item-4 my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#0e3321] uppercase flex items-center justify-center gap-2">
              <span>Saturday, 28th Nov 2026</span>
            </div>
            <div className="pop-item-4 my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#0e3321] uppercase flex items-center justify-center gap-2">
              <span>At 11:30 AM</span>
            </div>

            <div className="pop-item-4 max-w-[350px] my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#0e3321] uppercase flex items-center justify-center">
              <span>The Grand Royal Ballroom, Taj Falaknuma Palace, Hyderabad</span>
            </div>
          </div> */}

        </div>
      )}

      {/* Scroll Down Cue */}
      {isUnlocked && (
        <div
          onClick={handleScrollDown}
          className="absolute bottom-35 z-30 animate-[bounce_3s_ease-in-out_infinite] flex flex-row gap-2 cursor-pointer px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[11px] tracking-widest uppercase transition-all duration-500 shadow-lg"
        >
          <span>Scroll to explore</span>
          <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
};

// --- MAIN INVITATION COMPONENT ---
export default function MizaanRoyal({ isPreview = false }) {
  // Wedding details
  const weddingDate = new Date('2026-11-28T11:30:00');

  // Reveal States
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [hasRevealedDate, setHasRevealedDate] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal Hook
  useEffect(() => {
    if (!hasOpenedEnvelope) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [hasOpenedEnvelope]);

  // Ambient Audio Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) toast.success('Spiritual wedding ambience enabled (Music-Free)', { icon: '✨' });
  };

  // RSVP Form state
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState('2');
  const [ceremonies, setCeremonies] = useState('both');
  const [duaMessage, setDuaMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  // Party Bomb celebration state for RSVP
  const [partyParticles, setPartyParticles] = useState([]);
  const [rsvpCount, setRsvpCount] = useState(0);

  const handleConfirmRsvp = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    setRsvpCount(prev => prev + 1);

    const colors = [
      '#C49A45', '#D4AF37', '#FAF8F5', '#123F36',
      '#E8D5A3', '#8A795C', '#F3EEDB', '#206558', '#E6C673'
    ];

    const batchId = `${Date.now()}-${Math.random()}`;
    const newBatch = Array.from({ length: 48 }).map((_, i) => {
      const angle = Math.PI * 2 * Math.random();
      const velocity = 80 + Math.random() * 240;
      const size = 6 + Math.random() * 10;
      const shapeType = Math.random();
      const isRibbon = shapeType > 0.65;
      const isDiamond = shapeType <= 0.65 && shapeType > 0.35;

      return {
        id: `${batchId}-${i}`,
        batchId,
        x: originX,
        y: originY,
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity - (60 + Math.random() * 120),
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: (Math.random() - 0.5) * 720,
        shape: isRibbon ? 'ribbon' : isDiamond ? 'diamond' : 'circle',
        duration: 0.9 + Math.random() * 0.7
      };
    });

    setPartyParticles(prev => [...prev, ...newBatch]);

    setTimeout(() => {
      setPartyParticles(prev => prev.filter(p => p.batchId !== batchId));
    }, 1800);

  };

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

  const getGoogleCalendarUrl = (title, details, location, start, end) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
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

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    const attendanceText = attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Unable to Attend';
    const ceremonyText = ceremonies === 'both' ? 'Both Nikah & Walima' : ceremonies === 'nikah' ? 'Nikah Ceremony Only' : 'Walima Reception Only';
    const rsvpDetails = `*RSVP for Zayd & Maryam's Wedding*\n\n` +
      `*Guest Name:* ${guestName}\n` +
      `*Attendance:* ${attendanceText}\n` +
      (attendance === 'attending' ? `*Number of Guests:* ${guestCount}\n*Ceremonies:* ${ceremonyText}\n` : '') +
      (duaMessage ? `*Dua / Blessing:* "${duaMessage}"\n\n` : '\n') +
      `_Sent via Zafaf Atelier Digital Invitation_`;

    const whatsappUrl = `https://wa.me/917448552778?text=${encodeURIComponent(rsvpDetails)}`;
    setRsvpSubmitted(true);
    toast.success('Blessings received! Opening WhatsApp confirmation...');
    setTimeout(() => window.open(whatsappUrl, '_blank'), 600);
  };

  return (
    <div className={`min-h-screen bg-white text-[#193b2b] relative overflow-x-clip selection:bg-[#d4af37]/30 selection:text-[#C49A45] ${!hasOpenedEnvelope ? 'h-screen overflow-hidden' : ''}`}>
      <MizaStyle />

      {/* Permanent Video Hero Layer */}
      <VideoHero onUnlock={() => setHasOpenedEnvelope(true)} />

      {/* Experience Layers */}
      {hasRevealedDate && <Celebration />}

      {/* Repeating Background across all sections (Fit to full screen, not fixed, duplicated until end, reduced opacity in white) */}
      <div className="absolute inset-0 w-full h-full bg-white z-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full opacity-15"
          style={{
            backgroundImage: "url('/templates/template1/background.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% 100vh',
            backgroundPosition: 'top center'
          }}
        />
      </div>

      <div className={`relative z-10 transition-opacity duration-1000 ${hasOpenedEnvelope ? 'opacity-100' : 'opacity-0'}`}>
        {/* HERO SECTION */}
        <header className="pt-5 pb-10 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex flex-col items-center mb-4 reveal-on-scroll stagger-1">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-3" />
            <p className="text-lg dm-sans text-[#123F36] font-semibold">
              In The Name of Allah, The Most Gracious, <br /> The Most Merciful
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-3" />
          </div>

          <div className="space-y-3 my-4 reveal-on-scroll stagger-1">
            <p className="text-lg dm-sans uppercase text-[#C49A45] mb-4 font-semibold">Under the grace and blessings of Almighty Allah</p>
            <p className="text-xl text-[#123F36] font-light max-w-md mx-auto poppins">
              Mr. &amp; Mrs. Ibrahim Khan <br />
              <span className="text-md text-[#C49A45] italic">&amp;</span> <br />
              Dr. &amp; Mrs. Tariq Al-Hashimi
            </p>
            <p className="text-lg dm-sans uppercase text-[#C49A45] font-semibold pt-8">
              Joyfully invite you to the blessed wedding celebration of
            </p>
          </div>

          <div className="py-3 reveal-on-scroll stagger-2">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-7xl hagrid text-[#123F36] tracking-wide">Zayd Ibrahim</h1>
              <p className="text-2xl sm:text-2xl text-[#C49A45] font-light pt-4" style={{ fontFamily: 'Amiri, serif' }}>زَيْد إِبْرَاهِيم</p>

              <div className="flex items-center justify-center gap-4 pt-2">
                <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C49A45]/60" />
                <span className="text-2xl sm:text-3xl text-[#C49A45] font-serif italic">&amp;</span>
                <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C49A45]/60" />
              </div>

              <h1 className="text-4xl sm:text-7xl hagrid text-[#123F36] tracking-wide">Maryam Al-Zahra</h1>
              <p className="text-2xl sm:text-2xl text-[#C49A45] font-light pt-4" style={{ fontFamily: 'Amiri, serif' }}>مَرْيَم الزَّهْرَاء</p>
            </div>
          </div>
        </header>

        {/* SCRATCH REVEAL SECTION */}
        <section className="max-w-xl mx-auto px-6 py-5 text-center reveal-on-scroll stagger-1 relative z-20 ">
          <ScratchCard onReveal={() => setHasRevealedDate(true)}>
            <div className="flex flex-col items-center justify-center gap-8 cursor-pointer">

              {/* Wedding Date */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#f8f5ed]/90 border border-[#b9a17a]/40 shadow-sm">
                <RiCalendarLine
                  size={17}
                  className="text-[#C49A45]"
                />
                <span className="text-sm font-medium tracking-wide text-[#244333]">
                  Saturday, 28 November 2026
                </span>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center py-5 sm:py-6 rounded-xl bg-[#f8f5ed]/80 border border-[#b9a17a]/25 shadow-sm"
                  >
                    <p className="text-2xl sm:text-3xl font-medium text-[#193b2b] tracking-tight tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </p>

                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#8a795c] mt-2 font-medium">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Minimal decorative accent */}
              <div className="flex items-center gap-3 opacity-70">
                <span className="h-px w-10 bg-[#b9a17a]" />
                <span className="w-1.5 h-1.5 rotate-45 border border-[#b9a17a]" />
                <span className="h-px w-10 bg-[#b9a17a]" />
              </div>

            </div>
          </ScratchCard>
        </section>

        {/* ITINERARY */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 reveal-on-scroll">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123F36]/5 border border-[#B9A17A]/30 text-[#A67B2E] text-[10px] uppercase font-bold tracking-[0.25em] mb-3 shadow-xs">
              Occasion Details
            </div>
            <h2 className="text-3xl sm:text-5xl dm-sans font-semibold text-[#123F36] tracking-tight">
              Venue & Timings
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B9A17A]/60" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[#B9A17A] bg-[#C49A45]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B9A17A]/60" />
            </div>
          </div>

          {/* Celebration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

            {/* PART I: NIKAH CEREMONY */}
            <div className="group relative w-full overflow-hidden rounded-[28px] border border-[#B9A17A]/30 bg-[#123F36] p-6 shadow-[0_12px_40px_-16px_rgba(18,63,54,0.3)] transition-all duration-500 hover:border-[#C49A45]/60">

              <div className="relative space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-1 pb-1">
                  <div>
                    <h3 className="font-poppins text-2xl font-medium tracking-tight text-[#FAF8F5] sm:text-2xl">
                      Nikah Ceremony
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[#C49A45]">
                    <RiQuillPenLine size={40} />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Date Card */}
                  <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-2">

                    <div className="flex mb-2 text-[#123F36]">
                      <FaCalendarDays size={30} />
                    </div>

                    <div className="text-center">

                      <p className="text-md font-semibold leading-5 text-[#193B2B] sm:text-base">
                        28 <br />November <br /> 2026
                      </p>

                      <p className="mt-2 text-xs text-[#7B8278]">
                        18 Jumada I 1448 AH
                      </p>
                    </div>
                  </div>

                  {/* Time Card */}
                  <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-4 sm:p-5">

                    <div className="flex text-[#123F36]">
                      <PiClockCountdownBold size={40} />
                    </div>

                    <div className="mt-4 text-center">

                      <p className="text-lg font-semibold leading-5 text-[#193B2B] sm:text-xl">
                        11:30 AM
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#7B8278]">
                        Nikah Time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venue Card */}
                <div className="rounded-2xl border border-white/50 bg-[#FAF8F5]  p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex text-[#123F36]">
                      {/* <i className="fa-solid fa-hotel text-4xl"></i> */}
                      <i className="fa-solid fa-mosque text-4xl"></i>
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A795C]">
                        Masjid
                      </p> */}

                      <h4 className="text-lg font-semibold leading-5 text-[#193B2B]">
                        Masjid-e-Quba
                      </h4>

                      <p className="mt-1 text-sm leading-5 text-[#6B7F73]">
                        Banjara Hills, Hyderabad
                      </p>
                    </div>
                  </div>
                </div>


                {/* Actions */}
                <div className="space-y-2.5 pt-1">

                  <a
                    href={nikahCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#C49A45] px-5 py-3 text-xs font-semibold tracking-wide text-[#123F36] transition-all duration-300 hover:bg-[#D4B36D] active:scale-[0.99]"
                  >
                    <FaGoogle size={17} />
                    <span>Add to Calendar</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#C49A45]/35 bg-white/[0.04] px-5 py-3 text-xs font-semibold tracking-wide text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-white/[0.08] active:scale-[0.99]"
                  >
                    <FaDirections size={17} />
                    <span>Get Directions</span>
                  </a>

                </div>
              </div>
            </div>

            {/* PART II: WALIMA RECEPTION */}
            <div className="group relative w-full overflow-hidden rounded-[28px] border border-[#B9A17A]/30 bg-[#123F36] p-6 shadow-[0_12px_40px_-16px_rgba(18,63,54,0.3)] transition-all duration-500 hover:border-[#C49A45]/60">

              <div className="relative space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between gap-4 px-1 pb-1">
                  <div>
                    <h3 className="font-poppins text-xl font-medium tracking-tight text-[#FAF8F5] sm:text-2xl">
                      Walima Reception
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[#C49A45]">
                    <HiGiftTop size={40} />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Date Card */}
                  <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-2">

                    <div className="flex mb-2 text-[#123F36]">
                      <FaCalendarDays size={30} />
                    </div>

                    <div className="text-center">

                      <p className="text-md font-semibold leading-5 text-[#193B2B] sm:text-base">
                        29 <br />November <br /> 2026
                      </p>

                      <p className="mt-2 text-xs text-[#7B8278]">
                        19 Jumada I 1448 AH
                      </p>
                    </div>
                  </div>

                  {/* Time Card */}
                  <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-4 sm:p-5">

                    <div className="flex text-[#123F36]">
                      <PiClockCountdownBold size={40} />
                    </div>

                    <div className="mt-4 text-center">

                      <p className="text-lg font-semibold leading-5 text-[#193B2B] sm:text-xl">
                        07:30 PM
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#7B8278]">
                        Walima Time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venue Card */}
                <div className="rounded-2xl border border-white/50 bg-[#FAF8F5] p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex text-[#123F36]">
                      <i className="fa-solid fa-hotel text-4xl"></i>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8A795C]">
                        VENUE
                      </p>

                      <h4 className="text-lg font-semibold leading-5 text-[#193B2B]">
                        The Crystal Pavilion &amp; Lawns
                      </h4>

                      <p className="mt-1 text-sm leading-5 text-[#6B7F73]">
                        Road No. 36, Jubilee Hills, Hyderabad
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-1">

                  <a
                    href={walimaCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#C49A45] px-5 py-3 text-xs font-semibold tracking-wide text-[#123F36] transition-all duration-300 hover:bg-[#D4B36D] active:scale-[0.99]"
                  >
                    <FaGoogle size={17} />
                    <span>Add to Calendar</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#C49A45]/35 bg-white/[0.04] px-5 py-3 text-xs font-semibold tracking-wide text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-white/[0.08] active:scale-[0.99]"
                  >
                    <FaDirections size={17} />
                    <span>Get Directions</span>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DUA */}
        <section className="max-w-3xl mx-auto px-6 py-12 text-center reveal-on-scroll">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5]/70 border border-[#C49A45]/25 shadow-2xl backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C49A45] font-semibold mb-3">Prophetic Sunnah Dua for The Newlyweds</p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-[#123F36] font-normal my-4 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
              بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="text-xs sm:text-sm text-[#C49A45] font-mono italic">
              &ldquo;Barakallahu laka wa baraka &lsquo;alayka wa jama&lsquo;a baynakuma fee khayr&rdquo;
            </p>
            <p className="text-xs text-[#123F36] max-w-lg mx-auto mt-2">
              &ldquo;May Allah bless you, bestow His blessings upon you, and unite you both in goodness.&rdquo;
            </p>
            <span className="block text-[10px] text-[#C49A45]/80 uppercase tracking-widest mt-3">— Sunan Abi Dawud</span>
          </div>
        </section>

        {/* RSVP ACTION */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center reveal-on-scroll">
          <div className="group relative w-full overflow-hidden rounded-[28px] border border-[#B9A17A]/30 bg-[#123F36] p-8 sm:p-12 shadow-[0_12px_40px_-16px_rgba(18,63,54,0.3)] transition-all duration-500 hover:border-[#C49A45]/60 space-y-6">

            {/* Top Heart Badge */}
            <div className="w-16 h-16 flex items-center justify-center mx-auto text-[#C49A45] shadow-xs group-hover:scale-105 transition-transform duration-500">
              <RiHeartLine size={62} />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-[#C49A45]/30 text-[#C49A45] text-[10px] uppercase font-bold tracking-[0.25em] mb-1">
                Honored Guests
              </div>

              <h3 className="font-poppins text-2xl sm:text-4xl font-medium tracking-tight text-[#FAF8F5]">
                Confirm Your Blessed Presence
              </h3>

              <p className="text-base sm:text-lg text-[#C49A45] font-light" style={{ fontFamily: 'Amiri, serif' }}>
                حُضُورُكُمْ يَسُرُّنَا وَيُبَارِكُ لَنَا
              </p>

              <p className="text-xs sm:text-sm text-[#D4C9A5]/90 mt-2 font-light max-w-md mx-auto leading-relaxed">
                Your prayers, love, and gracious attendance are requested. Kindly confirm by 15th November 2026 to assist with royal catering arrangements.
              </p>

              {rsvpCount > 0 && (
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C49A45]/20 border border-[#C49A45]/40 text-[#FAF8F5] text-[11px] font-medium animate-pulse">
                    <RiSparklingLine size={13} className="text-[#C49A45]" />
                    <span>Blessed Presence Confirmed ({rsvpCount} {rsvpCount === 1 ? 'time' : 'times'})</span>
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={handleConfirmRsvp}
                className="relative flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#C49A45] hover:bg-[#D4B36D] active:scale-95 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#123F36] transition-all duration-300 shadow-lg cursor-pointer"
              >
                <RiSparklingLine size={18} />
                <span>Confirm Presence</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-[#C49A45]/35 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#C49A45] active:scale-95 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#FAF8F5] transition-all duration-300 cursor-pointer"
              >
                {copied ? <RiCheckLine size={18} className="text-[#C49A45]" /> : <RiFileCopyLine size={18} className="text-[#C49A45]" />}
                <span>{copied ? 'Link Copied' : 'Share Invitation'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ETIQUETTE */}
        <section className="max-w-xl mx-auto px-6 py-8 reveal-on-scroll">

          <h3 className="mb-5 text-center font-semibold text-[#C49A45] uppercase tracking-[0.12em] text-[13px]">
            Event Etiquette &amp; Warm Requests
          </h3>

          <ul className="space-y-4 text-left text-[13px] sm:text-sm leading-relaxed text-[#123F36] px-5">

            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
              <p>
                Modest Islamic formal attire is kindly requested for both ceremonies.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
              <p>
                Please refrain from photography during private gatherings for ladies.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
              <p>
                In keeping with the Sunnah, our celebrations will be strictly music-free.
              </p>
            </li>

          </ul>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 w-full overflow-hidden border-t border-[#B9A17A]/25 bg-[#123F36] px-6 pb-10 pt-8 text-center reveal-on-scroll">

          {/* Subtle Zafaf watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-poppins text-5xl sm:text-7xl font-semibold tracking-[0.2em] text-white/[0.025]"
          >
            ZAFAF
          </span>

          <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-4">

            {/* Brand Logo */}
            <a
              href="https://zafaf.mizaantech.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Zafaf Atelier"
              className="inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src="/zafaf-white-trans.png"
                alt="Zafaf Atelier"
                className="h-9 w-auto object-contain"
              />
            </a>

            {/* Invitation Credit */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C49A45]">
                Thoughtfully Crafted for Your Special Day
              </p>

              <p className="text-xs leading-relaxed text-[#FAF8F5]/75">
                A bespoke digital wedding invitation, designed with elegance,
                meaningful details, and timeless simplicity.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <span className="h-px w-8 bg-[#C49A45]/40" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#C49A45]/70" />
              <span className="h-px w-8 bg-[#C49A45]/40" />
            </div>

            {/* Call to Action */}
            <div className="space-y-3">
              <p className="text-[11px] text-[#FAF8F5]/60">
                Love the design? Let us create yours.
              </p>

              <Link
                to="/order?template=mizaan-royal&type=Web+Invitation"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C49A45]/50 px-5 py-2.5 text-xs font-medium text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-[#C49A45] hover:text-[#123F36]"
              >
                Create Your Own Invitation
                <RiArrowRightLine size={14} />
              </Link>
            </div>

            {/* Copyright */}
            <p className="pt-1 text-[9px] tracking-wide text-[#FAF8F5]/40">
              Designed with care by Zafaf Atelier
            </p>

          </div>
        </footer>
      </div>

      {/* Dynamic Party Bomb Confetti from RSVP Button */}
      {partyParticles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[250] overflow-hidden">
          {partyParticles.map((p) => (
            <div
              key={p.id}
              className="absolute animate-party-bomb"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: p.shape === 'ribbon' ? `${p.size * 0.45}px` : `${p.size}px`,
                height: p.shape === 'ribbon' ? `${p.size * 2.2}px` : `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'ribbon' ? '2px' : '3px',
                transform: p.shape === 'diamond' ? 'rotate(45deg)' : 'none',
                boxShadow: `0 0 10px ${p.color}80`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                '--rot': `${p.rotation}deg`,
                '--duration': `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
