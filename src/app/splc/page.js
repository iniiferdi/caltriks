'use client';

import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { DotBackgroundDemo } from '@/components/BackgroundDots';
import EquationForm from '@/components/SPL/EquationForm/EquationForm';
import MethodSelector from '@/components/SPL/MethodSelector/MethodSelector';

const math = create(all);

export default function SplcPage() {
    const [variableCount, setVariableCount] = useState(3);
   
    const [inputs, setInputs] = useState(
        Array.from({ length: 3 }, () => Array(4).fill(''))
    );
     console.log(inputs)
    const [selectedLabel, setSelectedLabel] = useState("Solve by Gaussian elimination");

    const handleClear = () => {
        setInputs(Array.from({ length: variableCount }, () => Array(variableCount + 1).fill('')));
    };

    const handleAdd = () => {
        const newCount = variableCount + 1;
        setVariableCount(newCount);
        setInputs(Array.from({ length: newCount }, () => Array(newCount + 1).fill('')));
    };

    const handleRemove = () => {
        if (variableCount <= 1) return;
        const newCount = variableCount - 1;
        setVariableCount(newCount);
        setInputs(Array.from({ length: newCount }, () => Array(newCount + 1).fill('')));
    };

    const handleInputChange = (row, col, value) => {
        const updated = [...inputs];
        updated[row][col] = value;
        setInputs(updated);
    };

    const handleSolve = () => {
        try {
            const A = inputs.map(row => row.slice(0, variableCount).map(val => parseFloat(val)));
            const b = inputs.map(row => parseFloat(row[variableCount]));

            const matrixA = math.matrix(A);
            const vectorB = math.matrix(b);

            const solution = math.lusolve(matrixA, vectorB);
            alert(`Solution: ${solution.map(s => s[0]).join(', ')}`);
        } catch (error) {
            alert('Invalid matrix or unsolvable system');
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
            </div>
        </div>
    );
}
