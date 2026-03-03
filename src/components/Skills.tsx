"use client";

import React from "react";
import { motion } from "framer-motion";

// Core Data Structure for the 3D System
const skillSystem = {
    core: { name: "Vaibhav Yadav", title: "Digital Architect" },
    orbits: [
        {
            name: "Full Stack",
            color: "from-[#ff5533] to-[#ff8c00]",
            glow: "rgba(255,85,51,0.5)",
            radius: "300px",  // Distance from center
            speed: "40s",     // Time for one full orbit
            subOrbits: [
                {
                    name: "Frontend",
                    radius: "120px",
                    speed: "15s",
                    techs: ["React", "Next.js", "Tailwind", "Three.js", "Framer"]
                },
                {
                    name: "Backend",
                    radius: "140px",
                    speed: "20s",
                    reverse: true, // Orbit in opposite direction
                    techs: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL"]
                }
            ]
        },
        {
            name: "Cybersecurity",
            color: "from-[#00ff88] to-[#00bfff]",
            glow: "rgba(0,255,136,0.5)",
            radius: "450px",  // Outer orbit
            speed: "60s",     // Slower outer orbit
            reverse: true,    // Orbit in opposite direction to Full Stack
            subOrbits: [
                {
                    name: "OffSec",
                    radius: "130px",
                    speed: "18s",
                    techs: ["Burp Suite", "Kali Linux", "OWASP", "XSS", "SQLi"]
                },
                {
                    name: "Networking",
                    radius: "110px",
                    speed: "12s",
                    reverse: true,
                    techs: ["TCP/IP", "DNS", "Nmap", "Wireshark", "Linux"]
                }
            ]
        }
    ]
};

// --- Types ---
interface SubOrbitData {
    name: string;
    radius: string;
    speed: string;
    reverse?: boolean;
    techs: string[];
}

interface MainOrbitData {
    name: string;
    color: string;
    glow: string;
    radius: string;
    speed: string;
    reverse?: boolean;
    subOrbits: SubOrbitData[];
}

// --- Components for the 3D System ---

const TechMoon = ({ name, angle, radius }: { name: string, angle: number, radius: string }) => {
    // Calculate static position on the sub-orbit ring
    return (
        <div
            className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center transform-style-3d group/moon"
            style={{ transform: `rotate(${angle}deg) translateX(${radius})` }}
        >
            {/* The physical 'moon' dot */}
            <div className="w-3 h-3 rounded-full bg-white/20 border border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover/moon:bg-white group-hover/moon:scale-150 transition-all" />

            {/* Counter-rotation to keep text upright relative to the main camera tilt 
                (The moon is rotated by the ring, the ring is rotated by the parent, all inside a 60deg X tilt) */}
            <div
                className="absolute opacity-0 group-hover/moon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs font-mono text-white/90 z-50"
                style={{
                    // This complex transform undoes the Y/Z rotation of the orbits so text faces the user
                    transform: `rotate(-${angle}deg) rotateX(-60deg) translateZ(30px) translateY(-20px)`
                }}
            >
                {name}
            </div>
        </div>
    );
};

const SubOrbitRing = ({ data, parentReverse }: { data: SubOrbitData, parentReverse?: boolean }) => {
    const animationClass = data.reverse
        ? (parentReverse ? 'animate-[spin_var(--speed)_linear_infinite]' : 'animate-[spin_var(--speed)_linear_infinite_reverse]')
        : (parentReverse ? 'animate-[spin_var(--speed)_linear_infinite_reverse]' : 'animate-[spin_var(--speed)_linear_infinite]');

    return (
        <div
            className={`absolute top-1/2 left-1/2 rounded-full border border-white/5 transform-style-3d ${animationClass}`}
            style={{
                width: `calc(${data.radius} * 2)`,
                height: `calc(${data.radius} * 2)`,
                marginLeft: `-${data.radius}`,
                marginTop: `-${data.radius}`,
                '--speed': data.speed
            } as React.CSSProperties}
        >
            {/* Sub-hub Core (e.g., Frontend, Backend) */}
            <div
                className="absolute top-1/2 left-1/2 -ml-8 -mt-4 w-16 h-8 flex items-center justify-center transform-style-3d"
                style={{
                    // Counter-rotate the main spin of this specific ring so the label stays horizontal-ish
                    animation: data.reverse
                        ? (parentReverse ? 'spin var(--speed) linear infinite reverse' : 'spin var(--speed) linear infinite')
                        : (parentReverse ? 'spin var(--speed) linear infinite' : 'spin var(--speed) linear infinite reverse'),
                }}
            >
                <div
                    className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-white/80 uppercase tracking-widest whitespace-nowrap shadow-xl"
                    style={{ transform: 'rotateX(-60deg) translateZ(20px)' }} // Counter the main 60deg tilt
                >
                    {data.name}
                </div>
            </div>

            {/* Tech Moons */}
            {data.techs.map((tech: string, i: number) => {
                const angle = (360 / data.techs.length) * i;
                return <TechMoon key={tech} name={tech} angle={angle} radius={data.radius} />;
            })}
        </div>
    );
};

const MainOrbit = ({ data }: { data: MainOrbitData }) => {
    const animationClass = data.reverse ? 'animate-[spin_var(--speed)_linear_infinite_reverse]' : 'animate-[spin_var(--speed)_linear_infinite]';
    const counterAnimationClass = data.reverse ? 'animate-[spin_var(--speed)_linear_infinite]' : 'animate-[spin_var(--speed)_linear_infinite_reverse]';

    return (
        <div
            className={`absolute top-1/2 left-1/2 rounded-full border border-dashed border-white/10 transform-style-3d ${animationClass}`}
            style={{
                width: `calc(${data.radius} * 2)`,
                height: `calc(${data.radius} * 2)`,
                marginLeft: `-${data.radius}`,
                marginTop: `-${data.radius}`,
                '--speed': data.speed
            } as React.CSSProperties}
        >
            {/* The Main Orbital Hub (e.g., Full Stack, Cybersecurity) positioned on the ring edge */}
            <div
                className="absolute top-0 left-1/2 w-0 h-0 transform-style-3d"
            >
                {/* Counter-rotate the hub container so it doesn't spin wildly, but stays oriented */}
                <div
                    className={`absolute top-0 left-0 w-0 h-0 transform-style-3d ${counterAnimationClass}`}
                    style={{ '--speed': data.speed } as React.CSSProperties}
                >
                    {/* The Hub Visual */}
                    <div
                        className={`absolute -ml-12 -mt-12 w-24 h-24 rounded-full bg-gradient-to-br ${data.color} opacity-20 blur-xl animate-pulse`}
                    />
                    <div
                        className="absolute -ml-3 -mt-3 w-6 h-6 rounded-full bg-[#121212] border-2 z-10"
                        style={{ borderColor: data.color.split(' ')[1].replace('to-[', '').replace(']', '') }}
                    />

                    {/* Hub Label */}
                    <div
                        className="absolute -ml-20 -mt-20 w-40 text-center font-cormorant font-bold italic text-2xl drop-shadow-2xl z-20"
                        style={{
                            transform: 'rotateX(-60deg) translateZ(40px)', // Stand up against the global tilt
                            color: data.color.split(' ')[1].replace('to-[', '').replace(']', ''),
                            textShadow: `0 0 20px ${data.glow}`
                        }}
                    >
                        {data.name}
                    </div>

                    {/* Sub Orbits (Frontend/Backend orbiting Full Stack) */}
                    {data.subOrbits.map((sub: SubOrbitData) => (
                        <SubOrbitRing key={sub.name} data={sub} parentReverse={data.reverse} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function Skills() {
    return (
        <section id="skills" className="relative w-full min-h-[120vh] bg-[#121212] overflow-hidden z-30 flex items-center justify-center py-32">

            {/* Background Ambient Lights */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff5533]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col pt-12 md:pt-0 pointer-events-none">
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
            <div className="absolute inset-0 flex items-center justify-center perspective-[1200px] pointer-events-auto overflow-hidden">

                {/* Global Scene Tilt */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                    whileInView={{ opacity: 1, scale: 1, rotateX: 60 }} // Isometric Tilt
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="relative w-[1000px] h-[1000px] transform-style-3d scale-50 md:scale-75 lg:scale-100 mt-32 md:mt-0"
                >
                    {/* The Central Sun / Core */}
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 -ml-24 -mt-24 rounded-full bg-[#121212] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center transform-style-3d z-30">
                        {/* Core Glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff5533]/20 to-[#00ff88]/20 blur-xl animate-pulse" />

                        {/* Core Text (Counter-tilted to face up) */}
                        <div
                            className="text-center transform-style-3d shadow-2xl bg-black/50 p-6 rounded-full backdrop-blur-md border border-white/5"
                            style={{ transform: 'rotateX(-60deg) translateZ(60px)' }}
                        >
                            <div className="text-xl font-bold text-white mb-1">{skillSystem.core.name}</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-widest">{skillSystem.core.title}</div>
                        </div>
                    </div>

                    {/* Orbit Rings */}
                    {skillSystem.orbits.map(orbit => (
                        <MainOrbit key={orbit.name} data={orbit} />
                    ))}

                    {/* Decorative Grid Plane beneath the system */}
                    <div className="absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -ml-[1000px] -mt-[1000px] border-[0.5px] border-white/[0.02] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:translateZ(-200px)] rounded-full [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

                </motion.div>
            </div>

        </section>
    );
}
