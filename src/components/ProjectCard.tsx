"use client";

import React, { useRef, MouseEvent, useState, useEffect } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const sheenRef = useRef<HTMLDivElement>(null);

    // Setup mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer for mobile auto-hover
    useEffect(() => {
        if (!isMobile || !cardRef.current || !innerRef.current || !sheenRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!innerRef.current || !sheenRef.current) return;

                if (entry.isIntersecting) {
                    // Apply a static "hovered" 3D state for mobile
                    innerRef.current.style.transform = `rotateX(10deg) rotateY(-5deg)`;
                    innerRef.current.style.boxShadow = `0 30px 60px -20px rgba(0,0,0,0.8), 10px 20px 30px rgba(255,255,255,0.03)`;
                    sheenRef.current.style.background = `radial-gradient(circle 400px at 20% 20%, rgba(255,255,255,0.2), transparent 80%)`;
                    sheenRef.current.style.opacity = "1";
                } else {
                    // Reset when out of view
                    innerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
                    innerRef.current.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.5)";
                    sheenRef.current.style.opacity = "0";
                }
            },
            { threshold: 0.6 } // Trigger when 60% visible
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (isMobile || !cardRef.current || !innerRef.current || !sheenRef.current) return;

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
        if (isMobile || !innerRef.current || !sheenRef.current) return;

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
                    className="relative z-10"
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

                    {/* Action Links */}
                    {(project.link || project.github) && (
                        <div className="flex items-center gap-3 mt-6">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00bfff]/40 bg-[#00bfff]/10 text-[#00bfff] text-xs font-mono tracking-wider uppercase hover:bg-[#00bfff] hover:text-white transition-all duration-300"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    Live
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-mono tracking-wider uppercase hover:border-white/30 hover:text-white transition-all duration-300"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                    GitHub
                                </a>
                            )}
                        </div>
                    )}
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
