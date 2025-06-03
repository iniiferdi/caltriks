'use client';
import React from 'react';
import EquationInputField from './EquationInputField';

export default function EquationInputRow({ variableCount, rowValues, rowIdx, onInputChange }) {
    return (
        <div className="flex items-center gap-2 justify-between">
            {Array.from({ length: variableCount }).map((_, idx) => (
                <EquationInputField
                    key={idx}
                    index={idx}
                    value={rowValues[idx]}
                    onChange={(val) => onInputChange(rowIdx, idx, val)}
                    isLast={idx === variableCount - 1}
                />
            ))}
            <span className="text-white text-lg font-semibold">=</span>
            <input
                type="text"
                value={rowValues[variableCount]}
                onChange={(e) => onInputChange(rowIdx, variableCount, e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    bg-[#121212] border border-[#1E1E20] w-[70px] h-[38px] rounded-[9px] text-center text-white font-semibold
                    focus:outline-none focus:ring-2 focus:ring-[#3a3a3d] transition-all duration-300 ease-in-out
                    hover:border-[#3a3a3d] hover:shadow-sm focus:shadow-md"
            />
        </div>
    );
}
