import { MatrixDisplay } from "./MatriksDisplay";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function RankRow({ index, label, matrix, result }) {
  const orderMatrix = getEffectiveOrder(matrix);

  return (
    <>
      <div className="text-sm text-gray-400 font-medium mb-2">
        {index + 1}. Rank of {label}
      </div>
      <div className="flex gap-4 items-center">
        <MatrixDisplay matrix={matrix} rows={orderMatrix.rows} cols={orderMatrix.cols} />
        <span className="text-white font-bold text-base">=</span>
        <span className="text-white font-bold text-base">{result}</span>
      </div>
    </>
  );
}
