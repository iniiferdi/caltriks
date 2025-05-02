export function validateMatrixOperation(type, matrixA, matrixB) {
  function getValidDimensions(matrix) {
    const filteredRows = matrix.filter(
      row =>
        Array.isArray(row) &&
        row.every(cell => typeof cell === 'number' && !isNaN(cell))
    );

    const rows = filteredRows.length;
    const cols = Math.max(...filteredRows.map(r => r.length), 0);

    return { rows, cols };
  }

  function isMatrixFilled(matrix) {
    return (
      Array.isArray(matrix) &&
      matrix.length > 0 &&
      matrix.every(
        row =>
          Array.isArray(row) &&
          row.every(cell => typeof cell === 'number' && !isNaN(cell))
      )
    );
  }

  const { rows: rowsA, cols: colsA } = getValidDimensions(matrixA);
  const { rows: rowsB, cols: colsB } = getValidDimensions(matrixB);

  if (!isMatrixFilled(matrixA)) {
    const err = new Error("Matriks A tidak boleh kosong.");
    err.name = "Validasi Matriks";
    throw err;
  }

  const isTwoMatrixOp = type === "add" || type === "sub" || type === "mul";
  if (isTwoMatrixOp && !isMatrixFilled(matrixB)) {
    const err = new Error("Matriks B tidak boleh kosong.");
    err.name = "Validasi Matriks";
    throw err;
  }

  if ((type === "add" || type === "sub") && (rowsA !== rowsB || colsA !== colsB)) {
    const err = new Error("Matriks A dan B harus memiliki ukuran yang sama.");
    err.name = "Validasi Operasi";
    throw err;
  }

  if (type === "mul" && colsA !== rowsB) {
    const err = new Error("Jumlah kolom Matriks A harus sama dengan jumlah baris Matriks B.");
    err.name = "Validasi Operasi";
    throw err;
  }

  if (type === "det" || type === "inv") {
    if (rowsA !== colsA) {
      const err = new Error("Matriks A harus bujur sangkar.");
      err.name = "Validasi Operasi";
      throw err;
    }
  }

  if (type === "trans") {
    if (rowsA === 0 || colsA === 0) {
      const err = new Error("Matriks A tidak boleh kosong.");
      err.name = "Validasi Operasi";
      throw err;
    }
  }

  return true;
}
