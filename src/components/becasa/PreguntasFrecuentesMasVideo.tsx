"use client";

import { useTema } from "@/context/TemaContext";
import VideoAthletic from "./VideoAthletic";
import PreguntasFrecuentes from "./PreguntasFrecuentes";


export default function PreguntasFrecuentesMasVideo() {
  const { oscuro } = useTema();

  const cambioTemaDegradado = oscuro ? "linear-gradient(to bottom, #080808 0%, #050d1f 50%, #050d1f 100%)" : "linear-gradient(to top, #050d1f 0%, #0a1628 25%, #1a2744 58%, #2d4060 70%, #3a5070 75%, #ffffff 100%)";

  return (
    <section className="w-full py-16 px-4 overflow-hidden "
      style={{
        background: cambioTemaDegradado
      }}
    >
      {/* Título */}
      <h2
        className="text-center text-[#AAFF00] text-3xl md:text-4xl tracking-widest uppercase mb-10"
        style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", letterSpacing: "0.12em" }}
      >
        Preguntas Mas Frecuentes
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">

        {/* Columna izquierda: acordeón*/}
        <PreguntasFrecuentes />

        {/*  Columna derecha: video + chevron decorativo */}
       <VideoAthletic />

      </div>
    </section>
  );
}
