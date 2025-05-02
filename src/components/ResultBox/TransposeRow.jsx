import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function TransposeRow({ index, entry }) {
    const orderA = getEffectiveOrder(entry.matrixA);
    const orderR = getEffectiveOrder(entry.result);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. Aᵀ (Transpose of A)
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={entry.matrixA} rows={orderA.rows} cols={orderA.cols} />
                <span className="text-white font-bold text-base">=</span>
                <MatrixDisplay matrix={entry.result} rows={orderR.rows} cols={orderR.cols} />
            </div>

        </>
    );
}
