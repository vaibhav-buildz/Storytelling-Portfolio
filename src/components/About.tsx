/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

                            {/* Main Cover Image - 3D Depth & Pan Animation */}
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#0e0e12] [transform:translateZ(20px)] shadow-inner">
                                <motion.div
                                    className="absolute inset-[-10%] w-[120%] h-[120%]"
                                    style={{
                                        x: useTransform(useMotionValue(0), [-100, 100], [-20, 20]),
                                        y: useTransform(useMotionValue(0), [-100, 100], [-20, 20]),
                                    }}
                                >
                                    <img
                                        src="/profile-photo.jpeg"
                                        alt="Background Cover"
                                        className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:rotate-1"
                                    />
                                </motion.div>

                                {/* Dynamic Lighting Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-[#121212]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-bl from-[#ff5533]/20 via-transparent to-[#00ff88]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay" />

                                {/* Glitch / Scanline FX on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay shadow-[inset_0_0_100px_rgba(255,255,255,0.15)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                            </div>

                            {/* Center Circular Profile Picture - Unique 3D Pop & Spin Animation */}
                            <div className="absolute top-1/2 left-1/2 z-20 pointer-events-none transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 [transform:translate(-50%,-50%)_translateZ(-50px)_scale(0.3)_rotate(-25deg)] group-hover:opacity-100 group-hover:[transform:translate(-50%,-50%)_translateZ(100px)_scale(1.05)_rotate(0deg)] rounded-full group-hover:shadow-[0_0_50px_rgba(0,255,136,0.4)]">

                                {/* Orbiting Holographic Rings */}
                                <div className="absolute inset-[-15px] rounded-full border border-dashed border-[#00ff88]/50 animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200" />
                                <div className="absolute inset-[-25px] rounded-full border border-dotted border-[#ff5533]/50 animate-[spin_15s_linear_infinite_reverse] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" />

                                <div className="relative w-28 h-28 md:w-[140px] md:h-[140px] rounded-full border-2 border-[#00ff88]/40 overflow-hidden bg-black/40 backdrop-blur-md flex items-center justify-center shadow-inner">
                                    <img
                                        src="/new-cover-photo.jpg"
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
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
                        className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-[#f2ede4] mb-8"
                        style={{ textShadow: "0 4px 24px rgba(242, 237, 228, 0.15)" }}
                    >
                        <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5533] to-[#ff8c00]" style={{ paddingBottom: "0.25em", paddingRight: "0.15em", display: "inline-block", overflow: "visible" }}>
                            Digital
                        </span>
                        {" "}
                        <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5533] to-[#ff8c00]" style={{ paddingBottom: "0.25em", paddingRight: "0.15em", display: "inline-block", overflow: "visible" }}>
                            Architect.
                        </span>
                        <br className="hidden md:block" />
                        Offensive Security.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="space-y-6 text-white/70 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-12"
                    >
                        <p>
                            I&apos;m Vaibhav Yadav, based in Greater Noida, India. I build immersive, high-performance web applications with a hacker&apos;s mindset. My journey bridges the gap between creative frontend development and deep-level system security.
                        </p>
                        <p>
                            By day, I architect scalable platforms and fluid user interfaces. By night, I hunt for critical vulnerabilities, ensuring the digital infrastructure I interact with remains robust and impenetrable.
                        </p>
                    </motion.div>

                    {/* Career Timeline - Advanced 3D Interactive Design */}
                    <div className="relative w-full mt-8 lg:mt-0 perspective-[1000px]">
                        <motion.div
                            initial={{ opacity: 0, rotateX: 10, y: 30 }}
                            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="relative space-y-6 md:space-y-8 pl-8 md:pl-10 transform-style-3d"
                        >
                            {/* Glowing Animated Vertical Axis Beam */}
                            <div className="absolute left-0 top-2 bottom-6 w-[2px] bg-white/5 rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88] to-transparent h-1/2 w-full animate-[pulse_3s_ease-in-out_infinite_alternate]" />
                                <div className="absolute left-[-1px] top-0 bottom-0 w-[4px] bg-[#00ff88]/20 blur-sm" />
                            </div>

                            {/* 2023 Block */}
                            <div className="relative group perspective-[800px]">
                                {/* Timeline Node Indicator */}
                                <div className="absolute -left-[38px] md:-left-[46px] top-2 z-10 w-5 h-5 md:w-6 md:h-6 rounded-md bg-[#121212] border border-[#ff5533]/50 flex items-center justify-center transform rotate-45 transition-all duration-500 group-hover:bg-[#ff5533]/20 group-hover:scale-125 group-hover:border-[#ff5533] group-hover:shadow-[0_0_15px_rgba(255,85,51,0.6)]">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff5533]" />
                                </div>

                                {/* 3D Card Content */}
                                <div className="relative w-full p-5 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-md transition-all duration-500 ease-out transform-style-3d group-hover:[transform:translateZ(30px)_translateX(10px)] group-hover:-translate-y-2 group-hover:border-[#ff5533]/40 group-hover:shadow-[-20px_20px_30px_rgba(0,0,0,0.5)]">
                                    {/* Accent Glow on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#ff5533]/10 to-transparent rounded-xl pointer-events-none" />

                                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 relative z-10">
                                        <span className="text-[#ff5533] font-bold font-mono tracking-wider tabular-nums text-lg drop-shadow-[0_0_8px_rgba(255,85,51,0.5)] group-hover:scale-110 transition-transform origin-left">2023</span>
                                        <span className="text-white/90 font-medium text-base md:text-lg tracking-wide uppercase text-xs sm:text-sm">Started the Engineering Journey</span>
                                    </div>
                                    <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed mt-2 z-10 relative">
                                        Ignited my passion for software architecture, diving deep into computer science fundamentals. I laid the technical groundwork by understanding how digital systems operate under the hood.
                                    </p>
                                </div>
                            </div>

                            {/* 2024 Block */}
                            <div className="relative group perspective-[800px]">
                                <div className="absolute -left-[38px] md:-left-[46px] top-2 z-10 w-5 h-5 md:w-6 md:h-6 rounded-md bg-[#121212] border border-white/20 flex items-center justify-center transform rotate-45 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#ff5533]/20 group-hover:to-[#00ff88]/20 group-hover:scale-125 group-hover:border-[#00ff88]/80 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.6)]">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-br from-[#ff5533] to-[#00ff88]" />
                                </div>

                                <div className="relative w-full p-5 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-md transition-all duration-500 ease-out transform-style-3d group-hover:[transform:translateZ(30px)_translateX(10px)] group-hover:-translate-y-2 group-hover:border-[#00ff88]/30 group-hover:shadow-[-20px_20px_30px_rgba(0,0,0,0.5)]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-gradient-to-r from-[#ff5533]/5 to-[#00ff88]/10 rounded-xl pointer-events-none" />

                                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 relative z-10">
                                        <span className="bg-gradient-to-r from-[#ff5533] to-[#00ff88] text-transparent bg-clip-text font-bold font-mono tracking-wider tabular-nums text-lg group-hover:scale-110 transition-transform origin-left">2024</span>
                                        <span className="text-white/90 font-medium text-base md:text-lg tracking-wide uppercase text-xs sm:text-sm">Embraced Full-Stack Development</span>
                                    </div>
                                    <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed mt-2 relative z-10">
                                        Transitioned into building production-ready applications. I mastered modern web frameworks and crafted immersive user experiences wrapped around scalable backend architectures.
                                    </p>
                                </div>
                            </div>

                            {/* 2025 Block */}
                            <div className="relative group perspective-[800px]">
                                <div className="absolute -left-[38px] md:-left-[46px] top-2 z-10 w-5 h-5 md:w-6 md:h-6 rounded-md bg-[#121212] border border-[#00ff88]/50 flex items-center justify-center transform rotate-45 transition-all duration-500 group-hover:bg-[#00ff88]/20 group-hover:scale-125 group-hover:border-[#00ff88] group-hover:shadow-[0_0_15px_rgba(0,255,136,0.6)]">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#00ff88]" />
                                </div>

                                <div className="relative w-full p-5 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-md transition-all duration-500 ease-out transform-style-3d group-hover:[transform:translateZ(30px)_translateX(10px)] group-hover:-translate-y-2 group-hover:border-[#00ff88]/40 group-hover:shadow-[-20px_20px_30px_rgba(0,0,0,0.5)]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00ff88]/10 to-transparent rounded-xl pointer-events-none" />

                                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 relative z-10">
                                        <span className="text-[#00ff88] font-bold font-mono tracking-wider tabular-nums text-lg drop-shadow-[0_0_8px_rgba(0,255,136,0.5)] group-hover:scale-110 transition-transform origin-left">2025</span>
                                        <span className="text-white/90 font-medium text-base md:text-lg tracking-wide uppercase text-xs sm:text-sm">Ventured into Cybersecurity</span>
                                    </div>
                                    <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed mt-2 relative z-10">
                                        Developed a hacker&apos;s mindset to uncover critical vulnerabilities. Leveraging my development background, I hunt for exploits and secure application perimeters from the inside out.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
