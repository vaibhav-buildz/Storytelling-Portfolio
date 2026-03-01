import React from "react";

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

                <div className="mb-20 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 hidden-text">
                        Selected Work
                    </h3>
                    <p className="text-white/50 text-lg md:text-xl max-w-xl">
                        A collection of recent technical and creative projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 md:p-12 overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md flex flex-col justify-end min-h-[400px]"
                        >
                            {/* Subtle hover glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-xs uppercase tracking-wider text-white/70 bg-black/40 rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                                    {project.title}
                                </h4>
                                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
