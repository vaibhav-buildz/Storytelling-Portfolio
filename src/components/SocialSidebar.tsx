"use client";

import { useEffect, useState } from "react";

export default function SocialSidebar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay on mount for entrance animation
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed right-6 top-1/2 -translate-y-1/2 z-[400] hidden md:flex flex-col gap-[1rem] transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
        >
            {/* GitHub */}
            <a
                href="https://www.github.com/vaibhav-buildz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="GitHub"
            >
                <svg className="drop-shadow-md" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/in/vaibhav-yadav-80b891330"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="LinkedIn"
            >
                <svg className="drop-shadow-md" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            </a>

            {/* Twitter/X */}
            <a
                href="https://twitter.com/vanshh_00"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="Twitter/X"
            >
                <svg className="drop-shadow-md" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>

            {/* Instagram */}
            <a
                href="https://instagram.com/vanshh.01"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="Instagram"
            >
                <svg className="drop-shadow-md" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            </a>

            {/* Telegram */}
            <a
                href="https://t.me/vanshh069"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="Telegram"
            >
                <svg className="drop-shadow-md" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </a>

            {/* Reddit */}
            <a
                href="https://reddit.com/user/Severe_Detective_873"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-200 ease-out"
                style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)",
                    color: "rgba(240,237,232,0.6)",
                    transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.1))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 0 rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(0,0,0,0.2))";
                    e.currentTarget.style.boxShadow = "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 0 rgba(0,0,0,0.8), 0 5px 8px rgba(0,0,0,0.5)";
                    e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                    e.currentTarget.style.transform = "translateY(0)";
                }}
                data-hoverable="true"
                aria-label="Reddit"
            >
                <svg className="drop-shadow-md" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
            </a>

            {/* Thin Vertical Decorative Line beneath socials */}
            <div className="mx-auto w-[1px] h-[40px]" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }} />

        </div>
    );
}
