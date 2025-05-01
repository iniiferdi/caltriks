'use client';

import { motion } from "framer-motion";
import { MatrixRow } from './MatriksRow';

export function ResultBox({ history }) {
    return (
        <div className="w-full max-w-5xl mt-16 space-y-8">
            <h2 className="text-white text-lg font-semibold">Result</h2>
            {history.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-4 border border-[#1E1E20] shadow-inner"
                >
                    <p className="text-gray-500">No result yet</p>
                </motion.div>
            ) : (
                history.map((entry, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-4 border border-[#1E1E20] shadow-inner"
                    >
                        <MatrixRow index={index} entry={entry} />
                    </motion.div>
                ))
            )}
        </div>
    );
}
