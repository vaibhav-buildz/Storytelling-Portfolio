"use client";

import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { label: "About", id: "about", color: "#00bfff", glow: "rgba(0,191,255,0.5)", origin: "bottom", hoverTransform: "scale(1.1) translateY(-2px)" },
    { label: "Skills", id: "skills", color: "#00ff88", glow: "rgba(0,255,136,0.5)", origin: "left", hoverTransform: "scale(1.1) rotate(-2deg)" },
    { label: "Work", id: "featured-creations", color: "#4dff88", glow: "rgba(77,255,136,0.5)", origin: "right", hoverTransform: "scale(1.1) translateX(-2px)" },
    { label: "Code", id: "github", color: "#884dff", glow: "rgba(136,77,255,0.5)", origin: "center", hoverTransform: "scale(1.1) translateY(-2px)" },
    { label: "Certs", id: "certs", color: "#ffcb4d", glow: "rgba(255,203,77,0.5)", origin: "left", hoverTransform: "scale(1.15) skewX(-8deg)" },
    { label: "Contact", id: "contact", color: "#00bfff", glow: "rgba(0,191,255,0.5)", origin: "right", hoverTransform: "scale(1.15) translateY(-1px)" }
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Scroll detection — direct DOM class toggle, no re-render
    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;
            if (window.scrollY > 60) {
                navRef.current.classList.add("nav-scrolled");
            } else {
                navRef.current.classList.remove("nav-scrolled");
            }
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
        setMobileMenuOpen(false); // Close mobile menu when a link is clicked
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[400] h-[64px] flex justify-between items-center px-[3.5vw] transition-all duration-300 ease-in-out bg-transparent border-b border-transparent"
            style={{ willChange: "background-color, border-color, backdrop-filter" }}
        >
            {/* ━━━━━━━━━━━━━━━━━━ LEFT — Badge ━━━━━━━━━━━━━━━━━━ */}
            <div className="flex items-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-[#00ff88] uppercase tracking-wider hidden sm:block">Open to Work</span>
                    <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-wider sm:hidden">Available</span>
                </div>
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
                    href="/Vaibhav_Yadav_Resume.pdf"
                    download
                    className="hidden md:flex items-center justify-center rounded-[100px] transition-all duration-250 ease-in-out"
                    style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.6rem", // Square padding for icon
                        color: "rgba(240,237,232,0.6)",
                        background: "transparent"
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
                    aria-label="Download CV"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </a>

                {/* Hire Me button (Visible on all screens) */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className="rounded-[100px] font-mono text-[0.62rem] tracking-[0.12em] transition-all duration-250 ease-in-out uppercase"
                    style={{
                        border: "1px solid #00bfff",
                        padding: "0.5rem 1.2rem",
                        color: "#00bfff",
                        background: "transparent"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#00bfff";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,255,0.35)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#00bfff";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                    data-hoverable="true"
                >
                    Hire Me
                </a>
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden flex items-center justify-center rounded-[100px] transition-all duration-250 ease-in-out"
                    style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.5rem",
                        color: "rgba(240,237,232,0.6)",
                        background: "transparent"
                    }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Mobile Menu"
                >
                    {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* ━━━━━━━━━━━━━━━━━━ MOBILE MENU ━━━━━━━━━━━━━━━━━━ */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-[64px] left-0 right-0 bg-[#070709]/95 backdrop-blur-lg border-b border-white/10 flex flex-col px-[5vw] py-6 gap-6 shadow-2xl">
                    {NAV_LINKS.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a
                                key={item.label}
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className="font-mono text-sm tracking-[0.14em] uppercase"
                                style={{
                                    color: isActive ? item.color : "rgba(240,237,232,0.7)",
                                    textDecoration: "none",
                                }}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                    <a
                        href="/Vaibhav_Yadav_Resume.pdf"
                        download
                        className="flex w-fit items-center justify-center rounded-[100px] transition-all duration-250 ease-in-out mt-4"
                        style={{
                            border: "1px solid rgba(255,255,255,0.15)",
                            padding: "0.6rem 1.2rem",
                            color: "rgba(240,237,232,0.8)",
                            background: "transparent",
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em"
                        }}
                    >
                        Download CV
                    </a>
                </div>
            )}
        </nav>
    );
}
