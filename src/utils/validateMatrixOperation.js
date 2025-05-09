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
          row.every(cell => !isNaN(parseFloat(cell)))
      )
    );
  }
  

  const { rows: rowsA, cols: colsA } = getValidDimensions(matrixA);
  const { rows: rowsB, cols: colsB } = getValidDimensions(matrixB);

  if (!isMatrixFilled(matrixA)) {
    const err = new Error("Matrix A is required.");
    err.name = "Matrix Validation";
    throw err;
  }

  const isTwoMatrixOp = ["Add", "Subtract", "Multiply"].includes(type);
  if (isTwoMatrixOp && !isMatrixFilled(matrixB)) {
    const err = new Error("Matrix B is required.");
    err.name = "Matrix Validation";
    throw err;
  }

  if (["Add", "Subtract"].includes(type) && (rowsA !== rowsB || colsA !== colsB)) {
    const err = new Error("Size mismatch.");
    err.name = "Operation Validation";
    throw err;
  }

  if (type === "Multiply" && colsA !== rowsB) {
    const err = new Error("Invalid size.");
    err.name = "Operation Validation";
    throw err;
  }

  if (["Determinant", "Inverse"].includes(type)) {
    if (rowsA !== colsA) {
      const err = new Error("Square matrix required.");
      err.name = "Operation Validation";
      throw err;
    }
  }

  if (type === "Transpose") {
    if (rowsA === 0 || colsA === 0) {
      const err = new Error("Matrix A is empty.");
      err.name = "Operation Validation";
      throw err;
    }
  }

  if (type === "Rank" && !isMatrixFilled(matrixA)) {
    const err = new Error("Matrix A is required for rank.");
    err.name = "Matrix Validation";
    throw err;
  }

  return true;
}

