import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { explainEchelonSteps } from "./explanations/echelon/explainEchelonSteps";

export function ExplainEchelon({ entry }) {
    const [open, setOpen] = useState(true);
    const rows = entry.matrix.length;
    const cols = entry.matrix[0].length;
    const steps = explainEchelonSteps(entry.matrix);

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">
                    Eselon baris adalah bentuk matriks yang digunakan untuk menyederhanakan sistem persamaan linear. Dalam bentuk ini, setiap baris non-nol memiliki elemen utama (leading one) yang lebih ke kanan dari baris di atasnya, dan semua entri di bawah leading one adalah nol.
                </p>

                <div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-fit text-left gap-2 text-white text-sm flex items-center justify-between"
                    >
                        <motion.svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="transform origin-center"
                        >
                            <path
                                d="M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.31825e-07 1.70803 -4.02177e-07L8.29197 -1.14384e-07C8.97024 -8.47357e-08 9.34076 0.791085 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z"
                                fill="white"
                            />
                        </motion.svg>
                        <span className="text-sm">Transformasi ke Bentuk Eselon Baris</span>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-3 pb-3 pt-2 border-b border-[#1E1E20]"
                            >
                                <div className="flex flex-row gap-2 items-center mb-2">
                                    <p>{entry.label}</p>
                                    <span>=</span>
                                    <MatrixDisplay matrix={entry.matrix} rows={rows} cols={cols} />
                                </div>

                                <p className="mt-2 font-semibold">Langkah-langkah:</p>
                                <div className="space-y-3 mt-2">
                                    {steps.map((step, i) => (
                                        <div key={i} className="space-y-1">
                                            <p className="mb-2">{step.description}</p>
                                            {step.result && step.result.length > 0 && (
                                                <MatrixDisplay matrix={step.result} rows={step.result.length} cols={step.result[0].length} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
