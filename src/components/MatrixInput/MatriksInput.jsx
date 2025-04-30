import { InputField } from "./InputField";

export function MatriksInput({matrixId }) {
    return (
        <div
            id= {matrixId}
            className="grid grid-cols-3 gap-6"
        >
            {[...Array(9)].map((_, i) => (
                <InputField key={i} />
            ))}
        </div>
    );
}
