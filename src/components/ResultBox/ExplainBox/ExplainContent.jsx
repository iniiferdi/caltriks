import { ExplainDet } from "./ExplainContent/ExplainDet";

export function ExplainContent({ entry }) {
  switch (entry.type) {
    case 'det':
      return <ExplainDet entry={entry} />;
    default:
      return null;
  }
}
