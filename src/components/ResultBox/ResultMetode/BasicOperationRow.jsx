import { MatrixDisplay } from "../MatriksDisplay";
import { Operator } from "../Operator";
import { getEffectiveOrder } from "@/utils/matrixUtils";

export function BasicOperationRow({ index, entry }) {
    const orderA = getEffectiveOrder(entry.matrixA);
    const orderB = getEffectiveOrder(entry.matrixB);
    const orderR = getEffectiveOrder(entry.result);
    const maxRows = Math.max(orderA.rows, orderB.rows, orderR.rows);
    const midRow = Math.floor(maxRows / 2);

    const opMap = {
        add: '+',
        sub: '-',
        mul: '×',
    };

    return (
        <>
            <div className="text-sm text-gray-400 font-medium mb-2">
                {index + 1}. A {opMap[entry.type]} B
            </div>
            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={entry.matrixA} rows={orderA.rows} cols={orderA.cols} />
                <Operator symbol={opMap[entry.type]} midRow={midRow} totalRows={maxRows} />
                <MatrixDisplay matrix={entry.matrixB} rows={orderB.rows} cols={orderB.cols} />
                <Operator symbol="=" midRow={midRow} totalRows={maxRows} />
                <MatrixDisplay matrix={entry.result} rows={orderR.rows} cols={orderR.cols} />
            </div>
        </>
    );
}
