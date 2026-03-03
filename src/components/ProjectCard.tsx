"use client";

import React, { useRef, MouseEvent } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const sheenRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !innerRef.current || !sheenRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateMax = 15;
        const rotateX = ((centerY - y) / centerY) * rotateMax;
        const rotateY = ((x - centerX) / centerX) * rotateMax;

        const sheenX = (x / rect.width) * 100;
        const sheenY = (y / rect.height) * 100;

        // Direct DOM mutation — zero React re-renders
        innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        innerRef.current.style.boxShadow = `0 30px 60px -20px rgba(0,0,0,0.8), ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(255,255,255,0.03)`;
        sheenRef.current.style.background = `radial-gradient(circle 400px at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.2), transparent 80%)`;
        sheenRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
        if (!innerRef.current || !sheenRef.current) return;

        // Reset directly — no setState
        innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        innerRef.current.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.5)";
        sheenRef.current.style.opacity = "0";
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-pointer"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={innerRef}
                className="relative w-full h-full p-8 md:p-12 overflow-hidden rounded-[2rem] bg-[#1a1a1c]/80 border border-white/5 flex flex-col justify-end min-h-[420px]"
                style={{
                    transform: "rotateX(0deg) rotateY(0deg)",
                    transformStyle: "preserve-3d",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                    transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
                    willChange: "transform",
                }}
            >
                {/* Magnetic Sheen Layer */}
                <div
                    ref={sheenRef}
                    className="absolute inset-0 pointer-events-none rounded-[2rem] z-0 mix-blend-overlay"
                    style={{
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        background: "radial-gradient(circle 400px at 50% 50%, rgba(255,255,255,0.2), transparent 80%)",
                    }}
                />

                {/* 3D Depth Layer */}
                <div
                    className="relative z-10 pointer-events-none"
                    style={{ transform: "translateZ(60px)" }}
                >
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-[0.7rem] uppercase tracking-wider font-mono text-white/80 bg-white/5 border border-white/10 rounded-full"
                                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h4
                        className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight drop-shadow-2xl"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        {project.title}
                    </h4>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-sm">
                        {project.description}
                    </p>
                </div>

                {/* Decorative wireframe grid background */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: `40px 40px`,
                        transform: "translateZ(-20px)"
                    }}
                />
            </div>
        </div>
    );
}
