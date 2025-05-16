import { det } from 'mathjs';

function getMinor(matrix, row, col) {
    return matrix
        .filter((_, i) => i !== row)
        .map(r => r.filter((_, j) => j !== col));
}

export function getCofactorMatrix(mat) {
    const n = mat.length;
    if (n === 0 || mat[0].length !== n) {
        throw new Error("Matrix must be square and non-empty");
    }

    const cofactorMatrix = [];

    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            const minor = getMinor(mat, i, j);
            const cofactor = Math.pow(-1, i + j) * det(minor);
            row.push(Number(cofactor.toFixed(4)));
        }
        cofactorMatrix.push(row);
    }

    return cofactorMatrix;
}
