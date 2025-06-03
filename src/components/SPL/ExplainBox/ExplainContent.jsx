import {ExplainGaus} from "../ExplainContent/ExplainGaus";
import {ExplainGausJordan} from "../ExplainContent/ExplainGausJordan";

export function ExplainContent({ entry }) {
  switch (entry.type || entry.method) {
    case 'Solve by Gaussian elimination':
      return <ExplainGaus entry={entry} />;
    case 'Solve by Gauss–Jordan elimination':
      return <ExplainGausJordan entry={entry} />;
    default:
      return null;
  }
}
