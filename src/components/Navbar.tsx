"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
    { label: "About", id: "about", color: "#00bfff" },
    { label: "Skills", id: "skills", color: "#00ff88" },
    { label: "Work", id: "featured-creations", color: "#4dff88" },
    { label: "Code", id: "github", color: "#884dff", externalHref: "https://github.com/vaibhav-buildz" },
    { label: "Certs", id: "certs", color: "#ffcb4d" },
    { label: "Contact", id: "contact", color: "#00bfff" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Scroll-driven motion
    const { scrollY } = useScroll();
    const pillY = useTransform(scrollY, [0, 80], [0, -4]);
    const pillScale = useTransform(scrollY, [0, 120], [1, 0.97]);
    const pillOpacity = useTransform(scrollY, [0, 30], [0.7, 1]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        NAV_LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActiveSection(id); },
                { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ── DESKTOP ─────────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-[400] hidden md:flex items-center justify-between px-8 h-[68px] pointer-events-none">

                {/* LEFT — Open to Work badge only */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
                    </span>
                    <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider hidden sm:block">Open to Work</span>
                </motion.div>

                {/* CENTER — Wrapper div handles centering, motion.div handles scroll animation */}
                <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        style={{ y: pillY, scale: pillScale, opacity: pillOpacity }}
                    >
                        <div
                            className="flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500"
                            style={{
                                background: scrolled ? "rgba(7,7,9,0.75)" : "rgba(255,255,255,0.03)",
                                backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(4px)",
                                border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)",
                                boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)" : "none",
                            }}
                        >
                            {NAV_LINKS.map((item) => {
                                const isActive = activeSection === item.id;
                                const sharedProps = {
                                    className: "relative flex flex-col items-center px-4 py-1.5 rounded-full text-[0.67rem] font-mono uppercase tracking-[0.12em] transition-all duration-300" as const,
                                    style: { color: isActive ? "#fff" : "rgba(255,255,255,0.45)" },
                                    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.currentTarget.style.color = "#fff";
                                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                    },
                                    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.currentTarget.style.color = isActive ? "#fff" : "rgba(255,255,255,0.45)";
                                        e.currentTarget.style.background = "transparent";
                                    },
                                };
                                const dot = (
                                    <span
                                        className="absolute -bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300"
                                        style={{
                                            width: isActive ? "16px" : "0px",
                                            background: item.color,
                                            boxShadow: isActive ? `0 0 8px ${item.color}` : "none",
                                        }}
                                    />
                                );
                                return item.externalHref ? (
                                    <a key={item.id} href={item.externalHref} target="_blank" rel="noopener noreferrer" {...sharedProps}>
                                        {item.label}{dot}
                                    </a>
                                ) : (
                                    <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollTo(e, item.id)} {...sharedProps}>
                                        {item.label}{dot}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT — CV + Hire Me */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 pointer-events-auto"
                >
                    {/* CV download — icon only */}
                    <a
                        href="/Vaibhav_Yadav_Resume.pdf"
                        download
                        aria-label="Download CV"
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-white/30 hover:text-white hover:bg-white/5"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </a>

                    {/* Hire Me */}
                    <a
                        href="#contact"
                        onClick={(e) => scrollTo(e, "contact")}
                        className="relative overflow-hidden flex items-center px-5 py-2 rounded-full text-[0.67rem] font-mono uppercase tracking-[0.12em] text-[#00bfff] transition-all duration-300 group/hire"
                        style={{ border: "1px solid rgba(0,191,255,0.35)", background: "rgba(0,191,255,0.05)" }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#00bfff";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.boxShadow = "0 0 24px rgba(0,191,255,0.4)";
                            e.currentTarget.style.borderColor = "#00bfff";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(0,191,255,0.05)";
                            e.currentTarget.style.color = "#00bfff";
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.borderColor = "rgba(0,191,255,0.35)";
                        }}
                    >
                        Hire Me
                    </a>
                </motion.div>
            </nav>

            {/* ── MOBILE ─────────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-[400] md:hidden flex items-center justify-between px-5 h-[60px]"
                style={{
                    background: scrolled ? "rgba(7,7,9,0.85)" : "transparent",
                    backdropFilter: scrolled ? "blur(16px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                {/* Monogram */}
                <span className="font-cormorant italic font-bold text-xl" style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
                    VY
                </span>

                {/* Hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/60 hover:text-white transition-all"
                    aria-label="Menu"
                >
                    {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
            </nav>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[399] md:hidden flex flex-col"
                        style={{ background: "rgba(7,7,9,0.97)", backdropFilter: "blur(20px)" }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {NAV_LINKS.map((item, i) => (
                                <motion.a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollTo(e, item.id)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-4xl font-cormorant italic font-bold transition-all duration-300"
                                    style={{
                                        color: activeSection === item.id ? item.color : "rgba(255,255,255,0.3)",
                                        WebkitTextStroke: activeSection === item.id ? "none" : "1px rgba(255,255,255,0.2)",
                                    }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/Vaibhav_Yadav_Resume.pdf"
                                download
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-white/30 border border-white/10 px-6 py-3 rounded-full"
                            >
                                Download CV
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
