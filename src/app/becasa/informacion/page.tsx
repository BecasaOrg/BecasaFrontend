import BecasaHeroSlider from "@/components/becasa/BecasaHeroSlider";
import DirigidoA from "@/components/becasa/informacion/DirigidoA";
import Entrenadores from "@/components/becasa/informacion/Entrenadores";
import EventoInfo from "@/components/becasa/informacion/EventoInfo";
import FechasInscripciones from "@/components/becasa/informacion/FechaInscripciones";
import FundacionASA from "@/components/becasa/informacion/FundacionASA";
import OrganizadoresResponsables from "@/components/becasa/informacion/OrganizadoresResponsables";
import PatrocinadoresAliados from "@/components/becasa/informacion/PatrocinadoresAliados";
import QueHaceDiferente from "@/components/becasa/informacion/QueHaceDiferente";
import QueMasTendras from "@/components/becasa/informacion/QueMasTendras";

export default function Informacion() {
    
    return(
        <div>
            <BecasaHeroSlider />
            <EventoInfo />
            <DirigidoA />
            <Entrenadores />
            <FechasInscripciones />
            <QueMasTendras />
            <PatrocinadoresAliados />
            <QueHaceDiferente />
            <OrganizadoresResponsables />
            <FundacionASA />
        </div>
    )
}