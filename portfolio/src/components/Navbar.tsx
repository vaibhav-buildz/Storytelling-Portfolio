"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
    { label: "About", id: "about", color: "#4d9eff", glow: "rgba(77,158,255,0.5)", origin: "left", hoverTransform: "scale(1.1) translateX(2px)" },
    { label: "Skills", id: "skills", color: "#b54dff", glow: "rgba(181,77,255,0.5)", origin: "center", hoverTransform: "scale(1.15) translateY(-2px)" },
    { label: "Work", id: "projects", color: "#4dff88", glow: "rgba(77,255,136,0.5)", origin: "right", hoverTransform: "scale(1.1) translateX(-2px)" },
    { label: "Certs", id: "certs", color: "#ffcb4d", glow: "rgba(255,203,77,0.5)", origin: "left", hoverTransform: "scale(1.15) skewX(-8deg)" },
    { label: "Feedback", id: "testimonials", color: "#ff4d88", glow: "rgba(255,77,136,0.5)", origin: "center", hoverTransform: "scale(1.1) rotate(2deg)" },
    { label: "Contact", id: "contact", color: "#ff5533", glow: "rgba(255,85,51,0.5)", origin: "right", hoverTransform: "scale(1.15) translateY(-1px)" }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Scroll detection for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer to track active section
    useEffect(() => {
        const sectionIds = NAV_LINKS.map((link) => link.id);
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                {
                    rootMargin: "-40% 0px -55% 0px", // triggers when section is roughly centered
                    threshold: 0,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[400] h-[64px] flex justify-between items-center px-[3.5vw] transition-all duration-400 ease-in-out ${scrolled
                ? "bg-[#060608eb] backdrop-blur-[20px] backdrop-saturate-[1.8] border-b border-white/5"
                : "bg-transparent border-b border-transparent"
                }`}
            style={{
                backgroundColor: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
                borderBottomColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent"
            }}
        >
            {/* ━━━━━━━━━━━━━━━━━━ LEFT — Logo only ━━━━━━━━━━━━━━━━━━ */}
            <div
                className="font-cormorant italic font-bold text-[1.6rem] tracking-[-0.02em]"
                style={{ color: "#f0ede8" }}
            >
                VY
            </div>

            {/* ━━━━━━━━━━━━━━━━━━ CENTER — Nav links ━━━━━━━━━━━━━━━━━━ */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-[2.5rem]">
                {NAV_LINKS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.label}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className="relative font-mono text-[0.68rem] tracking-[0.14em] uppercase transition-all duration-300 group"
                            style={{
                                color: isActive ? "#f0ede8" : "rgba(240,237,232,0.45)",
                                textDecoration: "none",
                            }}
                            data-hoverable="true"
                            data-nav-link="true"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = item.hoverTransform;
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.textShadow = `0 0 10px ${item.glow}, 0 2px 15px ${item.glow.replace('0.5', '0.2')}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1) translateY(0) rotate(0) skewX(0) translateX(0)";
                                e.currentTarget.style.color = isActive ? "#f0ede8" : "rgba(240,237,232,0.45)";
                                e.currentTarget.style.textShadow = "none";
                            }}
                        >
                            {item.label}
                            {/* Unique animated underline per link */}
                            <span
                                className={`absolute bottom-[-4px] left-0 w-full h-[1.5px] transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                style={{
                                    transformOrigin: item.origin,
                                    backgroundColor: item.color,
                                    boxShadow: `0 0 8px ${item.glow}`
                                }}
                            />
                        </a>
                    );
                })}
            </div>

            {/* ━━━━━━━━━━━━━━━━━━ RIGHT — Actions ━━━━━━━━━━━━━━━━━━ */}
            <div className="flex items-center gap-[1rem]">

                {/* CV Download button (Hidden on Mobile) */}
                <a
                    href="/Vaibhav_CV.pdf"
                    download
                    className="hidden md:flex items-center gap-[0.4rem] rounded-[100px] transition-all duration-250 ease-in-out uppercase font-mono text-[0.62rem] tracking-[0.12em]"
                    style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.5rem 1.1rem",
                        color: "rgba(240,237,232,0.6)",
                        background: "transparent",
                        cursor: "none"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f0ede8";
                        e.currentTarget.style.color = "#070709";
                        e.currentTarget.style.borderColor = "#f0ede8";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    data-hoverable="true"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    CV
                </a>

                {/* Hire Me button (Visible on all screens) */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className="rounded-[100px] font-mono text-[0.62rem] tracking-[0.12em] transition-all duration-250 ease-in-out uppercase"
                    style={{
                        border: "1px solid #ff5533",
                        padding: "0.5rem 1.2rem",
                        color: "#ff5533",
                        background: "transparent",
                        cursor: "none"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ff5533";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255,85,51,0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#ff5533";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                    data-hoverable="true"
                >
                    Hire Me
                </a>
            </div>
        </nav>
    );
}
