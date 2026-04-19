"use client";
import { useState } from "react";
import Image from "next/image";
import { useTema } from "@/context/TemaContext";
import Link from "next/link";
import { servicios } from "@/data/servicios";

export default function Servicios() {

  const [actual, setActual] = useState<number>(0);

  const { oscuro } = useTema();

  const CARDS_PER_VIEW = 3;
  const maxPosition = Math.max(0, servicios.length - CARDS_PER_VIEW);
  const visibleServicios = servicios.slice(actual, actual + CARDS_PER_VIEW);

  const anterior = () => {
    setActual((prev) => Math.max(0, prev - 1));
  };

  const siguiente = () => {
    setActual((prev) => Math.min(maxPosition, prev + 1));
  };

  return (
    <>


      <section id="services" className={`py-12 sm:py-16  ${oscuro ? "bg-black " : " text-black"}`} >
        <div className={`container mx-auto px-4 ${oscuro ? "bg-black " : "bg-white text-black"}`}>
          <div className="prueba">
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 sm:text-start ">  LO QUE OFRECEMOS </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className=" rounded-lg  sm:text-start">
              <Link
                href="/servicios"
                className="inline-block text-black bg-[#AAFF00] font-bold px-6 py-2 rounded-tl-full rounded-tr-full rounded-br-full transition-all duration-300 text-sm tracking-widest"
              >
                Saber más
              </Link>


              <p className="my-4 sm:my-7 text-justify font-bold">Nuestros servicios cubren desde la creación de perfiles
                académicos y deportivos hasta la producción de videos destacados, todo con el objetivo de
                maximizar tus oportunidades.</p>

            </div>
            <div className="relative overflow-hidden col-span-2" id="services-carousel">

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                {visibleServicios.map((slide) => (
                  <div
                    key={slide.id}
                    className="bg-gray-100 rounded-lg p-6 shadow-md rounded-br-[70px] rounded-tl-[70px]"
                  >
                    <Image
                      src={slide.imagen}
                      alt={slide.alt}
                      width={400}
                      height={300}
                      className="object-cover rounded-lg"
                    />
                    <h3 className={`text-lg font-bold mb-2 ${oscuro ? "text-black" : "text-black"}`}>{slide.titulo}</h3>
                    <Link href="/servicios" className={`font-bold hover:underline ${oscuro ? "text-black" : "text-black"}`}>
                      Saber más
                    </Link>
                  </div>
                ))}
              </div>
              <button
                onClick={anterior}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-2 rounded-full"
                aria-label="Anterior servicio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={siguiente}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-2 rounded-full"
                aria-label="Siguiente servicio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="flex justify-center mt-4 space-x-2" id="carousel-dots">
                   {/* puntos indicadores  */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-1">
                          {visibleServicios.map((_, index) => (
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
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 

        <section className={`relative h-[50vh] md:h-screen flex items-center rounded-bl-[100px] sm:rounded-bl-[216px] justify-start overflow-hidden ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>



          {servicios.map((slide, index) => (
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
              />*/}

      {/* degradado de la izquierda 

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent " /> */}

      {/* Contenido de la imagen 
              <div className="absolute inset-0 flex items-center z-1">
                <div className="px-8 md:px-16 lg:px-24 max-w-xl">

                  <h1 className="text-[#AAFF00] italic font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight">
                    {slide.titulo}
                  </h1>

                  <p className="text-white text-sm md:text-base leading-relaxed mt-4 mb-8 max-w-sm">
                    {slide.descripcion}
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
          ))} */}

      {/* btn anterior  

          <button
            onClick={anterior}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-neon hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
          >
            ‹
          </button> */}

      {/* btn siguiente  
          <button
            onClick={siguiente}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-1 bg-black/50 hover:bg-neon hover:text-black text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 backdrop-blur-sm"
          >
            ›
          </button>

          {/* puntos indicadores  
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-1">
            {servicios.map((_, index) => (
              <button
                key={index}
                onClick={() => setActual(index)}
                className={`transition-all duration-300 rounded-full ${index === actual
                  ? "bg-[#AAFF00] w-6 h-2"
                  : "bg-white/50 w-2 h-2 hover:bg-white"
                  }`}
              />
            ))}
          </div> */}
      {/* </section>  */}
    </>



  )
}