import { InverseRow } from "./InverseRow";
import { DeterminantRow } from "./DeterminanRow";
import { TransposeRow } from "./TransposeRow";
import { BasicOperationRow } from "./BasicOperationRow";
import { RankRow } from "./RankRow";

export function MatrixRow({ index, entry }) {
  switch (entry.type) {
    case 'det':
      return <DeterminantRow index={index} matrix={entry.matrix} label={entry.label} result={entry.result} />;
    case 'trans':
      return <TransposeRow index={index} matrix={entry.matrix} label={entry.label} result={entry.result} />;
    case 'inv':
      return <InverseRow index={index} matrix={entry.matrix} label={entry.label} result={entry.result} />;
    case 'rank':
      return <RankRow index={index} matrix={entry.matrix} label={entry.label} result={entry.result} />;
    default:
      return <BasicOperationRow index={index} entry={entry} />;
  }
}

