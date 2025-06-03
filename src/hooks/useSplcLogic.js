import { useState, useRef } from 'react';
import {
    gaussianEliminationFinalResult,
    gaussJordanEliminationFinalResult,
    cramersRuleResult,
    validateMatrixSpl
} from '@/utils/splUtils';

export default function useSplcLogic() {
    const [variableCount, setVariableCount] = useState(3);
    const [inputs, setInputs] = useState(Array.from({ length: 3 }, () => Array(4).fill('')));
    const [error, setError] = useState({ message: null, type: null });
    const [selectedLabel, setSelectedLabel] = useState("Solve by Gaussian elimination");
    const [result, setResult] = useState(null);
    const [resultHistory, setResultHistory] = useState([]);
    const errorTimerRef = useRef(null);

    const resetInputs = (count) => {
        setInputs(Array.from({ length: count }, () => Array(count + 1).fill('')));
    };

    const handleClear = () => {
        resetInputs(variableCount);
        setResult(null);
    };

    const handleAdd = () => {
        const newCount = variableCount + 1;
        setVariableCount(newCount);
        resetInputs(newCount);
        setResult(null);
    };

    const handleRemove = () => {
        if (variableCount <= 1) return;
        const newCount = variableCount - 1;
        setVariableCount(newCount);
        resetInputs(newCount);
        setResult(null);
    };

    const handleInputChange = (row, col, value) => {
        setInputs(prevInputs => {
            const updated = [...prevInputs];
            updated[row][col] = value;
            return updated;
        });
    };

    const handleSolve = () => {
  try {
    // Validasi langsung pakai `inputs` tanpa diubah
    validateMatrixSpl(inputs);

    // Setelah lolos validasi, baru ubah kosong jadi '0'
    const augmented = inputs.map(row => row.map(cell => cell || '0'));

    let finalResult;

    switch (selectedLabel) {
      case "Solve by Gaussian elimination":
        finalResult = gaussianEliminationFinalResult(augmented);
        break;
      case "Solve by Gauss–Jordan elimination":
        finalResult = gaussJordanEliminationFinalResult(augmented);
        break;
      case "Solve by Cramer’s Rule":
        finalResult = cramersRuleResult(augmented);
        break;
      default:
        throw new Error("Metode belum didukung.");
    }

    const newEntry = {
      id: Date.now(),
      input: JSON.parse(JSON.stringify(inputs)),
      result: finalResult,
      method: selectedLabel,
      type: selectedLabel,
    };

    setResult(finalResult);
    setResultHistory(prev => [newEntry, ...prev]);

  } catch (error) {
    showError(error);
  }
};


    const handleClearHistory = () => {
        setResultHistory([]);
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

    return {
        variableCount,
        inputs,
        error,
        selectedLabel,
        result,
        resultHistory,
        handleClear,
        handleClearHistory,
        handleAdd,
        handleRemove,
        handleInputChange,
        setSelectedLabel,
        handleSolve,
    };
}
