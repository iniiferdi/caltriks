export function validateMatrixOperation(type, matrixA, matrixB) {
  const normalizeType = (t) => t?.toLowerCase?.();

  const isMatrixFilled = matrix =>
    Array.isArray(matrix) &&
    matrix.length > 0 &&
    matrix.every(
      row =>
        Array.isArray(row) &&
        row.every(cell => !isNaN(parseFloat(cell)))
    );

  const getValidDimensions = matrix => {
    const filteredRows = matrix.filter(
      row =>
        Array.isArray(row) &&
        row.every(cell => !isNaN(parseFloat(cell)))
    );
    return {
      rows: filteredRows.length,
      cols: Math.max(...filteredRows.map(r => r.length), 0),
    };
  };

  const throwError = (message, name = "Operation Validation") => {
    const err = new Error(message);
    err.name = name;
    throw err;
  };

  const opType = normalizeType(type);

  if (!isMatrixFilled(matrixA)) {
    throwError("Matrix A is required.", "Matrix Validation");
  }

  const { rows: rowsA, cols: colsA } = getValidDimensions(matrixA);
  const { rows: rowsB, cols: colsB } = getValidDimensions(matrixB || []);

  switch (opType) {
    case "add":
    case "subtract":
      if (!isMatrixFilled(matrixB)) throwError("Matrix B is required.", "Matrix Validation");
      if (rowsA !== rowsB || colsA !== colsB) throwError("Size mismatch.");
      break;

    case "multiply":
      if (!isMatrixFilled(matrixB)) throwError("Matrix B is required.", "Matrix Validation");
      if (colsA !== rowsB) throwError("Invalid size.");
      break;

    case "determinant":
    case "inverse":
      if (rowsA !== colsA) throwError("Square matrix required.");
      break;

    case "transpose":
      if (rowsA === 0 || colsA === 0) throwError("Matrix A is empty.");
      break;

    case "rank":
      break;

    default:
      throwError("Unknown operation type.", "Type Validation");
  }

  return true;
}
