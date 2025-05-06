import { InverseRow } from "./InverseRow";
import { DeterminantRow } from "./DeterminanRow";
import { TransposeRow } from "./TransposeRow";
import { BasicOperationRow } from "./BasicOperationRow";
import { RankRow } from "./RankRow";
import { RefRow } from "./RefRow";
import { AdjointRow } from "./AdjointRow";
import { CofactorRow } from "./CofactorRow";
import { TraceRow } from "./TraceRow";

export function MatrixRow({ index, entry }) {
    const renderContent = () => {
        switch (entry.type) {
            case 'det':
                return <DeterminantRow index={index} entry={entry} />;
            case 'trans':
                return <TransposeRow index={index} entry={entry} />;
            case 'inv':
                return <InverseRow index={index} entry={entry} />;
            case 'rank':
                return <RankRow index={index} entry={entry} />;
            case 'ref':
                return <RefRow index={index} entry={entry} />;
            case 'adj':
                return <AdjointRow index={index} entry={entry} />;
            case 'cof':
                return <CofactorRow index={index} entry={entry} />;
            case 'trace':
                return <TraceRow index={index} entry={entry} />;
            default:
                return <BasicOperationRow index={index} entry={entry} />;
        }
    };

    return (
        <div className="mb-3">
            {renderContent()}
        </div>
    );
}
