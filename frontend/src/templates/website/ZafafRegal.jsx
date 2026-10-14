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
import NikahCeremonyCard from './additional components/RegalNikah';
import WalimaReceptionCard from './additional components/RegalWalima';

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
    @keyframes countdownCardPop {
      0% {
        opacity: 0;
        transform: translateY(24px) scale(0.92);
      }
      60% {
        opacity: 1;
        transform: translateY(-2px) scale(1.02);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .animate-countdown-item {
      animation: countdownCardPop 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
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
                    className={`absolute top-[-10%] bg-gradient-to-br from-[#3b0b0b]/50 to-[#3b0b0b] opacity-90 animate-confetti shadow-[0_0_8px_rgba(212,175,55,0.6)]`}
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
    const hasScratchedRef = useRef(false);
    const lastCheckRef = useRef(0);

    const [isRevealed, setIsRevealed] = useState(false);

    const REVEAL_THRESHOLD = 38;
    const BRUSH_RADIUS = 18;
    const CHECK_INTERVAL = 180;

    // Heart path in normalized coordinates.
    const createHeartPath = (context, width, height) => {
        const path = new Path2D();

        path.moveTo(width * 0.5, height * 0.88);

        path.bezierCurveTo(
            width * 0.42, height * 0.81,
            width * 0.04, height * 0.55,
            width * 0.04, height * 0.31
        );

        path.bezierCurveTo(
            width * 0.04, height * 0.08,
            width * 0.32, height * 0.02,
            width * 0.5, height * 0.22
        );

        path.bezierCurveTo(
            width * 0.68, height * 0.02,
            width * 0.96, height * 0.08,
            width * 0.96, height * 0.31
        );

        path.bezierCurveTo(
            width * 0.96, height * 0.55,
            width * 0.58, height * 0.81,
            width * 0.5, height * 0.88
        );

        path.closePath();
        return path;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container || isRevealed) return;

        const ctx = canvas.getContext("2d", {
            willReadFrequently: true,
        });

        if (!ctx) return;

        let animationFrame;

        const drawCover = () => {
            if (hasScratchedRef.current || revealedRef.current) return;

            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            if (!width || !height) return;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const heart = createHeartPath(ctx, width, height);

            // Draw only inside the heart silhouette.
            ctx.save();
            ctx.clip(heart);

            // Signature Zafaf burgundy.
            ctx.fillStyle = "#3b0b0b";
            ctx.fillRect(0, 0, width, height);

            // Subtle champagne parchment grain.
            for (let i = 0; i < width * height * 0.012; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;

                ctx.fillStyle = `rgba(212, 201, 165, ${Math.random() * 0.09
                    })`;

                ctx.fillRect(x, y, 1, 1);
            }

            // Elegant double heart borders.
            ctx.strokeStyle = "rgba(212, 201, 165, 0.72)";
            ctx.lineWidth = 1.2;

            const drawInsetHeart = (insetX, insetY) => {
                const inner = new Path2D();

                inner.moveTo(width * 0.5, height * 0.88 - insetY);

                inner.bezierCurveTo(
                    width * 0.42, height * 0.81 - insetY,
                    width * 0.04 + insetX, height * 0.55 - insetY,
                    width * 0.04 + insetX, height * 0.31 + insetY
                );

                inner.bezierCurveTo(
                    width * 0.04 + insetX, height * 0.08 + insetY,
                    width * 0.32, height * 0.02 + insetY,
                    width * 0.5, height * 0.22 + insetY
                );

                inner.bezierCurveTo(
                    width * 0.68, height * 0.02 + insetY,
                    width * 0.96 - insetX, height * 0.08 + insetY,
                    width * 0.96 - insetX, height * 0.31 + insetY
                );

                inner.bezierCurveTo(
                    width * 0.96 - insetX, height * 0.55 - insetY,
                    width * 0.58, height * 0.81 - insetY,
                    width * 0.5, height * 0.88 - insetY
                );

                inner.closePath();
                return inner;
            };

            ctx.stroke(drawInsetHeart(12, 12));

            ctx.strokeStyle = "rgba(212, 201, 165, 0.35)";
            ctx.stroke(drawInsetHeart(19, 19));

            // Centered luxury typography.
            const centerX = width / 2;
            const centerY = height * 0.43;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#D4C9A5";

            const headingSize = Math.min(25, width * 0.075);

            ctx.font = `italic ${headingSize}px "Cormorant Garamond", serif`;

            ctx.fillText(
                "Scratch to Reveal",
                centerX,
                centerY,
                width * 0.68
            );

            // Delicate gold divider.
            const dividerY = centerY + height * 0.105;
            const dividerWidth = width * 0.19;

            ctx.strokeStyle = "rgba(212, 201, 165, 0.65)";
            ctx.lineWidth = 0.8;
            ctx.beginPath();

            ctx.moveTo(centerX - dividerWidth, dividerY);
            ctx.lineTo(centerX - 7, dividerY);
            ctx.moveTo(centerX + 7, dividerY);
            ctx.lineTo(centerX + dividerWidth, dividerY);

            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, dividerY);
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = "#D4C9A5";
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();

            ctx.fillStyle = "#C5BFA7";
            ctx.font = `italic ${Math.min(13, width * 0.038)}px "Cormorant Garamond", serif`;

            ctx.fillText(
                "Uncover your special date",
                centerX,
                centerY + height * 0.17,
                width * 0.65
            );

            ctx.restore();

            // Subsequent scratch strokes erase the cover.
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };

        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(drawCover);
        });

        resizeObserver.observe(container);
        drawCover();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [isRevealed]);

    const checkReveal = useCallback(
        (force = false) => {
            const canvas = canvasRef.current;

            if (!canvas || revealedRef.current) return;

            const now = performance.now();

            if (!force && now - lastCheckRef.current < CHECK_INTERVAL) {
                return;
            }

            lastCheckRef.current = now;

            const ctx = canvas.getContext("2d", {
                willReadFrequently: true,
            });

            if (!ctx) return;

            const sampleWidth = 100;
            const sampleHeight = 100;

            const sampleCanvas = document.createElement("canvas");
            sampleCanvas.width = sampleWidth;
            sampleCanvas.height = sampleHeight;

            const sampleCtx = sampleCanvas.getContext("2d", {
                willReadFrequently: true,
            });

            if (!sampleCtx) return;

            sampleCtx.drawImage(canvas, 0, 0, sampleWidth, sampleHeight);

            const pixels = sampleCtx.getImageData(
                0,
                0,
                sampleWidth,
                sampleHeight
            ).data;

            // Count scratched pixels only inside the heart.
            // Transparent corners must not count toward the threshold.
            const heart = createHeartPath(
                sampleCtx,
                sampleWidth,
                sampleHeight
            );

            let heartPixels = 0;
            let transparentPixels = 0;

            for (let y = 0; y < sampleHeight; y++) {
                for (let x = 0; x < sampleWidth; x++) {
                    if (!sampleCtx.isPointInPath(heart, x + 0.5, y + 0.5)) {
                        continue;
                    }

                    heartPixels++;

                    const alpha = pixels[(y * sampleWidth + x) * 4 + 3];

                    if (alpha < 128) {
                        transparentPixels++;
                    }
                }
            }

            const scratchedPercentage =
                heartPixels > 0
                    ? (transparentPixels / heartPixels) * 100
                    : 0;

            if (scratchedPercentage >= REVEAL_THRESHOLD) {
                revealedRef.current = true;
                isDrawingRef.current = false;
                lastPointRef.current = null;

                setIsRevealed(true);
                onReveal?.();
            }
        },
        [onReveal]
    );

    const scratch = useCallback(
        (event) => {
            const canvas = canvasRef.current;

            if (!canvas || revealedRef.current) return;

            const rect = canvas.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            hasScratchedRef.current = true;

            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = BRUSH_RADIUS * 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

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
        },
        [checkReveal]
    );

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
        <div className="relative mx-auto w-full max-w-[440px]">
            {/* SVG clip makes the revealed content heart-shaped too. */}
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0"
            >
                <defs>
                    <clipPath id="zafaf-heart-clip" clipPathUnits="objectBoundingBox">
                        <path d="M .5 .88 C .42 .81 .04 .55 .04 .31 C .04 .08 .32 .02 .5 .22 C .68 .02 .96 .08 .96 .31 C .96 .55 .58 .81 .5 .88 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div
                ref={containerRef}
                className="relative aspect-square w-full select-none"
            >
                {/* Revealed content */}
                <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#F8F5ED] p-8 shadow-inner"
                    style={{ clipPath: "url(#zafaf-heart-clip)" }}
                >
                    {children}
                </div>

                {/* Decorative Burgundy Border overlay for revealed heart */}
                <svg
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 h-full w-full z-[5] transition-opacity duration-700 ${isRevealed ? "opacity-100" : "opacity-0"
                        }`}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M 50 88 C 42 81 4 55 4 31 C 4 8 32 2 50 22 C 68 2 96 8 96 31 C 96 55 58 81 50 88 Z"
                        fill="none"
                        stroke="#3b0b0b"
                        strokeWidth="1.3"
                        strokeOpacity="0.85"
                    />
                </svg>

                {/* Scratchable heart */}
                <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className={`absolute inset-0 z-10 block h-full w-full cursor-crosshair transition-opacity duration-700 ${isRevealed
                        ? "pointer-events-none opacity-0"
                        : "opacity-100"
                        }`}
                    style={{ touchAction: "none" }}
                />
            </div>
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
                src="/templates/zafaf-regal/openingvideo.mp4"
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

            {/* Tap to Open Overlay */}
            {isVideoLoaded && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 z-10 transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    {!isOpening && (
                        <div className="DXRigraf text-[#d4af37] font-serif text-lg sm:text-xl tracking-widest uppercase border border-[#d4af37]/50 px-8 py-3.5 rounded-full backdrop-blur-md bg-black/50 shadow-[0_0_25px_rgba(212,175,55,0.25)] animate-pulse">
                            Tap to Open
                        </div>
                    )}
                </div>
            )}

            {/* Invitation Card Revealed after 3 seconds with smooth scale up */}
            {isUnlocked && (
                <div className="relative mt-55 z-30 max-w-sm sm:max-w-md w-[88%] px-5 py-6 sm:px-8 sm:py-7 rounded-2xl text-center animate-scale-up select-none pointer-events-auto">
                    {/* 1. Top Bismillah (pops up first) */}
                    <div className="pop-item-1">
                        <p
                            className="text-2xl sm:text-3xl text-[#3b0b0b] font-normal leading-relaxed tracking-wide mb-1"
                            style={{ fontFamily: 'Amiri, serif' }}
                        >
                            ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُ
                        </p>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />
                    </div>

                    {/* 2. Invitation Lead Text (pops up second) */}
                    {/* <div className="pop-item-2 my-2.5">
            <p className="text-md font-sans text-[#3b0b0b] font-medium leading-relaxed max-w-xs mx-auto">
              With Allah&apos;s blessings, we joyfully invite you to the Nikah ceremony of
            </p>
          </div> */}

                    {/* 3. Groom & Bride Names (pops up third) */}
                    <div className="pop-item-3 my-3 space-y-0.5 mt-10">
                        <h2
                            className="text-4xl send-flowers-regular font-bold md:text-4xl font-serif text-[#3b0b0b] tracking-wide"
                        >
                            Aaisha
                        </h2>
                        <div className="flex items-center justify-center gap-3 py-0.5">
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                            <span className="text-lg sm:text-xl text-[#3b0b0b] font-serif italic">Weds</span>
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                        </div>
                        <h2
                            className="text-4xl send-flowers-regular md:text-4xl text-[#3b0b0b] tracking-wide"
                        >
                            Abu Bakar
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />

                    </div>

                    {/* <div className="pop-item-4 mt-4 p-2 rounded-3xl bg-[#faf6f0]/85 border border-[#c8aa62]/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm">
           
            <div className="pop-item-4 my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#3b0b0b] uppercase flex items-center justify-center gap-2">
              <span>Saturday, 28th Nov 2026</span>
            </div>
            <div className="pop-item-4 my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#3b0b0b] uppercase flex items-center justify-center gap-2">
              <span>At 11:30 AM</span>
            </div>

            <div className="pop-item-4 max-w-[350px] my-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#3b0b0b] uppercase flex items-center justify-center">
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
export default function ZafafRegal({ isPreview = false }) {
    // Wedding details
    const weddingDate = new Date('2026-11-28T11:30:00');

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

        // Append a fresh burst on EVERY click.
        setPartyParticles((prev) => [...prev, ...newBatch]);

        // Remove only this click's particles.
        window.setTimeout(() => {
            setPartyParticles((prev) =>
                prev.filter((particle) => particle.batchId !== batchId)
            );
        }, 3400);
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
        'Nikah Ceremony — Aaisha & Abu Bakar',
        'Blessed Nikah union of Abu Bakar and Aaisha Mariyam. Join us for the sacred ceremony and lunch reception.',
        'The Royal Grand Ballroom, Taj Falaknuma Palace, Hyderabad',
        '20261128T060000Z',
        '20261128T100000Z'
    );

    const walimaCalUrl = getGoogleCalendarUrl(
        'Walima Reception — Aaisha & Abu Bakar',
        'Celebration banquet in honor of the newlyweds Abu Bakar & Aaisha.',
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
        const rsvpDetails = `*RSVP for Aaisha & Abu Bakar's Wedding*\n\n` +
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
        <div className={`min-h-screen bg-white text-[#3b0b0b] relative overflow-x-clip selection:bg-[#d4af37]/30 selection:text-[#C49A45] ${!hasOpenedEnvelope ? 'h-screen overflow-hidden' : ''}`}>
            <MizaStyle />

            {/* Permanent Video Hero Layer */}
            <VideoHero onUnlock={() => setHasOpenedEnvelope(true)} />

            {/* Experience Layers */}
            {hasRevealedDate && <Celebration key={celebrationKey} />}

            {/* Repeating Background across all sections (Fit to full screen, not fixed, duplicated until end, reduced opacity in white) */}
            <div className="absolute inset-0 w-full h-full bg-white z-0 pointer-events-none overflow-hidden">
                <div
                    className="w-full h-full opacity-15"
                    style={{
                        backgroundImage: "url('/templates/zafaf-regal/background.png')",
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
                        <p className="text-lg dm-sans text-black font-semibold">
                            In The Name of Allah, The Most Gracious, <br /> The Most Merciful
                        </p>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-3" />
                    </div>

                    <div className="space-y-2 my-4 reveal-on-scroll stagger-1">
                        <p className="text-xs sm:text-sm dm-sans uppercase tracking-[0.26em] text-[#8a6a3b] font-semibold">
                            Under the grace and blessings of Almighty Allah
                        </p>
                        <p className="text-sm sm:text-base text-[#3b0b0b] font-light max-w-md mx-auto poppins pt-8">
                            Together with their families, cordially invite you to celebrate the blessed union of
                        </p>
                    </div>

                    {/* BRIDE & GROOM PROFILE CARDS */}
                    <div className="py-4 reveal-on-scroll stagger-2 max-w-xl mx-auto w-full">
                        {/* THE BRIDE CARD */}
                        <div className="relative rounded-[28px] sm:rounded-[34px] border border-[#3b0b0b]/60 bg-white/95 px-6 py-7 sm:px-8 sm:py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-[#3b0b0b]/30">
                            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#3b0b0b] mb-1">
                                The Bride
                            </p>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl send-flowers-regular text-[#3b0b0b] tracking-wide my-1">
                                Aaisha Mariyam
                            </h1>

                            <p className="text-lg sm:text-xl text-[#C49A45] font-light mb-1" style={{ fontFamily: 'Amiri, serif' }}>
                                عَائِشَة مَرْيَم
                            </p>

                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#3b0b0b]">
                                M.A
                            </p>

                            <div className="w-12 h-px bg-[#f0bcc5] mx-auto my-3 sm:my-4" />

                            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#7c7375]">
                                Daughter of
                            </p>

                            <h3 className="text-sm sm:text-base font-bold text-[#1a1415] mt-1">
                                Mrs. &amp; Mr. Dr. Syed Shaker Arif
                            </h3>

                            <p className="text-xs text-[#3b0b0b] font-medium mt-0.5 tracking-wide">
                                M.A., M.Ed., SET, Ph.D.
                            </p>
                        </div>

                        {/* CONNECTOR DIVIDER */}
                        <div className="relative my-4 sm:my-6 flex items-center justify-center">
                            {/* Soft romantic floral glow */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#3b0b0b]/40 via-[#e890a0]/30 to-transparent blur-xl" />
                            </div>

                            <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#3b0b0b]/70" />
                                <span
                                    className="send-flowers-regular text-4xl sm:text-5xl text-[#3b0b0b] italic px-2 select-none"
                                    style={{ lineHeight: 1 }}
                                >
                                    &amp;
                                </span>
                                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#3b0b0b]/70" />
                            </div>
                        </div>

                        {/* THE GROOM CARD */}
                        <div className="relative rounded-[28px] sm:rounded-[34px] border border-[#3b0b0b]/60 bg-white/95 px-6 py-7 sm:px-8 sm:py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-[#3b0b0b]/30">
                            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#3b0b0b] mb-1">
                                The Groom
                            </p>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl send-flowers-regular text-[#3b0b0b] tracking-wide my-1">
                                Abu Bakar
                            </h1>

                            <p className="text-lg sm:text-xl text-[#C49A45] font-light mb-1" style={{ fontFamily: 'Amiri, serif' }}>
                                أَبُو بَكْر
                            </p>

                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#3b0b0b]">
                                B.Com. (Computers), KSA
                            </p>

                            <div className="w-12 h-px bg-[#f0bcc5] mx-auto my-3 sm:my-4" />

                            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#7c7375]">
                                Son of
                            </p>

                            <h3 className="text-sm sm:text-base font-bold text-[#1a1415] mt-1">
                                Mrs. &amp; Mr. Syed Azam Sahab
                            </h3>

                            <p className="text-xs text-[#3b0b0b] font-medium mt-0.5 tracking-wide">
                                M.Tech. (Structures)
                            </p>
                        </div>
                    </div>
                </header>

                {/* SCRATCH REVEAL SECTION (Heart-shaped Date Reveal) */}
                <section className="max-w-xl mx-auto px-4 sm:px-6 py-6 text-center reveal-on-scroll stagger-1 relative z-20">
                    <ScratchCard onReveal={handleDateReveal}>
                        <div
                            onClick={() => {
                                if (hasRevealedDate) {
                                    setCelebrationKey(prev => prev + 1);
                                }
                            }}
                            className="flex flex-col items-center justify-center text-center px-4 cursor-pointer select-none max-w-[280px] sm:max-w-[320px] mx-auto z-10 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {/* Day of the Week */}
                            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#8a795c]">
                                Saturday
                            </p>

                            {/* Prominent Day Numeral */}
                            <div className="my-0.5">
                                <span className="text-5xl sm:text-6xl md:text-7xl send-flowers-regular text-[#3b0b0b] font-bold tracking-tight select-none" style={{ lineHeight: 1.05 }}>
                                    28
                                </span>
                            </div>

                            {/* Month & Year */}
                            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wider text-[#3b0b0b]">
                                November 2026
                            </h3>

                            {/* Hijri Islamic Date */}
                            <p className="text-[11px] sm:text-xs text-[#8a795c] italic tracking-wide mt-0.5" style={{ fontFamily: 'Amiri, serif' }}>
                                18 Jumada Al-Awwal 1448 AH
                            </p>

                            {/* Delicate Gold Divider */}
                            <div className="flex items-center justify-center gap-2.5 mt-2.5 opacity-80">
                                <span className="h-px w-8 bg-[#3b0b0b]/50" />
                                <span className="w-1.5 h-1.5 rotate-45 border border-[#3b0b0b] bg-[#3b0b0b]" />
                                <span className="h-px w-8 bg-[#3b0b0b]/50" />
                            </div>

                            {/* Subtle celebration hint */}
                            {hasRevealedDate && (
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#3b0b0b] font-semibold mt-2 animate-pulse">
                                    ✨ Tap to Celebrate
                                </p>
                            )}
                        </div>
                    </ScratchCard>
                </section>

                {/* SEPARATE COUNTDOWN SECTION (Revealed with smooth motion after scratching) */}
                <div
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${hasRevealedDate
                        ? 'max-h-[800px] opacity-100 translate-y-0 my-8 sm:my-10 pointer-events-auto'
                        : 'max-h-0 opacity-0 -translate-y-8 pointer-events-none my-0'
                        }`}
                >
                    <section className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                        <div className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#FAF8F5]/90 border border-[#B9A17A]/35 shadow-[0_16px_45px_-18px_rgba(59,11,11,0.14)] backdrop-blur-md">

                            <h3 className="dm-sans mb-8 text-2xl sm:text-3xl font-medium text-[#3b0b0b] tracking-tight">
                                Counting Down to Forever
                            </h3>

                            {/* 4 Countdown Boxes */}
                            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full">
                                {[
                                    { label: 'Days', value: timeLeft.days, delay: '0.1s' },
                                    { label: 'Hours', value: timeLeft.hours, delay: '0.2s' },
                                    { label: 'Minutes', value: timeLeft.minutes, delay: '0.3s' },
                                    { label: 'Seconds', value: timeLeft.seconds, delay: '0.4s' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className={`flex flex-col items-center justify-center py-4 sm:py-6 px-1 rounded-2xl bg-white/95 border border-[#B9A17A]/30 shadow-xs hover:border-[#C49A45]/60 hover:shadow-md transition-all duration-300 ${hasRevealedDate ? 'animate-countdown-item' : ''
                                            }`}
                                        style={{ animationDelay: item.delay }}
                                    >
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#3b0b0b] tracking-tight tabular-nums">
                                            {String(item.value).padStart(2, '0')}
                                        </p>

                                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C49A45] font-semibold mt-1.5">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Minimal Decorative Accent */}
                            <div className="flex items-center justify-center gap-3 mt-6 opacity-70">
                                <span className="h-px w-10 bg-[#b9a17a]" />
                                <span className="w-1.5 h-1.5 rotate-45 border border-[#b9a17a] bg-[#C49A45]" />
                                <span className="h-px w-10 bg-[#b9a17a]" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* ITINERARY */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 reveal-on-scroll">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3b0b0b]/5 border border-[#B9A17A]/30 text-[#A67B2E] text-[10px] uppercase font-bold tracking-[0.25em] mb-3 shadow-xs">
                            Occasion Details
                        </div>
                        <h2 className="text-3xl sm:text-5xl dm-sans font-semibold text-[#3b0b0b] tracking-tight">
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
                        <NikahCeremonyCard />

                        {/* PART II: WALIMA RECEPTION */}
                        <WalimaReceptionCard />
                    </div>
                </section>

                {/* DUA */}
                <section className="max-w-3xl mx-auto px-6 py-12 text-center reveal-on-scroll">
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5]/70 border border-[#C49A45]/25 shadow-2xl backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C49A45] font-semibold mb-3">Prophetic Sunnah Dua for The Newlyweds</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl text-[#3b0b0b] font-normal my-4 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                        </p>
                        <p className="text-xs sm:text-sm text-[#C49A45] font-mono italic">
                            &ldquo;Barakallahu laka wa baraka &lsquo;alayka wa jama&lsquo;a baynakuma fee khayr&rdquo;
                        </p>
                        <p className="text-xs text-[#3b0b0b] max-w-lg mx-auto mt-2">
                            &ldquo;May Allah bless you, bestow His blessings upon you, and unite you both in goodness.&rdquo;
                        </p>
                        <span className="block text-[10px] text-[#C49A45]/80 uppercase tracking-widest mt-3">— Sunan Abi Dawud</span>
                    </div>
                </section>

                {/* thankyou card image section */}
                <section className="reveal-on-scroll w-full">
                    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
                        <img
                            src="/templates/zafaf-regal/Thankyoucard.png"
                            alt="Thank You Card"
                            className="w-64 sm:w-72 md:w-80 h-auto object-contain rotate-[10deg] transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </section>


                {/* ETIQUETTE */}
                <section className="max-w-xl mx-auto px-6 py-8 reveal-on-scroll">

                    <h3 className="mb-5 text-center font-semibold text-[#C49A45] uppercase tracking-[0.12em] text-[13px]">
                        Event Etiquette &amp; Warm Requests
                    </h3>

                    <ul className="space-y-4 text-left text-[13px] sm:text-sm leading-relaxed text-[#3b0b0b] px-5">

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
                <footer className="relative z-10 w-full overflow-hidden border-t border-[#B9A17A]/25 bg-[#3b0b0b] px-6 pb-10 pt-8 text-center reveal-on-scroll">

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
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C49A45]/50 px-5 py-2.5 text-xs font-medium text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-[#C49A45] hover:text-[#3b0b0b]"
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
