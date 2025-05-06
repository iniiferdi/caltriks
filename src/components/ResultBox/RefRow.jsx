'use client';

import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function RefRow({ index, entry }) {
    const order = getEffectiveOrder(entry.matrixA);
    const resultOrder = getEffectiveOrder(entry.result);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. REF (Row Echelon Form) of A
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={entry.matrixA} rows={order.rows} cols={order.cols} />
                <span className="text-white font-bold text-base">→</span>
                <MatrixDisplay matrix={entry.result} rows={resultOrder.rows} cols={resultOrder.cols} />
            </div>
        </>
    );
}
