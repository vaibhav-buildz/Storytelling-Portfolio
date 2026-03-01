"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Section 1: 0% to 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    // Section 2: 25% to 45%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

    // Section 3: 50% to 80%
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full flex flex-col justify-center">

            {/* Section 1: Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
                    My Name.
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                    Creative Developer.
                </p>
            </motion.div>

            {/* Section 2: Left aligned */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl text-white drop-shadow-md">
                    I build digital experiences.
                </h2>
            </motion.div>

            {/* Section 3: Right aligned */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl text-white drop-shadow-md">
                    Bridging design and engineering.
                </h2>
            </motion.div>

        </div>
    );
}
