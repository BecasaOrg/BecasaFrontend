'use client'; // 1. Convertimos a componente de cliente

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

// 2. Componente que contiene la lógica de datos
function InformacionContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "1";
    
   // Definimos una interfaz básica para que TypeScript esté contento
interface CampData {
    id?: string;
    name?: string;
    start_date?: string;
    end_date?: string;
    address?: string;
    price?: string;
    extraordinary_price?: string;
    normal_price_text?: string;
    extraordinary_price_text?: string;
    city?: {
        name: string;
    };
}

// ... dentro de InformacionContent:
const [campData, setCampData] = useState<CampData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Quitamos el { cache: "no-store" } porque en el cliente no existe esa opción de Next
                const res = await fetch(`https://athleticscholarshipagency.com/api/camps/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCampData(data);
                }
            } catch (e) {
                console.error("Error fetching camp:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Si está cargando, mostramos un estado inicial para que no se vea vacío
    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando información del campamento...</div>;

    const titulo = campData?.name || "BECASA CAMP 2026";
    const fechaInicio = campData?.start_date;
    const fechaFin = campData?.end_date;
    const direccion = campData?.address || "Kr 20 #6a - 50";
    const ciudad = campData?.city?.name || "Bogotá";
    
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
    );
}

// 3. El export principal debe estar envuelto en Suspense
// Esto es obligatorio en Next.js para usar useSearchParams en modo estático
export default function Informacion() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <InformacionContent />
        </Suspense>
    );
}