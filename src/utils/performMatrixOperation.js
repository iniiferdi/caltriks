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
  
  const binaryOperations = ['add', 'sub', 'mul'];
  
  export const performMatrixOperation = (type, matrixA = [], matrixB = []) => {
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
          throw new Error('Matriks tidak dapat diinvers. Pastikan matriks berbentuk persegi dan determinannya ≠ 0.');
        }
      case 'rank':
        try {
          const reduced = rref(targetMatrix);
          return reduced.filter(row => row.some(cell => Math.abs(cell) > 1e-10)).length;
        } catch {
          throw new Error('Gagal menghitung rank. Pastikan matriks valid.');
        }
      default:
        throw new Error('Tipe operasi tidak dikenali.');
    }
  };
  