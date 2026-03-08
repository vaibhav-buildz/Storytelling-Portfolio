"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const GITHUB_USERNAME = "vansh9793693385-source";

interface GitHubStats {
    commits: number;
    repos: number;
    daysActive: number;
}

// Animated stat counter
function StatCounter({ value, label, color, loading }: { value: number; label: string; color: string; loading: boolean }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || loading || value === 0) return;
        let start = 0;
        const step = Math.max(1, Math.ceil(value / 60));
        const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(start);
        }, 20);
        return () => clearInterval(timer);
    }, [inView, value, loading]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-1 min-w-[80px]">
            {loading ? (
                <div className="h-10 w-16 rounded-lg bg-white/5 animate-pulse" />
            ) : (
                <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums" style={{ color }}>
                    {count.toLocaleString()}+
                </span>
            )}
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase">{label}</span>
        </div>
    );
}

export default function GithubActivity() {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState<GitHubStats>({ commits: 0, repos: 0, daysActive: 0 });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch real GitHub stats from our cached API route (updates daily via ISR)
    useEffect(() => {
        if (!mounted) return;

        async function fetchStats() {
            try {
                const res = await fetch("/api/github-stats");
                const data = await res.json();
                setStats({
                    commits: data.commits ?? 0,
                    repos: data.repos ?? 0,
                    daysActive: data.daysActive ?? 0,
                });
            } catch (err) {
                console.error("Failed to fetch GitHub stats:", err);
                setStats({ commits: 0, repos: 0, daysActive: 0 });
            } finally {
                setStatsLoading(false);
            }
        }

        fetchStats();
    }, [mounted]);

    const explicitTheme = {
        light: ['#1a1a1a', '#00bfff40', '#00bfff80', '#00bfffc0', '#00ff88'],
        dark: ['#1a1a1a', '#00bfff40', '#00bfff80', '#00bfffc0', '#00ff88'],
    };

    // Floating dot positions — static to avoid hydration mismatch
    const floatingDots = [
        { top: "15%", left: "8%", size: 3, delay: 0 },
        { top: "70%", left: "5%", size: 2, delay: 0.8 },
        { top: "40%", left: "92%", size: 4, delay: 1.4 },
        { top: "80%", left: "88%", size: 2, delay: 0.3 },
        { top: "25%", left: "95%", size: 3, delay: 2 },
        { top: "60%", left: "12%", size: 2, delay: 1.1 },
    ];

    return (
        <section id="github" className="relative w-full py-24 flex flex-col items-center justify-center bg-[#121212] z-20 overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#00bfff] rounded-full blur-[150px] opacity-[0.04] pointer-events-none mix-blend-screen" />
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] w-72 h-72 bg-[#00ff88] rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-[#00bfff] rounded-full blur-[120px] pointer-events-none"
            />

            {/* Floating ambient dots */}
            {mounted && floatingDots.map((dot, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, background: i % 2 === 0 ? "#00bfff" : "#00ff88" }}
                    animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3 + dot.delay, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
                />
            ))}

            <div className="max-w-[85rem] mx-auto w-full px-6 md:px-16 lg:px-24 flex flex-col items-center">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] mb-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group/badge"
                    >
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className="text-white/60 group-hover/badge:text-white transition-colors duration-300">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </motion.div>
                        <span className="text-xs font-mono tracking-widest text-white/50 uppercase group-hover/badge:text-white/80 transition-colors duration-300">Open Source</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover/badge:text-white/60 transition-all duration-300"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium tracking-tight text-[#f2ede4] leading-[1.1] relative z-10">
                        Code <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]">Activity.</span>
                    </h2>
                    <p className="text-white/40 font-mono text-xs mt-4 tracking-widest uppercase">// Real-time commit history &amp; contributions</p>
                </motion.div>

                {/* Real-Time Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex items-center gap-10 md:gap-20 mb-10"
                >
                    <StatCounter value={stats.commits} label="Commits (Last Year)" color="#00bfff" loading={statsLoading} />
                    <div className="w-[1px] h-10 bg-white/10" />
                    <StatCounter value={stats.repos} label="Public Repos" color="#00ff88" loading={statsLoading} />
                    <div className="w-[1px] h-10 bg-white/10" />
                    <StatCounter value={stats.daysActive} label="Days Active" color="#884dff" loading={statsLoading} />
                </motion.div>

                {/* Calendar Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full relative"
                >
                    {/* Animated scan line */}
                    {mounted && (
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00bfff]/60 to-transparent pointer-events-none z-10 rounded-full"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                    <div className="w-full flex justify-center p-6 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-sm hover:border-white/10 transition-all duration-500 overflow-x-auto relative">
                        <div className="min-w-fit">
                            {mounted ? (
                                <GitHubCalendar
                                    username={GITHUB_USERNAME}
                                    colorScheme="dark"
                                    theme={explicitTheme}
                                    fontSize={14}
                                    blockSize={14}
                                    blockMargin={5}
                                    blockRadius={3}
                                />
                            ) : (
                                <div className="h-[112px] w-[700px] max-w-full rounded-lg bg-white/[0.02] animate-pulse" />
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
