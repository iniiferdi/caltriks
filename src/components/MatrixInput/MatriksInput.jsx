import { motion, AnimatePresence } from 'framer-motion';
import { InputField } from './InputField';

export function MatriksInput({ matrix, onChange, matrixId}) {
    const columnCount = matrix?.[0]?.length || 1;

    return (
        <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(70px, 1fr))` }}
        >
            <AnimatePresence>
                {matrix.map((row, rowIdx) =>
                    row.map((value, colIdx) => (
                        <motion.div
                            key={`${matrixId}-${rowIdx}-${colIdx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            layout
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <InputField
                                value={value}
                                onChange={(e) => onChange(rowIdx, colIdx, e.target.value)}
                            />
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
}
