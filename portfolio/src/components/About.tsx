"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="relative w-full min-h-screen bg-[#121212] py-24 md:py-32 px-6 md:px-16 lg:px-24 z-30 flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* LEFT: Portrait Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[#0e0e12] border border-white/5 shadow-2xl group"
                >
                    {/* Background gradient & SVG Grid */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff5533]/20 to-[#00ff88]/20 mix-blend-overlay z-0 transition-opacity duration-500 group-hover:opacity-75" />
                    <div className="absolute inset-0 z-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                    {/* Center placeholder circle */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#ff5533] to-[#00ff88] flex items-center justify-center shadow-[0_0_50px_rgba(0,255,136,0.2)]">
                            <span className="text-5xl font-bold font-cormorant text-white tracking-widest drop-shadow-md">VY</span>
                        </div>
                    </div>

                    {/* Floating stat badges */}
                    <div className="absolute bottom-6 left-0 w-full px-6 flex flex-wrap justify-center gap-2 z-20">
                        {["∞ Curiosity", "10+ Projects", "2+ Bugs Reported", "∞ CVEs"].map((stat, i) => (
                            <div key={i} className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white/80">
                                {stat}
                            </div>
                        ))}
                    </div>
                </motion.div>

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
