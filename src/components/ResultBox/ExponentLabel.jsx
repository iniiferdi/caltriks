export function ExponentLabel({ base, exponent }) {
    return (
        <span className="text-white font-bold text-xl">
            {base}<sup className="text-sm align-super">{exponent}</sup>
        </span>
    );
}
