import { MatrixDisplay } from "../MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function CofactorRow({ index, label, matrix, result }) {

    const order = getEffectiveOrder(matrix);

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. Cofactor of {label}
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={matrix} rows={order.rows} cols={order.cols} />
                <span className="text-white font-bold text-base mt-3">=</span>
                {Array.isArray(result) ? (
                    <MatrixDisplay matrix={result} rows={order.rows} cols={order.cols} />
                ) : (
                    <span className="text-white">Invalid result</span>
                )}
            </div>
        </>
    );
}
