'use client'

import { ButtonMetode } from "./ButtonMetode";

export function MatriksMetode() {
    const handleClick = () => {
        console.log("Metode invers dipilih");
        // bisa diganti dengan logika lain
    };

    return (
        <div className="grid grid-cols-2 gap-4 text-sm">
            <ButtonMetode label="Invers" onClick={handleClick} />
            <ButtonMetode label="Eliminasi" onClick={() => console.log("Eliminasi")} />
            <ButtonMetode label="Gauss" onClick={() => console.log("Gauss")} />
            <ButtonMetode label="Kofaktor" onClick={() => console.log("Kofaktor")} />
        </div>
    );
}
