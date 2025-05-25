'use client';
import React from 'react';

export default function DropdownItem({ label, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer transition-colors"
        >
            <span>{label}</span>
        </div>
    );
}
