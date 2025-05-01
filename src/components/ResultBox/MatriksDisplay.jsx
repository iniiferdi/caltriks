export function MatrixDisplay({ matrix, rows, cols }) {
    return (
        <div className="bg-[#121212] text-white rounded-lg px-2 py-1 border border-[#1E1E20]">
            <div
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(20px, 1fr))`,
                }}
            >
                {[...Array(rows)].map((_, rowIndex) =>
                    [...Array(cols)].map((_, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="text-center font-semibold"
                        >
                            {matrix[rowIndex]?.[colIndex] ?? ''}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
