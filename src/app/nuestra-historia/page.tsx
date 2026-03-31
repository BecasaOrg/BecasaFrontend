"use client";
import HistoriaEquipo from "@/components/componentsNuestraHistoria/HistoriaEquipo";
import NuestroAliados from "@/components/componentsNuestraHistoria/NuestroAliados";
import NuestroEquipo from "@/components/componentsNuestraHistoria/NuestroEquipo";
import VisionMision from "@/components/componentsNuestraHistoria/VisionMision";
import { useTema } from "@/context/TemaContext";
export default function NuestraHistoria() {

    const { oscuro } = useTema();

    return (
        <div className={`${oscuro ? "bg-black text-white" : "bg-white text-black"} `} >
            {/* mision y vision  */}
            <VisionMision />
            {/* nuestro equipo  */}
            <NuestroEquipo />

            {/* nuestros aliados  */}
            <NuestroAliados />


            {/* nuestra historia  */}
            <HistoriaEquipo />

        </div>
    );
}