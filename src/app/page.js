'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { normalizeMatrix, performMatrixOperation } from '@/utils/matrixUtils';
import { validateMatrixOperation } from "@/utils/validateMatrixOperation";

import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/MatriksOperations";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
import { ResultBox } from "@/components/ResultBox/Resultbox";

const initialMatricesState = {
  matrixA: [],
  matrixB: [],
};

export default function Home() {
  const [matrices, setMatrices] = useState(initialMatricesState);
  const [resultHistory, setResultHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatrixChange = (matrixId, row, col, valueOrMatrix) => {
    setMatrices(prev => {
      let newMatrix;

      if (Array.isArray(valueOrMatrix)) {
        newMatrix = valueOrMatrix;
      } else {
        const current = prev[matrixId];
        newMatrix = current.map((r, rIdx) =>
          r.map((c, cIdx) =>
            rIdx === row && cIdx === col
              ? (valueOrMatrix === "" ? null : parseFloat(valueOrMatrix))
              : c
          )
        );
      }

      return { ...prev, [matrixId]: newMatrix };
    });
  };

  const handleSwap = () => {
    setMatrices(prev => {
      const swapped = {
        matrixA: prev.matrixB,
        matrixB: prev.matrixA,
      };

      return swapped;
    });
  };

  const updateMatricesAndHistory = (result, matrixA, matrixB, type) => {
    setResultHistory(prev => [{ type, matrixA, matrixB, result }, ...prev]);
  };

  const handleOperation = (type) => {
    setIsLoading(true);
    setErrorMessage(null);
    setErrorType(null);

    setTimeout(() => {
      try {
        const { matrixA: rawMatrixA, matrixB: rawMatrixB } = matrices;

        const matrixA = normalizeMatrix(rawMatrixA);
        const matrixB = normalizeMatrix(rawMatrixB);

        validateMatrixOperation(type, matrixA, matrixB);

        const result = performMatrixOperation(type, matrixA, matrixB);
        updateMatricesAndHistory(result, matrixA, matrixB, type);

      } catch (err) {
        setErrorMessage(err.message);
        setErrorType(err.name);
        setTimeout(() => {
          setErrorMessage(null);
          setErrorType(null);
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const clearHistory = () => {
    setResultHistory([]);
  };

  const resetAll = () => {
    setMatrices(initialMatricesState);
    setResultHistory([]);
    setErrorMessage(null);
  };

  return (
    <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center py-24 bg-black">
     
     
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 text-white text-sm px-4 py-2 rounded-lg shadow-md backdrop-blur-sm"
        >
          <span className="animate-pulse">Processing...</span>
        </motion.div>
      )}
        <DotBackgroundDemo />

      <div className="flex xl:flex-row justify-between items-center w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MatriksPanel
            title="Matrix A"
            matrixId="matrixA"
            matrix={matrices.matrixA}
            setIsLoading={setIsLoading}
            onChange={handleMatrixChange}
            onOperation={handleOperation}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MatriksOperations onSwap={handleSwap} onOperate={handleOperation} onReset={resetAll} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MatriksPanel
            title="Matrix B"
            matrixId="matrixB"
            matrix={matrices.matrixB}
            setIsLoading={setIsLoading}
            onChange={handleMatrixChange}
            onOperation={handleOperation}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="w-full mx-auto relative max-w-5xl p-12 xl:p-0"
      >
        <ResultBox history={resultHistory} onClear={clearHistory} />
      </motion.div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] shadow-lg shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20]  text-white px-6 py-5 rounded-xl  text-sm sm:text-base max-w-md w-full mx-4 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h2 className="font-medium text-lg">
                  {errorType || "Error"}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-300">{errorMessage}</p>

              <motion.div
                className="absolute bottom-0 rounded-full right-0 h-1 bg-red-500 bg-opacity-40"
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
