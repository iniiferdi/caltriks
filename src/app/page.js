'use client';

import { useState, useEffect } from "react";
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

  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Splash screen hilang setelah 2 detik
    }, 2000);

    // Delay elemen konten muncul setelah splash screen hilang
    setTimeout(() => {
      setShowContent(true);
    }, 2200); // Mulai menampilkan konten setelah splash screen hilang (dengan delay 200ms)

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center py-24 bg-black">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
            }}
            className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 1.5, ease: "easeOut" },
              }}
              exit={{ opacity: 0, y: -30 }}
              className="text-5xl font-extrabold tracking-wider"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
                }}
              >
                C
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.6, duration: 1, ease: "easeInOut" },
                }}
              >
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.7, duration: 1, ease: "easeInOut" },
                }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.8, duration: 1, ease: "easeInOut" },
                }}
              >
                t
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.9, duration: 1, ease: "easeInOut" },
                }}
              >
                r
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1, duration: 1, ease: "easeInOut" },
                }}
              >
                i
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.1, duration: 1, ease: "easeInOut" },
                }}
              >
                k
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.2, duration: 1, ease: "easeInOut" },
                }}
              >
                s
              </motion.span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>




      {/* Processing indicator */}
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

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
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
        )}
      </AnimatePresence>

      {/* Result Box */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="w-full mx-auto relative max-w-5xl p-12 xl:p-0"
          >
            <ResultBox history={resultHistory} onClear={clearHistory} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-sm bg-[#121212] shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20] text-white rounded-lg shadow-lg p-3"
          >
            <div className="flex items-start justify-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div className="flex flex-row gap-1">
                <h2 className="font-semibold text-sm text-white">{errorType || "Error"}:</h2>
                <p className="text-sm text-gray-300">{errorMessage}</p>
              </div>
            </div>

            <motion.div
              className="h-[3px] bg-white rounded-full mt-2"
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );


}
