'use client';
import React from 'react';

export default function EquationInputField({ index, value, onChange, isLast }) {
    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                    bg-[#121212] border border-[#1E1E20] w-[70px] h-[38px] rounded-[9px] text-center text-white font-semibold 
                    focus:outline-none focus:ring-2 focus:ring-[#3a3a3d] transition-all duration-300 ease-in-out 
                    hover:border-[#3a3a3d] hover:shadow-sm focus:shadow-md"
            />
            <span className="text-white font-medium">
                x<sub>{index + 1}</sub>{!isLast ? ' + ' : ''}
            </span>
        </div>
    );
}
