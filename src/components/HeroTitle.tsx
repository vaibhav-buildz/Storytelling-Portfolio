"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroTitleProps {
    title: string;
    subtitle: string;
    className?: string;
}

// Split name into first + last for stacked layout
function splitName(name: string) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return { first: parts[0], last: parts.slice(1).join(" ") };
    return { first: name, last: "" };
}

// Per-character staggered reveal with mask clip
const CharReveal = ({
    text,
    delay = 0,
    className = "",
    stagger = 0.04,
    style,
}: {
    text: string;
    delay?: number;
    className?: string;
    stagger?: number;
    style?: React.CSSProperties;
}) => (
    <span className={`inline-flex overflow-hidden ${className}`} style={style} aria-label={text}>
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                aria-hidden="true"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                    duration: 0.75,
                    delay: delay + i * stagger,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </span>
);

export const HeroTitle: React.FC<HeroTitleProps> = ({ title, subtitle, className }) => {
    const { first, last } = splitName(title);
    const [lineVisible, setLineVisible] = useState(false);
    const [subtitleVisible, setSubtitleVisible] = useState(false);

    // Animate the accent line and subtitle after the name reveals
    useEffect(() => {
        const t1 = setTimeout(() => setLineVisible(true), 800);
        const t2 = setTimeout(() => setSubtitleVisible(true), 1100);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const firstDelay = 0.1;
    const lastDelay = firstDelay + first.length * 0.04 + 0.05;

    return (
        <div className={`relative flex flex-col items-center justify-center z-50 select-none ${className ?? ""}`}>

            {/* Name block — stacked two-line layout */}
            <div className="flex flex-col items-center leading-[0.88] mb-6">
                {/* First name — same outline style as last name */}
                <div className="overflow-hidden">
                    <CharReveal
                        text={first.toUpperCase()}
                        delay={firstDelay}
                        stagger={0.045}
                        className="font-sans font-black text-[clamp(4.5rem,14vw,11rem)] tracking-[0.08em]"
                        style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)", color: "transparent" } as React.CSSProperties}
                    />
                </div>

                {/* Last name — bold sans-serif, outlined stroke style */}
                <div className="overflow-hidden -mt-2">
                    <CharReveal
                        text={last.toUpperCase()}
                        delay={lastDelay}
                        stagger={0.04}
                        className="font-sans font-black text-[clamp(4.5rem,14vw,11rem)] tracking-[0.08em]"
                        style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)", color: "transparent" } as React.CSSProperties}
                    />
                </div>
            </div>

            {/* Thin divider line with animated width */}
            <div
                className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mb-5 transition-all duration-700 ease-out"
                style={{ width: lineVisible ? "min(520px, 80vw)" : "0px" }}
            />

            {/* Subtitle — minimal, spaced, elegant */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: subtitleVisible ? 1 : 0, y: subtitleVisible ? 0 : 10 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
            >
                {/* Left dot */}
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-1 rounded-full bg-[#00bfff]"
                />

                <p className="text-[clamp(0.6rem,2vw,0.8rem)] font-mono tracking-[0.35em] uppercase text-white/55 font-medium">
                    {subtitle}
                </p>

                {/* Right dot */}
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
                    className="w-1 h-1 rounded-full bg-[#00ff88]"
                />
            </motion.div>

            {/* Subtle ambient glow under name */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[50%] h-24 bg-white/[0.04] blur-[60px] rounded-full pointer-events-none"
            />
        </div>
    );
};
