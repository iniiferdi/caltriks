import { ExplainDet } from "./ExplainContent/ExplainDet";
import { ExplainInv } from "./ExplainContent/ExplainInv";
import { ExplainRank } from "./ExplainContent/ExplainRank";
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
    default:
      return null;
  }
}
