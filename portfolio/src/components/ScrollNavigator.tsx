"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certs", label: "Certs" },
    { id: "contact", label: "Contact" },
];

export default function ScrollNavigator() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = SECTIONS.findIndex(s => s.id === entry.target.id);
                        if (index !== -1) setActiveIdx(index);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% of section is visible
        );

        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col items-center bg-[#0e0e12]/70 backdrop-blur-md border border-white/5 rounded-full py-6 px-3 gap-4 shadow-xl">

            {/* Counter */}
            <span className="font-mono text-[10px] tracking-widest text-[#00ff88] mb-2 opacity-80">
                0{activeIdx + 1}/06
            </span>

            {/* Dots */}
            <div className="flex flex-col gap-3">
                {SECTIONS.map((section, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                        <div key={section.id} className="relative group flex justify-center items-center h-6 w-6">
                            {/* Tooltip */}
                            <div className="absolute right-8 px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-[10px] font-medium tracking-wider uppercase text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                                {section.label}
                            </div>

                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={`transition-all duration-300 rounded-full ${isActive
                                        ? "w-[6px] h-[24px] bg-[#ff5533] shadow-[0_0_10px_#ff5533]"
                                        : "w-[5px] h-[5px] bg-white/40 hover:bg-white/80"
                                    }`}
                                aria-label={`Scroll to ${section.label}`}
                                data-hoverable="true"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
