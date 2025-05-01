'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/MatriksOperations";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
import { ResultBox } from "@/components/ResultBox/Resultbox";
import { normalizeMatrix, performMatrixOperation } from '@/utils/matrixUtils';
import { validateMatrixOperation } from "@/utils/validateMatrixOperation";

const initialMatricesState = {
  matrixA: [],
  matrixB: [],
};

export default function Home() {
  const [matrices, setMatrices] = useState(initialMatricesState);
  const [resultHistory, setResultHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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
    console.log("Swapping matrices...");
  
    setMatrices(prev => {
      console.log("Before swap:", prev);
      const swapped = {
        matrixA: prev.matrixB,
        matrixB: prev.matrixA,
      };
      console.log("After swap:", swapped);
      return swapped;
    });
  };
  


  const updateMatricesAndHistory = (result, matrixA, matrixB, type) => {
    setResultHistory(prev => [{ type, matrixA, matrixB, result }, ...prev]);
  };

  const handleOperation = (type) => {
    try {
      const { matrixA: rawMatrixA, matrixB: rawMatrixB } = matrices;
  
      const matrixA = normalizeMatrix(rawMatrixA); // lakukan trimming di sini
      const matrixB = normalizeMatrix(rawMatrixB);
  
      validateMatrixOperation(type, matrixA, matrixB);
  
      const result = performMatrixOperation(type, matrixA, matrixB);
      updateMatricesAndHistory(result, matrixA, matrixB, type);
  
      setErrorMessage(null);
    } catch (err) {
      console.error("Invalid matrix operation", err);
      setErrorMessage(err.message);
    }
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
    <div className="relative flex flex-col min-h-screen justify-center w-full items-center py-24 bg-black">
      <DotBackgroundDemo />

      <div className="flex xl:flex-row justify-between items-center w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MatriksPanel
            title="Matriks A"
            matrixId="matrixA"
            matrix={matrices.matrixA}
            onChange={handleMatrixChange}
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
            title="Matriks B"
            matrixId="matrixB"
            matrix={matrices.matrixB}
            onChange={handleMatrixChange}
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

      {errorMessage && (
        <div className="absolute bottom-8 text-white bg-red-500 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
