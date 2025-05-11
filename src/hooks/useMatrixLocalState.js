import { useEffect, useState } from "react";

export function useMatrixLocalState(matrix, matrixId, onChange) {
  const DEFAULT_ROWS = 3;
  const DEFAULT_COLS = 3;

  const createEmptyMatrix = () =>
    Array.from({ length: DEFAULT_ROWS }, () => Array(DEFAULT_COLS).fill(null));

  const [localMatrix, setLocalMatrix] = useState(() =>
    matrix.length > 0 ? matrix : createEmptyMatrix()
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
    onChange(matrixId, rowIdx, colIdx, value);
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

    const extendedRows = localMatrix.map(row => [...row, null]);
    const newRow = new Array(colCount + 1).fill(null);
    const newMatrix = [...extendedRows, newRow];

    setLocalMatrix(newMatrix);
    onChange(matrixId, null, null, newMatrix);
  };


  const handleRemove = () => {
    const rows = localMatrix.length;
    const cols = localMatrix[0]?.length || 0;

    if (rows <= 2 && cols <= 2) return;

    const newRows = Math.max(2, rows - 1);
    const newCols = Math.max(2, cols - 1);

    const smallerMatrix = localMatrix
      .slice(0, newRows)
      .map(row => row.slice(0, newCols));

    setLocalMatrix(smallerMatrix);
    onChange(matrixId, null, null, smallerMatrix);
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
