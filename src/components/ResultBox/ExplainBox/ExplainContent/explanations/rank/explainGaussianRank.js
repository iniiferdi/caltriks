import { cloneDeep } from "lodash";
import { fraction } from "mathjs";
import { MatrixStep } from "@/components/ResultBox/MatrixStep";

function toFraction(value) {
  if (typeof value === "object" && value.isFraction) return value;
  return fraction(value);
}

export function explainGaussianRank(matrix) {
  const A = cloneDeep(matrix).map(row => row.map(toFraction));
  const steps = [];
  const rows = A.length;
  const cols = A[0].length;
  let row = 0;

  for (let col = 0; col < cols && row < rows; col++) {
    // Cari baris pivot yang elemennya tidak nol
    let pivotRow = row;
    while (pivotRow < rows && A[pivotRow][col].equals(0)) {
      pivotRow++;
    }

    if (pivotRow === rows) continue;

    // Tukar jika perlu
    if (pivotRow !== row) {
      [A[pivotRow], A[row]] = [A[row], A[pivotRow]];
      steps.push(
        <MatrixStep
          key={`swap-${row}-${pivotRow}`}
          description={`Tukar R${row + 1} dengan R${pivotRow + 1}`}
          matrix={cloneDeep(A)}
        />
      );
    }

    // Eliminasi baris di bawahnya
    for (let i = row + 1; i < rows; i++) {
      const factor = A[i][col].div(A[row][col]);
      if (!factor.equals(0)) {
        A[i] = A[i].map((val, j) => val.sub(factor.mul(A[row][j])));
        steps.push(
          <MatrixStep
            key={`elim-${i}-${row}`}
            description={`R${i + 1} → R${i + 1} - (${factor.toFraction(true)}) × R${row + 1}`}
            matrix={cloneDeep(A)}
          />
        );
      }
    }

    row++;
  }

  const nonZeroRows = A.filter(r => r.some(cell => !cell.equals(0))).length;
  steps.push(
    <MatrixStep
      key="rank-result"
      description={`Banyak baris tak nol: Rank = ${nonZeroRows}`}
      matrix={cloneDeep(A)}
    />
  );

  return steps;
}
