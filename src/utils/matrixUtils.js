import { add, subtract, multiply } from 'mathjs';

export const normalizeMatrix = (matrix) => {
    const filteredRows = matrix.filter(row => row.some(cell => cell !== null));
    const maxCols = Math.max(
      0,
      ...filteredRows.map(row => {
        let i = row.length;
        while (i > 0 && row[i - 1] === null) i--;
        return i;
      })
    );
  
    return filteredRows.map(row => row.slice(0, maxCols));
  };
  
export const performMatrixOperation = (type, matrixA, matrixB) => {
  if (type === 'add') return add(matrixA, matrixB);
  if (type === 'sub') return subtract(matrixA, matrixB);
  if (type === 'mul') return multiply(matrixA, matrixB);
  throw new Error('Unknown operation type');
};
