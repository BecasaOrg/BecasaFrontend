"use client";

import { useTema } from "@/context/TemaContext";
import VideoAthletic from "./VideoAthletic";
import PreguntasFrecuentes from "./PreguntasFrecuentes";


export default function PreguntasFrecuentesMasVideo() {
  const { oscuro } = useTema();

  return (
    <section className="w-full py-16 px-4 overflow-hidden relative " >
      <div
        className="absolute right-0 -bottom-50 h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url('/img/becasa/Vector.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "auto 100%",
          width: "100%",
        }}
      />
      {/* Título */}
      <h2
        className="text-center text-[#AAFF00] text-3xl md:text-4xl tracking-widest uppercase mb-10"
        style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}>
        Preguntas Mas Frecuentes
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Columna izquierda: acordeón*/}
        <div className="z-1 lg:w-[45vw] order-2 lg:order-1 ">
          <PreguntasFrecuentes />
        </div>

        {/*  Columna derecha: video + chevron decorativo */}
        <div className="lg:w-[47vw] order-1 lg:order-2 ">
          <VideoAthletic />
        </div>

      </div>
    </section>
  );
}
