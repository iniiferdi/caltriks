import { create, all } from 'mathjs';
const math = create(all);

/**
 * Mengecek apakah sebuah sel valid sebagai ekspresi matematika
 */
const isMathExpression = (val) => {
  if (!val || val.trim() === '') return false; // ⬅️ Tambahan ini penting
  try {
    const node = math.parse(val);
    node.traverse((node) => {
      if (node.isSymbolNode && !['x', 'y', 'z'].includes(node.name)) {
        throw new Error("Simbol tidak dikenali");
      }
    });
    return true;
  } catch {
    return false;
  }
};



/**
 * Validasi input matriks SPL
 * Mendukung ekspresi simbolik (seperti "2x", "-3y", "z")
 */
export function validateMatrixSpl(matrix, { throwError = true } = {}) {
  const error = (msg) => {
    if (throwError) {
      const err = new Error(msg);
      err.name = "SPL Validation";
      throw err;
    }
    return false;
  };

  if (!Array.isArray(matrix) || matrix.length === 0) {
    return error("Matrix tidak boleh kosong.");
  }

  const rowCount = matrix.length;
  const expectedCols = rowCount + 1;

  for (let i = 0; i < rowCount; i++) {
    const row = matrix[i];
    if (!Array.isArray(row)) {
      return error(`Baris ke-${i + 1} bukan array.`);
    }
    if (row.length !== expectedCols) {
      return error(`Jumlah kolom pada baris ke-${i + 1} tidak sesuai. Harus ${expectedCols} kolom.`);
    }

    for (let j = 0; j < row.length; j++) {
      const val = row[j];
      if (!isMathExpression(val)) {
        return error(`Nilai tidak valid di baris ${i + 1}, kolom ${j + 1}. Harus ekspresi matematika valid.`);
      }
    }
  }

  return true;
}

/**
 * Gaussian Elimination untuk matriks simbolik (string ekspresi mathjs)
 */
export function gaussianEliminationFinalResult(inputMatrix) {
  const m = inputMatrix.length;

  // Parse semua sel ke bentuk string ekspresi (bukan Node)
  let matrix = inputMatrix.map(row =>
    row.map(cell => cell || '0')
  );

  // Proses eliminasi Gauss
  for (let i = 0; i < m; i++) {
    const pivot = matrix[i][i];

    // Bagi baris i dengan pivot
    matrix[i] = matrix[i].map(cell =>
      math.simplify(`(${cell}) / (${pivot})`).toString()
    );

    // Eliminasi baris lain
    for (let j = 0; j < m; j++) {
      if (j !== i) {
        const factor = matrix[j][i];
        matrix[j] = matrix[j].map((cell, k) => {
          const expression = `(${cell}) - ((${factor}) * (${matrix[i][k]}))`;
          return math.simplify(expression).toString();
        });
      }
    }
  }

  return matrix;
}

export function gaussJordanEliminationFinalResult(inputMatrix) {
  const m = inputMatrix.length;

  let matrix = inputMatrix.map(row =>
    row.map(cell => cell || '0')
  );

  for (let i = 0; i < m; i++) {
    const pivot = matrix[i][i];
    matrix[i] = matrix[i].map(cell =>
      math.simplify(`(${cell}) / (${pivot})`).toString()
    );

    for (let j = 0; j < m; j++) {
      if (j !== i) {
        const factor = matrix[j][i];
        matrix[j] = matrix[j].map((cell, k) => {
          const expression = `(${cell}) - ((${factor}) * (${matrix[i][k]}))`;
          return math.simplify(expression).toString();
        });
      }
    }
  }

  return matrix;
}

function determinantSymbolic(matrix) {
  const n = matrix.length;
  if (n === 1) return math.parse(matrix[0][0]);
  if (n === 2) {
    // (a*d - b*c)
    const a = math.parse(matrix[0][0]);
    const b = math.parse(matrix[0][1]);
    const c = math.parse(matrix[1][0]);
    const d = math.parse(matrix[1][1]);
    return math.simplify(math.subtract(math.multiply(a, d), math.multiply(b, c)));
  }

  let result = math.parse('0');

  for (let col = 0; col < n; col++) {
    const subMatrix = matrix.slice(1).map(row =>
      row.filter((_, idx) => idx !== col)
    );

    const cofactor = (col % 2 === 0 ? 1 : -1);
    const element = math.parse(matrix[0][col]);
    const minorDet = determinantSymbolic(subMatrix);

    const term = math.multiply(math.multiply(cofactor, element), minorDet);
    result = math.simplify(math.add(result, term));
  }

  return result;
}



export function cramersRuleResult(inputMatrix) {
  const m = inputMatrix.length;
  const A = inputMatrix.map(row => row.slice(0, m).map(cell => cell || '0'));
  const B = inputMatrix.map(row => row[m] || '0');

  const detA = determinantSymbolic(A);
  const detAStr = detA.toString();

  const results = [];

  for (let i = 0; i < m; i++) {
    const Ai = A.map((row, rowIndex) => {
      const newRow = [...row];
      newRow[i] = B[rowIndex];
      return newRow;
    });

    const detAi = determinantSymbolic(Ai);
    // Buat solusi dan simplifikasi
    const solution = math.simplify(math.divide(detAi, detA));
    results.push(`x${i + 1} = ${solution.toString()}`);
  }

  console.log("Cramer Result:", results);
  return results;
}
