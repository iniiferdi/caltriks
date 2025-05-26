'use client';

import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { DotBackgroundDemo } from '@/components/BackgroundDots';
import EquationForm from '@/components/SPL/EquationForm/EquationForm';
import MethodSelector from '@/components/SPL/MethodSelector/MethodSelector';
import ResultBox from '@/components/SPL/ResultBox/ResultBox';

const math = create(all);

export default function SplcPage() {
  const [variableCount, setVariableCount] = useState(3);
  const [inputs, setInputs] = useState(Array.from({ length: 3 }, () => Array(4).fill('')));
  const [selectedLabel, setSelectedLabel] = useState("Solve by Gaussian elimination");
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState('success');

  console.log(result)

  const handleClear = () => {
    setInputs(Array.from({ length: variableCount }, () => Array(variableCount + 1).fill('')));
    setResult(null);
  };

  const handleAdd = () => {
    const newCount = variableCount + 1;
    setVariableCount(newCount);
    setInputs(Array.from({ length: newCount }, () => Array(newCount + 1).fill('')));
    setResult(null);
  };

  const handleRemove = () => {
    if (variableCount <= 1) return;
    const newCount = variableCount - 1;
    setVariableCount(newCount);
    setInputs(Array.from({ length: newCount }, () => Array(newCount + 1).fill('')));
    setResult(null);
  };

  const handleInputChange = (row, col, value) => {
    const updated = [...inputs];
    updated[row][col] = value;
    setInputs(updated);
  };

  const gaussianEliminationFinalResult = (inputMatrix) => {
    const m = inputMatrix.length;
    const matrix = inputMatrix.map(row => row.map(cell => math.parse(cell || '0')));

    for (let i = 0; i < m; i++) {
      const pivot = matrix[i][i];
      matrix[i] = matrix[i].map(cell => math.simplify(`(${cell}) / (${pivot})`));

      for (let j = 0; j < m; j++) {
        if (j !== i) {
          const factor = matrix[j][i];
          matrix[j] = matrix[j].map((cell, k) =>
            math.simplify(`(${cell}) - (${factor}) * (${matrix[i][k]})`)
          );
        }
      }
    }

    return matrix.map(row => row.map(cell => math.simplify(cell).toString()));
  };

  const handleSolve = () => {
    try {
      const augmented = inputs.map(row => row.map(cell => cell || '0'));
      let finalMatrix;

      switch (selectedLabel) {
        case "Solve by Gaussian elimination":
        case "Solve by Gauss–Jordan elimination":
          finalMatrix = gaussianEliminationFinalResult(augmented);
          break;
        default:
          throw new Error("Metode belum didukung.");
      }

      // Simpan dalam format array of array
      setResult(finalMatrix);
      setResultType('success');
    } catch (error) {
      console.error(error);
      setResult(error.message || 'Terjadi kesalahan.');
      setResultType('error');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black py-36 overflow-hidden">
      <DotBackgroundDemo />
      <div className="flex flex-col gap-8 items-center pointer-events-auto w-full max-w-fit px-4 text-white">
        <EquationForm
          variableCount={variableCount}
          inputs={inputs}
          onClear={handleClear}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onInputChange={handleInputChange}
        />
        <MethodSelector
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          onSolve={handleSolve}
        />
        
          <ResultBox result={result} type={resultType} />
    
      </div>
    </div>
  );
}
