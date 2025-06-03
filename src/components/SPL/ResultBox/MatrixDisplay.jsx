export default function MatrixDisplay({ matrix }) {
  console.log('matrix received:', matrix);

  if (!Array.isArray(matrix)) {
    return <div>Data matrix bukan array</div>;
  }

  // cek apakah semua row adalah array
  for (let i = 0; i < matrix.length; i++) {
    if (!Array.isArray(matrix[i])) {
      return <div>Row ke-{i} bukan array: {JSON.stringify(matrix[i])}</div>;
    }
  }

  const formatFraction = (value) => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && 'n' in value && 'd' in value) {
      return value.d === 1 ? `${value.n}` : `${value.n} / ${value.d}`;
    }
    return String(value);
  };

  return (
    <div className="flex flex-col bg-[#121212] border border-[#1E1E20] py-2 rounded-md">
      {matrix.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`min-w-[50px] text-center font-semibold px-2 py-1 ${
                j === row.length - 2 ? 'border-r-2 border-white mr-2 pr-2' : ''
              }`}
            >
              {formatFraction(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
