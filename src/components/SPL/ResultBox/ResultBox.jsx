'use client';

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ResultBox = ({ result, type = 'success' }) => {
  if (!result) return null;

  const isError = type === 'error';
  const isMatrix = Array.isArray(result) && Array.isArray(result[0]);

  function formatFraction(value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value?.n !== undefined && value?.d !== undefined) {
      return value.d === 1 ? `${value.n}` : `${value.n} / ${value.d}`;
    }
    return `${value}`;
  }

  return (
    <div
      className={`relative w-full backdrop-blur-[118.2px] rounded-xl p-4 border-2 shadow-inner ${
        isError
          ? 'bg-[rgba(255,0,0,0.05)] text-red-400 border-red-600'
          : 'bg-[rgba(128,120,120,0.03)] text-white border-[#1E1E20]'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {isError ? (
          <XCircle className="w-5 h-5 text-red-400" />
        ) : (
          <CheckCircle className="w-5 h-5 text-green-400" />
        )}
        <h3 className="text-base font-semibold">
          {isError ? 'Error' : 'Hasil Akhir'}
        </h3>
      </div>

      {isMatrix ? (
        <div className="overflow-x-auto flex justify-center">
          <div className="relative inline-block">
            {/* Bracket kiri */}
            <div className="absolute top-0 bottom-0 left-0 w-2 border-l-4 border-white rounded-tl-[4px] rounded-bl-[4px]" />
            
            {/* Bracket kanan */}
            <div className="absolute top-0 bottom-0 right-0 w-2 border-r-4 border-white rounded-tr-[4px] rounded-br-[4px]" />
            
            <div className="flex flex-col bg-[#121212] border border-[#1E1E20] rounded-md px-6 py-2">
              {result.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-[50px] text-center font-semibold ${
                        colIndex === row.length - 2
                          ? 'border-r-2 border-white pr-2 mr-2'
                          : ''
                      }`}
                    >
                      {formatFraction(cell)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm whitespace-pre-line">{result}</p>
      )}
    </div>
  );
};

export default ResultBox;
