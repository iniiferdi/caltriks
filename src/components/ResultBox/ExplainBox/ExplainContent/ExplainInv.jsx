import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { explainAdjugate } from "./explanations/invers/explainAdjugate";
import { explainGaussJordan } from "./explanations/invers/explainGaussJordan";

export function ExplainInv({ entry }) {
    const [openIndex, setOpenIndex] = useState(0);
    const rows = entry.matrix.length;
    const cols = entry.matrix[0].length;

    const steps = [
        {
            title: "Metode Eliminasi Gauss-Jordan",
            content: (
                <>
                    <p className="mb-2">Mengubah matriks menjadi identitas dengan operasi baris elementer, sambil menerapkan perubahan pada matriks identitas untuk mendapatkan inversnya.</p>
                    <div className="flex flex-row gap-2 items-center">
                        <p>{entry.label}</p>
                        <span>=</span>
                        <MatrixDisplay matrix={entry.matrix} rows={rows} cols={cols} />
                    </div>
                    <p className="mt-2 font-semibold">Langkah:</p>
                    {explainGaussJordan(entry.matrix)}
                </>
            ),
        },
        {
            title: "Metode Adjungat",
            content: (
                <>
                    <p className="mb-2">Menggunakan adjoin (transpose dari kofaktor) dan determinan untuk menghitung invers: <code>A⁻¹ = 1/det(A) × adj(A)</code></p>
                    <div className="flex flex-row gap-2 items-center">
                        <p>{entry.label}</p>
                        <span>=</span>
                        <MatrixDisplay matrix={entry.matrix} rows={rows} cols={cols} />
                    </div>
                    <p className="mt-2 font-semibold">Langkah:</p>

                    {explainAdjugate(entry.matrix)}
                </>
            ),
        },
    ];

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">
                    Invers matriks adalah matriks yang jika dikalikan dengan matriks asal menghasilkan matriks identitas.
                    Tidak semua matriks memiliki invers—hanya matriks persegi dengan determinan ≠ 0.
                </p>

                {steps.map((step, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={index}>
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
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
                                <span className="text-sm">{step.title}</span>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-3 pb-3 pt-2 border-b border-[#1E1E20]"
                                    >
                                        {step.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
