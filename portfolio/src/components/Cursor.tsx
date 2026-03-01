"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    // Mouse positions
    const mouse = useRef({ x: 0, y: 0 });
    const outer = useRef({ x: 0, y: 0, scale: 1 });
    const inner = useRef({ scale: 1 });

    // States
    const isHovering = useRef(false);
    const isInsidePage = useRef(true);

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
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[data-hoverable='true']")
            ) {
                isHovering.current = true;
            } else {
                isHovering.current = false;
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

            // Lerp outer ring
            outer.current.x += (targetX - outer.current.x) * 0.08;
            outer.current.y += (targetY - outer.current.y) * 0.08;

            // Outer scale lerp
            const targetOuterScale = isHovering.current ? 1.8 : 1;
            outer.current.scale += (targetOuterScale - outer.current.scale) * 0.1;

            // Inner scale lerp
            const targetInnerScale = isHovering.current ? 0 : 1;
            inner.current.scale += (targetInnerScale - inner.current.scale) * 0.2;

            // Only update transforms if cursor is inside page
            if (isInsidePage.current) {
                if (outerRef.current) {
                    outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0) translate(-50%, -50%) scale(${outer.current.scale})`;

                    if (isHovering.current) {
                        outerRef.current.style.borderColor = "#ff5533";
                        outerRef.current.style.backgroundColor = "rgba(255,85,51,0.08)";
                    } else {
                        outerRef.current.style.borderColor = "rgba(255,255,255,0.6)";
                        outerRef.current.style.backgroundColor = "transparent";
                    }
                }

                if (innerRef.current) {
                    innerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${inner.current.scale})`;

                    if (isHovering.current) {
                        innerRef.current.style.backgroundColor = "#ff5533";
                    } else {
                        innerRef.current.style.backgroundColor = "#ffffff";
                    }
                }
            }

            requestRef.current = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        document.documentElement.addEventListener("mouseleave", onPageLeave);
        document.documentElement.addEventListener("mouseenter", onPageEnter);
        requestRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
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
                style={{ willChange: "transform, border-color, background-color", transition: "opacity 0.15s ease" }}
            />
            <div
                ref={innerRef}
                className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-[9999] hidden md:block"
                style={{ willChange: "transform, background-color", transition: "opacity 0.15s ease" }}
            />
        </>
    );
}
