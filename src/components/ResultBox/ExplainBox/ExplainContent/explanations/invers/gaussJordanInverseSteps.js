import { cloneDeep } from "lodash";
import { fraction } from "mathjs";

export function toFraction(value) {
    if (typeof value === "object" && value.isFraction) {
        return value;
    }
    return fraction(value);
}

export function identityMatrix(n) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(fraction(i === j ? 1 : 0));
        }
        matrix.push(row);
    }
    return matrix;
}

export function gaussJordanInverseSteps(matrix) {
    const steps = [];
    const n = matrix.length;
    let A = cloneDeep(matrix).map(row => row.map(toFraction));
    let I = identityMatrix(n).map(row => row.map(toFraction));

    for (let i = 0; i < n; i++) {
        
        let pivot = A[i][i];
        if (pivot.n === 0) {
  
            for (let j = i + 1; j < n; j++) {
                if (A[j][i].n !== 0) {
                    [A[i], A[j]] = [A[j], A[i]];
                    [I[i], I[j]] = [I[j], I[i]];
                    steps.push({
                        description: `R${i + 1} ↔ R${j + 1}`,
                        result: A.map((row, idx) => [...row, '|', ...I[idx]])
                    });
                    pivot = A[i][i];
                    break;
                }
            }
        }

        if (pivot.n !== 1 || pivot.d !== 1) {
            for (let j = 0; j < n; j++) {
                A[i][j] = A[i][j].div(pivot);
                I[i][j] = I[i][j].div(pivot);
            }
            steps.push({
                description: `R${i + 1} ← R${i + 1} ÷ ${pivot.toFraction(true)}`,
                result: A.map((row, idx) => [...row, '|', ...I[idx]])
            });
        }

        for (let j = 0; j < n; j++) {
            if (j === i) continue;
            const factor = A[j][i];
            if (factor.n === 0) continue;
            for (let k = 0; k < n; k++) {
                A[j][k] = A[j][k].sub(factor.mul(A[i][k]));
                I[j][k] = I[j][k].sub(factor.mul(I[i][k]));
            }
            const sign = factor.s === -1 ? "-" : "";
            const fStr = `${sign}${factor.abs().toFraction(true)}`;
            steps.push({
                description: `R${j + 1} ← R${j + 1} − ${fStr} × R${i + 1}`,
                result: A.map((row, idx) => [...row, '|', ...I[idx]])
            });
        }
    }

    return steps;
}
