'use client'

import { HeaderCard } from "./HeaderCard"
import { MatriksInput } from "../MatrixInput/MatriksInput"
import { DropdownMetode } from "../DropdownMetode/DropdownMetode"

export function MatriksPanel({ title, matrixId }) {
    return (
        <div className="flex gap-8 flex-col hover-target pointer-events-auto">
            <div className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-[24px] p-5 w-full 
                shadow-lg shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20] 
                transform transition-all duration-300 ease-in-out 
                hover:scale-[1.02] hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.35)] hover:border-[#3E3E40]">
                <HeaderCard title={title} />
                <MatriksInput matrixId={matrixId} />
            </div>

            <DropdownMetode />
        </div>
    )
}
