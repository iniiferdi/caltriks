import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { Fraction } from "fraction.js";

export function ExplainMul({ entry }) {
    const [isOpen, setIsOpen] = useState(true);

    if (!entry?.matrixA || !entry?.matrixB || !entry?.result) {
        return <div className="text-red-500 text-sm">Data matriks tidak lengkap.</div>;
    }

    const rowsA = entry.matrixA.length;
    const colsA = entry.matrixA[0].length;
    const colsB = entry.matrixB[0].length;

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">
                    Perkalian matriks dilakukan dengan menjumlahkan hasil kali elemen-elemen baris dari matriks pertama dengan elemen-elemen kolom dari matriks kedua.
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
                        <span className="text-sm">Langkah Perkalian</span>
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                key="mul-content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-3 pb-3 pt-2 border-b border-[#1E1E20]"
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="font-medium">A =</p>
                                        <MatrixDisplay matrix={entry.matrixA} rows={rowsA} cols={colsA} />
                                    </div>
                                    <span className="font-medium">×</span>
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="font-medium">B =</p>
                                        <MatrixDisplay matrix={entry.matrixB} rows={colsA} cols={colsB} />
                                    </div>
                                </div>

                                <p className="mt-2 font-semibold">Langkah:</p>
                                <div className="space-y-2 mt-2">
                                    {entry.result.map((row, i) => (
                                        <div key={i} className="flex flex-row gap-3">
                                            {row.map((_, j) => {
                                                let sum = new Fraction(0);
                                                const steps = [];

                                                for (let k = 0; k < colsA; k++) {
                                                    const a = new Fraction(entry.matrixA[i][k]);
                                                    const b = new Fraction(entry.matrixB[k][j]);
                                                    const prod = a.mul(b);
                                                    sum = sum.add(prod);
                                                    steps.push(`(${a.toFraction(true)}×${b.toFraction(true)})`);
                                                }

                                                return (
                                                    <div key={j} className="flex gap-2 items-center">
                                                        <span>{steps.join(" + ")} =</span>
                                                        <span className="font-semibold">{sum.toFraction(true)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm mb-2">Hasil:</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <span>A × B</span>
                                        <span>=</span>
                                        <MatrixDisplay matrix={entry.result} rows={rowsA} cols={colsB} />
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
