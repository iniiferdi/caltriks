export function Operator({ symbol, midRow, totalRows }) {
    return (
        <div>
            {[...Array(totalRows)].map((_, idx) => (
                <div key={idx} className="text-white font-bold text-xl text-center w-6">
                    {idx === midRow ? symbol : ''}
                </div>
            ))}
        </div>
    );
}
