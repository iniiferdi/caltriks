import { cloneDeep } from "lodash";
import { fraction } from "mathjs";

// Pastikan semua elemen dalam bentuk mathjs fraction
function toFraction(val) {
  if (typeof val === "object" && val.isFraction) return val;
  return fraction(val);
}

export function refFraction(matrix) {
  const mat = cloneDeep(matrix).map(row => row.map(toFraction));
  const rowCount = mat.length;
  const colCount = mat[0].length;

  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) break;

    // 1. Cari baris dengan elemen bukan nol di kolom lead
    let i = r;
    while (i < rowCount && mat[i][lead].s === 0) {
      i++;
    }

    if (i === rowCount) {
      lead++;
      r--;
      continue;
    }

    // 2. Tukar jika perlu
    if (i !== r) {
      [mat[r], mat[i]] = [mat[i], mat[r]];
    }

    // 3. Normalisasi baris pivot agar elemen lead = 1
    const pivot = mat[r][lead];
    mat[r] = mat[r].map(val => val.div(pivot));

    // 4. Eliminasi elemen di bawah pivot
    for (let j = r + 1; j < rowCount; j++) {
      const below = mat[j][lead];
      if (below.s !== 0) {
        mat[j] = mat[j].map((val, k) =>
          val.sub(below.mul(mat[r][k]))
        );
      }
    }

    lead++;
  }

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