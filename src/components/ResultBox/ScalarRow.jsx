import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function ScalarRow({ index, label, matrix, scalar, result }) {
  const order = getEffectiveOrder(matrix);

  return (
    <>
      <div className="text-sm text-gray-400 font-medium mb-2">
        {index + 1}. Scalar {label}
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <MatrixDisplay matrix={matrix} rows={order.rows} cols={order.cols} />
        <span className="text-white font-bold text-base">×</span>
        <span className="text-white font-bold text-base">{scalar}</span>
        <span className="text-white font-bold text-base">=</span>
        <MatrixDisplay matrix={result} rows={order.rows} cols={order.cols} />
      </div>
    </>
  );
}
