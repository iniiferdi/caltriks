import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { explainScalarMultiplication } from "./explanations/scalar/explainScalarMultiplication ";

export function ExplainScalar({ entry }) {
    const [isOpen, setIsOpen] = useState(true);
    const rows = entry.matrix.length;
    const cols = entry.matrix[0].length;

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">
                    Perkalian skalar pada matriks berarti mengalikan setiap elemen matriks dengan sebuah bilangan skalar.
                </p>

                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-fit text-left gap-2 text-white text-sm flex items-center justify-between"
                    >
                        <motion.svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="transform origin-center"
                        >
                            <path
                                d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.31825e-07 1.70803 -4.02177e-07L8.29197 -1.14384e-07C8.97024 -8.47357e-08 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z"
                                fill="white"
                            />
                        </motion.svg>
                        <span className="text-sm">Langkah Perkalian Skalar</span>
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                key="scalar-content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-3 pb-3 pt-2 border-b border-[#1E1E20]"
                            >
                                <div className="flex flex-row gap-2 items-center mb-2">
                                    <p>{entry.scalar} ×</p>
                                    <MatrixDisplay matrix={entry.matrix} rows={rows} cols={cols} />
                                </div>
                                <p className="mt-2 font-semibold">Langkah:</p>
                                {explainScalarMultiplication(entry.scalar, entry.matrix)}
                                <div className="mt-2">
                                    <p className="text-sm mb-2">Hasil:</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <span>{entry.label}</span>
                                        <span>=</span>
                                        <MatrixDisplay matrix={entry.result} rows={rows} cols={cols} />
                                    </div>
                                    
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
