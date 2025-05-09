import { add, subtract, multiply, det, transpose, inv, fraction, format } from 'mathjs';
import rref from 'rref';

export const cleanMatrix = matrix =>
  matrix.map(row =>
    row.map(cell =>
      typeof cell === 'number' ? cell : parseFloat(cell) || 0
    )
  );

  export const normalizeMatrix = (matrix) => {
    const filteredRows = matrix.filter(row => row.some(cell => cell !== null && cell !== ''));
    const maxCols = Math.max(
      0,
      ...filteredRows.map(row => {
        let i = row.length;
        while (i > 0 && (row[i - 1] === null || row[i - 1] === '')) i--;
        return i;
      })
    );
    return filteredRows.map(row => row.slice(0, maxCols));
  };
  

export const performMatrixOperation = (type, matrixA, matrixB, target = 'A') => {
  const cleanA = cleanMatrix(matrixA);
  const cleanB = matrixB ? cleanMatrix(matrixB) : null;
  const selected = target === 'B' ? cleanB : cleanA;

  switch (type) {
    case 'add':
      return add(cleanA, cleanB);
    case 'sub':
      return subtract(cleanA, cleanB);
    case 'mul':
      return multiply(cleanA, cleanB);
    case 'det':
      return Number(det(selected).toFixed(4));
    case 'trans':
      return transpose(selected);
    case 'inv':
      try {
        const result = inv(selected);
        return result.map(row => row.map(x => format(fraction(x))));
      } catch {
        throw new Error('Matriks tidak dapat diinvers. Pastikan matriks berbentuk persegi dan determinannya ≠ 0.');
      }
    case 'rank':
      try {
        const reduced = rref(selected);
        return reduced.filter(row => row.some(cell => Math.abs(cell) > 1e-10)).length;
      } catch {
        throw new Error('Gagal menghitung rank. Pastikan matriks valid.');
      }
    default:
      throw new Error('Tipe operasi tidak dikenali.');
  }
};

export function getEffectiveOrder(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return { rows: 0, cols: 0 };

  const effectiveRows = matrix.filter(row => row.some(val => val !== 0));
  const effectiveCols = Math.max(
    ...effectiveRows.map(row =>
      row.reduceRight((lastIdx, val, idx) => (lastIdx === -1 && val !== 0 ? idx + 1 : lastIdx), -1)
    ),
    0
  );

  return {
    rows: effectiveRows.length,
    cols: effectiveCols
  };
}
