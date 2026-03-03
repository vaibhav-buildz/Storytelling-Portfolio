"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="relative w-full min-h-screen bg-[#121212] py-24 md:py-32 px-6 md:px-16 lg:px-24 z-30 flex items-center overflow-hidden">

            {/* Ambient Background Glow for 3D effect */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5533]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff88]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* LEFT: 3D Portrait Card */}
                <div className="relative w-full perspective-[1000px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="relative w-full max-w-[450px] aspect-[3/4] rounded-2xl overflow-visible group"
                    >
                        {/* 3D Floating Layers Container */}
                        <div className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out group-hover:[transform:rotateX(5deg)_rotateY(-5deg)] shadow-2xl rounded-2xl">

                            {/* Inner Glow Border */}
                            <div className="absolute inset-[-2px] bg-gradient-to-br from-[#ff5533] via-transparent to-[#00ff88] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

                            {/* Main Cover Image */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e12] [transform:translateZ(20px)]">
                                <img
                                    src="/profile-photo.jpeg"
                                    alt="Background Cover"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Overlay to ensure text pops */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent opacity-80" />

                                {/* Geometric Highlights */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay shadow-[inset_0_0_100px_rgba(255,255,255,0.2)]" />
                            </div>

                            {/* Center Circular Profile Picture - Hidden by default, revealed on hover */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(60px)] z-20 pointer-events-none transition-all duration-700 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-110 shadow-2xl rounded-full">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/20 overflow-hidden bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                                    <img
                                        src="/new-cover-photo.jpg"
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Text Content */}
                <div className="flex flex-col justify-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-cormorant leading-tight mb-8"
                    >
                        I break things <br />
                        <span className="bg-gradient-to-r from-[#ff5533] to-[#00ff88] text-transparent bg-clip-text">
                            to build them better.
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-6 text-white/70 text-lg md:text-xl font-light leading-relaxed mb-12"
                    >
                        <p>
                            I&apos;m Vaibhav Yadav, a full-stack developer and cybersecurity enthusiast from Greater Noida, India. I craft high-performance web apps while hunting vulnerabilities in the wild.
                        </p>
                        <p>
                            My dual identity as a creative developer and bug bounty hunter gives me a unique edge — I think like an attacker, build like an engineer, design like an artist.
                        </p>
                    </motion.div>

                    {/* Career Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-4 font-mono text-sm md:text-base border-l border-white/10 ml-2 pl-6"
                    >
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#ff5533] shadow-[0_0_10px_#ff5533]" />
                            <span className="text-white/40 mr-4">2023</span> <span className="text-white/90">Started full-stack development</span>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
                            <span className="text-white/40 mr-4">2024</span> <span className="text-white/90">Discovered bug bounty hunting</span>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
                            <span className="text-white/40 mr-4">2025</span> <span className="text-white/90">First vulnerability reports submitted</span>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-white/20" />
                            <span className="text-white/40 mr-4">2026</span> <span className="text-white/50">Building, breaking & growing</span>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
