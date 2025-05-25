'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DropdownItem from './DropdownItem';

export default function DropdownList({ items, onSelect }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] border-2 border-[#1E1E20] rounded-xl shadow-md z-10"
        >
            {items.map((label, index) => (
                <DropdownItem key={index} label={label} onClick={() => onSelect(label)} />
            ))}
        </motion.div>
    );
}
