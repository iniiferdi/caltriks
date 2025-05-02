'use client';

import { useState, useEffect } from "react";

import { HeaderCard } from "./HeaderCard";
import { MatriksInput } from "@/components/MatrixInput/MatriksInput";
import { DropdownMetode } from "@/components/DropdownMetode/DropdownMetode";
import { MatrixImageUploader } from "@/components/MatrixImageUploader/MatrixImageUploader";

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

export function MatriksPanel({ title, matrixId, matrix, onChange, setIsLoading, onOperation }) {
  const [localMatrix, setLocalMatrix] = useState(() =>
    matrix.length > 0
      ? matrix
      : Array.from({ length: DEFAULT_ROWS }, () => Array(DEFAULT_COLS).fill(null))
  );
  
  const [method, setMethod] = useState(""); // Add state for selected method

  const handleChange = (rowIdx, colIdx, value) => {
    const updated = localMatrix.map((row, r) =>
      row.map((cell, c) =>
        r === rowIdx && c === colIdx
          ? (value === "" ? null : parseFloat(value))
          : cell
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

  useEffect(() => {
    if (matrix.length > 0) {
      setLocalMatrix(matrix);
    }
  }, [matrix]);

  return (
    <div className="flex gap-8 flex-col hover-target pointer-events-auto">

      <div className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-[24px] p-5 w-full 
        shadow-lg shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20] 
        transform transition-all duration-300 ease-in-out 
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.35)] hover:border-[#3E3E40]">
        <HeaderCard
          title={title}
          onClear={handleClear}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />

        <MatrixImageUploader
          onMatrixExtracted={(parsedMatrix) => {
            setLocalMatrix(parsedMatrix);
            onChange(matrixId, null, null, parsedMatrix);
          }}
          setIsLoading={setIsLoading}
        />

        <MatriksInput
          matrixId={matrixId}
          matrix={localMatrix}
          onChange={handleChange}
        />
      </div>

      <DropdownMetode
        selected={method} // Pass selected method
        onChange={(selectedMethod) => {
          setMethod(selectedMethod); // Update the state for the selected method
          onOperation(selectedMethod); // Pass to the parent component
        }}
      />

    </div>
  );
}
