import {
  add,
  subtract,
  multiply,
  det,
  transpose,
  inv,
  fraction,
  format,
} from 'mathjs';
import rref from 'rref';
import { validateMatrixOperation } from './validateMatrixOperation';
import {
  prepareMatrix,
  isValidMatrix,
} from './matrixUtils';
import {getCofactorMatrix} from './LogicMatriks'

const binaryOperations = ['add', 'sub', 'mul'];

export const performMatrixOperation = (
  type,
  matrixA = [],
  matrixB = [],
  scalarValue = null
) => {
  validateMatrixOperation(type, matrixA, matrixB);

  const A = prepareMatrix(matrixA);
  const B = matrixB ? prepareMatrix(matrixB) : null;

  const targetMatrix = !binaryOperations.includes(type)
    ? [A, B].find(isValidMatrix) || null
    : null;

  switch (type) {
    case 'add':
      return add(A, B);
    case 'sub':
      return subtract(A, B);
    case 'mul':
      return multiply(A, B);
    case 'det':
      return Number(det(targetMatrix).toFixed(4));
    case 'trans':
      return transpose(targetMatrix);
    case 'inv':
      try {
        const result = inv(targetMatrix);
        return result.map(row => row.map(x => format(fraction(x))));
      } catch {
        throw new Error('Matrix not invertible. Must be square with det ≠ 0.');
      }
    case 'rank':
      try {
        const reduced = rref(targetMatrix);
        return reduced.filter(row => row.some(cell => Math.abs(cell) > 1e-10)).length;
      } catch {
        throw new Error('Failed to compute rank. Invalid matrix.');
      }
    case 'scalar':
      if (scalarValue == null || isNaN(scalarValue)) {
        throw new Error('Nilai skalar tidak valid.');
      }
      return targetMatrix.map(row =>
        row.map(cell => (cell ?? 0) * scalarValue)
      );
    case 'cofactor':
      return getCofactorMatrix(targetMatrix);

    default:
      throw new Error('Unknown operation type.');
  }
};

