'use client'

export function InputField({ value, onChange }) {
  // Jika nilai adalah 0, tampilkan sebagai string kosong
  const displayValue = value === 0 ? "" : value;

  return (
    <input
      type="number"
      value={displayValue}
      onChange={onChange}
      className="appearance-none 
       [&::-webkit-outer-spin-button]:appearance-none 
       [&::-webkit-inner-spin-button]:appearance-none 
       bg-[#121212] border border-[#1E1E20] w-[70px] h-[38px] rounded-[9px] 
       text-center text-white font-semibold 
       focus:outline-none focus:ring-2 focus:ring-[#3a3a3d] 
       transition-all duration-300 ease-in-out 
       hover:border-[#3a3a3d] hover:shadow-sm 
       focus:shadow-md"
    />
  );
}
