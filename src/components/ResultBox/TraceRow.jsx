import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function TraceRow({ index, entry }) {
    const order = getEffectiveOrder(entry.matrixA);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. Trace of A
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={entry.matrixA} rows={order.rows} cols={order.cols} />
                <span className="text-white font-bold text-base">=</span>
                <span className="text-white font-bold text-base">{entry.result}</span>
            </div>
        </>
    );
}
