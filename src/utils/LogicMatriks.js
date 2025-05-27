import { det, fraction, subtract, multiply, divide } from 'mathjs';

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

export const getMinrorMatriks = (matrix, row, col) => {
  const n = matrix.length;

  if (!Array.isArray(matrix) || matrix.some(r => r.length !== n)) {
    throw new Error('Matrix must be square.');
  }

  if (
    row < 0 || row >= n ||
    col < 0 || col >= n
  ) {
    throw new Error('Invalid row or column index.');
  }

  const minorMatrix = matrix
    .filter((_, i) => i !== row)
    .map(r => r.filter((_, j) => j !== col));

  return Number(det(minorMatrix).toFixed(4));
};

export function refFraction(matrix) {
  const m = matrix.map(row => row.map(cell => fraction(cell)));
  const rows = m.length;
  const cols = m[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
    if (lead >= cols) return m;

    let i = r;
    while (i < rows && m[i][lead].numerator === 0) {
      i++;
    }

    if (i === rows) {
      lead++;
      r--;
      continue;
    }

    [m[r], m[i]] = [m[i], m[r]];

    for (let k = r + 1; k < rows; k++) {
      const lv = divide(m[k][lead], m[r][lead]);
      for (let j = lead; j < cols; j++) {
        m[k][j] = subtract(m[k][j], multiply(lv, m[r][j]));
      }
    }

    lead++;
  }

  console.log(m)

  return m;
}




