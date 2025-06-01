import React from "react";
import { Fraction } from "fraction.js";

export function explainScalarMultiplication(scalar, matrix) {
    if (!matrix || !Array.isArray(matrix)) {
        return <p className="text-red-500">Matriks tidak tersedia.</p>;
    }

    const fracScalar = new Fraction(scalar);

    return (
        <div className="space-y-2 mt-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                    {row.map((value, j) => {
                        const result = new Fraction(value).mul(fracScalar);
                        return (
                            <div key={j} className="flex items-center gap-1">
                                <span>{`${fracScalar.toFraction(true)} × ${new Fraction(value).toFraction(true)} =`}</span>
                                <span className="font-semibold">{result.toFraction(true)}</span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

