import { useState } from "react";
import { normalizeMatrix, performMatrixOperation } from '@/utils/matrixUtils';
import { validateMatrixOperation } from "@/utils/validateMatrixOperation";

const initialMatricesState = {
  matrixA: [],
  matrixB: [],
};

export function useMatrixState() {
  const [matrices, setMatrices] = useState(initialMatricesState);
  const [resultHistory, setResultHistory] = useState([]);
  const [error, setError] = useState({ message: null, type: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleMatrixChange = (matrixId, row, col, valueOrMatrix) => {
    setMatrices(prev => {
      let newMatrix;
      if (Array.isArray(valueOrMatrix)) {
        newMatrix = valueOrMatrix;
      } else {
        newMatrix = prev[matrixId].map((r, rIdx) =>
          r.map((c, cIdx) =>
            rIdx === row && cIdx === col ? (valueOrMatrix === "" ? null : parseFloat(valueOrMatrix)) : c
          )
        );
      }
      return { ...prev, [matrixId]: newMatrix };
    });
  };

  const handleSwap = () => {
    setMatrices(prev => ({ matrixA: prev.matrixB, matrixB: prev.matrixA }));
  };

  const handleOperation = (type) => {
    setIsLoading(true);
    setError({ message: null, type: null });

    setTimeout(() => {
      try {
        const { matrixA: rawA, matrixB: rawB } = matrices;
        const matrixA = normalizeMatrix(rawA);
        const matrixB = normalizeMatrix(rawB);

        validateMatrixOperation(type, matrixA, matrixB);
        const result = performMatrixOperation(type, matrixA, matrixB);

        setResultHistory(prev => [{ type, matrixA, matrixB, result }, ...prev]);
      } catch (err) {
        setError({ message: err.message, type: err.name });
        setTimeout(() => setError({ message: null, type: null }), 3000);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const resetAll = () => {
    setMatrices(initialMatricesState);
    setResultHistory([]);
    setError({ message: null, type: null });
  };

  const clearHistory = () => setResultHistory([]);
  const useAsMatrix = (matrix, id) => setMatrices(prev => ({ ...prev, [id]: matrix }));
  const deleteHistoryItem = (index) => setResultHistory(prev => prev.filter((_, i) => i !== index));

  return {
    matrices,
    resultHistory,
    error,
    isLoading,
    handleMatrixChange,
    handleSwap,
    handleOperation,
    resetAll,
    clearHistory,
    useAsMatrix,
    deleteHistoryItem,
    setIsLoading,
  };
}
