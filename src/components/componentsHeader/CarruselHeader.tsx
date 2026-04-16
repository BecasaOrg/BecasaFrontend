"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTema } from "@/context/TemaContext";
import Link from "next/link";
import { fotosHeaders} from "@/data/header";

export default function Carrusel() {
  const [actual, setActual] = useState<number>(0);

  const { oscuro } = useTema();

  // avanza automaticamente cada tres segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % fotosHeaders.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  const anterior = () => {
    setActual((prev) => (prev - 1 + fotosHeaders.length) % fotosHeaders.length);
  };

  const siguiente = () => {
    setActual((prev) => (prev + 1) % fotosHeaders.length);
  };

  return (
    <section className={`relative h-[50vh] md:h-screen flex items-center rounded-bl-[100px] sm:rounded-bl-[216px] justify-start overflow-hidden ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

      {fotosHeaders.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${index === actual ? "opacity-100 z-1" : "opacity-0 z-0"
            }`}
        >
          <Image
            src={slide.imagen}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="w-full object-cover object-[70%_40%] h-full md:h-auto"
            priority={index === 0}
          />

          {/* degradado de la izquierda */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent " />

          {/* Contenido de la imagen */}
          <div className="absolute inset-0 flex items-center z-1">
            <div className="px-8 md:px-16 lg:px-24 max-w-xl">

              <h1 className="text-[#AAFF00] italic font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight">
                {slide.titulo}
              </h1>

              <p className="text-white text-sm md:text-base leading-relaxed mt-4 mb-8 max-w-sm">
                {slide.description}
              </p>

              <div className="flex justify-between space-x-4">
                
              <Link
                href="/unete"
                className="inline-block text-black bg-[#AAFF00] font-bold px-6 py-2 rounded-tl-full rounded-tr-full rounded-br-full transition-all duration-300 text-sm tracking-widest"
              >
                Comenzar
              </Link>

              <Link
                href="/nuestra-historia"
                className="inline-block text-black bg-[#AAFF00] font-bold px-6 py-2 rounded-tl-full rounded-tr-full rounded-br-full transition-all duration-300 text-sm tracking-widest"
              >
                Saber más
              </Link>
              
              </div>


            </div>
          </div>

        </div>
      ))}

      {/* btn anterior  */}
      {/* <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-neon hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
      >
        ‹
      </button> */}

      {/* btn siguiente  */}
      {/* <button
        onClick={siguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-neon hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
      >
        ›
      </button> */}

      {/* puntos indicadores  */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-1">
        {fotosHeaders.map((_, index) => (
          <button
            key={index}
            onClick={() => setActual(index)}
            className={`transition-all duration-300 rounded-full ${index === actual
              ? "bg-[#AAFF00] w-6 h-2"
              : "bg-white/50 w-2 h-2 hover:bg-white"
              }`}
          />
        ))}
      </div>

    </section>
  );
}