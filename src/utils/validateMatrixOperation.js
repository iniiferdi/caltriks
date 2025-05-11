import { isValidMatrix, getSingleMatrixTarget } from './matrixUtils';

export function validateMatrixOperation(type, matrixA = [], matrixB = []) {
  const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);

  const getDimensions = (matrix) => {
    if (!Array.isArray(matrix) || matrix.length === 0) return { rows: 0, cols: 0 };

    let rows = 0;
    let cols = 0;

    for (const row of matrix) {
      if (Array.isArray(row)) {
        rows++;
        const validLength = row.reduceRight((found, val, i) =>
          isNumber(val) && found === -1 ? i + 1 : found,
          -1
        );
        if (validLength > cols) cols = validLength;
      }
    }

    return { rows, cols };
  };

  const throwError = (message, name = "Validation Error") => {
    const err = new Error(message);
    err.name = name;
    throw err;
  };

  const opType = typeof type === "string" ? type : type?.value;
  if (!opType) throwError("Operation type is missing or invalid.", "Type Validation");

  const binaryOperations = ["add", "sub", "mul"];

  const targetMatrix = !binaryOperations.includes(opType)
    ? getSingleMatrixTarget(matrixA, matrixB)
    : null;

  let rowsA = 0, colsA = 0, rowsB = 0, colsB = 0;

  if (binaryOperations.includes(opType)) {
    if (!isValidMatrix(matrixA)) throwError("Matrix A must be valid.", "Matrix Validation");
    if (!isValidMatrix(matrixB)) throwError("Matrix B must be valid.", "Matrix Validation");

    ({ rows: rowsA, cols: colsA } = getDimensions(matrixA));
    ({ rows: rowsB, cols: colsB } = getDimensions(matrixB));
  } else {
    if (!targetMatrix) {
      throwError("A valid matrix (A or B) is required for this operation.", "Matrix Validation");
    }
  }

  const targetMatrixData = targetMatrix && targetMatrix.matrix ? targetMatrix.matrix : targetMatrix;

  const { rows: targetRows, cols: targetCols } = targetMatrixData && targetMatrixData.length > 0
    ? getDimensions(targetMatrixData)
    : { rows: 0, cols: 0 };

  const validators = {
    add: () => {
      if (rowsA !== rowsB || colsA !== colsB) {
        throwError("Matrix dimensions must match for addition.");
      }
    },
    sub: () => {
      if (rowsA !== rowsB || colsA !== colsB) {
        throwError("Matrix dimensions must match for subtraction.");
      }
    },
    mul: () => {
      if (colsA !== rowsB) {
        throwError("Matrix A's columns must match Matrix B's rows for multiplication.");
      }
    },
    det: () => {
      if (targetRows !== targetCols) {
        throwError("Matrix must be square for determinant.");
      }
    },
    inv: () => {
      if (targetRows !== targetCols) {
        throwError("Matrix must be square for inverse.");
      }
    },
    trans: () => {
      if (targetRows === 0 || targetCols === 0) {
        throwError("Matrix is empty and cannot be transposed.");
      }
    },
    rank: () => {
    },
  };

  if (!validators[opType]) {
    throwError(`Unknown matrix operation type: ${opType}`, "Type Validation");
  }

  validators[opType]();

  return true;
}
