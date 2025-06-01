import { InverseRow } from "./ResultMetode/InverseRow";
import { DeterminantRow } from "./ResultMetode/DeterminanRow";
import { TransposeRow } from "./ResultMetode/TransposeRow";
import { BasicOperationRow } from "./ResultMetode/BasicOperationRow";
import { RankRow } from "./ResultMetode/RankRow";
import { ScalarRow } from "./ResultMetode/ScalarRow";
import { CofactorRow } from "./ResultMetode/CofactorRow";
import { EchelonRow } from "./ResultMetode/EchelonRow";


export function MatrixRow({ index, entry }) {
  const commonProps = {
    index,
    matrix: entry.matrix,
    label: entry.label,
    result: entry.result,
    type: entry.type,
  };

  console.log("MatrixRow entry:", entry);

  switch (entry.type) {
    case 'det':
      return <DeterminantRow {...commonProps} />;
    case 'trans':
      return <TransposeRow {...commonProps} />;
    case 'inv':
      return <InverseRow {...commonProps}/>;
    case 'rank':
      return <RankRow {...commonProps} />;
    case 'scalar':
      return <ScalarRow {...commonProps} scalar={entry.scalar} />;
    case 'cofactor':
      return <CofactorRow {...commonProps} />;
    case 'echelon':
      return <EchelonRow {...commonProps} />;
    default:
      return <BasicOperationRow index={index} entry={entry} />;
  }
}

