"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { HeroTitle } from "./HeroTitle";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Overall scroll length (0 to 1) is divided into 4 segments now.

    // Section 1: Main Title (0% to 25%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
    const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);

    // Section 2: Subtitle 1 - Left fly-in (20% to 50%)
    // Reads from 30% to 40%
    const opacity2 = useTransform(scrollYProgress, [0.20, 0.30, 0.40, 0.50], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.20, 0.30, 0.40, 0.50], [-200, 0, 0, 200]);
    const y2 = useTransform(scrollYProgress, [0.20, 0.30, 0.40, 0.50], [50, 0, 0, -50]);

    // Section 3: Subtitle 2 - Right fly-in (45% to 75%)
    // Reads from 55% to 65%
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [200, 0, 0, -200]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [50, 0, 0, -50]);

    // Section 4: Subtitle 3 - Bottom fly-in (70% to 100%)
    // Reads from 80% to 95%
    const opacity4 = useTransform(scrollYProgress, [0.70, 0.80, 0.95, 1], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.70, 0.80, 0.95, 1], [200, 0, 0, -200]);
    const scale4 = useTransform(scrollYProgress, [0.70, 0.80, 0.95, 1], [0.8, 1, 1, 1.2]);


    return (
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full flex flex-col justify-center overflow-hidden">

            {/* Section 1: Center Main Title */}
            <motion.div
                style={{ opacity: opacity1, y: y1, scale: scale1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-48 lg:pt-[280px]"
            >
                <HeroTitle title="Vaibhav Yadav" subtitle="Creative Developer" />
            </motion.div>

            {/* Section 2: Subtitle 1 (Left aligned) */}
            <motion.div
                style={{ opacity: opacity2, x: x2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white/40 drop-shadow-md">
                    I build digital
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ffaa00]">experiences.</span>
                </h2>
            </motion.div>

            {/* Section 3: Subtitle 2 (Right aligned) */}
            <motion.div
                style={{ opacity: opacity3, x: x3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white/40 drop-shadow-md">
                    Bridging design and
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ffaa00]">engineering.</span>
                </h2>
            </motion.div>

            {/* Section 4: Subtitle 3 (Center aligned, scales up) */}
            <motion.div
                style={{ opacity: opacity4, y: y4, scale: scale4 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white/40 drop-shadow-md">
                    Crafting intuitive
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#ffaa00]">user interfaces.</span>
                </h2>
            </motion.div>

        </div>
    );
}
