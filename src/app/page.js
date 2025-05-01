'use client';

import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/index";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
import { ResultBox } from "@/components/ResultBox/Resultbox";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { add, subtract, multiply } from 'mathjs';

export default function Home() {
  const [resultHistory, setResultHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [matrices, setMatrices] = useState({
    matrixA: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    matrixB: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  });

  const handleMatrixChange = (matrixId, row, col, valueOrMatrix) => {
    setMatrices(prev => {
      const newMatrix = Array.isArray(valueOrMatrix)
        ? valueOrMatrix
        : prev[matrixId].map((r, rIdx) =>
            r.map((c, cIdx) =>
              rIdx === row && cIdx === col
                ? (valueOrMatrix === "" || isNaN(parseFloat(valueOrMatrix)) ? null : parseFloat(valueOrMatrix))
                : c
            )
          );
      return {
        ...prev,
        [matrixId]: newMatrix,
      };
    });
  };

  const handleSwap = () => {
    setMatrices(prev => ({
      matrixA: prev.matrixB,
      matrixB: prev.matrixA,
    }));
  };

  const normalizeMatrix = (matrix) =>
    matrix.map(row => row.map(cell => (typeof cell === 'number' && !isNaN(cell) ? cell : 0)));

  const performMatrixOperation = (type, matrixA, matrixB) => {
    if (type === 'add') return add(matrixA, matrixB);
    if (type === 'sub') return subtract(matrixA, matrixB);
    if (type === 'mul') return multiply(matrixA, matrixB);
  };

  const updateMatricesAndHistory = (result, matrixA, matrixB, type) => {
    setMatrices(prev => ({
      ...prev,
      resultMatrix: result,
    }));

    setResultHistory(prev => [
      { type, matrixA, matrixB, result },
      ...prev,
    ]);
  };

  const handleOperation = (type) => {
    try {
      const { matrixA: rawMatrixA, matrixB: rawMatrixB } = matrices;

      const matrixA = normalizeMatrix(rawMatrixA);
      const matrixB = normalizeMatrix(rawMatrixB);

      const result = performMatrixOperation(type, matrixA, matrixB);
      updateMatricesAndHistory(result, matrixA, matrixB, type);

      setErrorMessage(null);
    } catch (err) {
      console.error("Invalid matrix operation", err);
      setErrorMessage("Terjadi kesalahan saat melakukan operasi matriks.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="relative flex flex-col min-h-screen justify-center w-full items-center py-24 bg-black ">
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
          <MatriksOperations onSwap={handleSwap} onOperate={handleOperation} />
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
        className="w-full mx-auto relative max-w-5xl"
      >
        <ResultBox history={resultHistory} />
      </motion.div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500 relative text-white px-4 py-2 rounded-md mt-4"
        >
          {errorMessage}
        </motion.div>
      )}
    </div>
  );
}
