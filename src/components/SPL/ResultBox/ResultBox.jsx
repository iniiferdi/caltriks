'use client';

import React from 'react';
import { XCircle } from 'lucide-react';

const ResultBox = ({ result, inputMatrix }) => {
  if (!result) return null;

  const isError = typeof result === 'string';
  const isMatrix = Array.isArray(result) && Array.isArray(result[0]);

  function formatFraction(value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value?.n !== undefined && value?.d !== undefined) {
      return value.d === 1 ? `${value.n}` : `${value.n} / ${value.d}`;
    }
    return `${value}`;
  }

  function renderMatrix(matrix) {
    return (
      <div className="overflow-x-auto flex justify-center">
        <div className="flex flex-col bg-[#121212] border border-[#1E1E20] rounded-md px-6 py-2">
          {matrix.map((row, rowIndex) => (
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
    );
  }

  return (
    <div className="relative w-full backdrop-blur-[118.2px] rounded-xl p-4 border-2 shadow-inner bg-[rgba(128,120,120,0.03)] text-white border-[#1E1E20]">
      {isError ? (
        <div className="flex items-center gap-2 mb-3 text-red-400">
          <XCircle className="w-5 h-5" />
          <h3 className="text-base font-semibold">Error</h3>
        </div>
      ) : (
        <>
          {inputMatrix && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-1">Input Awal:</h4>
              {renderMatrix(inputMatrix)}
            </div>
          )}
          {isMatrix && (
            <div>
              <h4 className="font-semibold text-sm mb-1">Hasil Eliminasi:</h4>
              {renderMatrix(result)}
            </div>
          )}
        </>
      )}

      {!isMatrix && !isError && (
        <p className="text-sm whitespace-pre-line">{result}</p>
      )}
    </div>
  );
};

export default ResultBox;
