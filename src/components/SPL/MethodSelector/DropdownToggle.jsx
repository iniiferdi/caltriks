'use client';
import React from 'react';

export default function DropdownToggle({ label, onClick }) {
    return (
        <div
            className="w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] flex justify-between items-center border-2 border-[#1E1E20] text-white font-semibold py-3 px-4 rounded-full cursor-pointer"
            onClick={onClick}
        >
            {label}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 0 1.70803 0H8.29197C8.97024 0 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z" fill="white" />
            </svg>
        </div>
    );
}
