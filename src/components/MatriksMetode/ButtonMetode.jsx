'use client'

export function ButtonMetode({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-[#121212] text-white w-full py-3 font-semibold text-sm rounded-md flex items-center justify-center 
                       transition-all duration-300 transform hover:scale-110 hover:bg-[#2a2a2a]
                       shadow hover:shadow-md"
        >
            {label}
        </button>
    );
}
