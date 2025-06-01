import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { explainSarrus } from "./explanations/determinan/explainSarrus";
import { explainCofactor } from "./explanations/determinan/explainCofactor";
import { explainOBE } from "./explanations/determinan/explainOBE";

export function ExplainDet({ entry }) {
    const [openIndex, setOpenIndex] = useState(0);

    const steps = [
        {
            title: "Metode Sarrus",
            content: (
                <>
                    <div className="flex flex-row gap-2 items-center">
                        <p>{entry.label}</p>
                        <span>=</span>
                        <MatrixDisplay matrix={entry.matrix} rows={3} cols={3} />
                    </div>
                    <p className="mt-2 font-semibold">Langkah:</p>
                    {explainSarrus(entry.matrix)}
                </>
            ),
        },
        {
            title: "Metode Kofaktor",
            content: (
                <>
                    <p className="mb-2">Metode kofaktor menghitung determinan dengan minor dan tanda selang-seling.</p>
                    <div className="flex flex-row gap-2 items-center">
                        <p>{entry.label}</p>
                        <span>=</span>
                        <MatrixDisplay matrix={entry.matrix} rows={3} cols={3} />
                    </div>
                    <p className="mt-2 font-semibold">Langkah:</p>
                    {explainCofactor(entry.matrix)}
                </>
            ),
        },
        {
            title: "Metode OBE (Eliminasi Baris)",
            content: (
                <>
                    <p className="mb-2">Dengan OBE, kita ubah matriks ke bentuk segitiga atas dan kalikan elemen diagonalnya.</p>
                    <div className="flex flex-row gap-2 items-center">
                        <p>{entry.label}</p>
                        <span>=</span>
                        <MatrixDisplay matrix={entry.matrix} rows={3} cols={3} />
                    </div>
                    <p className="mt-2 font-semibold">Langkah:</p>
                    {explainOBE(entry.matrix)}
                </>
            ),
        },
    ];

    return (
        <div className="mt-4 bg-[#121212] border p-3 rounded-2xl border-[#1E1E20] text-sm text-gray-200">
            <div className="space-y-3">
                <h1 className="text-base text-white font-semibold mb-2">Explanation</h1>
                <p className="opacity-65">Determinan adalah nilai skalar dari matriks persegi yang memiliki banyak kegunaan, seperti dalam sistem persamaan linear dan transformasi.</p>
                {steps.map((step, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <>
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-fit text-left gap-2 text-white  text-sm flex items-center justify-between"
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
                                <span className=" text-sm">{step.title}</span>

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
                        </>
                    );
                })}
            </div>
        </div>
    );
}
