import {motion } from "framer-motion";
import { MatrixRow } from './MatriksRow';

export function ResultCard({ entry, index }) {
    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-[rgba(128,120,120,0.03)] w-full backdrop-blur-[118.2px] rounded-xl p-4 border border-[#1E1E20] shadow-inner"
        >
            <MatrixRow index={index} entry={entry} />
        </motion.div>
    );
}