'use client';
import React from 'react';

export default function HeaderBar({ onClear, onAdd, onRemove }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
                <div onClick={onClear} className="w-4 h-4 bg-[#FF5F5A] rounded-full cursor-pointer" />
                <div onClick={onAdd} className="w-4 h-4 bg-[#FFBE2E] rounded-full cursor-pointer" />
                <div onClick={onRemove} className="w-4 h-4 bg-[#2ACA44] rounded-full cursor-pointer" />
            </div>
            <span className="text-white text-lg font-semibold">SplCalc</span>
        </div>
    );
}
