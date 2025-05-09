'use client';

import { useState } from "react";
import { useMatrixLocalState } from "@/hooks/useMatrixLocalState";

import { HeaderCard } from "./HeaderCard";
import { MatriksInput } from "@/components/MatrixInput/MatriksInput";
import { DropdownMetode } from "@/components/DropdownMetode/DropdownMetode";
import { MatrixImageUploader } from "@/components/MatrixImageUploader/MatrixImageUploader";

export function MatriksPanel({ title, matrixId, matrix, onChange, setIsLoading, onOperation }) {
  const [method, setMethod] = useState("");

  const {
    localMatrix,
    setLocalMatrix,
    handleChange,
    handleClear,
    handleAdd,
    handleRemove,
  } = useMatrixLocalState(matrix, matrixId, onChange);

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
        selected={method}
        onChange={(selectedMethod) => {
          setMethod(selectedMethod);
          onOperation(matrixId, selectedMethod); // ✅ Kirim ID dan jenis operasi
        }}
      />




    </div>
  );
}
