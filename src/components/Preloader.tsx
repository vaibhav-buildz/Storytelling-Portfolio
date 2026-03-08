"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mark as mounted first to prevent hydration mismatch
        setMounted(true);

        // Only run on the client side
        const hasPlayed = sessionStorage.getItem("preloaderPlayed");

        if (hasPlayed) {
            // Bypass the preloader instantly if already played this session
            setLoading(false);
        } else {
            // Hold the preloader for 1.5 seconds minimum to ensure the boot sequence matches the cinematic feel
            const timer = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem("preloaderPlayed", "true");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Don't render anything until mounted (prevents server/client HTML mismatch)
    if (!mounted || !loading) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            animate={loading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
        >
            {/* A subtle glowing loader or stylized mark */}
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                >
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 bg-[#00bfff] blur-[40px] opacity-20 rounded-full" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "circInOut", repeatType: "mirror" }}
                    >
                        <h1 className="text-4xl font-black font-sans tracking-[0.2em] text-[#f2ede4] uppercase z-10 relative">
                            V<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]">Y</span>
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Thin loading line */}
                <div className="w-32 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-[#00bfff] absolute"
                    />
                </div>
            </div>
        </motion.div>
    );
}
