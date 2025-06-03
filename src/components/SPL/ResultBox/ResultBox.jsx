'use client';
import React from 'react';
import MatrixDisplay from './MatrixDisplay';

export default function ResultBox({ result, inputMatrix, label }) {
  return (
    <div className="relative w-full backdrop-blur-[118.2px] rounded-xl p-4 border-2 flex flex-col items-start gap-2 shadow-inner bg-[rgba(128,120,120,0.03)] text-white border-[#1E1E20]">
      {label && <div className="text-sm text-gray-400 font-medium mb-2">{label}</div>}
      <div className="flex items-center gap-2 justify-center">
        {inputMatrix && <MatrixDisplay matrix={inputMatrix} />}
        {inputMatrix && <span className="text-white font-bold text-lg">=</span>}
        <MatrixDisplay matrix={result} />
      </div>
    </div>
  );
}
