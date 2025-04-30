'use client'

export function SwapButton({ onClick }) {
    return (
        <button
            onClick={() => onClick('swap')}
            className="bg-[#303995] hover-target pointer-events-auto w-full h-11 rounded-lg flex items-center justify-center
                       transition-all duration-300 transform hover:scale-105 hover:bg-[#3d4ad8] 
                       shadow-md hover:shadow-lg"
        >
            <img src="/icons/swap.svg" alt="swap"/>
        </button>
    );
}
