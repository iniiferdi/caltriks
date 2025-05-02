import { InverseRow } from "./InverseRow";
import { DeterminantRow } from "./DeterminanRow";
import { TransposeRow } from "./TransposeRow";
import { BasicOperationRow } from "./BasicOperationRow";

export function MatrixRow({ index, entry }) {
    const renderContent = () => {
        switch (entry.type) {
            case 'det':
                return <DeterminantRow index={index} entry={entry} />;
            case 'trans':
                return <TransposeRow index={index} entry={entry} />;

            case 'inv':
                return <InverseRow index={index} entry={entry} />;
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
