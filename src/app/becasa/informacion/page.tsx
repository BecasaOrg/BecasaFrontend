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

export default async function Informacion({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const params = await searchParams;
    const id = params.id || "1";

    let campData = null;
    try {
        const res = await fetch(`https://athleticscholarshipagency.com/api/camps/${id}`, { cache: "no-store" });
        if (res.ok) {
            campData = await res.json();
        }
    } catch (e) {
        console.error("Error fetching camp:", e);
    }

    const titulo = campData?.name || "BECASA CAMP 2026";
    const fechaInicio = campData?.start_date;
    const fechaFin = campData?.end_date;
    const direccion = campData?.address || "Kr 20 #6a - 50";
    const ciudad = campData?.city?.name || "Bogotá";

    // Asumimos que la API pronto devolverá 'extraordinary_price'
    const precioNormal = campData?.price;
    const precioExtraordinario = campData?.extraordinary_price;
    const textoFechaNormal = campData?.normal_price_text;
    const textoFechaExtraordinaria = campData?.extraordinary_price_text;

    return (
        <div>
            <BecasaHeroSlider titulo={titulo} />
            <EventoInfo
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                direccion={direccion}
                ciudad={ciudad}
            />
            <DirigidoA />
            <Entrenadores />
            <FechasInscripciones
                precioNormal={precioNormal}
                precioExtraordinario={precioExtraordinario}
                textoFechaNormal={textoFechaNormal}
                textoFechaExtraordinaria={textoFechaExtraordinaria}
                campId={campData?.id}
            />
            <QueMasTendras />
            <PatrocinadoresAliados />
            <QueHaceDiferente />
            <OrganizadoresResponsables />
            <FundacionASA />
        </div>
    )
}