'use client';

import React from 'react';
import { XCircle } from 'lucide-react';
import { EmptyResult } from './EmptyResult';

const ResultBox = ({ result, inputMatrix, label }) => {
  // Cek apakah result kosong (matrix kosong atau undefined/null)
  const isEmptyMatrix =
    !result ||
    (Array.isArray(result) && (result.length === 0 || (result.length === 1 && result[0].length === 0)));

  const isError = typeof result === 'string';
  const isMatrix = Array.isArray(result) && Array.isArray(result[0]);

  const formatFraction = (value) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && 'n' in value && 'd' in value) {
      return value.d === 1 ? `${value.n}` : `${value.n} / ${value.d}`;
    }
    return String(value);
  };

  const renderMatrix = (matrix) => (
    <div className="flex flex-col bg-[#121212] border border-[#1E1E20] rounded-md px-6 py-2">
      {matrix.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-[50px] text-center font-semibold ${
                j === row.length - 2 ? 'border-r-2 border-white pr-2 mr-2' : ''
              }`}
            >
              {formatFraction(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  let content;
  if (isEmptyMatrix) {
    content = <EmptyResult />;
  } else if (isError) {
    content = (
      <div className="flex items-center gap-2 mb-3 text-red-400">
        <XCircle className="w-5 h-5" />
        <h3 className="text-base font-semibold">Error</h3>
      </div>
    );
  } else if (isMatrix && inputMatrix) {
    content = (
      <div className="flex items-center gap-4 justify-center">
        {renderMatrix(inputMatrix)}
        <span className="text-white font-bold text-lg">=</span>
        {renderMatrix(result)}
      </div>
    );
  } else if (isMatrix) {
    content = (
      <>
        <h4 className="font-semibold text-sm mb-2">Hasil Matriks:</h4>
        {renderMatrix(result)}
      </>
    );
  } else {
    content = <p className="text-sm whitespace-pre-line">{result}</p>;
  }

  return (
    <div className="relative w-full backdrop-blur-[118.2px] rounded-xl p-4 border-2 shadow-inner bg-[rgba(128,120,120,0.03)] text-white border-[#1E1E20]">
      {label && <div className="text-sm text-gray-400 font-medium mb-2">{label}</div>}
      {content}
    </div>
  );
};

export default ResultBox;
