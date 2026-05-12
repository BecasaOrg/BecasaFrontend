"use client";

import Carrusel from "@/components/componentsHeader/CarruselHeader";
import { useTema } from "@/context/TemaContext";
import Servicios from "@/components/componentsHeader/Servicios";
import Aliados from "@/components/componentsHeader/Aliados";
import UneneNosotros from "@/components/componentsHeader/UneneNosotros";
import WelcomeModal from "@/components/WelcomeModal";
import BecasaCampBanner from "@/components/becasa/BecasaCampBanner";

export default function Home() {
  const { oscuro } = useTema();

  return (
    <main className={`${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>
        <WelcomeModal />
       <Carrusel />
       <BecasaCampBanner />
       <Servicios />
       <Aliados />
       <UneneNosotros />
    </main>
  );
}
