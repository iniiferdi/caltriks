import { clone, simplify } from "mathjs";

/**
 * Menghasilkan langkah-langkah eliminasi Gauss untuk matriks augmented (support simbolik).
 * @param {string[][]} matrix - Matriks augmented berisi ekspresi simbolik dalam bentuk string.
 * @returns {Array} Array langkah berisi objek { matrix, note }
 */
export function toEchelonSteps(matrix) {
  const steps = [];
  const mat = clone(matrix).map(row => row.map(cell => cell.toString())); // pastikan semua string
  const rows = mat.length;
  const cols = mat[0].length;

  for (let pivot = 0; pivot < rows; pivot++) {
    // 1. Tukar baris kalau pivot == 0 secara simbolik
    const pivotVal = simplify(mat[pivot][pivot]);
    if (pivotVal.equals(0)) {
      for (let i = pivot + 1; i < rows; i++) {
        const currentVal = simplify(mat[i][pivot]);
        if (!currentVal.equals(0)) {
          [mat[pivot], mat[i]] = [mat[i], mat[pivot]];
          steps.push({
            matrix: clone(mat),
            note: `Tukar baris ${pivot + 1} dan ${i + 1} karena pivot nol.`,
          });
          break;
        }
      }
    } else {
      // 2. Normalisasi baris pivot
      for (let j = 0; j < cols; j++) {
        mat[pivot][j] = simplify(`(${mat[pivot][j]}) / (${pivotVal})`).toString();
      }
      steps.push({
        matrix: clone(mat),
        note: `Normalisasi baris ${pivot + 1} agar pivot menjadi 1.`,
      });

      // 3. Eliminasi baris di bawah
      for (let i = pivot + 1; i < rows; i++) {
        const factor = simplify(mat[i][pivot]);
        if (!factor.equals(0)) {
          for (let j = 0; j < cols; j++) {
            mat[i][j] = simplify(`(${mat[i][j]}) - ((${factor}) * (${mat[pivot][j]}))`).toString();
          }
          steps.push({
            matrix: clone(mat),
            note: `Eliminasi baris ${i + 1} dengan mengurangi (${factor}) × baris ${pivot + 1}.`,
          });
        }
      }
    }
  }

  return steps;
}
