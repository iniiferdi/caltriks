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

  const isMatrixAValid = isValidMatrix(matrixA);
  const isMatrixBValid = isValidMatrix(matrixB);

  if (!isMatrixAValid && !isMatrixBValid) {
    throwError("At least one matrix must contain numbers.", "Matrix Validation");
  }

  let targetMatrix = null;

  if (!binaryOperations.includes(opType)) {
    const candidate = getSingleMatrixTarget(matrixA, matrixB);
    if (!candidate || !candidate.matrix || !isValidMatrix(candidate.matrix)) {
      throwError("A valid matrix (A or B) is required for this operation.", "Matrix Validation");
    }
    targetMatrix = candidate.matrix;
  }

  const { rows: rowsA, cols: colsA } = getDimensions(matrixA);
  const { rows: rowsB, cols: colsB } = getDimensions(matrixB);
  const { rows: targetRows, cols: targetCols } = getDimensions(targetMatrix || []);

  const validators = {
    add: () => {
      if (!isMatrixAValid || !isMatrixBValid) {
        throwError("Both matrices must be valid for addition.", "Matrix Validation");
      }
      if (rowsA !== rowsB || colsA !== colsB) {
        throwError("Matrix dimensions must match for addition.", "Matrix Validation");
      }
    },
    sub: () => {
      if (!isMatrixAValid || !isMatrixBValid) {
        throwError("Both matrices must be valid for subtraction.", "Matrix Validation");
      }
      if (rowsA !== rowsB || colsA !== colsB) {
        throwError("Matrix dimensions must match for subtraction.", "Matrix Validation");
      }
    },
    mul: () => {
      if (!isMatrixAValid || !isMatrixBValid) {
        throwError("Both matrices must be valid for multiplication.", "Matrix Validation");
      }
      if (colsA !== rowsB) {
        throwError("Matrix A's columns must match Matrix B's rows for multiplication.", "Matrix Validation");
      }
    },
    det: () => {
      if (targetRows !== targetCols) {
        throwError("Matrix must be square for determinant.", "Matrix Validation");
      }
    },
    inv: () => {
      if (targetRows !== targetCols) {
        throwError("Matrix must be square for inverse.", "Matrix Validation");
      }
    },
    trans: () => {
      if (targetRows === 0 || targetCols === 0) {
        throwError("Matrix is empty and cannot be transposed.", "Matrix Validation");
      }
    },
    rank: () => {
      if (targetRows === 0 || targetCols === 0) {
        throwError("Matrix is empty and cannot be ranked.", "Matrix Validation");
      }
    },
  };

  if (!validators[opType]) {
    throwError(`Unknown matrix operation type: ${opType}`, "Type Validation");
  }

  validators[opType]();

  return true;
}
