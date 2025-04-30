import { motion, AnimatePresence } from 'framer-motion';
import { InputField } from './InputField';

export function MatriksInput({ matrix, onChange, matrixId }) {
    return (
        <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(70px, 1fr))` }}
        >
            <AnimatePresence>
                {matrix.map((row, rowIdx) =>
                    row.map((value, colIdx) => (
                        <motion.div
                            key={`${matrixId}-${rowIdx}-${colIdx}`}
                            initial={{ opacity: 0, scale: 0.9 }} // Menggunakan scale untuk animasi yang lebih halus
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }} // Sedikit lebih kecil saat keluar
                            layout // Membantu transisi posisi elemen
                            transition={{
                                duration: 0.4, // Lebih lama untuk kelancaran
                                ease: "easeInOut", // Easing lebih halus
                            }}
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
