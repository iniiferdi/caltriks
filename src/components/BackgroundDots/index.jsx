import { cn } from "@/lib/utils";
import React from "react";

export function DotBackgroundDemo() {
    return (
        <>
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:radial-gradient(#191919_2px,transparent_2px)]"
                )} />
          
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
        </>


    );
}
