import { ExplainAdd } from "./ExplainContent/ExplainAdd";
import { ExplainDet } from "./ExplainContent/ExplainDet";
import { ExplainEchelon } from "./ExplainContent/ExplainEchelon";
import { ExplainInv } from "./ExplainContent/ExplainInv";
import { ExplainMul } from "./ExplainContent/ExplainMul";
import { ExplainRank } from "./ExplainContent/ExplainRank";
import { ExplainScalar } from "./ExplainContent/ExplainScalar";
import { ExplainSub } from "./ExplainContent/ExplainSub";
import { ExplainTrans } from "./ExplainContent/ExplainTrans";

export function ExplainContent({ entry }) {
  switch (entry.type) {
    case 'det':
      return <ExplainDet entry={entry} />;
    case 'trans':
      return <ExplainTrans entry={entry} />;
    case 'inv':
      return <ExplainInv entry={entry} />;
    case 'rank':
      return <ExplainRank entry={entry} />;
    case 'echelon':
      return <ExplainEchelon entry={entry} />;
    case 'scalar':
      return <ExplainScalar entry={entry} />;
    case 'add':
      return <ExplainAdd entry={entry} />;
    case 'sub':
      return <ExplainSub entry={entry} />;
    case 'mul':
      return <ExplainMul entry={entry} />;
    default:
      return null;
  }
}
