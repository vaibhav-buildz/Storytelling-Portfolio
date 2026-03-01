"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Vaibhav thinks like a designer and a security researcher simultaneously. Rare skill.",
        name: "Alex Sterling",
        role: "Senior Developer",
        initials: "AS"
    },
    {
        text: "Sharp bug hunter. Methodical and creative in finding logic flaws others completely miss.",
        name: "Elena Rostova",
        role: "Bug Bounty Admin",
        initials: "ER"
    },
    {
        text: "Delivered a beautiful, secure full-stack app ahead of schedule with zero UI compromises.",
        name: "Marcus Chen",
        role: "Startup Founder",
        initials: "MC"
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative w-full py-32 bg-[#121212] z-30">
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

                <div className="mb-20 text-center">
                    <h3 className="text-4xl md:text-5xl font-bold font-cormorant tracking-tight mb-4 text-[#00ff88]">
                        What Others Say
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between min-h-[300px] group hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                            {/* Large background quote mark */}
                            <span className="absolute top-6 left-6 text-9xl font-cormorant text-[#ff5533] opacity-20 leading-none -z-10 select-none">
                                &quot;
                            </span>

                            <p className="text-white/70 italic text-lg leading-[1.8] font-light z-10">
                                &quot;{t.text}&quot;
                            </p>

                            <div className="flex items-center gap-4 mt-8 z-10">
                                <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center font-mono text-sm text-white/90">
                                    {t.initials}
                                </div>
                                <div>
                                    <h5 className="font-mono text-sm text-white font-medium">{t.name}</h5>
                                    <span className="font-mono text-xs text-white/40">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
