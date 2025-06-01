import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { create, all, isInteger } from "mathjs";

const math = create(all);
math.config({ number: 'Fraction' });

function formatFraction(frac) {
    const value = math.number(frac);
    if (Number.isInteger(value)) return value.toString();
    return `${frac.s * frac.n}/${frac.d}`;
}

export function explainOBE(matrix) {
    const mat = matrix.map(row => row.map(el => math.fraction(el)));
    let swapCount = 0;

    const f1 = math.divide(mat[1][0], mat[0][0]);
    for (let j = 0; j < 3; j++) {
        mat[1][j] = math.subtract(mat[1][j], math.multiply(f1, mat[0][j]));
    }

    const f2 = math.divide(mat[2][0], mat[0][0]);
    for (let j = 0; j < 3; j++) {
        mat[2][j] = math.subtract(mat[2][j], math.multiply(f2, mat[0][j]));
    }

    const f3 = math.divide(mat[2][1], mat[1][1]);
    for (let j = 1; j < 3; j++) {
        mat[2][j] = math.subtract(mat[2][j], math.multiply(f3, mat[1][j]));
    }

    const det = math.multiply(
        mat[0][0],
        math.multiply(mat[1][1], mat[2][2])
    );
    const detWithSign = swapCount % 2 === 0 ? det : math.multiply(-1, det);

    return (
        <div className="text-sm text-gray-300 mt-2">
            <ul className="list-disc list-inside space-y-1">
                <li key="step1">R₂ ← R₂ − ({formatFraction(f1)}) × R₁</li>
                <li key="step2">R₃ ← R₃ − ({formatFraction(f2)}) × R₁</li>
                <li key="step3">R₃ ← R₃ − ({formatFraction(f3)}) × R₂</li>
            </ul>

            <p className="mt-2 mb-2">Matrix setelah eliminasi:</p>
            <MatrixDisplay
                matrix={mat.map(row => row.map(formatFraction))}
                rows={3}
                cols={3}
            />

            <p className="mt-2">
                det(A) = {formatFraction(mat[0][0])} × {formatFraction(mat[1][1])} × {formatFraction(mat[2][2])} = <strong>{formatFraction(detWithSign)}</strong>
            </p>
        </div>
    );
}
