"use client";

import { useEffect } from "react";

export default function SecurityFeatures() {
    useEffect(() => {
        // Obstruct Right-Click Context Menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Obstruct Common DevTools Keyboard Shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }
            // Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
                e.preventDefault();
            }
            // Ctrl+Shift+C (Windows) / Cmd+Option+C (Mac) - Element Inspector
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
                e.preventDefault();
            }
            // Ctrl+U (Windows) / Cmd+Option+U (Mac) - View Source
            if ((e.ctrlKey || e.metaKey) && e.key === "U") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // This component renders nothing visually
    return null;
}
