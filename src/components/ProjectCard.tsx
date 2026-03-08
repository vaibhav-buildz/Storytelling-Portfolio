"use client";

import React, { useState, useEffect, useRef } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    image?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Mobile: trigger on scroll into view
    useEffect(() => {
        if (!isMobile || !cardRef.current) return;
        const observer = new IntersectionObserver(
            ([e]) => setHovered(e.isIntersecting),
            { threshold: 0.5 }
        );
        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[2rem] min-h-[420px] cursor-pointer group"
            onMouseEnter={() => !isMobile && setHovered(true)}
            onMouseLeave={() => !isMobile && setHovered(false)}
            style={{
                boxShadow: hovered
                    ? "0 32px 80px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 8px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
                transition: "box-shadow 0.5s ease",
            }}
        >
            {/* Background image — zooms in on hover */}
            {project.image ? (
                <div
                    className="absolute inset-0 bg-cover bg-top bg-no-repeat"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        transform: hovered ? "scale(1.08)" : "scale(1.0)",
                        transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
                    }}
                />
            ) : (
                <div className="absolute inset-0 bg-[#1a1a1c]" />
            )}

            {/* Gradient overlay — darkens more on hover to frame text */}
            <div
                className="absolute inset-0"
                style={{
                    background: hovered
                        ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.15) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.08) 100%)",
                    transition: "background 0.5s ease",
                }}
            />

            {/* Cyan line that sweeps up from the bottom on hover */}
            <div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00bfff] to-transparent"
                style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease",
                    transformOrigin: "center",
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">

                {/* Tags — always visible */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-[0.7rem] uppercase tracking-wider font-mono text-white/70 bg-black/40 border border-white/10 rounded-full backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title — always visible, lifts slightly on hover */}
                <h4
                    className="text-3xl md:text-4xl font-semibold tracking-tight text-white"
                    style={{
                        transform: hovered ? "translateY(-2px)" : "translateY(0)",
                        transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                        textShadow: hovered ? "0 0 40px rgba(0,191,255,0.35)" : "none",
                    }}
                >
                    {project.title}
                </h4>

                {/* Description — slides up on hover */}
                <div
                    style={{
                        maxHeight: hovered ? "120px" : "0px",
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "translateY(0)" : "translateY(12px)",
                        transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                        overflow: "hidden",
                    }}
                >
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mt-3 max-w-sm">
                        {project.description}
                    </p>
                </div>

                {/* Buttons — slide up after description */}
                {(project.link || project.github) && (
                    <div
                        className="flex items-center gap-3 mt-4"
                        style={{
                            opacity: hovered ? 1 : 0,
                            transform: hovered ? "translateY(0)" : "translateY(16px)",
                            transition: "opacity 0.4s ease 0.08s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.08s",
                        }}
                    >
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
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
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-mono tracking-wider uppercase hover:border-white/30 hover:text-white transition-all duration-300"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                GitHub
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
