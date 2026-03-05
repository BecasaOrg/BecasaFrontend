import HistoriaEquipo from "@/components/componentsNuestraHistoria/HistoriaEquipo";
import NuestroAliados from "@/components/componentsNuestraHistoria/NuestroAliados";
import NuestroEquipo from "@/components/componentsNuestraHistoria/NuestroEquipo";
import VisionMision from "@/components/componentsNuestraHistoria/VisionMision";
export default function NuestraHistoria() {
    return (
        <div>
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