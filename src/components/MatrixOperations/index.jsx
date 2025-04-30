'use client'

import { SwapButton } from './SwapButton';
import { OperationButton } from './OperationButton';

export function MatriksOperations() {
    const handleClick = (type) => {
        console.log("Operasi:", type);
    };

    return (
        <div className="flex flex-col relative items-center space-y-4">
            <SwapButton onClick={handleClick} />
            <div className="flex space-x-4 hover-target pointer-events-auto">
                <OperationButton type="add" onClick={handleClick} />
                <OperationButton type="mul" onClick={handleClick} />
                <OperationButton type="sub" onClick={handleClick} />
            </div>
        </div>
    );
}
