'use client'

import { HeaderCard } from "./HeaderCard"
import { MatriksInput } from "../MatrixInput/MatriksInput"
import { MatriksMetode } from "../MatriksMetode/MatriksMetode"

export function MatriksPanel({ title, matrixId }) {
    return (
        <div className="flex gap-8 flex-col">
            <div className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-[24px] p-5 w-full shadow-md border border-[#1E1E20]">
                <HeaderCard title={title} />
                <MatriksInput matrixId={matrixId} />
            </div>


            {/* <MatriksMetode /> */}

        </div>
    )
}