'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';

export function SwapButton({ onClick }) {
    const [isSwapped, setIsSwapped] = useState(false);

    // Fungsi untuk menangani klik dan kontrol animasi
    const handleClick = () => {
        setIsSwapped(prev => !prev); // Toggle state untuk animasi
        onClick('swap');
    };

    return (
        <motion.button
            whileTap={{ scale: 0.85, rotate: -15 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleClick}
            className="bg-[#303995] hover-target cursor-pointer pointer-events-auto w-full h-11 rounded-lg flex items-center justify-center
                       shadow-md hover:shadow-lg"
        >
            {/* Animasi rotasi berdasarkan state isSwapped */}
            <motion.img
                src="/icons/swap.svg"
                alt="swap"
                initial={{ rotate: 0 }}
                animate={{ rotate: isSwapped ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />
        </motion.button>
    );
}
