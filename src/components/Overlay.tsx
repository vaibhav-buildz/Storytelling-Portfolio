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
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-48 lg:pt-[280px]"
            >
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] leading-none font-bold tracking-[1px] md:tracking-[2px] mb-4 text-white/25 drop-shadow-lg">
                    Vaibhav Yadav
                </h1>
                <p className="text-3xl md:text-4xl lg:text-5xl text-white/20 font-medium tracking-wide mt-4">
                    Creative Developer
                </p>
            </motion.div>

            {/* Section 2: Left aligned */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white/60 drop-shadow-md">
                    I build digital
                    <br />
                    <span className="text-orange-500">experiences.</span>
                </h2>
            </motion.div>

            {/* Section 3: Right aligned */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-white/60 drop-shadow-md">
                    Bridging design and
                    <br />
                    <span className="text-orange-500">engineering.</span>
                </h2>
            </motion.div>

        </div>
    );
}
