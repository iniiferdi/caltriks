'use client'

import { motion } from 'framer-motion';

export function OperationButton({ type, onClick }) {
    return (
        <motion.button
            onClick={() => onClick(type)}
            whileTap={{ scale: 0.9, rotate: -10 }}
            whileHover={{ scale: 1.1, backgroundColor: '#2a2a2a' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-[#121212] cursor-pointer w-9 h-9 rounded-md flex items-center justify-center
                       shadow"
        >
            <img src={`/icons/${type}.svg`} alt={type} />
        </motion.button>
    );
}
