'use client';

import { DotBackgroundDemo } from '@/components/BackgroundDots';
import React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const metodeList = [
    "Solve by Gaussian elimination",
    "Solve by Gauss–Jordan elimination",
    "Solve by Cramer's rule",
    "Solve using the inverse matrix",
];

export default function SplcPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(metodeList[0]);

    const onSelect = (label) => {
        setSelectedLabel(label);
        setIsOpen(false);
    };
    const inputStyle =
        "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
        "bg-[#121212] border border-[#1E1E20] w-[70px] h-[38px] rounded-[9px] text-center text-white font-semibold " +
        "focus:outline-none focus:ring-2 focus:ring-[#3a3a3d] transition-all duration-300 ease-in-out " +
        "hover:border-[#3a3a3d] hover:shadow-sm focus:shadow-md";

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-black py-36 overflow-hidden">
            <DotBackgroundDemo />

            <div className="flex flex-col gap-8 items-center pointer-events-auto w-full max-w-fit px-4 text-white">
                <div className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[100px] rounded-3xl p-6 w-full 
                    shadow-lg shadow-black/25 border-2 border-[#1E1E20] 
                    transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/35 hover:border-[#3E3E40]">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-[#FF5F5A] rounded-full" />
                            <div className="w-4 h-4 bg-[#FFBE2E] rounded-full" />
                            <div className="w-4 h-4 bg-[#2ACA44] rounded-full" />
                        </div>
                        <span className="text-white text-lg font-semibold">SplCalc</span>
                    </div>

                    {/* System of Equations */}
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 4 }).map((_, rowIdx) => (
                            <div key={rowIdx} className="flex items-center gap-2">
                                {Array.from({ length: 4 }).map((_, colIdx) => (
                                    <div className="flex items-center gap-2" key={colIdx}>
                                        <input type="text" className={inputStyle} />
                                        <span className="text-white font-medium">
                                            x<sub>{colIdx + 1}</sub>{colIdx < 3 ? ' + ' : ''}
                                        </span>

                                    </div>
                                ))}
                                <span className="text-white text-lg font-semibold">=</span>
                                <input type="text" className={inputStyle} />
                            </div>
                        ))}
                    </div>


                </div>

                <div className="relative  text-sm w-full">
                    <div
                        className="w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] flex justify-between items-center border-2 border-[#1E1E20] text-white font-semibold py-3 px-4 rounded-full text-center cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedLabel}
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 0 1.70803 0H8.29197C8.97024 0 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z" fill="white" />
                        </svg>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute mt-2 w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] border-2 border-[#1E1E20] rounded-xl shadow-md z-10"
                            >
                                {metodeList.map((label, index) => (
                                    <div
                                        key={index}
                                        onClick={() => onSelect(label)}
                                        className="flex items-center px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors"
                                    >
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
