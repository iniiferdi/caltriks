import { useEffect, useState } from "react";

export function useMatrixLocalState(matrix, matrixId, onChange) {
  const DEFAULT_ROWS = 3;
  const DEFAULT_COLS = 3;

  const [localMatrix, setLocalMatrix] = useState(() =>
    matrix.length > 0
      ? matrix
      : Array.from({ length: DEFAULT_ROWS }, () => Array(DEFAULT_COLS).fill(null))
  );

  useEffect(() => {
    if (matrix.length > 0) setLocalMatrix(matrix);
  }, [matrix]);

  const handleChange = (rowIdx, colIdx, value) => {
    const updated = localMatrix.map((row, r) =>
      row.map((cell, c) =>
        r === rowIdx && c === colIdx ? (value === "" ? null : parseFloat(value)) : cell
      )
    );
    setLocalMatrix(updated);
    onChange(matrixId, null, null, updated);
  };

  const handleClear = () => {
    const cleared = localMatrix.map(row => row.map(() => null));
    setLocalMatrix(cleared);
    onChange(matrixId, null, null, []);
  };

  const handleAdd = () => {
    const newMatrix = [...localMatrix.map(row => [...row, null])];
    newMatrix.push(new Array(newMatrix[0].length).fill(null));
    setLocalMatrix(newMatrix);
  };

  const handleRemove = () => {
    if (localMatrix.length <= 1 || localMatrix[0].length <= 1) return;
    const smallerMatrix = localMatrix
      .slice(0, localMatrix.length - 1)
      .map(row => row.slice(0, row.length - 1));
    setLocalMatrix(smallerMatrix);
  };

  return {
    localMatrix,
    setLocalMatrix,
    handleChange,
    handleClear,
    handleAdd,
    handleRemove,
  };
}
