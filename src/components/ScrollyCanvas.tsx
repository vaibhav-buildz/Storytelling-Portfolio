"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, AnimatePresence, motion } from "framer-motion";
import Overlay from "./Overlay";
import BootSequence from "./BootSequence";

const FRAME_COUNT = 94;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showBootSequence, setShowBootSequence] = useState(true);

    // Track frame index manually
    const currentFrameRef = useRef(0);
    const requestRef = useRef<number>(0);

    // 1. Preload ALL frames on mount
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/frame_${paddedIndex}_delay-0.05s.webp`;

            img.onload = () => {
                loadedCount++;
                // Calculate percentage
                const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
                setLoadProgress(progress);

                if (loadedCount === FRAME_COUNT) {
                    imagesRef.current = images;
                    // Add a slight delay before hiding the loading screen 
                    // so the user actually sees it reach 100%
                    setTimeout(() => setImagesLoaded(true), 400);
                }
            };
            images.push(img);
        }
    }, []);

    // 2. We still need useScroll for the Overlay component which relies on Framer Motion Y-progress
    // But we restrict it to ONLY the 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 3. Native scroll listener for Canvas Frame Scrubbing
    useEffect(() => {
        if (!imagesLoaded || !containerRef.current) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            // The container is 500vh tall. The sticky child is 100vh tall.
            // This means there is 400vh of scrollable distance.
            const scrollableDistance = rect.height - window.innerHeight;

            // The distance scrolled PAST the top of the container
            // If rect.top is 0, we are at the very start of the container.
            // If rect.top is negative, we have scrolled down.
            const scrolledDistance = Math.max(0, -rect.top);

            // Calculate progress (0 to 1)
            let progress = scrolledDistance / scrollableDistance;

            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(1, progress));

            // Calculate index
            const rawIndex = Math.floor(progress * (FRAME_COUNT - 1));
            const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, rawIndex));

            currentFrameRef.current = frameIndex;

            // Schedule render
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(renderCanvas);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial call to set the first frame immediately
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [imagesLoaded]);

    const renderCanvas = () => {
        if (!canvasRef.current || !imagesRef.current.length) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const img = imagesRef.current[currentFrameRef.current];
        if (!img) return;

        // Ensure canvas sizing is correct using devicePixelRatio
        const dpr = window.devicePixelRatio || 1;

        // Only resize if internal dimensions don't match (prevents performance hit)
        const displayWidth = Math.floor(canvas.clientWidth * dpr);
        const displayHeight = Math.floor(canvas.clientHeight * dpr);

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }

        // Responsive Object Cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        // Always draw inside requestAnimationFrame, never clear without immediately redrawing
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // 4. Handle Window Resize
    useEffect(() => {
        if (!imagesLoaded) return;

        const handleResize = () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(renderCanvas);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesLoaded]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Initial Terminal Boot Sequence */}
                <AnimatePresence>
                    {showBootSequence && (
                        <BootSequence onComplete={() => setShowBootSequence(false)} />
                    )}
                </AnimatePresence>

                {/* Custom Loading Screen (appears after boot) */}
                <AnimatePresence>
                    {!showBootSequence && !imagesLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50"
                        >
                            <div className="flex flex-col items-center w-full max-w-[200px]">
                                <div className="text-white/80 font-mono text-4xl font-light mb-4 tracking-tighter">
                                    {loadProgress}
                                    <span className="text-white/40 text-2xl">%</span>
                                </div>

                                {/* Progress Bar Track */}
                                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                                    {/* Progress Bar Fill */}
                                    <motion.div
                                        className="h-full bg-orange-500 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${loadProgress}%` }}
                                        transition={{ ease: "easeOut", duration: 0.1 }}
                                    />
                                </div>
                                <div className="mt-4 text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold">
                                    Loading Sequence
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ willChange: "contents", imageRendering: "pixelated" }}
                />
                <div className="absolute inset-0 bg-black/30 w-full h-full z-10 pointer-events-none" />
                <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
