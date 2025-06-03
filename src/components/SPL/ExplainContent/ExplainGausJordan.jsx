export function ExplainGausJordan({ entry }) {
  return (
    <div className="text-sm text-gray-300">
      <p>
        Gaussian elimination is a method for solving systems of linear equations. It involves
        performing row operations on the augmented matrix of the system to transform it into
        row echelon form (REF) or reduced row echelon form (RREF).
      </p>
      <p>
        The process consists of three main steps:
      </p>
      <ol className="list-decimal ml-5">
        <li>Forward elimination: Transform the matrix into upper triangular form.</li>
        <li>Back substitution: Solve for the variables starting from the last row.</li>
        <li>Optional: Further simplify to RREF if needed.</li>
      </ol>
      <p>
        This method is efficient and systematic, making it suitable for both small and large systems.
      </p>
    </div>
  );
}