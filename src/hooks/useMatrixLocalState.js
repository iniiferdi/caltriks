import { useEffect, useState } from "react";

export function useMatrixLocalState(matrix, matrixId, onChange) {
  const DEFAULT_ROWS = 3;
  const DEFAULT_COLS = 3;

  const initializeMatrix = () =>
    matrix.length > 0
      ? matrix
      : Array.from({ length: DEFAULT_ROWS }, () =>
          Array(DEFAULT_COLS).fill(null)
        );

  const [localMatrix, setLocalMatrix] = useState(initializeMatrix);

  useEffect(() => {
    if (matrix.length > 0) setLocalMatrix(matrix);
  }, [matrix]);

  const handleChange = (rowIdx, colIdx, value) => {
    const newValue = value === "" ? null : isNaN(value) ? value : parseFloat(value);
    const updated = localMatrix.map((row, r) =>
      row.map((cell, c) => (r === rowIdx && c === colIdx ? newValue : cell))
    );
    setLocalMatrix(updated);
    onChange(matrixId, null, null, updated);
  };

  const handleClear = () => {
    const cleared = localMatrix.map(row => row.map(() => null));
    setLocalMatrix(cleared);
    onChange(matrixId, null, null, cleared);
  };

  const handleAdd = () => {
    const rowCount = localMatrix.length;
    const colCount = localMatrix[0]?.length || 0;

    if (rowCount >= 4 || colCount >= 4) return;

    const newMatrix = localMatrix.map(row => [...row, null]);
    newMatrix.push(new Array(colCount + 1).fill(null));

    setLocalMatrix(newMatrix);
    onChange(matrixId, null, null, newMatrix);
  };

  const handleRemove = () => {
    const rowCount = localMatrix.length;
    const colCount = localMatrix[0]?.length || 0;

    if (rowCount <= 2 && colCount <= 2) return;

    const newRowCount = Math.max(2, rowCount - 1);
    const newColCount = Math.max(2, colCount - 1);

    const newMatrix = localMatrix
      .slice(0, newRowCount)
      .map(row => row.slice(0, newColCount));

    setLocalMatrix(newMatrix);
    onChange(matrixId, null, null, newMatrix);
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
