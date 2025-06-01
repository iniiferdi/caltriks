import { fraction } from 'mathjs';
import { cloneDeep } from 'lodash';

export function toFraction(value) {
  if (typeof value === "object" && value.isFraction) return value;
  return fraction(value);
}

export function refFraction(matrix) {
  const mat = cloneDeep(matrix).map(row => row.map(toFraction));
  const rowCount = mat.length;
  const colCount = mat[0].length;

  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) break;

    let i = r;
    while (i < rowCount && mat[i][lead].n === 0) {
      i++;
    }

    if (i === rowCount) {
      lead++;
      r--;
      continue;
    }

    if (i !== r) {
      [mat[r], mat[i]] = [mat[i], mat[r]];
    }

    const pivot = mat[r][lead];

    for (let j = r + 1; j < rowCount; j++) {
      const below = mat[j][lead];
      if (below.n !== 0) {
        const factor = below.div(pivot);
        mat[j] = mat[j].map((val, k) =>
          val.sub(factor.mul(mat[r][k]))
        );
      }
    }

    lead++;
  }

  console.log("REF Matrix:", mat);
  return mat;
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