'use client';

import { AnimatePresence, motion } from "framer-motion";
import { ResultCard } from "./ResultCard";

export function ResultBox({ history, onClear }) {
    return (
        <div className="w-full max-w-5xl mt-16 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-white text-lg font-semibold">Result</h2>
                <button
                    className="text-white text-sm font-medium cursor-pointer hover:underline"
                    onClick={onClear}
                >
                    Clear All
                </button>
            </div>

            <div className="max-h-[600px] overflow-y-auto space-y-6 pr-1">
                <AnimatePresence>
                    {history.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-6 border border-[#1E1E20] shadow-inner text-center"
                        >
                            <p className="text-gray-400 text-sm">No matrix operations have been performed yet.</p>
                            <p className="text-gray-500 text-xs mt-1">Try adding operations such as addition, transpose, determinant, or inverse.</p>
                        </motion.div>
                    ) : (
                        history.map((entry, index) => (
                            <ResultCard key={index} entry={entry} index={index} />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
