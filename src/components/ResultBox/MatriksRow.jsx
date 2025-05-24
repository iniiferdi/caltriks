import { InverseRow } from "./ResultMetode/InverseRow";
import { DeterminantRow } from "./ResultMetode/DeterminanRow";
import { TransposeRow } from "./ResultMetode/TransposeRow";
import { BasicOperationRow } from "./ResultMetode/BasicOperationRow";
import { RankRow } from "./ResultMetode/RankRow";
import { ScalarRow } from "./ResultMetode/ScalarRow";
import { CofactorRow } from "./ResultMetode/CofactorRow";


export function MatrixRow({ index, entry }) {
  const commonProps = {
    index,
    matrix: entry.matrix,
    label: entry.label,
    result: entry.result,
  };

  switch (entry.type) {
    case 'det':
      return <DeterminantRow {...commonProps} />;
    case 'trans':
      return <TransposeRow {...commonProps} />;
    case 'inv':
      return <InverseRow {...commonProps} stepsByMethod={entry.stepsByMethod}/>;
    case 'rank':
      return <RankRow {...commonProps} />;
    case 'scalar':
      return <ScalarRow {...commonProps} scalar={entry.scalar} />;
    case 'cofactor':
      return <CofactorRow {...commonProps} />;
    default:
      return <BasicOperationRow index={index} entry={entry} />;
  }
}

