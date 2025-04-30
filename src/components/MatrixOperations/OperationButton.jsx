'use client'

export function OperationButton({ type, onClick }) {
    return (
        <button
            onClick={() => onClick(type)}
            className="bg-[#121212]  w-9 h-9 rounded-md flex items-center justify-center 
                       transition-all duration-300 transform hover:scale-110 hover:bg-[#2a2a2a]
                       shadow hover:shadow-md"
        >
            <img src={`/icons/${type}.svg`} alt={type} />
        </button>
    );
}
