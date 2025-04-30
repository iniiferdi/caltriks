'use client'
import { useEffect, useState } from "react"

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const move = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Deteksi elemen yang dihover
            const isTarget = e.target?.closest('.hover-target');
            setIsHovering(!!isTarget);
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            className={`pointer-events-none fixed z-[9999] w-3 h-3 rounded-full bg-white  transition-all duration-100 ease-out ${
                isHovering ? 'opacity-0' : ''
            }`}
            style={{
                top: `${position.y - 16}px`,
                left: `${position.x - 16}px`
            }}
        />
    );
}
