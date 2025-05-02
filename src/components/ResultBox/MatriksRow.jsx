import { MatrixDisplay } from './MatriksDisplay';

const opMap = {
    add: '+',
    sub: '-',
    mul: '×'
};

const getEffectiveOrder = (matrix) => {
    if (!Array.isArray(matrix) || matrix.length === 0) return { rows: 0, cols: 0 };

    const effectiveRows = matrix.filter(row => row.some(val => val !== 0));
    const effectiveCols = Math.max(
        ...effectiveRows.map(row =>
            row.reduceRight((lastIdx, val, idx) => (lastIdx === -1 && val !== 0 ? idx + 1 : lastIdx), -1)
        ),
        0
    );
    return { rows: effectiveRows.length, cols: effectiveCols };
};

export function MatrixRow({ index, entry }) {
    const orderA = getEffectiveOrder(entry.matrixA);
    const orderB = getEffectiveOrder(entry.matrixB);
    const orderR = getEffectiveOrder(entry.result);

    const maxRows = Math.max(orderA.rows, orderB.rows, orderR.rows);
    const midRow = Math.floor(maxRows / 2);

    const renderOperator = (symbol) => (
        <div>
            {[...Array(maxRows)].map((_, idx) => (
                <div key={idx} className="text-white font-bold text-xl text-center">
                    {idx === midRow ? symbol : ''}
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className="mb-3 text-sm text-gray-400 font-medium">
                {index + 1}. {entry.type === 'det' ? 'Determinan A' : `A ${opMap[entry.type] ?? entry.type} B`}
            </div>

            <div className="flex gap-4 items-center">
                <MatrixDisplay matrix={entry.matrixA} rows={orderA.rows} cols={orderA.cols} />

                {renderOperator('=')}

                {entry.type === 'det' ? (
                    <div className="text-white font-bold text-xl">
                        {entry.result}
                    </div>
                ) : (
                    <>
                        {entry.matrixB && (
                            <>
                                {renderOperator(opMap[entry.type])}
                                <MatrixDisplay matrix={entry.matrixB} rows={orderB.rows} cols={orderB.cols} />
                            </>
                        )}
                        {renderOperator('=')}
                        <MatrixDisplay matrix={entry.result} rows={orderR.rows} cols={orderR.cols} />
                    </>
                )}
            </div>
        </div>
    );
}
