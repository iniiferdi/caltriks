'use client';
import {React, useCallback } from 'react';
import DropdownList from './DropdownList';

export default function MethodSelector({ selectedLabel, setSelectedLabel, onSolve }) {
  const metodeList = [
    "Solve by Gaussian elimination",
    "Solve by Gauss–Jordan elimination",
    "Solve by Cramer's rule",
  ];

  const handleSelect = useCallback(
    (label) => {
      setSelectedLabel(label);
    },
    [setSelectedLabel]
  );

  return (
    <div className="w-full flex gap-3 items-center">
      <DropdownList items={metodeList} selected={selectedLabel} onSelect={handleSelect} />
      <button
        onClick={onSolve}
        className="bg-[#3a3a3d] relative hover:bg-[#4a4a4d] transition-all text-white font-semibold py-3 px-6 rounded-full text-sm"
      >
        Solve
      </button>
    </div>
  );
}
