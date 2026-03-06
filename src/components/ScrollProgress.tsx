"use client";

import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Spring physics make the scroll numbers transition beautifully smoothly
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress exactly to a percentage integer string for the visual text
    const percentage = useTransform(smoothProgress, [0, 1], [0, 100]);
    const displayPercentage = useTransform(percentage, (latest: number) => {
        // Pad with a zero if it's single digits for typographic consistency (e.g., 04%)
        const num = Math.round(latest);
        return num < 10 ? `0${num}%` : `${num}%`;
    });

    // We must use a motion template to safely render a MotionValue string into a React child node
    const textTemplate = useMotionTemplate`SCROLL — ${displayPercentage}`;

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex items-center justify-center mix-blend-difference pointer-events-none">
            <motion.div
                className="font-mono text-[11px] text-[#00ff88]/50 font-medium tracking-[0.3em] uppercase rotate-90 origin-center whitespace-nowrap"
            >
                {textTemplate}
            </motion.div>
        </div>
    );
}
