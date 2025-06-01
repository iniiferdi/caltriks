import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { adjugateInverseSteps } from "./adjugateInverseSteps";

export function explainAdjugate(matrix) {
    const steps = adjugateInverseSteps(matrix);

    return (
        <div className="space-y-3 mt-2">
            {steps.map((step, index) => {
                const hasMatrix =
                    Array.isArray(step.result) &&
                    Array.isArray(step.result[0]);

                return (
                    <div key={index} className="space-y-1">
                        <p className="text-white font-medium ">Langkah {index + 1}:</p>
                        <p className="text-gray-300">{step.description}</p>
                        {hasMatrix && (
                            <MatrixDisplay
                                matrix={step.result}
                                rows={step.result.length}
                                cols={step.result[0].length}
                            />
                        )}
                    </div>
                );
            })}


        </div>
    );
}
