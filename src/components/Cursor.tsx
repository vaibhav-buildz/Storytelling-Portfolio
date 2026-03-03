"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    // Mouse positions
    const mouse = useRef({ x: 0, y: 0 });
    const outer = useRef({ x: 0, y: 0 });

    // States
    const isHovering = useRef(false);
    const isInsidePage = useRef(true);

    // Cache rect to avoid layout reads every frame
    const cachedRect = useRef<DOMRect | null>(null);
    const hoverTarget = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Hide totally on mobile
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveElement = target.closest("a, button, [data-hoverable='true']") as HTMLElement;

            if (interactiveElement) {
                isHovering.current = true;
                // Only read rect when target changes — not every frame
                if (hoverTarget.current !== interactiveElement) {
                    hoverTarget.current = interactiveElement;
                    cachedRect.current = interactiveElement.getBoundingClientRect();
                }
            } else {
                isHovering.current = false;
                hoverTarget.current = null;
                cachedRect.current = null;
            }
        };

        // Refresh cached rect on scroll so snapping stays accurate
        const onScroll = () => {
            if (hoverTarget.current) {
                cachedRect.current = hoverTarget.current.getBoundingClientRect();
            }
        };

        // Hide cursor when mouse leaves the page
        const onPageLeave = () => {
            isInsidePage.current = false;
            if (outerRef.current) outerRef.current.style.opacity = "0";
            if (innerRef.current) innerRef.current.style.opacity = "0";
        };

        // Show cursor when mouse enters the page
        const onPageEnter = () => {
            isInsidePage.current = true;
            if (outerRef.current) outerRef.current.style.opacity = "1";
            if (innerRef.current) innerRef.current.style.opacity = "1";
        };

        const render = () => {
            const { x: targetX, y: targetY } = mouse.current;

            // Init outer on first frame if 0,0
            if (outer.current.x === 0 && outer.current.y === 0) {
                outer.current.x = targetX;
                outer.current.y = targetY;
            }

            // Only update transforms if cursor is inside page
            if (isInsidePage.current) {
                if (isHovering.current && cachedRect.current) {
                    const rect = cachedRect.current; // NO layout read — cached
                    const padding = 12;

                    const targetWidth = rect.width + padding;
                    const targetHeight = rect.height + padding;

                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    // Smooth lerp to center
                    outer.current.x += (centerX - outer.current.x) * 0.15;
                    outer.current.y += (centerY - outer.current.y) * 0.15;

                    if (outerRef.current) {
                        outerRef.current.style.opacity = "1";
                        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) translate(-50%, -50%)`;
                        outerRef.current.style.width = `${targetWidth}px`;
                        outerRef.current.style.height = `${targetHeight}px`;
                        outerRef.current.style.borderRadius = "8px";
                        outerRef.current.style.borderColor = "#3b82f6";
                        outerRef.current.style.backgroundColor = "rgba(59, 130, 246, 0.08)";
                    }
                } else {
                    // Normal follow mouse
                    outer.current.x += (targetX - outer.current.x) * 0.08;
                    outer.current.y += (targetY - outer.current.y) * 0.08;

                    if (outerRef.current) {
                        outerRef.current.style.opacity = "0";
                        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) translate(-50%, -50%)`;
                    }
                }

                if (innerRef.current) {
                    innerRef.current.style.opacity = "0";
                }
            }

            requestRef.current = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.documentElement.addEventListener("mouseleave", onPageLeave);
        document.documentElement.addEventListener("mouseenter", onPageEnter);
        requestRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("scroll", onScroll);
            document.documentElement.removeEventListener("mouseleave", onPageLeave);
            document.documentElement.removeEventListener("mouseenter", onPageEnter);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            <div
                ref={outerRef}
                className="fixed top-0 left-0 w-[32px] h-[32px] rounded-full border-[1.5px] border-white/60 bg-transparent pointer-events-none z-[9999] hidden md:block"
                style={{
                    willChange: "transform, opacity",
                    transition: "opacity 0.15s ease, border-radius 0.2s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease"
                }}
            />
            <div
                ref={innerRef}
                className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-[9999] hidden md:block"
                style={{ willChange: "transform, opacity", transition: "opacity 0.15s ease" }}
            />
        </>
    );
}
