/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

const skillsData = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "Framer"],
    languages: ["JavaScript", "Python", "C++", "Java", "Go", "Bash"],
    backend: ["Node.js", "Express", "Docker", "MongoDB", "PostgreSQL", "Redis"],
    networking: ["TCP/IP", "DNS", "Linux", "Wireshark", "Cloudflare", "VPNs"],
    bugbounty: ["Recon", "OWASP", "HackerOne", "Fuzzing", "PrivEsc", "Web Exploit"],
    offsec: ["Burp Suite", "Kali", "Metasploit", "Nmap", "SQLi/XSS", "Malware"]
};

// SVG Paths connecting the neural nodes
const DesktopSynapses = () => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
        {/* Base Static Lines */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" vectorEffect="non-scaling-stroke">
            <path d="M 50 10 L 25 35" />
            <path d="M 50 10 L 75 35" />

            <path d="M 25 35 L 10 65" />
            <path d="M 25 35 L 25 75" />
            <path d="M 25 35 L 40 65" />

            <path d="M 75 35 L 60 65" />
            <path d="M 75 35 L 75 75" />
            <path d="M 75 35 L 90 65" />
        </g>

        {/* Animated Data Pulses */}
        <g className="synapse-flow" strokeWidth="0.3" fill="none" vectorEffect="non-scaling-stroke">
            <path d="M 50 10 L 25 35" stroke="#ff5533" />
            <path d="M 50 10 L 75 35" stroke="#00ff88" />

            <path d="M 25 35 L 10 65" stroke="#ff5533" />
            <path d="M 25 35 L 25 75" stroke="#ff5533" />
            <path d="M 25 35 L 40 65" stroke="#ff5533" />

            <path d="M 75 35 L 60 65" stroke="#00ff88" />
            <path d="M 75 35 L 75 75" stroke="#00ff88" />
            <path d="M 75 35 L 90 65" stroke="#00ff88" />
        </g>
    </svg>
);

const MobileSynapses = () => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10 md:hidden overflow-visible">
        {/* Base Static Lines */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" fill="none" vectorEffect="non-scaling-stroke">
            <path d="M 50 5 L 50 18" />
            <path d="M 50 5 C 105 5, 105 55, 50 55" />

            <path d="M 50 18 L 25 30" />
            <path d="M 50 18 L 75 30" />
            <path d="M 50 18 L 50 42" />

            <path d="M 50 55 L 25 67" />
            <path d="M 50 55 L 75 67" />
            <path d="M 50 55 L 50 79" />
        </g>

        {/* Animated Data Pulses */}
        <g className="synapse-flow" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke">
            <path d="M 50 5 L 50 18" stroke="#ff5533" />
            <path d="M 50 5 C 105 5, 105 55, 50 55" stroke="#00ff88" />

            <path d="M 50 18 L 25 30" stroke="#ff5533" />
            <path d="M 50 18 L 75 30" stroke="#ff5533" />
            <path d="M 50 18 L 50 42" stroke="#ff5533" />

            <path d="M 50 55 L 25 67" stroke="#00ff88" />
            <path d="M 50 55 L 75 67" stroke="#00ff88" />
            <path d="M 50 55 L 50 79" stroke="#00ff88" />
        </g>
    </svg>
);

interface TechDotProps {
    label: string;
    angle: number;
}

const TechDot = ({ label, angle }: TechDotProps) => (
    <div
        className="absolute z-20"
        style={{
            left: `calc(50% + ${Math.cos(angle) * 75}px)`,
            top: `calc(50% + ${Math.sin(angle) * 75}px)`,
            transform: 'translate(-50%, -50%)' // Center the dot on the exact coordinate
        }}
    >
        <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            className="px-2 py-1 bg-[#121212] border border-white/10 rounded-md text-[9px] md:text-[11px] text-white/80 whitespace-nowrap shadow-xl"
        >
            {label}
        </motion.div>
    </div>
);

interface SubNodeProps {
    label: string;
    techs: string[];
    mobileTop: string;
    mobileLeft: string;
    desktopTop: string;
    desktopLeft: string;
    borderClass: string;
    glowClass: string;
}

const SubNode = ({ label, techs, mobileTop, mobileLeft, desktopTop, desktopLeft, borderClass, glowClass }: SubNodeProps) => (
    <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 ${mobileTop} ${mobileLeft} ${desktopTop} ${desktopLeft}`}
    >
        <div className="relative flex items-center justify-center w-[150px] h-[150px] group">
            {/* Core SubNode Badge */}
            <motion.div whileHover={{ scale: 1.1 }} className="absolute z-30 cursor-default">
                <div className={`px-4 py-2 bg-[#121212] border ${borderClass} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md`}>
                    <span className={`text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${glowClass}`}>
                        {label}
                    </span>
                </div>
            </motion.div>

            {/* Local Synapse Lines connecting to Tech Dots */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: "visible" }}>
                {techs.map((_, i) => {
                    const angle = (i * (360 / techs.length)) * (Math.PI / 180);
                    return <line key={i} x1="50%" y1="50%" x2={`calc(50% + ${Math.cos(angle) * 75}px)`} y2={`calc(50% + ${Math.sin(angle) * 75}px)`} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                })}
            </svg>

            {/* Orbiting Terminal Tech Nodes */}
            {techs.map((tech, i) => {
                const angle = (i * (360 / techs.length)) * (Math.PI / 180);
                return <TechDot key={tech} label={tech} angle={angle} />
            })}
        </div>
    </div>
);

export default function Skills() {
    return (
        <section id="skills" className="relative w-full py-24 bg-[#121212] overflow-hidden z-30">
            {/* Global Animation for Synapse Flow */}
            <style>{`
                .synapse-flow {
                    stroke-dasharray: 8 16;
                    animation: digitalFlow 20s linear infinite;
                }
                @keyframes digitalFlow {
                    from { stroke-dashoffset: 1000; }
                    to { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Background Ambient Lights */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#ff5533]/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col pt-12 md:pt-0 pointer-events-none z-40 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center md:text-left px-4 md:px-12"
                >
                    <h3 className="text-4xl md:text-5xl font-sans font-medium text-[#f2ede4] mb-4">
                        Neural <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5533] to-[#00ff88]">Architecture</span>
                    </h3>
                    <p className="text-white/40 font-mono text-sm tracking-widest uppercase">
                        {`// Reactive expertise mapping system`}
                    </p>
                </motion.div>
            </div>

            {/* Neural Network Container */}
            <div className="relative w-full h-[1500px] md:h-[1000px] max-w-6xl mx-auto mt-8 z-20">
                {/* Global Synapse Lines drawn via absolute SVG */}
                <DesktopSynapses />
                <MobileSynapses />

                {/* 1. Core Brain Node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-40 top-[5%] left-[50%] md:top-[10%] md:left-[50%]">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-28 h-28 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                        <motion.div whileHover={{ scale: 1.05 }} className="px-6 py-3 bg-[#111] border border-purple-500/50 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-xl cursor-default">
                            <span className="text-sm md:text-lg font-bold text-white tracking-widest uppercase">Vy / Architect</span>
                        </motion.div>
                    </div>
                </div>

                {/* 2. Full Stack Domain Node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-40 top-[18%] left-[50%] md:top-[35%] md:left-[25%]">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-20 h-20 bg-[#ff5533]/10 rounded-full blur-lg animate-pulse" />
                        <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-2 bg-[#111] border border-[#ff5533] rounded-lg shadow-[0_0_20px_rgba(255,85,51,0.3)] cursor-default">
                            <span className="font-mono text-sm md:text-base font-bold text-[#ff5533]">Full Stack</span>
                        </motion.div>
                    </div>
                </div>

                {/* 3. Cybersecurity Domain Node */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-40 top-[55%] left-[50%] md:top-[35%] md:left-[75%]">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-20 h-20 bg-[#00ff88]/10 rounded-full blur-lg animate-pulse" />
                        <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-2 bg-[#111] border border-[#00ff88] rounded-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-default">
                            <span className="font-mono text-sm md:text-base font-bold text-[#00ff88]">Cybersecurity</span>
                        </motion.div>
                    </div>
                </div>

                {/* --- Terminal Sub Nodes containing Specific Technologies --- */}

                {/* BRANCH: FULL STACK */}
                <SubNode
                    label="Frontend"
                    techs={skillsData.frontend}
                    mobileTop="top-[30%]" mobileLeft="left-[25%]"
                    desktopTop="md:top-[65%]" desktopLeft="md:left-[10%]"
                    borderClass="border-[#ff5533]/40" glowClass="from-[#ff5533] to-[#ff8c00]"
                />

                <SubNode
                    label="Languages"
                    techs={skillsData.languages}
                    mobileTop="top-[30%]" mobileLeft="left-[75%]"
                    desktopTop="md:top-[75%]" desktopLeft="md:left-[25%]"
                    borderClass="border-[#ff5533]/40" glowClass="from-[#ff5533] to-[#ff8c00]"
                />

                <SubNode
                    label="Backend"
                    techs={skillsData.backend}
                    mobileTop="top-[42%]" mobileLeft="left-[50%]"
                    desktopTop="md:top-[65%]" desktopLeft="md:left-[40%]"
                    borderClass="border-[#ff5533]/40" glowClass="from-[#ff5533] to-[#ff8c00]"
                />

                {/* BRANCH: CYBERSECURITY */}
                <SubNode
                    label="Networking"
                    techs={skillsData.networking}
                    mobileTop="top-[67%]" mobileLeft="left-[25%]"
                    desktopTop="md:top-[65%]" desktopLeft="md:left-[60%]"
                    borderClass="border-[#00ff88]/40" glowClass="from-[#00ff88] to-[#00bfff]"
                />

                <SubNode
                    label="Bug Bounty"
                    techs={skillsData.bugbounty}
                    mobileTop="top-[67%]" mobileLeft="left-[75%]"
                    desktopTop="md:top-[75%]" desktopLeft="md:left-[75%]"
                    borderClass="border-[#00ff88]/40" glowClass="from-[#00ff88] to-[#00bfff]"
                />

                <SubNode
                    label="OffSec"
                    techs={skillsData.offsec}
                    mobileTop="top-[79%]" mobileLeft="left-[50%]"
                    desktopTop="md:top-[65%]" desktopLeft="md:left-[90%]"
                    borderClass="border-[#00ff88]/40" glowClass="from-[#00ff88] to-[#00bfff]"
                />
            </div>

        </section>
    );
}
