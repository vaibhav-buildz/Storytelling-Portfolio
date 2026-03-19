"use client";

import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "Storytelling Portfolio",
        description: "A cinematic, scroll-reactive 3D portfolio with a custom image sequence engine, immersive boot animations, and interactive particle systems — built entirely from scratch.",
        tags: ["Next.js", "Three.js", "Framer Motion", "Canvas API"],
        link: "https://my-storytelling-portfolio.vercel.app/",
        github: "https://github.com/vaibhav-buildz/Storytelling-Portfolio",
        image: "/project-storytelling-portfolio.png",
    },
    {
        title: "Atrangi Portfolio",
        description: "A cinematic interactive 3D portfolio featuring a pirate-themed journey map, immersive animations, and a simulated terminal interface.",
        tags: ["HTML5", "CSS3", "JavaScript", "Three.js"],
        link: "https://atrangi-portfolio.vercel.app/",
        github: "https://github.com/vaibhav-buildz/atrangi-portfolio",
        image: "/project-atrangi-portfolio-new.png",
    },
    {
        title: "3D Portfolio",
        description: "A high-performance, immersive 3D portfolio powered by Spline, GSAP, and Three.js. Featuring complex 3D scenes, interactive components, and seamless animations for a premium experience.",
        tags: ["Next.js", "Three.js", "Spline", "GSAP"],
        link: "https://vaibhavyadav.com",
        github: "https://github.com/vaibhav-buildz/3D-Portfolio",
        image: "/project-3d-portfolio.png",
    },
];

export default function Projects() {
    return (
        <section className="relative w-full min-h-screen bg-[#121212] py-32 px-6 md:px-16 lg:px-24 z-30">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div className="mb-20 flex flex-col items-center text-center">
                    <h3
                        className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-[#f2ede4] mb-4"
                        style={{ textShadow: "0 4px 24px rgba(242, 237, 228, 0.15)" }}
                    >
                        <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]" style={{ paddingBottom: "0.25em", paddingRight: "0.15em", display: "inline-block", overflow: "visible" }}>
                            Featured
                        </span>
                        {" "}Creations.
                    </h3>
                    <p className="text-white/40 font-mono text-sm mt-2 tracking-widest uppercase">
                        {`// A collection of recent technical & creative projects`}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </div>

            </div>
        </section>
    );
}
