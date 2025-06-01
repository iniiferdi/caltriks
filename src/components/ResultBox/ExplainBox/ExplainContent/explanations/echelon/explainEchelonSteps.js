import { cloneDeep } from "lodash";
import { fraction } from "mathjs";

export function toFraction(value) {
  if (typeof value === "object" && value.isFraction) return value;
  return fraction(value);
}

export function explainEchelonSteps(matrix) {
  const steps = [];
  const mat = cloneDeep(matrix).map(row => row.map(toFraction));

  const rowCount = mat.length;
  const colCount = mat[0].length;

  let lead = 0;
  for (let r = 0; r < rowCount; r++) {
    if (lead >= colCount) break;

    let i = r;
    while (i < rowCount && mat[i][lead].n === 0) {
      i++;
    }

    if (i === rowCount) {
      lead++;
      r--;
      continue;
    }

    if (i !== r) {
      [mat[i], mat[r]] = [mat[r], mat[i]];
      steps.push({
        description: `R${r + 1} ↔ R${i + 1}`,
        result: cloneDeep(mat),
      });
    }

    const pivot = mat[r][lead];
    if (pivot.n !== 1 || pivot.d !== 1) {
      mat[r] = mat[r].map(x => x.div(pivot));
      steps.push({
        description: `R${r + 1} ← R${r + 1} ÷ ${pivot.toFraction(true)}`,
        result: cloneDeep(mat),
      });
    }

    for (let i = r + 1; i < rowCount; i++) {
      const factor = mat[i][lead];
      if (factor.n !== 0) {
        mat[i] = mat[i].map((val, k) =>
          val.sub(factor.mul(mat[r][k]))
        );
        const sign = factor.s === -1 ? "+" : "−";
        const fStr = `${factor.abs().toFraction(true)}`;
        steps.push({
          description: `R${i + 1} ← R${i + 1} ${sign} ${fStr} × R${r + 1}`,
          result: cloneDeep(mat),
        });
      }
    }

    lead++;
  }

  return steps;
}
