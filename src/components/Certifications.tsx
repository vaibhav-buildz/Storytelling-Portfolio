"use client";

import { ArrowUpRight } from "lucide-react";

const certs = [
    {
        title: "Git Fundamentals",
        issuer: "GFG Skillup",
        year: "2026",
        id: "su-git-7a9e",
        description: "A comprehensive certification program focused on mastering industry-standard version control. This course provided hands-on experience with advanced Git workflows, repository management, resolving complex merge conflicts, and utilizing branching strategies essential for seamless team collaboration in enterprise environments.",
        link: "/certs/7a9e3a535a072e26ee7c9829e10894bc.pdf"
    },
    {
        title: "Python Programming",
        issuer: "GFG Skillup",
        year: "2026",
        id: "su-py-aaf6",
        description: "An intensive training program focused on Python software development. The curriculum covered advanced data structures, object-oriented programming (OOP) principles, algorithmic problem-solving, and building robust applications. Emphasized writing clean, maintainable, and Pythonic code adhering to modern standards.",
        link: "/certs/aaf655ea3e67ba1e894db5705f494c31.pdf"
    },
    {
        title: "Ethical Hacking & Cybersecurity",
        issuer: "VoltOfCode",
        year: "2025",
        id: "voc-ehc-2025",
        description: "A formal recognition of professional accomplishment, validating specialized technical proficiency and a commitment to continuous development. This certification underscores a dedication to mastering new technologies, refining core engineering skills, and maintaining a high standard of excellence in software engineering.",
        link: "/certs/Certificate.pdf"
    },
    {
        title: "Google Cybersecurity",
        issuer: "Coursera",
        year: "2025",
        id: "goo-sec-1123",
        description: "Professional certificate covering threat modeling, network security, Python for automation, and SIEM tools.",
        link: "#"
    },
    {
        title: "Advanced React Patterns",
        issuer: "Frontend Masters",
        year: "2025",
        id: "fm-arp-2281",
        description: "Deep dive into advanced React concepts including higher-order components, render props, compounding components, and hooks.",
        link: "#"
    },
    {
        title: "Three.js Journey",
        issuer: "Bruno Simon",
        year: "2025",
        id: "tjs-jrny-8812",
        description: "Comprehensive course on WebGL, Three.js, shaders, and creating immersive 3D web experiences.",
        link: "#"
    },
    {
        title: "Ethical Hacking Essentials",
        issuer: "EC-Council",
        year: "2025",
        id: "ecc-ehe-9982",
        description: "Foundational concepts of ethical hacking, network defense, footprinting, reconnaissance, and modern cyber threats.",
        link: "#"
    },
    {
        title: "Full Stack Open",
        issuer: "University of Helsinki",
        year: "2025",
        id: "fso-hel-0012",
        description: "Modern JavaScript-based web development focusing on React, Redux, Node.js, REST APIs, and GraphQL.",
        link: "#"
    }
];

export default function Certifications() {
    return (
        <section id="certs" className="relative w-full py-32 bg-[#121212] z-30 overflow-hidden">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-20 flex flex-col items-center text-center">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#f2ede4] mb-4 tracking-tight">
                    Verified{" "}
                    <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]">
                        Expertise.
                    </span>
                </h3>
                <p className="text-white/40 font-mono text-sm mt-2 tracking-widest uppercase">
                    {`// Continuous learning & credentials`}
                </p>
            </div>

            {/* Horizontal Auto-Scroll Container */}
            <div className="relative w-full overflow-hidden group/marquee">
                {/* Optional dark gradient fades on the left and right edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
                    {[0, 1].map((set) => (
                        <div key={set} className="flex gap-8 pr-8">
                            {certs.map((cert, idx) => (
                                <div
                                    key={`${set}-${idx}`}
                                    className="w-[320px] h-[400px] perspective-[1000px] group cursor-pointer flex-shrink-0"
                                >
                                    {/* Card Inner Wrapper for 3D Flip */}
                                    <div
                                        className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                                        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
                                    >

                                        {/* FRONT FACE */}
                                        <div
                                            className="absolute w-full h-full rounded-3xl bg-[#0e0e12] border border-white/10 p-8 flex flex-col justify-between overflow-hidden"
                                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                            {/* Card Top Border Accent */}
                                            <div className="overflow-hidden h-1 w-full rounded-t-2xl relative">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00bfff] to-[#00ff88]" />
                                                {/* Scanning Line Effect */}
                                                <div className="absolute top-0 left-0 w-1/3 h-1 bg-white/50 blur-[2px] -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                                            </div>

                                            <div>
                                                <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-4 block">
                                                    {cert.issuer}
                                                </span>
                                                <h4 className="text-3xl font-cormorant italic font-semibold text-white/90 leading-snug">
                                                    {cert.title}
                                                </h4>
                                            </div>

                                            <div className="flex items-center gap-2 text-[#00ff88] text-sm font-medium">
                                                Verify <ArrowUpRight size={16} />
                                            </div>
                                        </div>

                                        {/* BACK FACE */}
                                        {/* Removed backdrop-blur-md to fix CSS backface-visibility bug */}
                                        <div
                                            className="absolute w-full h-full rounded-3xl bg-[#18181e] border border-white/20 p-8 flex flex-col justify-between"
                                            style={{
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <div>
                                                <span className="font-mono text-[10px] text-[#ff5533] tracking-widest uppercase mb-6 block">
                                                    ID: {cert.id}
                                                </span>
                                                <p className="text-white/70 text-sm leading-relaxed">
                                                    {cert.description}
                                                </p>
                                            </div>

                                            <a
                                                href={cert.link}
                                                className="w-full py-3 text-center rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-colors font-medium text-sm"
                                                data-hoverable="true"
                                            >
                                                Open Certificate
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
