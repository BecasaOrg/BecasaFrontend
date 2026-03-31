"use client";

import Carrusel from "@/components/Carrusel";
import { useTema } from "@/context/TemaContext";


export default function Disciplinas() {
    const { oscuro } = useTema();

    return (
        <div className={`${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            <Carrusel />

        </div>
    );
}