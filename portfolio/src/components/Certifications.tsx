"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const certs = [
    {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        year: "2024",
        id: "fcc-rwd-8932",
        description: "Comprehensive certification covering HTML5, CSS3, CSS Grid, Flexbox, and responsive design principles.",
        link: "#"
    },
    {
        title: "JavaScript Algorithms",
        issuer: "freeCodeCamp",
        year: "2024",
        id: "fcc-jsv-4190",
        description: "In-depth training on JavaScript data structures, object-oriented programming, and complex algorithms.",
        link: "#"
    },
    {
        title: "Web Security Fundamentals",
        issuer: "TryHackMe",
        year: "2024",
        id: "thm-wsf-9921",
        description: "Practical exercises covering OWASP Top 10 vulnerabilities, burp suite workflows, and XSS/SQLi mitigation.",
        link: "#"
    },
    {
        title: "Google Cybersecurity",
        issuer: "Coursera",
        year: "2025",
        id: "goo-sec-1123",
        description: "Professional certificate covering threat modeling, network security, Python for automation, and SIEM tools.",
        link: "#"
    }
];

export default function Certifications() {
    return (
        <section id="certs" className="relative w-full py-32 bg-[#121212] z-30">

            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-16">
                <h3 className="text-4xl md:text-5xl font-bold font-cormorant tracking-tight mb-4 text-[#ff5533]">
                    Certifications
                </h3>
                <p className="text-white/50 text-lg">Continuous learning & credentials.</p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-16 px-6 md:px-16 lg:px-24 no-scrollbar">
                <div className="flex gap-8 w-max">
                    {certs.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                            className="w-[320px] h-[400px] perspective-[1000px] group cursor-pointer"
                        >
                            {/* Card Inner Wrapper for 3D Flip */}
                            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                                {/* FRONT FACE */}
                                <div className="absolute w-full h-full backface-hidden rounded-3xl bg-[#0e0e12] border border-white/10 p-8 flex flex-col justify-between overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff5533] to-[#00ff88]" />

                                    <div>
                                        <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-4 block">
                                            {cert.issuer} &sol;&sol; {cert.year}
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
                                <div className="absolute w-full h-full backface-hidden rounded-3xl bg-white/5 border border-white/20 p-8 flex flex-col justify-between [transform:rotateY(180deg)] backdrop-blur-md">
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
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
