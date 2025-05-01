export function validateMatrixOperation(type, matrixA, matrixB) {
  function getValidDimensions(matrix) {
    const filteredRows = matrix.filter(
      row => Array.isArray(row) && row.every(cell => typeof cell === 'number' && !isNaN(cell))
    );

    const rows = filteredRows.length;
    const cols = Math.max(...filteredRows.map(r => r.length), 0);

    return { rows, cols };
  }

  function isMatrixFilled(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) return false;
    return matrix.every(
      row =>
        Array.isArray(row) &&
        row.length > 0 &&
        row.every(cell => typeof cell === 'number' && !isNaN(cell))
    );
  }

  const { rows: rowsA, cols: colsA } = getValidDimensions(matrixA);
  const { rows: rowsB, cols: colsB } = getValidDimensions(matrixB);

  if (!isMatrixFilled(matrixA) || !isMatrixFilled(matrixB)) {
    throw new Error("Semua elemen dalam kedua matriks harus diisi dengan angka sebelum melakukan operasi.");
  }

  if ((type === "add" || type === "subtract") && (rowsA !== rowsB || colsA !== colsB)) {
    throw new Error(`Untuk operasi ${type === "add" ? "penjumlahan" : "pengurangan"}, ukuran kedua matriks harus sama.`);
  }

  if (type === "multiply" && colsA !== rowsB) {
    throw new Error("Untuk perkalian matriks, jumlah kolom Matriks A harus sama dengan jumlah baris Matriks B.");
  }

  return true;
}
