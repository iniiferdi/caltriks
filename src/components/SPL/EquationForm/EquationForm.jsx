'use client';
import React from 'react';
import EquationInputRow from '../EquationInputRow/EquationInputRow';
import HeaderBar from '../HeaderBar/HeaderBar';

export default function EquationForm({ variableCount, inputs, onClear, onAdd, onRemove, onInputChange }) {
    return (
        <div className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[100px] rounded-3xl p-6 w-full 
            shadow-lg shadow-black/25 border-2 border-[#1E1E20] 
            transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/35 hover:border-[#3E3E40]">
            <HeaderBar onClear={onClear} onAdd={onAdd} onRemove={onRemove} />
            <div className="flex flex-col gap-4">
                {inputs.map((row, rowIdx) => (
                    <EquationInputRow
                        key={rowIdx}
                        variableCount={variableCount}
                        rowValues={row}
                        rowIdx={rowIdx}
                        onInputChange={onInputChange}
                    />
                ))}
            </div>
        </div>
    );
}
