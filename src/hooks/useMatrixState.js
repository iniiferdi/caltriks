import { useState, useRef } from "react";
import { prepareMatrix } from "@/utils/matrixUtils";
import { performMatrixOperation } from "@/utils/performMatrixOperation";
import { fraction, format } from "mathjs";

const initialMatricesState = {
  matrixA: [],
  matrixB: [],
};

const isFractionObject = (val) => val?.n !== undefined && val?.d !== undefined;

const safeParseFraction = (input) => {
  if (typeof input !== "string") return input;
  try {
    return fraction(input.trim());
  } catch {
    return input.trim();
  }
};

const formatValue = (val) => {
  if (isFractionObject(val)) return `${val.n}/${val.d}`;
  if (typeof val === "number" && !Number.isInteger(val)) {
    try {
      return format(fraction(val), { fraction: "ratio" });
    } catch {
      return val.toFixed(4);
    }
  }
  return val?.toString?.() ?? val;
};

const formatMatrix = (matrixOrValue) => {
  if (Array.isArray(matrixOrValue)) {
    return matrixOrValue.map((row) =>
      Array.isArray(row) ? row.map(formatValue) : formatValue(row)
    );
  }
  return formatValue(matrixOrValue);
};

export function useMatrixState() {
  const [matrices, setMatrices] = useState(initialMatricesState);
  const [resultHistory, setResultHistory] = useState([]);
  const [error, setError] = useState({ message: null, type: null });
  const [isLoading, setIsLoading] = useState(false);
  const errorTimerRef = useRef(null);

  const getMatrixKey = (id) => (id === "A" ? "matrixA" : "matrixB");

  const handleMatrixChange = (matrixId, row, col, input) => {
    const key = getMatrixKey(matrixId);

    setMatrices((prev) => {
      if (Array.isArray(input)) {
        return { ...prev, [key]: input };
      }

      const updated = prev[key]?.map((r) => [...r]) ?? [];
      while (updated.length <= row) updated.push([]);
      while (updated[row].length <= col) updated[row].push(null);

      updated[row][col] = input === "" ? null : safeParseFraction(input);
      return { ...prev, [key]: updated };
    });
  };

  const handleSwap = () => {
    setMatrices(({ matrixA, matrixB }) => ({
      matrixA: matrixB,
      matrixB: matrixA,
    }));
  };

  const handleOperation = async (typeInput, matrixId, scalar) => {
    const type = typeof typeInput === "string" ? typeInput : typeInput?.value;
    setIsLoading(true);
    clearError();

    try {
      await delay(1000); // Simulate async

      const singleMatrixOps = ["det", "inv", "trans", "rank", "scalar", "cofactor"];
      const isSingleOp = singleMatrixOps.includes(type);

      const a = prepareMatrix(matrices.matrixA);
      const b = prepareMatrix(matrices.matrixB);

      let result, rawResult, newEntry;

      if (isSingleOp) {
        const selectedMatrix = matrixId === "B" ? b : matrixId === "A" ? a : throwInvalidMatrix();
        rawResult = performMatrixOperation(type, selectedMatrix, null, scalar);
        result = formatMatrix(rawResult);

        newEntry = {
          type,
          matrix: selectedMatrix,
          label: matrixId,
          scalar: type === "scalar" ? scalar : undefined,
          result,
          rawResult,
        };
      } else {
        rawResult = performMatrixOperation(type, a, b);
        result = formatMatrix(rawResult);

        newEntry = {
          type,
          matrixA: a,
          matrixB: b,
          result,
          rawResult,
        };
      }

      setResultHistory((prev) => [newEntry, ...prev]);
    } catch (err) {
      showError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    setMatrices(initialMatricesState);
    setResultHistory([]);
    clearError();
  };

  const clearError = () => {
    setError({ message: null, type: null });
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
  };

  const showError = (err) => {
    setError({ message: err.message, type: err.name });
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(clearError, 3000);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const throwInvalidMatrix = () => {
    throw new Error("Invalid matrixId. Expected 'A' or 'B'.");
  };

  return {
    matrices,
    resultHistory,
    error,
    isLoading,
    handleMatrixChange,
    handleSwap,
    handleOperation,
    resetAll,
    clearHistory: () => setResultHistory([]),
    setMatrixFromHistory: (matrix, id) =>
      setMatrices((prev) => ({ ...prev, [id]: matrix })),
    deleteHistoryItem: (index) =>
      setResultHistory((prev) => prev.filter((_, i) => i !== index)),
    setIsLoading,
  };
}
