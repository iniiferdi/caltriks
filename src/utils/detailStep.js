export function gaussJordanSteps(matrixA) {
    const A = cleanMatrix(matrixA);
    const n = A.length;
    const I = A.map((_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    let aug = A.map((row, i) => [...row, ...I[i]]);
    const steps = [];
  
    for (let i = 0; i < n; i++) {
      let pivot = aug[i][i];
  
      if (pivot === 0) {
        let swapRow = i + 1;
        while (swapRow < n && aug[swapRow][i] === 0) swapRow++;
        if (swapRow === n) throw new Error("Matrix tidak dapat diinvers");
        [aug[i], aug[swapRow]] = [aug[swapRow], aug[i]];
        steps.push({ action: `Tukar R${i + 1} ↔ R${swapRow + 1}`, matrix: JSON.parse(JSON.stringify(aug)) });
        pivot = aug[i][i];
      }
  
      for (let j = 0; j < 2 * n; j++) aug[i][j] /= pivot;
      steps.push({ action: `R${i + 1} / ${pivot.toFixed(3)}`, matrix: JSON.parse(JSON.stringify(aug)) });
  
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = aug[k][i];
          for (let j = 0; j < 2 * n; j++) {
            aug[k][j] -= factor * aug[i][j];
          }
          steps.push({ action: `R${k + 1} - (${factor.toFixed(3)}) × R${i + 1}`, matrix: JSON.parse(JSON.stringify(aug)) });
        }
      }
    }
  
    return steps;
  }
  
  export function adjoinInverseSteps(matrixA) {
    const A = matrix(matrixA);
    const detA = det(A);
    if (detA === 0) throw new Error("Determinan 0, tidak dapat dihitung invers dengan adjoin.");
  
    const cofactors = A.map((_, i, j) => {
      const minor = A.subset(math.index(
        math.range(0, i).concat(math.range(i + 1, A.size()[0])),
        math.range(0, j).concat(math.range(j + 1, A.size()[1]))
      ));
      return Math.pow(-1, i + j) * det(minor);
    });
  
    const cofactorMatrix = [];
    for (let i = 0; i < A.size()[0]; i++) {
      cofactorMatrix.push(cofactors.slice(i * A.size()[1], (i + 1) * A.size()[1]));
    }
  
    const adjoint = transpose(cofactorMatrix);
    const inverse = multiply(1 / detA, adjoint);
  
    return {
      determinant: detA,
      cofactorMatrix,
      adjointMatrix: adjoint,
      inverseMatrix: inverse.map(row => row.map(x => format(fraction(x))))
    };
  }