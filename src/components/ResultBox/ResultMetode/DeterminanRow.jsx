import { MatrixDisplay } from "../MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function DeterminantRow({ index, label, matrix, result }) {
    const order = getEffectiveOrder(matrix);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. Determinant of {label}
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={matrix} rows={order.rows} cols={order.cols} />
                <span className="text-white font-bold text-base">=</span>
                <span className="text-white font-bold text-base">{result}</span>
            </div>
        </>
    );
}

