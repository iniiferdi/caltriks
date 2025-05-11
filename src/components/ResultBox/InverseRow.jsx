import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function InverseRow({ index, label, matrix, result }) {
    const orderMatrix = getEffectiveOrder(matrix);
    const orderResult = getEffectiveOrder(result);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. {label}⁻¹ (Inverse of {label})
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={matrix} rows={orderMatrix.rows} cols={orderMatrix.cols} />
                <span className="text-white font-bold text-base">=</span>
                <MatrixDisplay matrix={result} rows={orderResult.rows} cols={orderResult.cols} />
            </div>
        </>
    );
}
