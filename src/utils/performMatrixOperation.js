import {
  add,
  subtract,
  multiply,
  det,
  transpose,
  inv,
  fraction,
} from 'mathjs';
import rref from 'rref';

import { validateMatrixOperation } from './validateMatrixOperation';
import {
  prepareMatrix,
  isValidMatrix,
} from './matrixUtils';
import { getCofactorMatrix, refFraction } from './LogicMatriks';

const convertToFractionMatrix = (matrix) => {
  return matrix.map(row =>
    row.map(cell => {
      const frac = fraction(cell);
      return frac.d === 1 ? frac.n : frac.toFraction(true);
    })
  );
};

const binaryOperations = ['add', 'sub', 'mul'];

export const performMatrixOperation = (
  type,
  matrixA = [],
  matrixB = [],
  scalarValue = null,
) => {
  validateMatrixOperation(type, matrixA, matrixB);

  const A = prepareMatrix(matrixA);
  const B = matrixB ? prepareMatrix(matrixB) : null;

  const targetMatrix = !binaryOperations.includes(type)
    ? [A, B].find(isValidMatrix) || null
    : null;

  switch (type) {
    case 'add':
      return convertToFractionMatrix(add(A, B));
    case 'sub':
      return convertToFractionMatrix(subtract(A, B));
    case 'mul':
      return convertToFractionMatrix(multiply(A, B));
    case 'det':
      return Number(det(targetMatrix).toFixed(4));
    case 'trans':
      return convertToFractionMatrix(transpose(targetMatrix));
    case 'inv':
      return convertToFractionMatrix(inv(targetMatrix));
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
      return convertToFractionMatrix(
        targetMatrix.map(row =>
          row.map(cell => (cell ?? 0) * scalarValue)
        )
      );
    case 'cofactor':
      return convertToFractionMatrix(getCofactorMatrix(targetMatrix));
    case 'echelon':
      try {
        const refMatrix = refFraction(targetMatrix);
        return convertToFractionMatrix(refMatrix);
      } catch {
        throw new Error('Failed to compute row echelon form. Invalid matrix.');
      }
    default:
      throw new Error('Unknown operation type.');
  }
};
