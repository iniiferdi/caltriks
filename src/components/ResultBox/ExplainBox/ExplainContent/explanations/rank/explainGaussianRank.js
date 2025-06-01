import { cloneDeep } from "lodash";
import { fraction } from "mathjs";
import { MatrixStep } from "@/components/ResultBox/MatrixStep";

export function toFraction(value) {
    if (typeof value === "object" && value.isFraction) {
        return value;
    }
    return fraction(value);
}

export function explainGaussianRank(matrix) {
    const A = cloneDeep(matrix).map(row => row.map(toFraction));
    const steps = [];
    const rows = A.length;
    const cols = A[0].length;
    let lead = 0;

    for (let r = 0; r < rows; r++) {
        if (lead >= cols) break;

        let i = r;
        while (A[i][lead].n === 0) {
            i++;
            if (i === rows) {
                i = r;
                lead++;
                if (lead === cols) break;
            }
        }

        if (i !== r) {
            [A[i], A[r]] = [A[r], A[i]];
            steps.push(
                <MatrixStep
                    key={`swap-${r}-${i}`}
                    description={`Tukar R${r + 1} dengan R${i + 1}`}
                    matrix={A}
                />
            );
        }

        const lv = A[r][lead];
        if (!lv.equals(0)) {
            A[r] = A[r].map(x => x.div(lv));
            steps.push(
                <MatrixStep
                    key={`normalize-${r}`}
                    description={`R${r + 1} → R${r + 1} ÷ ${lv.toFraction(true)}`}
                    matrix={A}
                />
            );

            for (let j = 0; j < rows; j++) {
                if (j !== r) {
                    const lv2 = A[j][lead];
                    if (!lv2.equals(0)) {
                        A[j] = A[j].map((val, k) => val.sub(lv2.mul(A[r][k])));
                        steps.push(
                            <MatrixStep
                                key={`elim-${j}-${r}`}
                                description={`R${j + 1} → R${j + 1} - (${lv2.toFraction(true)}) × R${r + 1}`}
                                matrix={A}
                            />
                        );
                    }
                }
            }
        }
        lead++;
    }

    const nonZeroRows = A.filter(row => row.some(cell => !cell.equals(0))).length;
    steps.push(
        <MatrixStep
            key="rank-result"
            description={`Banyak baris tak nol: Rank = ${nonZeroRows}`}
            matrix={A}
        />
    );

    return <div className="space-y-4 mt-2">{steps}</div>;
}
