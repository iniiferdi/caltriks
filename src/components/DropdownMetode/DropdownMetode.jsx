'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownOption } from "./DropdownOption";

const metodeList = ["Determinan", "Transpose", "Invers"];

export function DropdownMetode() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const handleSelect = (method) => {
        setSelected(method);
        setIsOpen(false);
        console.log(`Metode ${method} dipilih`);
    };

    return (
        <div
            className="relative w-full max-w-xs text-sm"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div
                className="w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] flex justify-between items-center border border-[#1E1E20] text-white font-semibold py-3 px-4 rounded-full text-center cursor-pointer"
            >
                {selected || "Pilih Metode"}


                <div className="">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.31825e-07 1.70803 -4.02177e-07L8.29197 -1.14384e-07C8.97024 -8.47357e-08 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z" fill="white" />
                    </svg>

                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] border border-[#1E1E20] rounded-xl shadow-md z-10"
                    >
                        {metodeList.map((method) => (
                            <DropdownOption key={method} label={method} onSelect={handleSelect} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
