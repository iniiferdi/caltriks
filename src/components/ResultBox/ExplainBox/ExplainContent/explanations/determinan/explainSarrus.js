// components/explanations/sarrus.js
export function explainSarrus(matrix) {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];

    const diag1 = a * e * i;
    const diag2 = b * f * g;
    const diag3 = c * d * h;
    const diagSum = diag1 + diag2 + diag3;

    const diag4 = c * e * g;
    const diag5 = b * d * i;
    const diag6 = a * f * h;
    const diagSub = diag4 + diag5 + diag6;

    const det = diagSum - diagSub;

    return (
        <ul className="list-inside list-disc text-sm text-gray-300 mt-1 space-y-0.5">
            <li>
                Diagonal utama: <em>aei</em> + <em>bfg</em> + <em>cdh</em> =
                {a}×{e}×{i} + {b}×{f}×{g} + {c}×{d}×{h} = {diag1} + {diag2} + {diag3} = <strong>{diagSum}</strong>
            </li>
            <li>
                Diagonal sekunder: <em>ceg</em> + <em>bdi</em> + <em>afh</em> = {c}×{e}×{g} + {b}×{d}×{i} + {a}×{f}×{h} = {diag4} + {diag5} + {diag6} = <strong>{diagSub}</strong>
            </li>
            <li>
                Determinan: <strong>det(A)</strong> = {diagSum} − {diagSub} = <strong>{det}</strong>
            </li>
        </ul>
    );
}
