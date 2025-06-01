// src/components/ResultBox/StepDisplay.jsx
import { MatrixDisplay } from "./MatriksDisplay";

export function MatrixStep({ description, matrix }) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    return (
        <div className="space-y-2">
            <p className="text-white font-medium">{description}</p>
            <MatrixDisplay matrix={matrix} rows={rows} cols={cols} />
        </div>
    );
}
