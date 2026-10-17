import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    RiDirectionLine,
    RiPhoneLine
} from 'react-icons/ri';
import toast from 'react-hot-toast';
import DotMatrixLoader from '../src/components/common/DotMatrixLoader';
import { FaCalendarDays, FaGoogle } from 'react-icons/fa6';
import { PiClockCountdownBold, PiClockBold } from "react-icons/pi";
import { FaDirections, FaMosque } from "react-icons/fa";

// Serif used for royal display text
const serif = "font-['Cormorant_Garamond',Georgia,serif]";

// Soft 8-point star lattice behind the card
const lattice = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4l4.5 11.5L40 20l-11.5 4.5L24 36l-4.5-11.5L8 20l11.5-4.5z' fill='none' stroke='%23C49A45' stroke-opacity='.10' stroke-width='.8'/%3E%3C/svg%3E")`;

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
    .invitation-root *:not(.scratch-card-area):not(.scratch-card-area *):not(.btn):not(.btn *):not(button):not(button *):not(.footer-link):not(.footer-link *):not(.allow-select):not(.allow-select *):not(input):not(textarea) {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }

    /* Exceptions: Scratch Card, Buttons, Footer Link, Form Inputs remain selectable and interactive */
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
    .invitation-root textarea {
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
                    className="absolute top-[-10%] bg-gradient-to-br from-[#3b0b0b]/60 to-[#C49A45] opacity-90 animate-confetti shadow-[0_0_8px_rgba(212,175,55,0.6)]"
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

// --- HEART-SHAPED SCRATCH CARD COMPONENT ---
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

                ctx.fillStyle = `rgba(212, 201, 165, ${Math.random() * 0.09})`;
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

            const imgData = sampleCtx.getImageData(0, 0, sampleWidth, sampleHeight);
            const pixels = imgData.data;

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
                    <clipPath id="farhan-heart-clip" clipPathUnits="objectBoundingBox">
                        <path d="M .5 .88 C .42 .81 .04 .55 .04 .31 C .04 .08 .32 .02 .5 .22 C .68 .02 .96 .08 .96 .31 C .96 .55 .58 .81 .5 .88 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div
                ref={containerRef}
                className="scratch-card-area allow-select relative aspect-square w-full select-text"
            >
                {/* Revealed content */}
                <div
                    className="scratch-card-area allow-select absolute inset-0 flex items-center justify-center overflow-hidden bg-[#FAF8F5] p-8 shadow-inner select-text"
                    style={{ clipPath: "url(#farhan-heart-clip)" }}
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

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        const handleReady = () => {
            setIsVideoLoaded(true);
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

        const handlePlaying = () => {
            setIsPlaying(true);
            setIsOpening(false);
        };
        video.addEventListener('playing', handlePlaying);

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
                .then(() => {})
                .catch(e => {
                    console.warn("Video playback deferred/blocked", e);
                    setTimeout(() => {
                        unlockInvitation();
                    }, 2000);
                });
        }

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
            className="relative w-full h-screen bg-[#010610] cursor-pointer z-[50] flex flex-col items-center overflow-hidden select-none"
            onClick={handleTap}
            onContextMenu={(e) => {
                e.preventDefault();
                return false;
            }}
        >
            <video
                ref={videoRef}
                src="/templates/zafaf-regal/openingvideo.mp4"
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

            {/* Loading Animation */}
            {!isVideoLoaded && (
                <div className="absolute poppins inset-0 z-40 bg-[#020b17] flex flex-col items-center justify-center p-6 transition-opacity duration-700">
                    <DotMatrixLoader text="PREPARING YOUR INVITATION" />
                </div>
            )}

            {/* Tap to Open Overlay */}
            {isVideoLoaded && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 z-10 transition-opacity duration-700 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    {!isOpening && (
                        <div className="DXRigraf text-[#d4af37] font-serif text-lg sm:text-xl tracking-widest uppercase border border-[#d4af37]/50 px-8 py-3.5 rounded-full backdrop-blur-md bg-black/50 shadow-[0_0_25px_rgba(212,175,55,0.25)] animate-pulse">
                            Tap to Open
                        </div>
                    )}
                </div>
            )}

            {/* Invitation Card Revealed after video opens */}
            {isUnlocked && (
                <div className="relative mt-55 z-30 max-w-sm sm:max-w-md w-[88%] px-5 py-6 sm:px-8 sm:py-7 rounded-2xl text-center animate-scale-up select-none pointer-events-auto">
                    {/* 1. Top Salam */}
                    <div className="pop-item-1">
                        <p
                            className="text-2xl sm:text-3xl text-[#3b0b0b] font-normal leading-relaxed tracking-wide mb-1"
                            style={{ fontFamily: 'Amiri, serif' }}
                        >
                            ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُ
                        </p>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />
                    </div>

                    {/* 2. Invitation Lead Text */}
                    <div className="pop-item-2 my-2.5">
                        <p className="text-xs sm:text-sm font-sans text-[#5c1c1c] font-medium leading-relaxed max-w-xs mx-auto">
                            With the blessings of Allah, we joyfully invite you to the Nikah ceremony of
                        </p>
                    </div>

                    {/* 3. Groom & Bride Names with Lineage */}
                    <div className="pop-item-3 my-2 space-y-1.5 mt-4">
                        <div>
                            <h2 className="text-3xl sm:text-4xl send-flowers-regular font-bold text-[#3b0b0b] tracking-wide">
                                Farhan Ahmad Khan
                            </h2>
                            <p className="text-xs text-[#7a5e28] font-sans font-medium tracking-wide mt-0.5">
                                Son of Mr. Mehtab Ahmed Khan
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 py-0.5">
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                            <span className="text-base sm:text-lg text-[#3b0b0b] font-serif italic">Weds</span>
                            <span className="h-px w-8 bg-[#9e7d3b]/50" />
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl send-flowers-regular font-bold text-[#3b0b0b] tracking-wide">
                                Haya Ali
                            </h2>
                            <p className="text-xs text-[#7a5e28] font-sans font-medium tracking-wide mt-0.5">
                                Daughter of Mr. Muzaffar Ali
                            </p>
                        </div>

                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#9b7835]/70 to-transparent mx-auto my-2" />
                        
                        <p className="text-[11px] sm:text-xs text-[#8a795c] font-medium tracking-wider uppercase">
                            Thursday, 11th March 2027 • Al Khobar
                        </p>
                    </div>
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

// --- MAIN INVITATION COMPONENT FOR FARHAN & HAYA ---
export default function FarhanWedsHaya({ isPreview = false }) {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://zafaf.mizaantech.co.in';
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `${origin}/invite/farhan-weds-haya`;
    const shareImage = `${origin}/images/farhan-haya-preview.jpg`;
    const pageTitle = 'Wedding Invitation | Farhan & Haya';
    const pageDesc = "In The Name of Allah, The Most Gracious, The Most Merciful. With Allah's blessings, we cordially invite you to celebrate the sacred Nikah union of Farhan Ahmad Khan & Haya Ali on Thursday, 11th March 2027 in Al Khobar, Saudi Arabia.";

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
        updateMeta('property', 'og:site_name', 'Farhan & Haya Wedding Invitation');
        updateMeta('name', 'description', pageDesc);
        updateMeta('name', 'twitter:card', 'summary_large_image');
        updateMeta('name', 'twitter:title', pageTitle);
        updateMeta('name', 'twitter:description', pageDesc);
        updateMeta('name', 'twitter:image', shareImage);
    }, [shareImage, shareUrl]);

    // Wedding details: 11th March 2027, 7:00 PM AST (UTC+3)
    const weddingDate = new Date('2027-03-11T19:00:00+03:00');

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

    // Party Bomb celebration state for RSVP
    const [partyParticles, setPartyParticles] = useState([]);
    const [rsvpCount, setRsvpCount] = useState(0);

    const handleConfirmRsvp = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        setRsvpCount((prev) => prev + 1);

        const colors = ['#C49A45', '#D4AF37', '#F3E6C4', '#FAF8F5', '#E8D5A3', '#A88746'];
        const batchId = `${Date.now()}-${Math.random()}`;

        const newBatch = Array.from({ length: 65 }, (_, i) => {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
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
                shape: type > 0.72 ? 'ribbon' : type > 0.42 ? 'diamond' : 'circle',
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
            setPartyParticles((prev) => prev.filter((p) => p.batchId !== batchId));
        }, 3400);
    };

    // RSVP Form state
    const [guestName, setGuestName] = useState('');
    const [attendance, setAttendance] = useState('attending');
    const [guestCount, setGuestCount] = useState('2');
    const [duaMessage, setDuaMessage] = useState('');
    const [selectedPhone, setSelectedPhone] = useState('966504947930');
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

    // Google Calendar URL
    const getGoogleCalendarUrl = (title, details, location, start, end) => {
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
    };

    const nikahCalUrl = getGoogleCalendarUrl(
        'Nikah Ceremony — Farhan & Haya',
        'Blessed Nikah union of Farhan Ahmad Khan and Haya Ali. Venue: 25th Street, Prince Thamer Road, Al Khobar Shumaliyah, Saudi Arabia.',
        '25th Street, Prince Thamer Road, Al Khobar Shumaliyah, Saudi Arabia',
        '20270311T160000Z',
        '20270311T200000Z'
    );

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("25th Street, Prince Thamer Road, Al Khobar Shumaliyah, Saudi Arabia")}`;

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        if (!guestName.trim()) {
            toast.error('Please enter your name');
            return;
        }
        const attendanceText = attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Unable to Attend';
        const rsvpDetails = `*RSVP for Farhan & Haya's Wedding*\n\n` +
            `*Guest Name:* ${guestName}\n` +
            `*Attendance:* ${attendanceText}\n` +
            (attendance === 'attending' ? `*Number of Guests:* ${guestCount}\n*Ceremony:* Nikah Ceremony\n` : '') +
            (duaMessage ? `*Dua / Blessing:* "${duaMessage}"\n\n` : '\n') +
            `_Sent via Zafaf Atelier Digital Invitation_`;

        const whatsappUrl = `https://wa.me/${selectedPhone}?text=${encodeURIComponent(rsvpDetails)}`;
        setRsvpSubmitted(true);
        toast.success('Blessings received! Opening WhatsApp confirmation...');
        setTimeout(() => window.open(whatsappUrl, '_blank'), 600);
    };

    return (
        <div className={`min-h-screen bg-white text-[#3b0b0b] relative overflow-x-clip select-none invitation-root selection:bg-transparent ${!hasOpenedEnvelope ? 'h-screen overflow-hidden' : ''}`}>
            <Helmet>
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
                <meta property="og:image:alt" content="Wedding Invitation — Farhan & Haya" />
                <meta property="og:site_name" content="Farhan & Haya Wedding Invitation" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={shareUrl} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:image" content={shareImage} />
            </Helmet>

            <MizaStyle />

            {/* Permanent Video Hero Layer */}
            <VideoHero onUnlock={() => setHasOpenedEnvelope(true)} />

            {/* Experience Layers */}
            {hasRevealedDate && <Celebration key={celebrationKey} />}

            {/* Repeating Background across all sections */}
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
                <header className="pt-6 pb-10 px-6 text-center max-w-4xl mx-auto">
                    <div className="inline-flex flex-col items-center mb-4 reveal-on-scroll stagger-1">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-3" />
                        <p className="text-lg dm-sans text-[#3b0b0b] font-semibold">
                            In The Name of Allah, The Most Gracious, <br /> The Most Merciful
                        </p>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-3" />
                    </div>

                    <div className="space-y-3 my-4 reveal-on-scroll stagger-1">
                        <p className="text-xs sm:text-sm dm-sans uppercase tracking-[0.26em] text-[#8a6a3b] font-semibold">
                            Under the grace and blessings of Almighty Allah
                        </p>
                        
                        <div className="text-sm sm:text-base text-[#3b0b0b] font-light max-w-lg mx-auto poppins pt-4 space-y-1">
                            <p className="font-medium text-[#4a1212]">
                                Mr. Mehtab Ahmed Khan <span className="text-xs text-[#8a6a3b] font-normal">(Moradabad, India)</span>
                            </p>
                            <p className="text-xs text-[#8a6a3b] italic">&amp;</p>
                            <p className="font-medium text-[#4a1212]">
                                Mr. Muzaffar Ali <span className="text-xs text-[#8a6a3b] font-normal">(Al Khobar, Saudi Arabia)</span>
                            </p>
                        </div>

                        <p className="text-sm sm:text-base text-[#3b0b0b] font-light max-w-md mx-auto poppins pt-4">
                            Together with their families, cordially invite you to celebrate the blessed Nikah union of
                        </p>
                    </div>

                    {/* BRIDE & GROOM PROFILE CARDS */}
                    <div className="py-4 reveal-on-scroll stagger-2 max-w-xl mx-auto w-full">
                        {/* THE GROOM CARD */}
                        <div className="relative rounded-[28px] sm:rounded-[34px] border border-[#3b0b0b]/60 bg-white/95 px-6 py-7 sm:px-8 sm:py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-[#3b0b0b]/30 shadow-sm">
                            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#3b0b0b] mb-1">
                                The Groom
                            </p>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl send-flowers-regular text-[#3b0b0b] tracking-wide my-1">
                                Farhan Ahmad Khan
                            </h1>

                            <p className="text-xl sm:text-2xl text-[#C49A45] font-light mb-1 pt-1" style={{ fontFamily: 'Amiri, serif' }}>
                                فَرْحَان أَحْمَد خَان
                            </p>

                            <div className="w-12 h-px bg-[#f0bcc5] mx-auto my-3 sm:my-4" />

                            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#7c7375]">
                                Son of
                            </p>

                            <h3 className="text-base sm:text-lg font-bold text-[#1a1415] mt-1">
                                Mr. Mehtab Ahmed Khan
                            </h3>

                            <p className="text-xs text-[#8a6a3b] font-medium mt-0.5 tracking-wider uppercase">
                                Moradabad, India
                            </p>
                        </div>

                        {/* CONNECTOR DIVIDER */}
                        <div className="relative my-4 sm:my-6 flex items-center justify-center">
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

                        {/* THE BRIDE CARD */}
                        <div className="relative rounded-[28px] sm:rounded-[34px] border border-[#3b0b0b]/60 bg-white/95 px-6 py-7 sm:px-8 sm:py-8 text-center backdrop-blur-md transition-all duration-300 hover:border-[#3b0b0b]/30 shadow-sm">
                            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-[#3b0b0b] mb-1">
                                The Bride
                            </p>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl send-flowers-regular text-[#3b0b0b] tracking-wide my-1">
                                Haya Ali
                            </h1>

                            <p className="text-xl sm:text-2xl text-[#C49A45] font-light mb-1 pt-1" style={{ fontFamily: 'Amiri, serif' }}>
                                حَيَاء عَلِي
                            </p>

                            <div className="w-12 h-px bg-[#f0bcc5] mx-auto my-3 sm:my-4" />

                            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#7c7375]">
                                Daughter of
                            </p>

                            <h3 className="text-base sm:text-lg font-bold text-[#1a1415] mt-1">
                                Mr. Muzaffar Ali
                            </h3>

                            <p className="text-xs text-[#8a6a3b] font-medium mt-0.5 tracking-wider uppercase">
                                Al Khobar, Saudi Arabia
                            </p>
                        </div>
                    </div>
                </header>

                {/* SCRATCH REVEAL SECTION (Heart-shaped Date Reveal) */}
                <section className="scratch-card-area allow-select max-w-xl mx-auto px-4 sm:px-6 py-6 text-center reveal-on-scroll stagger-1 relative z-20 select-text">
                    <ScratchCard onReveal={handleDateReveal}>
                        <div
                            onClick={() => {
                                if (hasRevealedDate) {
                                    setCelebrationKey(prev => prev + 1);
                                }
                            }}
                            className="scratch-card-area allow-select flex flex-col items-center justify-center text-center px-4 cursor-pointer select-text max-w-[280px] sm:max-w-[320px] mx-auto z-10 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {/* Day of the Week */}
                            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#8a795c]">
                                Thursday
                            </p>

                            {/* Prominent Day Numeral */}
                            <div className="my-0.5">
                                <span className="text-5xl sm:text-6xl md:text-7xl send-flowers-regular text-[#3b0b0b] font-bold tracking-tight select-none" style={{ lineHeight: 1.05 }}>
                                    11
                                </span>
                            </div>

                            {/* Month & Year */}
                            <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wider text-[#3b0b0b]">
                                March 2027
                            </h3>

                            {/* Hijri Islamic Date */}
                            <p className="text-[11px] sm:text-xs text-[#8a795c] italic tracking-wide mt-0.5" style={{ fontFamily: 'Amiri, serif' }}>
                                3 Shawwal 1448 AH
                            </p>

                            {/* Delicate Gold Divider */}
                            <div className="flex items-center justify-center gap-2.5 mt-2.5 opacity-80">
                                <span className="h-px w-8 bg-[#3b0b0b]/50" />
                                <span className="w-1.5 h-1.5 rotate-45 border border-[#3b0b0b] bg-[#3b0b0b]" />
                                <span className="h-px w-8 bg-[#3b0b0b]/50" />
                            </div>

                            {/* Celebration hint */}
                            {hasRevealedDate && (
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#3b0b0b] font-semibold mt-2 animate-pulse">
                                    ✨ Tap to Celebrate
                                </p>
                            )}
                        </div>
                    </ScratchCard>
                </section>

                {/* COUNTDOWN SECTION (Revealed after scratching) */}
                <div
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${hasRevealedDate
                        ? 'max-h-[800px] opacity-100 translate-y-0 my-8 sm:my-10 pointer-events-auto'
                        : 'max-h-0 opacity-0 -translate-y-8 pointer-events-none my-0'}`}
                >
                    <section className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                        <div className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#FAF8F5]/90 border border-[#B9A17A]/35 shadow-[0_16px_45px_-18px_rgba(59,11,11,0.14)] backdrop-blur-md">
                            <h3 className="dm-sans mb-8 text-2xl sm:text-3xl font-medium text-[#3b0b0b] tracking-tight">
                                Counting Down to Forever
                            </h3>

                            {/* 4 Countdown Boxes */}
                            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full dm-sans">
                                {[
                                    { label: 'Days', value: timeLeft.days, delay: '0.1s' },
                                    { label: 'Hours', value: timeLeft.hours, delay: '0.2s' },
                                    { label: 'Minutes', value: timeLeft.minutes, delay: '0.3s' },
                                    { label: 'Seconds', value: timeLeft.seconds, delay: '0.4s' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col items-center justify-center py-4 sm:py-6 px-1 rounded-2xl bg-white/95 border border-[#B9A17A]/30 shadow-xs hover:border-[#C49A45]/60 hover:shadow-md transition-all duration-300"
                                    >
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3b0b0b] tracking-tight tabular-nums">
                                            {String(item.value).padStart(2, '0')}
                                        </p>
                                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C49A45] font-semibold mt-1.5">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-center gap-3 mt-6 opacity-70">
                                <span className="h-px w-10 bg-[#b9a17a]" />
                                <span className="w-1.5 h-1.5 rotate-45 border border-[#b9a17a] bg-[#C49A45]" />
                                <span className="h-px w-10 bg-[#b9a17a]" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* OCCASION DETAILS / CEREMONY */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 reveal-on-scroll">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3b0b0b]/5 border border-[#B9A17A]/30 text-[#A67B2E] text-[10px] uppercase font-bold tracking-[0.25em] mb-3 shadow-xs">
                            Occasion Details
                        </div>
                        <h2 className="text-3xl sm:text-5xl dm-sans font-semibold text-[#3b0b0b] tracking-tight">
                            Venue &amp; Timings
                        </h2>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#B9A17A]/60" />
                            <span className="w-1.5 h-1.5 rotate-45 border border-[#B9A17A] bg-[#C49A45]" />
                            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#B9A17A]/60" />
                        </div>
                    </div>

                    {/* Grand Mihrab Arch Card for Nikah */}
                    <div className="mx-auto w-full max-w-[420px]">
                        <div
                            className="relative overflow-hidden rounded-t-[210px] rounded-b-[36px] bg-[#C49A45]/50 p-px shadow-[0_30px_70px_-30px_rgba(59,11,11,0.7)]"
                            style={{
                                background: "linear-gradient(160deg,#E7CF98 0%,#C49A45 35%,#7a5a1f 70%,#D4B36D 100%)",
                            }}
                        >
                            <div
                                className="relative rounded-t-[209px] rounded-b-[35px] px-6 pb-8 pt-16"
                                style={{
                                    backgroundColor: "#3b0b0b",
                                    backgroundImage: `radial-gradient(120% 60% at 50% 0%, rgba(196,154,69,0.25), transparent 60%), ${lattice}`,
                                }}
                            >
                                <div className="pointer-events-none absolute inset-2.5 rounded-t-[200px] rounded-b-[26px] border border-[#C49A45]/30" />

                                <div className="relative flex flex-col items-center text-center">
                                    {/* Crest */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C49A45]/60 text-[#D4B36D] bg-[#2a0707] shadow-inner">
                                        <RiQuillPenLine size={26} />
                                    </div>

                                    <h3 className={`${serif} mt-5 text-[38px] sm:text-[44px] font-medium leading-none tracking-wide text-[#FAF8F5]`}>
                                        Nikah Ceremony
                                    </h3>

                                    {/* Divider */}
                                    <div className="mt-5 flex w-full max-w-[220px] items-center gap-3">
                                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C49A45]/70" />
                                        <span className="h-1.5 w-1.5 rotate-45 bg-[#C49A45]" />
                                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C49A45]/70" />
                                    </div>

                                    {/* Date */}
                                    <div className="mt-7">
                                        <p className="text-sm tracking-widest text-[#FAF8F5]/70 uppercase font-medium">
                                            Thursday
                                        </p>
                                        <div className="mt-1 flex items-center justify-center gap-4">
                                            <span className={`${serif} bg-gradient-to-b from-[#F0DBA6] to-[#B8892F] bg-clip-text text-[92px] font-semibold leading-[0.85] text-transparent`}>
                                                11
                                            </span>
                                            <span className="h-16 w-px bg-[#C49A45]/40" />
                                            <span className={`${serif} text-left text-[28px] font-medium leading-[1.05] text-[#FAF8F5]`}>
                                                March
                                                <br />
                                                2027
                                            </span>
                                        </div>
                                        <p className="mt-3 text-xs tracking-wider text-[#D4B36D] font-medium" style={{ fontFamily: 'Amiri, serif' }}>
                                            3 Shawwal 1448 AH
                                        </p>
                                    </div>

                                    {/* Time + Venue Details */}
                                    <div className="mt-7 w-full overflow-hidden rounded-3xl border border-[#C49A45]/30 bg-[#FAF8F5]/[0.06] backdrop-blur-sm">
                                        <div className="flex items-center justify-center gap-3 px-5 py-4">
                                            <PiClockBold size={22} className="text-[#D4B36D]" />
                                            <p className="text-[#FAF8F5]">
                                                <span className={`${serif} text-2xl font-semibold`}>
                                                    7:00 PM
                                                </span>
                                                <span className="ml-2 text-xs text-[#FAF8F5]/70">
                                                    (AST)
                                                </span>
                                            </p>
                                        </div>

                                        <div className="h-px bg-gradient-to-r from-transparent via-[#C49A45]/40 to-transparent" />

                                        <div className="flex items-center gap-4 px-5 py-4 text-left">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C49A45] text-[#3b0b0b] shadow-sm">
                                                <RiMapPinLine size={24} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold leading-snug text-[#FAF8F5]">
                                                    25th Street, Prince Thamer Road
                                                </p>
                                                <p className="mt-1 text-xs leading-relaxed text-[#D4B36D]">
                                                    Al Khobar Shumaliyah, Saudi Arabia
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-6 flex w-full flex-col gap-2.5">
                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn allow-select flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-[#C49A45]/40 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#FAF8F5] transition-all duration-300 hover:border-[#C49A45] hover:bg-white/[0.1] active:scale-[0.99]"
                                        >
                                            <FaDirections size={15} />
                                            <span>View on Google Maps</span>
                                        </a>

                                        <a
                                            href={nikahCalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn allow-select flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#C49A45] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#3b0b0b] transition-all duration-300 hover:bg-[#D4B36D] active:scale-[0.99]"
                                        >
                                            <FaGoogle size={15} />
                                            <span>Save our Date</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SPECIAL DUA SECTION */}
                <section className="max-w-3xl mx-auto px-6 py-12 text-center reveal-on-scroll">
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5]/80 border border-[#C49A45]/30 shadow-2xl backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C49A45] font-semibold mb-3">
                            Prophetic Sunnah Dua for The Newlyweds
                        </p>
                        
                        <p className="text-2xl sm:text-3xl md:text-4xl text-[#3b0b0b] font-normal my-4 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                        </p>
                        
                        <p className="text-xs sm:text-sm text-[#C49A45] font-mono italic">
                            &ldquo;Barakallahu lakuma wa baraka &lsquo;alaykuma wa jama&lsquo;a baynakuma fee khayr&rdquo;
                        </p>
                        
                        <p className="text-xs sm:text-sm text-[#3b0b0b] max-w-lg mx-auto mt-2 leading-relaxed font-light">
                            &ldquo;May Allah bless you both, shower His blessings upon you, and unite you in goodness.&rdquo;
                        </p>
                        
                        <span className="block text-[10px] text-[#C49A45]/80 uppercase tracking-widest mt-4">
                            — Sunan Abi Dawud &amp; Jami&lsquo; at-Tirmidhi
                        </span>
                    </div>
                </section>

                {/* RSVP & CONTACT SECTION */}
                <section className="max-w-xl mx-auto px-4 sm:px-6 py-10 reveal-on-scroll">
                    <div className="rounded-[32px] border border-[#C49A45]/35 bg-[#FAF8F5]/90 p-6 sm:p-8 text-center shadow-lg backdrop-blur-md">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3b0b0b]/5 border border-[#B9A17A]/30 text-[#A67B2E] text-[10px] uppercase font-bold tracking-[0.25em] mb-3">
                            Honour Us With Your Presence
                        </div>

                        <h3 className="text-2xl sm:text-3xl dm-sans font-semibold text-[#3b0b0b] tracking-tight mb-2">
                            RSVP Confirmation
                        </h3>

                        <p className="text-xs sm:text-sm text-[#7a5e28] max-w-md mx-auto mb-6">
                            Kindly confirm your attendance so we may welcome you with warmth and gracious hospitality.
                        </p>

                        {/* Direct Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
                            <div className="p-4 rounded-2xl bg-white border border-[#B9A17A]/25 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a795c]">
                                        Contact 1
                                    </p>
                                    <p className="text-sm font-semibold text-[#3b0b0b] mt-0.5">
                                        +966 50 494 7930
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <a
                                        href="https://wa.me/966504947930"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn allow-select inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <RiWhatsappLine size={14} />
                                        <span>WhatsApp</span>
                                    </a>
                                    <a
                                        href="tel:+966504947930"
                                        className="btn allow-select inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#3b0b0b] bg-[#FAF8F5] hover:bg-[#efe9dc] px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <RiPhoneLine size={14} />
                                        <span>Call</span>
                                    </a>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-[#B9A17A]/25 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a795c]">
                                        Contact 2
                                    </p>
                                    <p className="text-sm font-semibold text-[#3b0b0b] mt-0.5">
                                        +966 55 950 6149
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <a
                                        href="https://wa.me/966559506149"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn allow-select inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <RiWhatsappLine size={14} />
                                        <span>WhatsApp</span>
                                    </a>
                                    <a
                                        href="tel:+966559506149"
                                        className="btn allow-select inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#3b0b0b] bg-[#FAF8F5] hover:bg-[#efe9dc] px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <RiPhoneLine size={14} />
                                        <span>Call</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <form onSubmit={handleRsvpSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b0b0b] mb-1.5">
                                    Your Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Dr. Salman Khan"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-sm text-[#3b0b0b] placeholder:text-[#998877] focus:outline-none focus:border-[#C49A45] focus:ring-1 focus:ring-[#C49A45]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b0b0b] mb-1.5">
                                        Attendance
                                    </label>
                                    <select
                                        value={attendance}
                                        onChange={(e) => setAttendance(e.target.value)}
                                        className="w-full px-3 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-xs sm:text-sm text-[#3b0b0b] focus:outline-none focus:border-[#C49A45]"
                                    >
                                        <option value="attending">Joyfully Attending</option>
                                        <option value="regret">Regretfully Unable</option>
                                    </select>
                                </div>

                                {attendance === 'attending' && (
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b0b0b] mb-1.5">
                                            Number of Guests
                                        </label>
                                        <select
                                            value={guestCount}
                                            onChange={(e) => setGuestCount(e.target.value)}
                                            className="w-full px-3 py-3 rounded-xl bg-white border border-[#B9A17A]/40 text-xs sm:text-sm text-[#3b0b0b] focus:outline-none focus:border-[#C49A45]"
                                        >
                                            <option value="1">1 Person</option>
                                            <option value="2">2 Persons</option>
                                            <option value="3">3 Persons</option>
                                            <option value="4">4 Persons</option>
                                            <option value="5+">Family (5+)</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b0b0b] mb-1.5">
                                    Send RSVP Confirmation To
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPhone('966504947930')}
                                        className={`btn allow-select py-2.5 px-3 text-xs rounded-xl border font-medium transition-all ${selectedPhone === '966504947930' ? 'bg-[#3b0b0b] text-[#FAF8F5] border-[#3b0b0b]' : 'bg-white text-[#3b0b0b] border-[#B9A17A]/40 hover:bg-[#FAF8F5]'}`}
                                    >
                                        +966 50 494 7930
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPhone('966559506149')}
                                        className={`btn allow-select py-2.5 px-3 text-xs rounded-xl border font-medium transition-all ${selectedPhone === '966559506149' ? 'bg-[#3b0b0b] text-[#FAF8F5] border-[#3b0b0b]' : 'bg-white text-[#3b0b0b] border-[#B9A17A]/40 hover:bg-[#FAF8F5]'}`}
                                    >
                                        +966 55 950 6149
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3b0b0b] mb-1.5">
                                    Personal Dua / Message (Optional)
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Send your prayers and warm blessings to Farhan & Haya..."
                                    value={duaMessage}
                                    onChange={(e) => setDuaMessage(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#B9A17A]/40 text-sm text-[#3b0b0b] placeholder:text-[#998877] focus:outline-none focus:border-[#C49A45]"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleConfirmRsvp}
                                className="btn allow-select w-full mt-2 py-3.5 px-6 rounded-full bg-[#3b0b0b] hover:bg-[#521212] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                            >
                                <RiWhatsappLine size={18} className="text-[#25D366]" />
                                <span>Confirm &amp; Send RSVP via WhatsApp</span>
                            </button>
                        </form>
                    </div>
                </section>

                {/* THANK YOU CARD */}
                <section className="reveal-on-scroll w-full py-6">
                    <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center overflow-hidden">
                        <img
                            src="/templates/zafaf-regal/Thankyoucard.png"
                            alt="Thank You Card"
                            className="w-64 sm:w-72 md:w-80 h-auto object-contain rotate-[10deg] transition-transform duration-700 hover:scale-105 pointer-events-none"
                        />
                    </div>
                </section>

                {/* ETIQUETTE & WARM REQUESTS */}
                <section className="max-w-xl mx-auto px-6 py-8 reveal-on-scroll">
                    <h3 className="mb-5 text-center font-semibold text-[#C49A45] uppercase tracking-[0.14em] text-[13px]">
                        Event Etiquette &amp; Warm Requests
                    </h3>

                    <ul className="space-y-4 text-left text-[13px] sm:text-sm leading-relaxed text-[#3b0b0b] px-5">
                        <li className="flex items-start gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A45]" />
                            <p>
                                Modest Islamic formal attire is kindly requested for the ceremony.
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
                                In keeping with the prophetic Sunnah, our celebrations will be strictly music-free.
                            </p>
                        </li>
                    </ul>
                </section>

                {/* FOOTER */}
                <footer className="relative z-10 w-full overflow-hidden border-t border-[#B9A17A]/25 bg-[#3b0b0b] px-6 pb-10 pt-8 text-center reveal-on-scroll">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none font-poppins text-5xl sm:text-7xl font-semibold tracking-[0.2em] text-white/[0.025]"
                    >
                        ZAFAF
                    </span>

                    <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-4">
                        <a
                            href="https://zafaf.mizaantech.co.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Zafaf Atelier"
                            className="footer-link allow-select inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
                        >
                            <img
                                src="/zafaf-white-trans.png"
                                alt="Zafaf Atelier"
                                className="h-9 w-auto object-contain pointer-events-none"
                            />
                        </a>

                        <div className="space-y-1.5">
                            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#C49A45]">
                                Thoughtfully Crafted for Farhan &amp; Haya
                            </p>
                            <p className="text-xs leading-relaxed text-[#FAF8F5]/75">
                                A bespoke digital wedding invitation, designed with royal elegance,
                                sacred prayers, and timeless simplicity.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 py-1">
                            <span className="h-px w-8 bg-[#C49A45]/40" />
                            <span className="h-1.5 w-1.5 rotate-45 border border-[#C49A45]/70" />
                            <span className="h-px w-8 bg-[#C49A45]/40" />
                        </div>

                        <p className="footer-link allow-select select-text pt-1 text-[9px] tracking-wide text-[#FAF8F5]/40">
                            Designed with care by Zafaf Atelier
                        </p>
                    </div>
                </footer>
            </div>

            {/* Confetti Particles */}
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
