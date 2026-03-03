"use client";

import React from "react";
import { motion } from "framer-motion";

const MAIN_RADIUS = 380;
const SUB_RADIUS = 180;
const MOON_RADIUS = 100;

// Core Data Structure for the 3D System
const skillSystem = {
    core: { name: "Vaibhav Yadav", title: "Digital Architect" },
    domains: [
        {
            name: "Full Stack",
            colorClass: "from-[#ff5533] to-[#ff8c00]",
            hex: "#ff5533",
            angle: 180, // Left
            subDomains: [
                { name: "Frontend", angle: 270, techs: ["React", "Next.js", "Tailwind", "Three.js", "Framer"] },
                { name: "Backend", angle: 90, techs: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"] }
            ]
        },
        {
            name: "Cybersecurity",
            colorClass: "from-[#00ff88] to-[#00bfff]",
            hex: "#00ff88",
            angle: 0, // Right
            subDomains: [
                { name: "OffSec", angle: 270, techs: ["Burp Suite", "Kali", "OWASP", "XSS", "SQLi"] },
                { name: "Networking", angle: 90, techs: ["TCP/IP", "DNS", "Nmap", "Wireshark", "Linux"] }
            ]
        }
    ]
};

// --- Types ---
interface SubDomainData {
    name: string;
    angle: number;
    techs: string[];
}

interface DomainData {
    name: string;
    colorClass: string;
    hex: string;
    angle: number;
    subDomains: SubDomainData[];
}

// --- Components for the 3D System ---

const TechMoon = ({ name, angle }: { name: string, angle: number }) => {
    const x = MOON_RADIUS * Math.cos(angle * Math.PI / 180);
    const y = MOON_RADIUS * Math.sin(angle * Math.PI / 180);

    return (
        <div
            className="absolute top-0 left-0 w-0 h-0 transform-style-3d group/moon hover:z-50"
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <div className="absolute top-0 left-0 w-0 h-0 animate-[spin_15s_linear_infinite_reverse] transform-style-3d">
                <div
                    className="absolute top-0 left-0 w-0 h-0 transform-style-3d flex justify-center items-center pointer-events-auto"
                    style={{ transform: 'rotateX(-60deg)' }}
                >
                    <div className="absolute w-4 h-4 rounded-full bg-white/10 border border-white/40 backdrop-blur-md group-hover/moon:bg-white group-hover/moon:scale-150 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />

                    <div className="absolute bg-[#121212]/90 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/20 text-xs md:text-sm font-mono text-white/90 group-hover/moon:text-white group-hover/moon:border-white/60 group-hover/moon:bg-[#1a1a1a] whitespace-nowrap translate-y-7 transition-all shadow-xl">
                        {name}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SubDomainNode = ({ data }: { data: SubDomainData }) => {
    const x = SUB_RADIUS * Math.cos(data.angle * Math.PI / 180);
    const y = SUB_RADIUS * Math.sin(data.angle * Math.PI / 180);

    return (
        <div
            className="absolute top-0 left-0 w-0 h-0 transform-style-3d z-20 opacity-0 scale-50 group-hover/domain:opacity-100 group-hover/domain:scale-100 transition-all duration-700 pointer-events-none group-hover/domain:pointer-events-auto"
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <div className="absolute top-0 left-0 w-0 h-0 animate-[spin_25s_linear_infinite_reverse] group-hover/domain:[animation-play-state:paused] transform-style-3d">
                <div
                    className="absolute top-0 left-0 w-0 h-0 transform-style-3d flex justify-center items-center z-30 pointer-events-auto"
                    style={{ transform: 'rotateX(-60deg)' }}
                >
                    <div className="px-5 py-2 rounded-full bg-[#121212]/80 border border-white/20 backdrop-blur-md text-sm md:text-base font-bold text-white tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.05)] whitespace-nowrap">
                        {data.name}
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-0 h-0 transform-style-3d animate-[spin_15s_linear_infinite] group-hover/domain:[animation-play-state:paused]">
                    <div
                        className="absolute top-0 left-0 rounded-full border border-dashed border-white/10"
                        style={{
                            width: MOON_RADIUS * 2,
                            height: MOON_RADIUS * 2,
                            transform: `translate(-${MOON_RADIUS}px, -${MOON_RADIUS}px)`
                        }}
                    />
                    {data.techs.map((tech, i) => (
                        <TechMoon key={tech} name={tech} angle={(360 / data.techs.length) * i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DomainNode = ({ data }: { data: DomainData }) => {
    const x = MAIN_RADIUS * Math.cos(data.angle * Math.PI / 180);
    const y = MAIN_RADIUS * Math.sin(data.angle * Math.PI / 180);

    return (
        <div
            className="absolute top-0 left-0 w-0 h-0 transform-style-3d z-30 group/domain"
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <div className="absolute top-0 left-0 w-0 h-0 animate-[spin_30s_linear_infinite_reverse] group-hover/domain:[animation-play-state:paused] transform-style-3d">

                {/* Visuals */}
                <div
                    className="absolute top-0 left-0 w-0 h-0 transform-style-3d flex justify-center items-center z-40"
                    style={{ transform: 'rotateX(-60deg)' }}
                >
                    {/* The "Planet" Hover Area Bubble */}
                    <div className="absolute w-48 h-48 rounded-full pointer-events-auto cursor-pointer" />

                    <div className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${data.colorClass} opacity-20 blur-2xl animate-pulse`} />
                    <div className="absolute w-8 h-8 rounded-full bg-[#121212] border-[3px]" style={{ borderColor: data.hex, boxShadow: `0 0 20px ${data.hex}` }} />
                    <div
                        className="absolute text-2xl md:text-4xl font-cormorant font-bold italic drop-shadow-2xl whitespace-nowrap translate-y-12 transition-transform duration-300 group-hover/domain:scale-110"
                        style={{ color: '#fff', textShadow: `0 0 20px ${data.hex}` }}
                    >
                        {data.name}
                    </div>
                </div>

                {/* SubDomain Galaxy */}
                <div className="absolute top-0 left-0 w-0 h-0 transform-style-3d animate-[spin_20s_linear_infinite] group-hover/domain:[animation-play-state:paused]">
                    <div
                        className="absolute top-0 left-0 rounded-full border border-white/5 opacity-0 group-hover/domain:opacity-100 transition-opacity duration-700"
                        style={{
                            width: SUB_RADIUS * 2,
                            height: SUB_RADIUS * 2,
                            transform: `translate(-${SUB_RADIUS}px, -${SUB_RADIUS}px)`
                        }}
                    />
                    {data.subDomains.map(sub => (
                        <SubDomainNode key={sub.name} data={sub} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Skills() {
    return (
        <section id="skills" className="relative w-full min-h-[140vh] bg-[#121212] overflow-hidden z-30 flex items-center justify-center py-20">

            {/* Background Ambient Lights */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff5533]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col pt-12 md:pt-0 pointer-events-none z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:text-left z-40 relative px-4 md:px-12"
                >
                    <h3 className="text-4xl md:text-5xl font-sans font-medium text-[#f2ede4] mb-4">
                        Neural <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00bfff]">Architecture</span>
                    </h3>
                    <p className="text-white/40 font-mono text-sm tracking-widest uppercase">
                        {`// Mapping the domains of expertise`}
                    </p>
                </motion.div>
            </div>

            {/* 3D Solar System Container */}
            <div className="absolute inset-0 flex items-center justify-center perspective-[2000px] pointer-events-none z-10 mt-32 md:mt-24">

                <motion.div
                    initial={{ opacity: 0, rotateX: 45 }}
                    whileInView={{ opacity: 1, rotateX: 60 }} // Isometric Tilt
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    // Increased scaling to make it enormous and perfectly visible
                    className="relative w-0 h-0 transform-style-3d scale-[0.4] sm:scale-[0.5] md:scale-[0.8] lg:scale-[1.1] xl:scale-[1.3] transition-transform duration-1000"
                >
                    {/* The entire galaxy rotates */}
                    <div className="absolute top-0 left-0 w-0 h-0 transform-style-3d animate-[spin_40s_linear_infinite]">

                        {/* Draw Main Orbit Ring */}
                        <div
                            className="absolute top-0 left-0 rounded-full border-2 border-dashed border-white/5"
                            style={{
                                width: MAIN_RADIUS * 2,
                                height: MAIN_RADIUS * 2,
                                transform: `translate(-${MAIN_RADIUS}px, -${MAIN_RADIUS}px)`
                            }}
                        />

                        {/* Core (Center) */}
                        <div className="absolute top-0 left-0 w-0 h-0 transform-style-3d z-50">
                            {/* Counter-rotate the core so text stays upright */}
                            <div className="absolute top-0 left-0 w-0 h-0 animate-[spin_40s_linear_infinite_reverse] transform-style-3d">
                                <div
                                    className="absolute top-0 left-0 w-0 h-0 transform-style-3d flex justify-center items-center pointer-events-auto"
                                    style={{ transform: 'rotateX(-60deg)' }}
                                >
                                    <div className="flex flex-col items-center justify-center bg-[#121212]/90 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-full shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00ff88]/20 to-[#ff5533]/20 blur-2xl animate-pulse" />
                                        <div className="text-2xl md:text-5xl font-bold text-white mb-2 relative z-10 whitespace-nowrap">{skillSystem.core.name}</div>
                                        <div className="text-sm md:text-lg font-mono text-[#00ff88] uppercase tracking-[0.3em] relative z-10 whitespace-nowrap">{skillSystem.core.title}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Domains */}
                        {skillSystem.domains.map(domain => (
                            <DomainNode key={domain.name} data={domain} />
                        ))}
                    </div>

                    {/* Decorative Grid Plane beneath the system */}
                    <div className="absolute top-0 left-0 w-[3000px] h-[3000px] border-[0.5px] border-white/[0.02] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:translate(-1500px,-1500px)_translateZ(-200px)] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

                </motion.div>
            </div>

        </section>
    );
}
