"use client"
import BecasaCampBanner from "@/components/becasa/BecasaCampBanner";
import BecasaHeroSlider from "@/components/becasa/BecasaHeroSlider";
import BecasaCard from "@/components/becasa/BecasaCard";
import PreguntasFrecuentesMasVideo from "@/components/becasa/PreguntasFrecuentesMasVideo";
import ExperienciaCamp from "@/components/becasa/ExperienciaCamp";
import { useTema } from "@/context/TemaContext";

export default function Becasa() {

    const { oscuro } = useTema();

    const cambioTemaDegradado = oscuro ? "linear-gradient(to top, #0A0E2A 0%, #0A0E2A 20%, #090c24 30%, #07091d 40%, #050716 50%, #030410 60%, #010208 70%, #000000 100%)" : "linear-gradient(to top, #0A0E2A 0%, #0A0E2A 20%, #0d1235 30%, #151d3d 40%, #2a3560 50%, #4a5578 57%, #8a92a8 63%, #ffffff 75%, #ffffff 100%)";
    const toggleColorText = oscuro ? 'text-white' : 'text-black';

    return (
        <div>
            <BecasaHeroSlider />
            <BecasaCampBanner />
            <BecasaCard />
            <div style={{
                background: cambioTemaDegradado, color: toggleColorText
            }}>
                <ExperienciaCamp />
                <PreguntasFrecuentesMasVideo />
            </div>
        </div>
    )
}