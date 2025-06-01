import { fraction } from "mathjs";

export const isValidMatrix = (matrix) =>
  Array.isArray(matrix) &&
  matrix.length > 0 &&
  matrix.some(
    (row) =>
      Array.isArray(row) &&
      row.some((val) => val !== '' && val !== null && !isNaN(val))
  );

export const getSingleMatrixTarget = (A, B) => {
  if (isValidMatrix(A)) {
    return { matrix: A, label: "A" };
  } else if (isValidMatrix(B)) {
    return { matrix: B, label: "B" };
  } else {
    return { matrix: null, label: null };
  }
};

export const cleanMatrix = (matrix) =>
  matrix.map(row =>
    row.map(cell => {
      if (cell === "" || cell === null) return 0;
      const parsed = typeof cell === "number" ? cell : parseFloat(cell);
      if (isNaN(parsed)) return 0;
      return Number.isInteger(parsed) ? parsed : fraction(parsed);
    })
  );

export const normalizeMatrix = (matrix) => {
  const filteredRows = matrix.filter(row =>
    row.some(cell => cell !== null && cell !== "")
  );

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

export const prepareMatrix = (matrix) => cleanMatrix(normalizeMatrix(matrix));

export const getEffectiveOrder = (matrix) => {
  const rows = matrix.length;
  const cols = Math.max(...matrix.map(row => row.length));
  return { rows, cols };
};
