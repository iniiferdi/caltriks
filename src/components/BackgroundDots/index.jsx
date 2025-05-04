import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export function DotBackgroundDemo() {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY * 0.5;
            if (parallaxRef.current) {
                parallaxRef.current.style.transform = `translateY(${offset}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div
                ref={parallaxRef}
                className={cn(
                    "absolute inset-0 will-change-transform",
                    "[background-size:40px_40px]",
                    "[background-image:radial-gradient(#191919_2px,transparent_2px)]"
                )}
            />
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"
            ></div>
        </>
    );
}
