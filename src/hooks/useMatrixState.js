import { useState, useRef } from "react";
import {
  prepareMatrix,
} from "@/utils/matrixUtils";
import { performMatrixOperation } from "@/utils/performMatrixOperation";

const initialMatricesState = {
  matrixA: [],
  matrixB: [],
};

export function useMatrixState() {
  const [matrices, setMatrices] = useState(initialMatricesState);
  const [resultHistory, setResultHistory] = useState([]);
  const [error, setError] = useState({ message: null, type: null });
  const [isLoading, setIsLoading] = useState(false);
  const errorTimerRef = useRef(null);

  const getMatrixKey = (id) => (id === "A" ? "matrixA" : "matrixB");

  const handleMatrixChange = (matrixId, row, col, valueOrMatrix) => {
    const key = getMatrixKey(matrixId);

    setMatrices((prev) => {
      let newMatrix;

      if (Array.isArray(valueOrMatrix)) {
        newMatrix = valueOrMatrix;
      } else {
        const updated = [...(prev[key] || [])];

        while (updated.length <= row) updated.push([]);
        while (updated[row].length <= col) updated[row].push(null);

        const parsedValue = valueOrMatrix === "" ? null : parseFloat(valueOrMatrix);
        updated[row][col] = isNaN(parsedValue) ? null : parsedValue;

        newMatrix = updated;
      }

      return { ...prev, [key]: newMatrix };
    });
  };

  const handleSwap = () => {
    setMatrices((prev) => ({
      matrixA: prev.matrixB,
      matrixB: prev.matrixA,
    }));
  };

  const handleOperation = async (typeInput, matrixId, scalar) => {
  const type = typeof typeInput === "string" ? typeInput : typeInput?.value;
  setIsLoading(true);
  setError({ message: null, type: null });

  try {
    await new Promise((res) => setTimeout(res, 1000));

    const isSingleMatrixOp = ["det", "inv", "trans", "rank", "scalar", "cofactor"].includes(type);

    const rawA = matrices.matrixA;
    const rawB = matrices.matrixB;

    const a = prepareMatrix(rawA);
    const b = prepareMatrix(rawB);

    let result;
    let newEntry;

    if (isSingleMatrixOp) {
      const selectedMatrix =
        matrixId === "B" ? b :
        matrixId === "A" ? a :
        (() => { throw new Error("Invalid matrixId"); })();

      result = performMatrixOperation(type, selectedMatrix, null, scalar);

      newEntry = {
        type,
        scalar: type === "scalar" ? scalar : undefined,
        matrix: selectedMatrix,
        label: matrixId,
        result,
      };
    } else {
      result = performMatrixOperation(type, a, b);
      newEntry = {
        type,
        matrixA: a,
        matrixB: b,
        result,
      };
    }

    setResultHistory((prev) => [newEntry, ...prev]);
  } catch (err) {
    setError({ message: err.message, type: err.name });
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => {
      setError({ message: null, type: null });
    }, 3000);
  } finally {
    setIsLoading(false);
  }
};




  const resetAll = () => {
    setMatrices(initialMatricesState);
    setResultHistory([]);
    setError({ message: null, type: null });
  };

  const clearHistory = () => setResultHistory([]);
  const setMatrixFromHistory = (matrix, id) =>
    setMatrices((prev) => ({ ...prev, [id]: matrix }));
  const deleteHistoryItem = (index) =>
    setResultHistory((prev) => prev.filter((_, i) => i !== index));

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
    setMatrixFromHistory,
    deleteHistoryItem,
    setIsLoading,
  };
}
