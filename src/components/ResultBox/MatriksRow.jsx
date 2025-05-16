import { InverseRow } from "./ResultMetode/InverseRow";
import { DeterminantRow } from "./ResultMetode/DeterminanRow";
import { TransposeRow } from "./ResultMetode/TransposeRow";
import { BasicOperationRow } from "./ResultMetode/BasicOperationRow";
import { RankRow } from "./ResultMetode/RankRow";
import { ScalarRow } from "./ResultMetode/ScalarRow";
import { CofactorRow } from "./ResultMetode/CofactorRow";

export function MatrixRow({ index, entry }) {
  switch (entry.type) {
    case 'det':
      return <DeterminantRow
        index={index}
        matrix={entry.matrix}
        label={entry.label}
        result={entry.result} />;
    case 'trans':
      return <TransposeRow
        index={index}
        matrix={entry.matrix}
        label={entry.label}
        result={entry.result} />;
    case 'inv':
      return <InverseRow
        index={index}
        matrix={entry.matrix}
        label={entry.label}
        result={entry.result} />;
    case 'rank':
      return <RankRow
        index={index}
        matrix={entry.matrix}
        label={entry.label}
        result={entry.result} />;
    case 'scalar':
      return (
        <ScalarRow
          index={index}
          matrix={entry.matrix}
          label={entry.label}
          scalar={entry.scalar}
          result={entry.result}
        />
      );
    case 'cofactor':
      return (
        <CofactorRow
          index={index}
          matrix={entry.matrix}
          label={entry.label}
          result={entry.result}
        />
      );

    default:
      return <BasicOperationRow index={index} entry={entry} />;
  }
}
