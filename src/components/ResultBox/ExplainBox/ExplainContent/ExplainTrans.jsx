import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { formatFraction } from "@/utils/formatFraction";

export function ExplainTrans({ entry }) {
    const rows = entry.matrix.length;
    const cols = entry.matrix[0].length;

    const transposed = Array.from({ length: cols }, (_, i) =>
        Array.from({ length: rows }, (_, j) => entry.matrix[j][i])
    );

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">Transpose mengubah posisi elemen dalam matriks: baris menjadi kolom, kolom menjadi baris.</p>

                <div className="flex flex-row gap-2 items-center">
                    <p>{entry.label}</p>
                    <span>=</span>
                    <MatrixDisplay matrix={entry.matrix} rows={rows} cols={cols} />
                </div>

                <p className="mt-3 font-semibold">Langkah:</p>
                <div className="mt-2 text-sm text-gray-300 space-y-2">
                    {entry.matrix.map((row, i) => (
                        <div key={i}>
                            Baris {i + 1} menjadi kolom {i + 1}: [
                            {row.map((val, j) => (
                                <span key={j} className="inline-block mr-1">
                                    {formatFraction(val)}{j < row.length - 1 ? "," : ""}
                                </span>
                            ))}]
                        </div>
                    ))}
                </div>

                <p className="mt-3">Hasil Transpose:</p>
                <div className="flex flex-row gap-2 items-center">
                    <span>{entry.label}ᵀ</span>
                    <span>=</span>
                    <MatrixDisplay matrix={transposed} rows={cols} cols={rows} />
                </div>
            </div>
        </div>
    );
}
