"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- SVG Icons ---
const icons = {
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    twitter: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    hackerone: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    )
};

function SocialIcon({ href, icon }: { href: string; icon: keyof typeof icons }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-hoverable="true"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ perspective: "400px" }}
            className="block h-12 w-12 rounded-full cursor-pointer relative"
        >
            <div
                className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                    background: hovered ? "linear-gradient(135deg, #00bfff, #00ff88)" : "transparent",
                    border: hovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.15)",
                    boxShadow: hovered ? "0 0 20px rgba(255,85,51,0.5), inset 0 0 10px rgba(255,255,255,0.2)" : "none",
                    color: hovered ? "#fff" : "rgba(255,255,255,0.5)",
                    transform: hovered ? "translateZ(10px) scale(1.1)" : "translateZ(0) scale(1)",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Float icon forward slightly when glowing */}
                <div style={{ transform: hovered ? "translateZ(12px)" : "translateZ(0)", transition: "transform 0.3s ease" }}>
                    {icons[icon]}
                </div>
            </div>
        </a>
    );
}

function EmailCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [gloss, setGloss] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);
    const [email, setEmail] = useState("Loading...");

    // Obfuscate email reconstruction at validation/runtime to prevent scraping
    useEffect(() => {
        const parts = ["itz", "vaibhav", "@", "gmail", ".com"];
        setEmail(parts.join(""));
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0 → 1
        const py = (e.clientY - rect.top) / rect.height;   // 0 → 1
        // tilt: max ±18°
        setTilt({ x: (py - 0.5) * -18, y: (px - 0.5) * 18 });
        // gloss follows mouse as a percentage
        setGloss({ x: px * 100, y: py * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setGloss({ x: 50, y: 50 });
        setHovered(false);
    };

    return (
        <div style={{ perspective: "900px" }} className="w-full max-w-sm select-none">
            {/* Glow border wrapper */}
            <div
                className="rounded-2xl p-[1.5px] transition-all duration-500"
                style={{
                    background: hovered
                        ? `linear-gradient(${gloss.x * 1.8}deg, #00bfff, #00ff88 60%, rgba(255,255,255,0.08))`
                        : "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                    boxShadow: hovered
                        ? "0 0 32px rgba(0,191,255,0.4), 0 0 80px rgba(0,191,255,0.12)"
                        : "0 4px 24px rgba(0,0,0,0.4)",
                }}
            >
                {/* 3-D tilt card */}
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => { if (email !== "Loading...") window.location.href = `mailto:${email}`; }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                        height: "136px",
                        background: "#161616",
                        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
                        transition: hovered
                            ? "transform 0.08s linear"
                            : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Moving specular gloss highlight */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                            background: `radial-gradient(circle at ${gloss.x}% ${gloss.y}%, rgba(255,255,255,${hovered ? 0.1 : 0}) 0%, transparent 65%)`,
                            transition: hovered ? "background 0.05s linear" : "background 0.4s ease",
                        }}
                    />

                    {/* Card content */}
                    <div className="relative z-10 flex flex-col justify-between h-full px-6 py-5">
                        {/* Top row */}
                        <div className="flex items-center gap-3">
                            <svg
                                width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.6"
                                className="transition-colors duration-300"
                                style={{ color: hovered ? "#00bfff" : "rgba(255,255,255,0.35)" }}
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M2 7l10 7 10-7" />
                            </svg>
                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/35">
                                Reach Out
                            </span>
                            {/* Animated ping dot */}
                            <span className="relative flex h-2 w-2 ml-auto">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00bfff] opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00bfff]" />
                            </span>
                        </div>

                        {/* Email address */}
                        <div>
                            <p
                                className="font-mono text-sm md:text-[15px] tracking-wide transition-all duration-400"
                                style={{
                                    color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
                                    textShadow: hovered ? "0 0 20px rgba(255,85,51,0.55)" : "none",
                                    transform: `translateZ(${hovered ? 18 : 0}px)`,
                                    transition: "color 0.3s, text-shadow 0.3s, transform 0.3s",
                                }}
                            >
                                {email}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className="h-[1px] bg-[#00bfff] transition-all duration-500"
                                    style={{ width: hovered ? "2.5rem" : "1.25rem", opacity: hovered ? 1 : 0.4 }}
                                />
                                <span className={`text-[10px] font-mono tracking-widest text-white/25 uppercase transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
                                    Click to open mail
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message.");
            }

            setSubmitStatus("success");
            setFormData({ name: "", email: "", message: "" }); // Reset form

            // Clear status after 5 seconds
            setTimeout(() => setSubmitStatus("idle"), 5000);
        } catch (error: unknown) {
            setSubmitStatus("error");
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative w-full min-h-[100dvh] flex flex-col justify-center pt-32 pb-40 bg-[#121212] z-30">

            <div className="max-w-[85rem] mx-auto w-full px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

                {/* Left Column: Form & Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-12"
                >
                    {/* Header */}
                    <div className="relative">
                        {/* Decorative glow behind heading */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00bfff] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-sans font-medium tracking-tight text-[#f2ede4] leading-[1.1] relative z-10">
                            Let&apos;s Work <br />
                            <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]">
                                Together.
                            </span>
                        </h2>
                        <p className="text-white/40 font-mono text-sm mt-6 tracking-widest uppercase">
                            {`// Drop me a line`}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-8 w-full max-w-xl">
                        {/* Row 1: Name & Email */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Name Input */}
                            <div className="flex flex-col gap-3 w-full group">
                                <label htmlFor="name" className="text-[11px] font-mono tracking-widest text-white/40 uppercase group-focus-within:text-[#00bfff] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-focus-within:bg-[#00bfff] transition-colors" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 focus:border-[#00bfff]/40 focus:bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-white text-[15px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                                    placeholder="Aryan"
                                    autoComplete="off"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-3 w-full group">
                                <label htmlFor="email" className="text-[11px] font-mono tracking-widest text-white/40 uppercase group-focus-within:text-[#00bfff] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-focus-within:bg-[#00bfff] transition-colors" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 focus:border-[#00bfff]/40 focus:bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-white text-[15px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                                    placeholder="aryan@gmail.com"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* Row 2: Message */}
                        <div className="flex flex-col gap-3 w-full group">
                            <label htmlFor="message" className="text-[11px] font-mono tracking-widest text-white/40 uppercase group-focus-within:text-[#00bfff] transition-colors flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-focus-within:bg-[#00bfff] transition-colors" />
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 focus:border-[#00bfff]/40 focus:bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-white text-[15px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] resize-none"
                                placeholder="Tell me about your project, timeline, and goals..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="group relative w-full md:w-fit mt-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            data-hoverable="true"
                        >
                            {/* Animated Glow Wrapper */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00bfff] to-[#00ff88] rounded-full blur-md opacity-40 group-hover:opacity-70 group-hover:blur-lg transition-all duration-500" />

                            {/* Inner Button Container */}
                            <div className="relative w-full flex items-center justify-center gap-4 px-8 py-4 bg-[#121212] border border-white/10 group-hover:border-white/20 rounded-full transition-all duration-300">
                                <span className="text-white font-medium tracking-wide text-[15px] group-hover:text-[#00bfff] transition-colors">
                                    {submitting ? "Sending..." : "Send Message"}
                                </span>
                                {submitting ? (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="text-white group-hover:text-[#00bfff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                )}
                            </div>
                        </button>

                        {/* Feedback Messages */}
                        {submitStatus === "success" && (
                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[#00ff88] text-sm mt-2">
                                Message sent successfully! I&apos;ll get back to you soon.
                            </motion.p>
                        )}
                        {submitStatus === "error" && (
                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[#ff0055] text-sm mt-2">
                                {errorMessage || "Error sending message. Please try again."}
                            </motion.p>
                        )}
                    </div>
                </motion.div>

                {/* Right Column: Info & Socials */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-12"
                >
                    {/* Bio / Intro text - matching the right top paragraph in reference */}
                    <div className="max-w-md">
                        <p className="text-white/60 leading-relaxed text-[15px]">
                            I break things to build them better. As a creative developer and bug bounty hunter, I specialize in crafting secure, immersive, and high-performance digital experiences. Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 mt-4">
                        {/* Email Card component */}
                        <div>
                            <span className="text-[11px] font-sans text-white/40 mb-3 block tracking-wide">Email</span>
                            <EmailCard />
                        </div>

                        {/* Location */}
                        <div>
                            <span className="text-[11px] font-sans text-white/40 mb-3 block tracking-wide">Location</span>
                            <a
                                href="https://www.google.com/maps/place/Beta+I,+Greater+Noida,+Uttar+Pradesh+201310,+India/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-fit flex items-center gap-4 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
                                data-hoverable="true"
                            >
                                {/* Glowing Pin / Dot */}
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#00bfff] blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300 rounded-full" />
                                    <svg
                                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                        className="text-[#00bfff] relative z-10 group-hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>

                                {/* Text content */}
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white transition-colors tracking-wide">
                                        Gautam Buddha Nagar, Beta 1
                                    </span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[12px] font-mono text-white/40 tracking-wider">
                                            Greater Noida, UP 201310
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-[12px] font-mono text-[#00bfff]/80 tracking-wider">
                                            India
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Glow Border */}
                                <div className="absolute inset-0 rounded-2xl border border-[#00bfff]/0 group-hover:border-[#00bfff]/30 transition-colors duration-500 pointer-events-none" />
                            </a>
                        </div>

                        {/* Social Links (3D Icons) */}
                        <div className="mt-4">
                            <span className="text-[11px] font-sans text-white/40 mb-4 block tracking-wide">Social Links</span>
                            <div className="flex items-center gap-4">
                                <SocialIcon href="https://github.com/vaibhav-buildz" icon="github" />
                                <SocialIcon href="https://www.linkedin.com/in/vaibhav-yadav-80b891330" icon="linkedin" />
                                <SocialIcon href="https://twitter.com/vanshh_00" icon="twitter" />

                            </div>
                        </div>

                        {/* Resume Download CTA */}
                        <div className="mt-8">
                            <a
                                href="/Vaibhav_Yadav_Resume.pdf"
                                download
                                className="rounded-[100px] font-mono text-xs tracking-[0.14em] transition-all duration-300 ease-in-out uppercase inline-flex items-center gap-3 w-fit"
                                style={{
                                    border: "1px solid rgba(0,191,255,0.5)",
                                    padding: "0.7rem 1.5rem",
                                    color: "#00bfff",
                                    background: "rgba(0,191,255,0.05)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#00bfff";
                                    e.currentTarget.style.color = "#ffffff";
                                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,255,0.3)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(0,191,255,0.05)";
                                    e.currentTarget.style.color = "#00bfff";
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                data-hoverable="true"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download CV
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Copyright Footer */}
            <div className="absolute bottom-0 w-full pt-8 pb-8 flex flex-col items-center justify-center border-t border-white/5 mt-20 text-center">
                <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase">
                    © 2026 Vaibhav Yadav. All rights reserved.
                </p>
                <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase mt-2">
                    {`// Built with Next.js, Three.js & Framer Motion`}
                </p>
                <div className="w-1/3 max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4 hidden sm:block"></div>
            </div>

        </section>
    );
}
