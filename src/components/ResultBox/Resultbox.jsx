'use client';

import { AnimatePresence, motion } from "framer-motion";
import { MatrixRow } from './MatriksRow';

const opMap = {
    add: '+',
    sub: '-',
    mul: '×'
};

export function ResultBox({ history, onClear }) {
    return (
        <div className="w-full max-w-5xl mt-16 space-y-6">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-white text-lg font-semibold">Result</h2>
                <h3
                    className="text-white text-sm font-medium cursor-pointer hover:underline"
                    onClick={onClear}
                >
                    Clear All
                </h3>
            </div>

            <AnimatePresence>
                {history.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-4 border border-[#1E1E20] shadow-inner"
                    >
                        <p className="text-gray-500">No result yet</p>
                    </motion.div>
                ) : (
                    history.map((entry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-4 border border-[#1E1E20] shadow-inner"
                        >
                            <MatrixRow index={index} entry={entry} />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
}
