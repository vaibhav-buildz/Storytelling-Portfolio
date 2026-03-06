"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface HeroTitleProps {
    title: string;
    subtitle: string;
    className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const HeroTitle: React.FC<HeroTitleProps> = ({ title, subtitle, className }) => {
    const [scrambledTitle, setScrambledTitle] = useState(title);
    const [scrambledSubtitle, setScrambledSubtitle] = useState(subtitle);
    const [isHovered, setIsHovered] = useState(false);

    // Add useInView for mobile scroll animations
    const [isMobile, setIsMobile] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Combine hover (for desktop) and scroll (for mobile)
    const isActive = isHovered || (isMobile && isInView);

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambledTitle(() =>
                title
                    .split("")
                    .map((letter, index) => {
                        if (title[index] === " ") return " ";
                        if (index < iteration) return title[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= title.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [title]);

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambledSubtitle(() =>
                subtitle
                    .split("")
                    .map((letter, index) => {
                        if (subtitle[index] === " ") return " ";
                        if (index < iteration) return subtitle[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= subtitle.length) {
                clearInterval(interval);
            }

            // Subtitle decodes slightly slower
            iteration += 1 / 4;
        }, 35);

        return () => clearInterval(interval);
    }, [subtitle]);

    return (
        <div
            ref={ref}
            className={cn("relative flex flex-col items-center justify-center z-50 select-none", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style>{`
                @keyframes glitch-anim-1 {
                    0%, 100% { clip-path: inset(50% 0 30% 0); transform: translate(-3px, 1px); }
                    20% { clip-path: inset(15% 0 65% 0); transform: translate(3px, -1px); }
                    40% { clip-path: inset(80% 0 5% 0); transform: translate(-3px, 2px); }
                    60% { clip-path: inset(40% 0 40% 0); transform: translate(3px, -2px); }
                    80% { clip-path: inset(25% 0 55% 0); transform: translate(-2px, 1px); }
                }
                @keyframes glitch-anim-2 {
                    0%, 100% { clip-path: inset(10% 0 60% 0); transform: translate(3px, -1px); }
                    20% { clip-path: inset(30% 0 20% 0); transform: translate(-3px, 2px); }
                    40% { clip-path: inset(70% 0 10% 0); transform: translate(3px, -2px); }
                    60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 1px); }
                    80% { clip-path: inset(50% 0 30% 0); transform: translate(3px, 1px); }
                }
                .glitch-text::before,
                .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    inset: 0;
                    mix-blend-mode: screen;
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                    visibility: hidden; /* Hide screen reader duplication */
                }
                .glitch-text.is-active::before {
                    color: #00bfff;
                    left: -4px;
                    top: 2px;
                    opacity: 1;
                    animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
                }
                .glitch-text.is-active::after {
                    color: #00ff88;
                    left: 4px;
                    top: -2px;
                    opacity: 1;
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                .animate-scanline {
                    animation: scanline 6s linear infinite;
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative group cursor-default mb-6"
            >
                {/* Base Layer with Pseudo Elements for Glitch */}
                <h1
                    data-text={scrambledTitle}
                    className={cn(
                        "glitch-text relative text-7xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-sans font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] text-white transition-all duration-500 ease-out text-center whitespace-pre-wrap sm:whitespace-nowrap leading-tight",
                        // Dynamic text shadow glows on hover
                        isActive ? "is-active scale-[1.02] drop-shadow-[0_0_30px_rgba(255,255,255,0.7)] text-[#ffffff]" : "drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] text-[#f2ede4]"
                    )}
                >
                    <span aria-hidden="false">{scrambledTitle}</span>
                </h1>

                {/* Scanline Effect when hovered */}
                <div
                    className={cn(
                        "absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-0 transition-opacity duration-500 rounded-lg hidden md:block",
                        isActive && "opacity-80"
                    )}
                >
                    <div className="w-full h-[5%] bg-gradient-to-b from-transparent via-[#00bfff]/30 to-transparent animate-scanline" />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col items-center mt-2 group"
            >
                {/* Sleek Subtitle Container with Rotating Glow */}
                <div className="relative inline-flex overflow-hidden rounded-full p-[2px] cursor-default border border-white/5 bg-[#121212] transition-colors duration-500">
                    {/* Rotating Background that becomes visible/glowing on hover */}
                    <span
                        className={cn(
                            "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#00bfff_50%,#00ff88_100%)] opacity-20 transition-opacity duration-500",
                            isActive && "opacity-100"
                        )}
                    />

                    <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#111111] px-4 py-2 sm:px-6 sm:py-2 md:px-10 md:py-3 text-xs sm:text-sm font-medium backdrop-blur-3xl transition-all duration-500 z-10">
                        <p
                            className={cn(
                                "relative text-[10px] sm:text-xs md:text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase transition-all duration-500 whitespace-pre-wrap sm:whitespace-nowrap text-center",
                                isActive ? "from-[#00bfff] to-[#00ff88] scale-[1.05]" : "from-gray-300 to-gray-500"
                            )}
                        >
                            {scrambledSubtitle}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
