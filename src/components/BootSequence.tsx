"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface BootSequenceProps {
    onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
    useEffect(() => {
        // Give the animation time to finish before firing onComplete to start the preloader
        const timeout = setTimeout(() => {
            onComplete();
        }, 3200);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Phrase to animate
    const phrase = "Where imagination meets digital reality.";
    const words = phrase.split(" ");

    // Animation variants
    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.4,
            },
        },
    };

    const wordAnim: import("framer-motion").Variants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: "0%",
            opacity: 1,
            transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }, // Custom snappy ease
        },
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col items-center justify-center p-8 pointer-events-none"
        >
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-4xl text-center"
            >
                {words.map((word, index) => (
                    <div key={index} className="overflow-hidden pb-1">
                        <motion.span
                            variants={wordAnim}
                            className="relative inline-block text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white/90"
                        >
                            {word}
                            {/* Make the word "reality" pop with the brand color */}
                            {word.toLowerCase().includes("reality") && (
                                <span className="text-orange-500 absolute inset-0 -z-10 blur-sm opacity-50">{word}</span>
                            )}
                        </motion.span>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
