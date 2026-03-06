"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Spring physics make the scroll bar feel incredibly smooth and native
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress to a percentage integer string for the visual counter
    const percentage = useTransform(smoothProgress, [0, 1], [0, 100]);
    const displayPercentage = useTransform(percentage, (latest: number) => `${Math.round(latest)}%`);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 h-32 w-12 z-[100] hidden md:flex flex-col items-center justify-center gap-3">
            {/* Minimalist Tech Counter */}
            <motion.div className="font-mono text-[10px] text-[#00ff88]/80 font-bold uppercase tracking-widest origin-right rotate-90 translate-y-6">
                {displayPercentage}
            </motion.div>

            {/* Glowing Orbital Track */}
            <div className="w-[1px] h-24 bg-white/10 rounded-full relative overflow-hidden">
                <motion.div
                    className="absolute top-0 w-full bg-gradient-to-b from-[#00bfff] to-[#00ff88] rounded-full"
                    style={{ height: "100%", y: useTransform(smoothProgress, [0, 1], ["-100%", "0%"]) }}
                />
            </div>

            <div className="text-[8px] text-white/30 font-bold tracking-[0.3em] rotate-90 origin-left -translate-y-6 -translate-x-1">
                SCROLL
            </div>
        </div>
    );
}
