'use client';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DropdownToggle from './DropdownToggle';
import DropdownList from './DropdownList';

const metodeList = [
    "Solve by Gaussian elimination",
    "Solve by Gauss–Jordan elimination",
    "Solve by Cramer's rule",
    "Solve using the inverse matrix",
];

export default function MethodSelector({ selectedLabel, setSelectedLabel, onSolve }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (label) => {
        setSelectedLabel(label);
        setIsOpen(false);
    };

    return (
        <div className="w-full flex gap-3 items-center">
            <div className="relative text-sm w-full">
                <DropdownToggle label={selectedLabel} onClick={() => setIsOpen(!isOpen)} />
                <AnimatePresence>
                    {isOpen && (
                        <DropdownList items={metodeList} onSelect={handleSelect} />
                    )}
                </AnimatePresence>
            </div>
            <button
                onClick={onSolve}
                className="bg-[#3a3a3d] relative hover:bg-[#4a4a4d] transition-all text-white font-semibold py-3 px-6 rounded-full text-sm"
            >
                Solve
            </button>
        </div>
    );
}
