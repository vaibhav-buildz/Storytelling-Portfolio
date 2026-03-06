"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
    link?: string;
    isSelected?: boolean;
    onSelect?: () => void;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    titleClassName = "text-blue-500",
    link,
    isSelected = false,
    onSelect,
}: DisplayCardProps) {
    const handleClick = () => {
        if (!link) return;

        // Detect if the device relies purely on touch interactions (no hover mouse)
        const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

        if (isTouchDevice) {
            if (!isSelected) {
                // First Tap: Just focus it and let the CSS transition pull it out of the deck
                if (onSelect) onSelect();
                return;
            }
            // Second Tap: Actually open the certificate
            window.open(link, "_blank");
        } else {
            // Desktop: Hover state handles pull-out already, open instantly on click
            window.open(link, "_blank");
        }
    };

    return (
        <div
            onClick={handleClick}
            className={cn(
                "relative flex h-auto min-h-36 w-[17rem] sm:w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[15rem] sm:after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                // Force the hover state permanently on mobile if it is the currently selected card
                isSelected && "border-white/20 bg-muted -translate-y-10 z-10 before:opacity-0 grayscale-0",
                link && "cursor-pointer",
                className
            )}
        >
            <div>
                <span className="relative inline-block rounded-full bg-blue-800 p-1">
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg">{description}</p>
            <p className="text-muted-foreground">{date}</p>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Reset selection whenever user taps/clicks outside the card stack
    React.useEffect(() => {
        const handleClickOutside = (e: PointerEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setSelectedIdx(null);
            }
        };
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div ref={containerRef} className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard
                    key={index}
                    {...cardProps}
                    isSelected={selectedIdx === index}
                    onSelect={() => setSelectedIdx(index)}
                />
            ))}
        </div>
    );
}
