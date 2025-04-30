'use client';

import { useState } from "react";
import { HeaderCard } from "./HeaderCard";
import { MatriksInput } from "../MatrixInput/MatriksInput";
import { DropdownMetode } from "../DropdownMetode/DropdownMetode";

export function MatriksPanel({ title, matrixId }) {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const handleClear = () => {
    const cleared = matrix.map(row => row.map(() => 0));
    setMatrix(cleared);
  };

  const handleAdd = () => {
    const newMatrix = [...matrix.map(row => [...row, 0])]; // tambah kolom
    newMatrix.push(new Array(newMatrix[0].length).fill(0)); // tambah baris
    setMatrix(newMatrix);
  };

  const handleRemove = () => {
    if (matrix.length <= 1 || matrix[0].length <= 1) return;
    const smallerMatrix = matrix
      .slice(0, matrix.length - 1)
      .map(row => row.slice(0, row.length - 1));
    setMatrix(smallerMatrix);
  };

  const handleChange = (rowIdx, colIdx, value) => {
    const updated = [...matrix];
    updated[rowIdx][colIdx] = parseFloat(value) || 0;
    setMatrix(updated);
  };

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

        <MatriksInput
          matrixId={matrixId}
          matrix={matrix}
          onChange={handleChange}
        />
      </div>

      <DropdownMetode />
    </div>
  );
}
