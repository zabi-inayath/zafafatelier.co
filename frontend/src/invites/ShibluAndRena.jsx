import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    RiCalendarLine,
    RiTimeLine,
    RiMapPinLine,
    RiWhatsappLine,
    RiPhoneLine,
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
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import { FaCalendarDays, FaGoogle } from 'react-icons/fa6';
import { PiClockCountdownBold } from "react-icons/pi";
import { FaDirections } from "react-icons/fa";
import { HiGiftTop } from "react-icons/hi2";
import { Helmet } from 'react-helmet-async';

// --- STYLES ---
const MizaStyle = () => (
    <style>{`
    @keyframes confettiFall {
      0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 1; }
      100% { transform: translateY(120vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
    .animate-confetti {
      animation: confettiFall linear forwards;
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

    /* Keep entire invitation text unselectable by default */
    .invitation-root,
    .invitation-root *:not(.scratch-card-area):not(.scratch-card-area *):not(.btn):not(.btn *):not(button):not(button *):not(.footer-link):not(.footer-link *):not(.allow-select):not(.allow-select *):not(input):not(textarea):not(select) {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }

    /* Exceptions: Scratch Card, Buttons, Inputs, Selects and Footer Link remain selectable and interactive */
    .invitation-root .scratch-card-area,
    .invitation-root .scratch-card-area *,
    .invitation-root button,
    .invitation-root button *,
    .invitation-root .btn,
    .invitation-root .btn *,
    .invitation-root .footer-link,
    .invitation-root .footer-link *,
    .invitation-root .allow-select,
    .invitation-root .allow-select *,
    .invitation-root input,
    .invitation-root textarea,
    .invitation-root select {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
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
                    className="absolute top-[-10%] bg-gradient-to-br from-[#123F36]/50 to-[#123F36] opacity-90 animate-confetti shadow-[0_0_8px_rgba(212,175,55,0.6)]"
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

    const REVEAL_THRESHOLD = 38;
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
            context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            context.lineTo(x + r, y + h);
            context.quadraticCurveTo(x, y + h, x, y + h - r);
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

    const checkReveal = useCallback((force = false) => {
        const canvas = canvasRef.current;

        if (!canvas || revealedRef.current) return;

        const now = performance.now();
        if (!force && now - lastCheckRef.current < CHECK_INTERVAL) return;

        lastCheckRef.current = now;

        const ctx = canvas.getContext('2d', {
            willReadFrequently: true,
        });

        if (!ctx) return;

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

        checkReveal(true);
    };

    return (
        <div
            ref={containerRef}
            className="scratch-card-area allow-select relative w-full min-h-[220px] select-text rounded-3xl overflow-hidden shadow-sm border border-[#B9A17A]/40"
        >
            {/* Revealed content (rendered live in the background behind the scratch canvas) */}
            <div className="scratch-card-area allow-select w-full h-full flex flex-col justify-center items-center p-6 bg-[#F8F5ED] rounded-3xl select-text">
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

// --- AUDIO CONFIGURATION ---
// Update this path to your audio file (e.g. '/nasheeds/your-nasheed.mp3')
export const BACKGROUND_SONG_PATH = '/nasheeds/Wedding Nasheed _ Muhammad Al Muqit English Lyric_152641913.mp3';

// --- VIDEO HERO COMPONENT ---
const VideoHero = ({ onUnlock, onStartMusic }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);
    const videoRef = useRef(null);
    const hasUnlockedRef = useRef(false);
    const onUnlockRef = useRef(onUnlock);
    const onStartMusicRef = useRef(onStartMusic);
    const loadTimerRef = useRef(null);

    useEffect(() => {
        onUnlockRef.current = onUnlock;
        onStartMusicRef.current = onStartMusic;
    }, [onUnlock, onStartMusic]);

    const unlockInvitation = useCallback(() => {
        if (hasUnlockedRef.current) return;
        hasUnlockedRef.current = true;
        setIsUnlocked(true);
        onUnlockRef.current?.();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        const clearLoadTimer = () => {
            if (loadTimerRef.current) {
                window.clearTimeout(loadTimerRef.current);
                loadTimerRef.current = null;
            }
        };

        const handleReady = () => {
            if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                clearLoadTimer();
                setVideoFailed(false);
                setIsVideoLoaded(true);
            }
        };

        const handleError = () => {
            clearLoadTimer();
            console.error('Opening video failed:', {
                src: video.currentSrc || video.src,
                code: video.error?.code,
                message: video.error?.message
            });
            setVideoFailed(true);
            setIsVideoLoaded(true);
            setIsOpening(false);
        };

        const handlePlaying = () => {
            setIsPlaying(true);
            setIsOpening(false);
            // Start song playback precisely when video starts playing
            onStartMusicRef.current?.();
        };

        const handlePause = () => {
            if (!video.ended && video.currentTime < 2.8) setIsPlaying(false);
        };

        const handleTimeUpdate = () => {
            if (video.currentTime >= 2.8) unlockInvitation();
        };

        const handleEnded = () => unlockInvitation();

        video.addEventListener('loadeddata', handleReady);
        video.addEventListener('canplay', handleReady);
        video.addEventListener('error', handleError);
        video.addEventListener('playing', handlePlaying);
        video.addEventListener('pause', handlePause);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            handleReady();
        } else {
            loadTimerRef.current = window.setTimeout(() => {
                if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
                    setVideoFailed(true);
                    setIsVideoLoaded(true);
                }
            }, 12000);
            video.load();
        }

        return () => {
            clearLoadTimer();
            video.removeEventListener('loadeddata', handleReady);
            video.removeEventListener('canplay', handleReady);
            video.removeEventListener('error', handleError);
            video.removeEventListener('playing', handlePlaying);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [unlockInvitation]);

    const handleTap = async () => {
        if (isUnlocked || isPlaying || isOpening) return;

        // Start the audio immediately on initial button tap!
        onStartMusicRef.current?.();

        const video = videoRef.current;
        if (videoFailed || !video || video.error) {
            unlockInvitation();
            return;
        }

        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

        setIsOpening(true);
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        try {
            await video.play();
        } catch (error) {
            console.warn('iOS could not play the opening video:', error);
            setIsOpening(false);
            setVideoFailed(true);
        }
    };

    const handleScrollDown = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className="relative w-full h-screen bg-[#010610] cursor-pointer z-[50] flex flex-col items-center overflow-hidden select-none"
            onClick={handleTap}
            onContextMenu={(e) => {
                e.preventDefault();
                return false;
            }}
        >
            <video
                ref={videoRef}
                src="/templates/template1/openingdemo2.mp4"
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                playsInline
                muted
                onContextMenu={(e) => {
                    e.preventDefault();
                    return false;
                }}
                controlsList="nodownload nofullscreen noremoteplayback"
            />

            {!isVideoLoaded && (
                <div className="absolute poppins inset-0 z-40 bg-[#020b17] flex flex-col items-center justify-center p-6">
                    <DotMatrixLoader text="PREPARING YOUR INVITATION" />
                </div>
            )}

            {isVideoLoaded && !isUnlocked && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 z-10 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    {!isOpening && (
                        <div className="DXRigraf text-[#d4af37] font-serif text-lg sm:text-xl tracking-widest uppercase border border-[#d4af37]/50 px-8 py-3.5 rounded-full backdrop-blur-md bg-black/50 shadow-[0_0_25px_rgba(212,175,55,0.25)]">
                            {videoFailed ? 'Tap to Open' : 'Tap to Open'}
                        </div>
                    )}
                </div>
            )}

            {/* Invitation Card Revealed after video unlock */}
            {isUnlocked && (
                <div className="relative mt-30 z-30 max-w-xs sm:max-w-md w-[88%] px-5 py-6 sm:px-8 sm:py-7 rounded-2xl text-center animate-scale-up select-none pointer-events-auto">
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
                            With Allah&apos;s blessings, we joyfully invite you to the Walima reception celebrating the marriage of
                        </p>
                    </div>

                    {/* 3. Groom & Bride Names (pops up third) */}
                    <div className="pop-item-3 my-2 space-y-1 mt-12">
                        <div>
                            <h2
                                className="text-4xl cookie-regular text-[#082215]"
                            >
                                Shiblu Rahman
                            </h2>
                        </div>
                        <div className="flex items-center justify-center gap-3 py-1">
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                            <span className="text-base sm:text-lg text-[#9e7d3b] font-serif italic">&amp;</span>
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                        </div>
                        <div>
                            <h2
                                className="text-4xl cookie-regular text-[#082215]"
                            >
                                Rena Begum
                            </h2>
                        </div>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />
                    </div>
                </div>
            )}

            {/* Ring Element */}
            {isUnlocked && (
                <div className="relative z-30 flex justify-center items-center pop-item-4 pointer-events-none">
                    <img
                        src="/images/others/ringelement.png"
                        alt="Wedding Rings"
                        className="w-28 h-28 object-contain opacity-90 drop-shadow-sm"
                    />
                </div>
            )}

            {/* Scroll Down Cue */}
            {isUnlocked && (
                <div
                    onClick={handleScrollDown}
                    className="absolute bottom-20 z-30 animate-[bounce_3s_ease-in-out_infinite] flex flex-row gap-2 cursor-pointer px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[11px] tracking-widest uppercase transition-all duration-500 shadow-lg"
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

// --- MAIN INVITATION COMPONENT FOR SHIBLU & RENA ---
export default function ShibluWedsRena({ isPreview = false }) {
    // Background Song / Audio State
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);
    const audioRef = useRef(null);

    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            const audio = new Audio(BACKGROUND_SONG_PATH);
            audio.loop = true;
            audioRef.current = audio;
        }
        return audioRef.current;
    }, []);

    // Start playback immediately on tap & when video plays
    const startMusic = useCallback(() => {
        const audio = getAudio();
        if (audio.paused) {
            audio.play().then(() => {
                setIsPlayingMusic(true);
            }).catch((err) => {
                console.warn('Audio play request failed (check audio file path):', err);
            });
        }
    }, [getAudio]);

    const toggleMusic = () => {
        const audio = getAudio();
        if (isPlayingMusic) {
            audio.pause();
            setIsPlayingMusic(false);
        } else {
            audio.play().then(() => {
                setIsPlayingMusic(true);
            }).catch((err) => {
                console.warn('Audio play request failed (check audio file path):', err);
            });
        }
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://zafafatelier.co';
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${origin}/shiblu-weds-rena`;
    const shareImage = `${origin}/templates/template1/background.png`;
    const pageTitle = 'Walima Reception Invitation | Shiblu & Rena';
    const pageDesc = "In The Name of Allah, The Most Gracious, The Most Merciful. With Allah's blessings, we joyfully invite you to the Walima reception celebrating the marriage of Shiblu Rahman & Rena Begum at The Jumeirah Restaurant - Beckton, London.";

    useEffect(() => {
        document.title = pageTitle;

        const updateMeta = (attr, key, content) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateMeta('property', 'og:title', pageTitle);
        updateMeta('property', 'og:description', pageDesc);
        updateMeta('property', 'og:image', shareImage);
        updateMeta('property', 'og:image:secure_url', shareImage);
        updateMeta('property', 'og:image:type', 'image/jpeg');
        updateMeta('property', 'og:image:width', '1200');
        updateMeta('property', 'og:image:height', '630');
        updateMeta('property', 'og:url', shareUrl);
        updateMeta('property', 'og:type', 'website');
        updateMeta('property', 'og:site_name', 'Shiblu & Rena Walima Invitation');
        updateMeta('name', 'description', pageDesc);
        updateMeta('name', 'twitter:card', 'summary_large_image');
        updateMeta('name', 'twitter:title', pageTitle);
        updateMeta('name', 'twitter:description', pageDesc);
        updateMeta('name', 'twitter:image', shareImage);
    }, [shareImage, shareUrl]);

    // Walima details
    const weddingDate = new Date('2026-12-21T18:00:00');

    // Reveal States
    const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
    const [hasRevealedDate, setHasRevealedDate] = useState(false);
    const [celebrationKey, setCelebrationKey] = useState(0);

    const handleDateReveal = useCallback(() => {
        setHasRevealedDate(true);
        setCelebrationKey(prev => prev + 1);
    }, []);

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

    // RSVP Form state
    const [guestName, setGuestName] = useState('');
    const [attendance, setAttendance] = useState('attending');
    const [guestCount, setGuestCount] = useState('2');
    const [duaMessage, setDuaMessage] = useState('');
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

    // Party Bomb celebration state for RSVP
    const [partyParticles, setPartyParticles] = useState([]);
    const [rsvpCount, setRsvpCount] = useState(0);

    const handleConfirmRsvp = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        setRsvpCount((prev) => prev + 1);

        const colors = [
            '#C49A45',
            '#D4AF37',
            '#F3E6C4',
            '#FAF8F5',
            '#E8D5A3',
            '#A88746',
        ];

        const batchId = `${Date.now()}-${Math.random()}`;

        const newBatch = Array.from({ length: 65 }, (_, i) => {
            const angle =
                -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;

            const speed = 100 + Math.random() * 260;
            const type = Math.random();

            return {
                id: `${batchId}-${i}`,
                batchId,
                x: originX,
                y: originY,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed - 45,
                gravity: 420 + Math.random() * 300,
                drag: 0.985 + Math.random() * 0.012,
                size: 3 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape:
                    type > 0.72
                        ? 'ribbon'
                        : type > 0.42
                            ? 'diamond'
                            : 'circle',
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 540,
                sway: 10 + Math.random() * 30,
                swaySpeed: 1 + Math.random() * 2,
                phase: Math.random() * Math.PI * 2,
                delay: Math.random() * 0.12,
                duration: 1.8 + Math.random() * 1.2,
            };
        });

        setPartyParticles((prev) => [...prev, ...newBatch]);

        window.setTimeout(() => {
            setPartyParticles((prev) =>
                prev.filter((particle) => particle.batchId !== batchId)
            );
        }, 3400);
    };

    const getGoogleCalendarUrl = (title, details, location, start, end) => {
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
    };

    const walimaCalUrl = getGoogleCalendarUrl(
        'Walima Reception — Shiblu Rahman & Rena Begum',
        'Celebration banquet in honor of the marriage of Shiblu Rahman & Rena Begum at The Jumeirah Restaurant - Beckton, London.',
        'The Jumeirah Restaurant - Beckton, Unit 4A1, 9 Alpine Way, London, E6 6LA',
        '20261221T183000Z',
        '20261221T233000Z'
    );

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        if (!guestName.trim()) {
            toast.error('Please enter your name');
            return;
        }
        const attendanceText = attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Unable to Attend';
        const rsvpDetails = `*RSVP for Shiblu & Rena's Walima Reception*\n\n` +
            `*Guest Name:* ${guestName}\n` +
            `*Attendance:* ${attendanceText}\n` +
            (attendance === 'attending' ? `*Number of Guests:* ${guestCount}\n` : '') +
            (duaMessage ? `*Dua / Blessing:* "${duaMessage}"\n\n` : '\n') +
            `_Sent via Zafaf Atelier Digital Invitation_`;

        const whatsappUrl = `https://wa.me/447965275623?text=${encodeURIComponent(rsvpDetails)}`;
        setRsvpSubmitted(true);
        toast.success('Blessings received! Opening WhatsApp confirmation...');
        setTimeout(() => window.open(whatsappUrl, '_blank'), 600);
    };

    return (
        <div className={`min-h-screen bg-white text-[#193b2b] relative overflow-x-clip select-none invitation-root selection:bg-transparent ${!hasOpenedEnvelope ? 'h-screen overflow-hidden' : ''}`}>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDesc} />

                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:image" content={shareImage} />
                <meta property="og:image:secure_url" content={shareImage} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Walima Invitation — Shiblu & Rena" />
                <meta property="og:site_name" content="Shiblu & Rena Walima Invitation" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={shareUrl} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:image" content={shareImage} />
            </Helmet>

            <MizaStyle />

            {/* Permanent Video Hero Layer */}
            <VideoHero
                onUnlock={() => setHasOpenedEnvelope(true)}
                onStartMusic={startMusic}
            />

            {/* Floating Music Toggle Button */}
            {hasOpenedEnvelope && (
                <button
                    onClick={toggleMusic}
                    type="button"
                    aria-label={isPlayingMusic ? 'Mute Music' : 'Play Music'}
                    className="fixed top-6 right-6 z-[120] btn allow-select flex items-center justify-center w-11 h-11 rounded-full bg-[#123F36]/90 hover:bg-[#123F36] text-[#D4AF37] border border-[#D4AF37]/50 shadow-lg backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
                >
                    {isPlayingMusic ? (
                        <div className="relative flex items-center justify-center">
                            <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/25 animate-ping pointer-events-none" />
                            <RiVolumeUpLine size={20} />
                        </div>
                    ) : (
                        <RiVolumeMuteLine size={20} className="text-[#D4AF37]/70" />
                    )}
                </button>
            )}

            {/* Experience Layers */}
            {hasRevealedDate && <Celebration key={celebrationKey} />}

            {/* Repeating Background across all sections */}
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
                    <div className="inline-flex flex-col items-center mb-2 reveal-on-scroll stagger-1">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-3" />
                        <p className="text-lg dm-sans text-[#123F36] font-semibold">
                            In The Name of Allah, The Most Gracious, <br /> The Most Merciful
                        </p>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-3" />
                    </div>

                    <div className="space-y-3 my-4 reveal-on-scroll stagger-1">
                        <p className="text-xl dm-sans text-[#C49A45] mb-2">
                            By the Mercy and Blessings of Almighty Allah
                        </p>
                        <p className="text-xl dm-sans text-[#C49A45] pt-2">
                            Two families come together in joy and gratitude, requesting the pleasure of your company at the blessed Walima reception of
                        </p>
                    </div>

                    <div className="py-3 reveal-on-scroll stagger-2">
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-5xl md:text-7xl cookie-regular text-[#123F36] tracking-wide leading-tight">
                                    Shiblu Rahman
                                </h1>
                                <p className="text-2xl sm:text-2xl text-[#C49A45] font-light pt-2" style={{ fontFamily: 'Amiri, serif' }}>
                                    شِبْلُو الرَّحْمٰن
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-4 py-2 mb-1">
                                <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C49A45]/60" />
                                <span className="text-2xl sm:text-3xl text-[#C49A45] font-serif italic">&amp;</span>
                                <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C49A45]/60" />
                            </div>

                            <div>
                                <h1 className="text-5xl md:text-7xl cookie-regular text-[#123F36] tracking-wide leading-tight">
                                    Rena Begum
                                </h1>
                                <p className="text-2xl sm:text-2xl text-[#C49A45] font-light pt-2" style={{ fontFamily: 'Amiri, serif' }}>
                                    رِينَا بَيْغُم
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* SCRATCH REVEAL SECTION */}
                <section className="scratch-card-area allow-select max-w-xl mx-auto px-6 py-5 text-center reveal-on-scroll stagger-1 relative z-20 select-text">
                    <ScratchCard onReveal={handleDateReveal}>
                        <div
                            onClick={() => {
                                if (hasRevealedDate) {
                                    setCelebrationKey(prev => prev + 1);
                                }
                            }}
                            className="flex flex-col items-center justify-center gap-8 cursor-pointer"
                        >
                            {/* Wedding Date */}
                            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#f8f5ed]/90 border border-[#b9a17a]/40 shadow-sm">
                                <RiCalendarLine
                                    size={17}
                                    className="text-[#C49A45]"
                                />
                                <span className="text-sm font-medium tracking-wide text-[#244333]">
                                    Monday, 21 December 2026
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

                {/* ITINERARY (VENUE & TIMINGS - WALIMA RECEPTION) */}
                <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10 reveal-on-scroll">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123F36]/5 border border-[#B9A17A]/30 text-[#A67B2E] text-[10px] uppercase font-bold tracking-[0.25em] mb-3 shadow-xs">
                            Occasion Details
                        </div>
                        <h2 className="text-3xl sm:text-5xl dm-sans font-semibold text-[#123F36] tracking-tight">
                            Venue &amp; Timings
                        </h2>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B9A17A]/60" />
                            <span className="w-1.5 h-1.5 rotate-45 border border-[#B9A17A] bg-[#C49A45]" />
                            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B9A17A]/60" />
                        </div>
                    </div>

                    {/* WALIMA RECEPTION CARD */}
                    <div className="group relative w-full overflow-hidden rounded-[28px] border border-[#B9A17A]/30 bg-[#123F36] p-6 sm:p-8 shadow-[0_12px_40px_-16px_rgba(18,63,54,0.3)] transition-all duration-500 hover:border-[#C49A45]/60">
                        <div className="relative space-y-5">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-4 px-1 pb-1">
                                <div>
                                    <h3 className="dm-sans text-3xl font-medium tracking-tight text-[#C49A45]">
                                        Walima
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[#C49A45]">
                                    <HiGiftTop size={50} />
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {/* Date Card */}
                                <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-3 text-center">
                                    <div className="flex mb-2 text-[#123F36]">
                                        <FaCalendarDays size={28} />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-base sm:text-lg font-semibold leading-5 text-[#193B2B]">
                                            21 <br />December <br /> 2026
                                        </p>

                                        <p className="mt-2 text-xs font-medium text-[#7B8278]">
                                            Monday
                                        </p>
                                    </div>
                                </div>

                                {/* Time Card */}
                                <div className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border border-white/50 bg-[#FAF8F5] p-3 sm:p-4 text-center">
                                    <div className="flex mb-2 text-[#123F36]">
                                        <PiClockCountdownBold size={34} />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg sm:text-xl font-semibold leading-5 text-[#193B2B]">
                                            06:30 PM
                                        </p>

                                        <p className="mt-2 text-xs font-medium leading-4 text-[#7B8278]">
                                            Reception begins at 6:30 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Venue Card */}
                            <div className="rounded-2xl border border-white/50 bg-[#FAF8F5] p-4 sm:p-5">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex text-[#123F36] mt-1 shrink-0">
                                        <RiRestaurantLine size={32} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A795C]">
                                            VENUE &amp; FULL ADDRESS
                                        </p>

                                        <h4 className="text-base sm:text-lg font-bold leading-snug text-[#193B2B]">
                                            The Jumeirah Restaurant - Beckton
                                        </h4>

                                        <p className="mt-1.5 text-xs leading-relaxed text-[#4A5D52] font-medium">
                                            Unit 4A1, 9 Alpine Way<br />
                                            London, E6 6LA
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <a
                                    href="https://maps.app.goo.gl/PZhGYdNPNUMC3dYV9?g_st=ic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn allow-select flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#C49A45]/40 bg-white/[0.06] px-5 py-3 text-xs font-semibold tracking-wide text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-white/[0.12] active:scale-[0.99]"
                                >
                                    <FaDirections size={16} />
                                    <span>View on Google Map</span>
                                </a>
                                <a
                                    href={walimaCalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn allow-select flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#C49A45] px-5 py-3 text-xs font-semibold tracking-wide text-[#123F36] transition-all duration-300 hover:bg-[#D4B36D] active:scale-[0.99] shadow-md"
                                >
                                    <FaGoogle size={16} />
                                    <span>Save to Calendar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RSVP SECTION */}
                <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 reveal-on-scroll">
                    <div className="rounded-[28px] border border-[#B9A17A]/30 bg-[#FAF8F5]/90 p-6 sm:p-8 shadow-xl backdrop-blur-md">
                        <div className="text-center mb-6">
                            <span className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-[#C49A45] bg-[#123F36]/5 border border-[#B9A17A]/25 px-3 py-1 rounded-full mb-2">
                                Responses Requested
                            </span>
                            <h3 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#123F36]">
                                RSVP &amp; Confirm Attendance
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5B6D62] mt-1.5 max-w-md mx-auto">
                                Kindly let us know if you will be joining our celebration, or contact us directly.
                            </p>
                        </div>

                        {/* Direct Contact Card */}
                        <div className="p-4 rounded-2xl bg-white border border-[#B9A17A]/30 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 shadow-xs">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A795C]">
                                    RSVP Direct Contact
                                </p>
                                <p className="text-base sm:text-lg font-bold text-[#123F36] mt-0.5">
                                    07965275623
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href="https://wa.me/447965275623"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn allow-select inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-full transition-colors"
                                >
                                    <RiWhatsappLine size={16} className="text-emerald-600" />
                                    <span>WhatsApp</span>
                                </a>
                                <a
                                    href="tel:07965275623"
                                    className="btn allow-select inline-flex items-center gap-1.5 text-xs font-semibold text-[#123F36] bg-[#F8F5ED] hover:bg-[#ede5d3] border border-[#B9A17A]/35 px-3.5 py-2 rounded-full transition-colors"
                                >
                                    <RiPhoneLine size={16} />
                                    <span>Call</span>
                                </a>
                            </div>
                        </div>

                        {/* Interactive RSVP Form */}
                        <form onSubmit={handleRsvpSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123F36] mb-1.5">
                                    Your Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Mohammed & Family"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-sm text-[#123F36] placeholder:text-[#998877] focus:outline-none focus:border-[#C49A45] focus:ring-1 focus:ring-[#C49A45]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#123F36] mb-1.5">
                                        Attendance
                                    </label>
                                    <select
                                        value={attendance}
                                        onChange={(e) => setAttendance(e.target.value)}
                                        className="w-full px-3 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-xs sm:text-sm text-[#123F36] focus:outline-none focus:border-[#C49A45]"
                                    >
                                        <option value="attending">Joyfully Attending</option>
                                        <option value="regret">Regretfully Unable to Attend</option>
                                    </select>
                                </div>

                                {attendance === 'attending' && (
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#123F36] mb-1.5">
                                            Number of Guests
                                        </label>
                                        <select
                                            value={guestCount}
                                            onChange={(e) => setGuestCount(e.target.value)}
                                            className="w-full px-3 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-xs sm:text-sm text-[#123F36] focus:outline-none focus:border-[#C49A45]"
                                        >
                                            <option value="1">1 Guest</option>
                                            <option value="2">2 Guests</option>
                                            <option value="3">3 Guests</option>
                                            <option value="4">4 Guests</option>
                                            <option value="5+">Family (5+)</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#123F36] mb-1.5">
                                    Personal Dua / Message (Optional)
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Send your prayers and warm blessings to Shiblu & Rena..."
                                    value={duaMessage}
                                    onChange={(e) => setDuaMessage(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#B9A17A]/40 text-sm text-[#123F36] placeholder:text-[#998877] focus:outline-none focus:border-[#C49A45]"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleConfirmRsvp}
                                className="btn allow-select w-full mt-2 py-3.5 px-6 rounded-full bg-[#123F36] hover:bg-[#1a554a] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                            >
                                <RiWhatsappLine size={18} className="text-[#25D366]" />
                                <span>Confirm &amp; Send RSVP</span>
                            </button>
                        </form>
                    </div>
                </section>

                {/* DUA */}
                <section className="max-w-3xl mx-auto px-6 py-10 text-center reveal-on-scroll">
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

                {/* THANK YOU CARD IMAGE SECTION */}
                <section className="reveal-on-scroll w-full">
                    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
                        <img
                            src="/templates/template1/Thankyoucard1.png"
                            alt="Thank You Card"
                            className="w-90 h-auto object-contain rotate-[10deg] transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </section>

                {/* HEARTFELT MESSAGE & WARM WISHES */}
                <section className="max-w-xl mx-auto px-6 pt-2 pb-12 text-center reveal-on-scroll">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C49A45]/60" />
                        <span className="w-1.5 h-1.5 rotate-45 border border-[#B9A17A] bg-[#C49A45]" />
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C49A45]/60" />
                    </div>

                    <p className="text-base sm:text-lg font-serif italic text-[#123F36] leading-relaxed max-w-md mx-auto">
                        &ldquo;May Allah&apos;s blessings grace this beautiful union with love, happiness, and barakah. Your presence and Du&apos;as would make this blessed occasion all the more special.&rdquo;
                    </p>

                    <div className="mt-6 space-y-1">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#C49A45] font-semibold">
                            With love and Du&apos;as,
                        </p>
                        <p className="text-lg sm:text-xl font-serif text-[#123F36] font-medium tracking-wide">
                            Families of Shiblu &amp; Rena
                        </p>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="relative z-10 w-full overflow-hidden border-t border-[#B9A17A]/25 bg-[#123F36] px-6 pb-6 pt-6 text-center ">
                    <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-4">
                        <a
                            href="https://zafaf.mizaantech.co.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Zafaf Atelier"
                            className="footer-link allow-select select-text inline-flex items-center justify-center gap-2 flex-col transition-opacity duration-300 hover:opacity-80"
                        >
                            <img
                                src="/zafaf-white-trans.png"
                                alt="Zafaf Atelier"
                                className="h-9 w-auto object-contain pointer-events-none"
                            />
                            <p className="text-[9px] tracking-wide text-[#FAF8F5]/40 select-text">
                                Designed with care by Zafaf Atelier
                            </p>
                        </a>
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
