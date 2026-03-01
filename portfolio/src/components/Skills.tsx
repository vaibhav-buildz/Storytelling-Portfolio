"use client";

import { motion } from "framer-motion";

const skills = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "HTML5", "CSS3", "Three.js"],
    backend: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL", "REST APIs"],
    security: ["Burp Suite", "Kali Linux", "OWASP Top 10", "Nmap", "SQLi", "XSS", "Recon", "Linux"],
    tools: ["Git", "GitHub", "Figma", "VS Code", "Vercel", "Docker"]
};

const Row = ({ items, direction = "left", colorClass }: { items: string[], direction?: "left" | "right", colorClass: string }) => {
    return (
        <div className="relative flex overflow-hidden group">
            <motion.div
                animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                className="flex gap-4 whitespace-nowrap group-hover:[animation-play-state:paused] py-2 px-2"
                style={{ width: "fit-content" }}
            >
                {/* Render twice for seamless loop */}
                {[...items, ...items, ...items, ...items].map((skill, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1a1a1e] border border-white/5 text-white/80 font-mono text-sm transition-all duration-300 hover:border-white/30 hover:bg-white/5 cursor-default group/btn"
                    >
                        <span className={`w-2 h-2 rounded-full ${colorClass} group-hover/btn:shadow-[0_0_8px_currentColor]`} />
                        {skill}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function Skills() {
    return (
        <section id="skills" className="relative w-full py-24 bg-[#121212] overflow-hidden z-30">

            <div className="flex flex-col gap-6 mb-24">
                <Row items={skills.frontend} direction="left" colorClass="bg-[#00ff88]" />
                <Row items={skills.backend} direction="right" colorClass="bg-[#ff5533]" />
                <Row items={skills.security} direction="left" colorClass="bg-purple-500" />
                <Row items={skills.tools} direction="right" colorClass="bg-blue-400" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Stat 1 */}
                    <div className="p-8 rounded-3xl bg-[#0e0e12] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#ff5533]/30 transition-colors">
                        <span className="text-5xl font-bold font-mono text-[#ff5533] mb-2 group-hover:drop-shadow-[0_0_15px_rgba(255,85,51,0.5)] transition-all">10+</span>
                        <span className="text-white/60 font-medium tracking-wide">Projects Built</span>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-8 rounded-3xl bg-[#0e0e12] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#00ff88]/30 transition-colors">
                        <span className="text-5xl font-bold font-mono text-[#00ff88] mb-2 group-hover:drop-shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all">2+</span>
                        <span className="text-white/60 font-medium tracking-wide">Bugs Reported</span>
                    </div>

                    {/* Stat 3 */}
                    <div className="p-8 rounded-3xl bg-[#0e0e12] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-purple-500/30 transition-colors">
                        <span className="text-5xl font-bold font-mono text-purple-500 mb-2 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">3+</span>
                        <span className="text-white/60 font-medium tracking-wide">Tech Domains</span>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
