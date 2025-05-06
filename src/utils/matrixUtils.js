import { add, subtract, multiply, det, transpose, inv, fraction, format } from 'mathjs';
import rref from 'rref';

export const cleanMatrix = (matrix) =>
  matrix.map(row =>
    row.map(cell =>
      typeof cell === 'number'
        ? cell
        : parseFloat(cell) || 0
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
      } catch (err) {
        throw new Error('Matriks tidak dapat diinvers. Pastikan matriks berbentuk persegi dan determinannya ≠ 0.');
      }

    case 'rank':
      try {
        if (!Array.isArray(selected) || !selected.every(row => Array.isArray(row) && row.every(cell => typeof cell === 'number' && !isNaN(cell)))) {
          throw new Error("Matrix harus berupa array 2D berisi angka.");
        }
        const reduced = rref(selected);
        const rank = reduced.filter(row => row.some(cell => Math.abs(cell) > 1e-10)).length;
        return rank;
      } catch (err) {
        throw new Error('Gagal menghitung rank. Pastikan matriks valid.');
      }

    case 'ref':
      try {
        const toFractionMatrix = selected.map(row =>
          row.map(cell => {
            const num = Number(cell);
            if (isNaN(num)) throw new Error("Semua elemen matriks harus berupa angka.");
            return fraction(num);
          })
        );

        const rowCount = toFractionMatrix.length;
        const colCount = toFractionMatrix[0].length;
        let lead = 0;

        for (let r = 0; r < rowCount; r++) {
          if (lead >= colCount) break;

          let i = r;
          while (i < rowCount && toFractionMatrix[i][lead].valueOf() === 0) {
            i++;
          }

          if (i === rowCount) {
            lead++;
            r--;
            continue;
          }

          [toFractionMatrix[r], toFractionMatrix[i]] = [toFractionMatrix[i], toFractionMatrix[r]];

          const lv = toFractionMatrix[r][lead];
          for (let i = r + 1; i < rowCount; i++) {
            const lv2 = toFractionMatrix[i][lead];
            const ratio = lv2.div(lv);
            for (let j = 0; j < colCount; j++) {
              toFractionMatrix[i][j] = toFractionMatrix[i][j].sub(ratio.mul(toFractionMatrix[r][j]));
            }
          }

          lead++;
        }

        const tolerance = 1e-10;
        return toFractionMatrix.map(row =>
          row.map(cell => {
            if (cell.abs().lt(tolerance)) return 0;
            if (cell.n === 0 && cell.d === 1) return 0;
            return format(cell, { fraction: 'ratio' });
          })
        );
      } catch (err) {
        console.error("REF Error:", err);
        throw new Error('Gagal menghitung eselon baris. Pastikan matriks valid.');
      }

    case 'adj':
      try {
        const size = selected.length;
        if (size !== selected[0].length) throw new Error('Adjoin hanya berlaku untuk matriks persegi.');

        const cof = selected.map((row, i) =>
          row.map((_, j) => {
            const minor = selected
              .filter((_, m) => m !== i)
              .map(r => r.filter((_, n) => n !== j));
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            return sign * det(minor);
          })
        );
        return transpose(cof).map(row => row.map(cell => Number(cell.toFixed(4))));
      } catch (err) {
        throw new Error('Gagal menghitung adjoin. Pastikan matriks persegi dan valid.');
      }

    case 'cof':
      try {
        const size = selected.length;
        if (size !== selected[0].length) throw new Error('Cofactor hanya berlaku untuk matriks persegi.');

        return selected.map((row, i) =>
          row.map((_, j) => {
            const minor = selected
              .filter((_, m) => m !== i)
              .map(r => r.filter((_, n) => n !== j));
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            return Number((sign * det(minor)).toFixed(4));
          })
        );
      } catch (err) {
        throw new Error('Gagal menghitung matriks kofaktor.');
      }

    case 'trace':
      try {
        const size = selected.length;
        if (size !== selected[0].length) throw new Error('Trace hanya berlaku untuk matriks persegi.');

        const trace = selected.reduce((sum, row, i) => sum + row[i], 0);
        return Number(trace.toFixed(4));
      } catch (err) {
        throw new Error('Gagal menghitung trace matriks.');
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
