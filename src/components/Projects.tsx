import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "MIND.EXE",
        description: "Cinematic portfolio experience built with Canvas and fine-tuned interactions.",
        tags: ["Next.js", "Canvas", "Framer Motion"],
    },
    {
        title: "Spatial UI",
        description: "Experimental glassmorphic interface inspired by spatial computing.",
        tags: ["React", "Three.js", "Tailwind"],
    },
    {
        title: "Dark Matter System",
        description: "A dark-mode-first component library for modern web apps.",
        tags: ["TypeScript", "CSS", "Storybook"],
    },
    {
        title: "Aura Commerce",
        description: "High-performance headless e-commerce storefront.",
        tags: ["Next.js", "Shopify", "GraphQL"],
    }
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
                        <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5533] to-[#ff8c00]">
                            Featured
                        </span>
                        {" "}Creations.
                    </h3>
                    <p className="text-white/40 font-mono text-sm mt-2 tracking-widest uppercase">
                        {`// A collection of recent technical & creative projects`}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </div>

            </div>
        </section>
    );
}
