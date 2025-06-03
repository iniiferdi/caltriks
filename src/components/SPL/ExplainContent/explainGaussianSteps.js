import React from "react";
import MatrixDisplay  from "../ResultBox/MatrixDisplay";
import { toEchelonSteps } from "./toEchelonSteps"; // buat util ini kalau ingin otomatis

export function explainGaussianSteps(matrix) {
  // Jika sudah ada fungsi `toEchelonSteps`, kamu bisa pakai itu
  const steps = toEchelonSteps(matrix); // berisi array step-by-step hasil transformasi

  return (
    <ol className="list-decimal ml-5 space-y-3 mt-2">
      {steps.map((step, index) => (
        <li key={index}>
          <p className="mb-1">Langkah {index + 1}:</p>
          <MatrixDisplay matrix={step.matrix} rows={step.matrix.length} cols={step.matrix[0].length} />
          {step.note && <p className="mt-1 text-gray-400">{step.note}</p>}
        </li>
      ))}
    </ol>
  );
}
