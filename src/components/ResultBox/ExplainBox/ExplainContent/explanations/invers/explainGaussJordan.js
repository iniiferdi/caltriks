import { MatrixDisplay } from "@/components/ResultBox/MatriksDisplay";
import { gaussJordanInverseSteps } from "./gaussJordanInverseSteps";

export function explainGaussJordan(matrix) {
    const steps = gaussJordanInverseSteps(matrix);

    return (
        <div className="space-y-3 mt-2">
            {steps.map((step, index) => (
                <div key={index} className="space-y-1">
                    <p className="text-white font-medium">Langkah {index + 1}:</p>
                    <p className="text-gray-300">{step.description}</p>
                    <MatrixDisplay
                        matrix={step.result}
                        rows={step.result.length}
                        cols={step.result[0].length}
                    />
                </div>
            ))}

        </div>
    );
}
