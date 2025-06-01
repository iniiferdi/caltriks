// components/explanations/cofactor.js
export function explainCofactor(matrix) {
    const [a, b, c] = matrix[0];

    const M11 = matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1];
    const M12 = matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0];
    const M13 = matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0];

    const det = a * M11 - b * M12 + c * M13;

    return (
        <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">
            <li>M₁₁ = {matrix[1][1]}×{matrix[2][2]} − {matrix[1][2]}×{matrix[2][1]} = <strong>{M11}</strong></li>
            <li>M₁₂ = {matrix[1][0]}×{matrix[2][2]} − {matrix[1][2]}×{matrix[2][0]} = <strong>{M12}</strong></li>
            <li>M₁₃ = {matrix[1][0]}×{matrix[2][1]} − {matrix[1][1]}×{matrix[2][0]} = <strong>{M13}</strong></li>
            <li>det(A) = {a}×{M11} − {b}×{M12} + {c}×{M13} = <strong>{det}</strong></li>
        </ul>
    );
}
