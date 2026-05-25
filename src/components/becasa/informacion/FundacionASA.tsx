"use client"

import { useTema } from "@/context/TemaContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import PreguntasFrecuentes from "../PreguntasFrecuentes";
import PoliticasPrivacidad from "../PoliticasCondiciones";

export default function FundacionASA() {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const { oscuro } = useTema();

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Limpieza por si el componente se desmonta
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openModal]);

    const cambioTemaDegradado = oscuro ? "linear-gradient(to bottom, #080808 0%, #0A0E2A 50%, #0A0E2A 100%)" : "linear-gradient(to top, #0A0E2A 0%, #0d1235 25%, #1e2a50 58%, #2a3560 70%, #4a5578 75%, #8a92a8 88%, #ffffff 100%)";

    const fadedCircle = "w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,_rgba(170,255,0,0.8)_0%,_rgba(170,255,0,0.3)_50%,_transparent_80%)] blur-2xl absolute "

    return (
        <div className="w-full">

            {/* Botones superiores */}
            <div className="w-full flex flex-wrap justify-center py-4 px-4 bg-[#0A0E2A] relative overflow-hidden " >
                <div className={` ${fadedCircle} -top-30 left-0`} />
                <div className={` ${fadedCircle} top-0 left-[50%] `} />
                <div className={` ${fadedCircle} -bottom-10 right-0`} />
                <div className="flex md:justify-center flex-col md:flex-row gap-4 md:gap-8 bg-[#0A0E2A] w-[90vw] rounded-3xl relative w-[90%] ">
                    <button
                        onClick={() => setOpenModal("faq")}
                        className="bg-[#AAFF00] text-black font-bold text-sm px-8 py-0.5 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-200"
                    >
                        Preguntas frecuentes
                    </button>
                    <button
                        onClick={() => setOpenModal("politicas")}
                        className="bg-[#AAFF00] text-black font-bold text-sm px-8 py-0.5 rounded-full hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 "
                    >
                        Políticas y condiciones
                    </button>
                </div>
            </div>
            {openModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-5">
                    <div className="bg-[#060f18] text-white p-6 rounded-2xl w-[95%] sm:w-[80%] md:w-[70%] h-[80vh]  overflow-x-auto relative">

                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-2 right-3 text-white text-xl"
                        >
                            ✕
                        </button>

                        {openModal === "faq" && (
                            <div>
                                <PreguntasFrecuentes />
                            </div>
                        )}

                        {openModal === "politicas" && (
                            <div>
                                <PoliticasPrivacidad />
                            </div>
                        )}

                    </div>
                </div>
            )}
            {/* Sección Fundación */}
            <section
                className="w-full relative overflow-hidden pt-6 px-4"
                style={{ background: cambioTemaDegradado }}
            >
                <div className="relative z-1 bg-black/40 backdrop-blur-md rounded-3xl px-6 py-8">

                    {/* Contenedor con float en tablet */}
                    <div className="flex flex-col-reverse md:block lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">

                        {/* Imagen con flota a la derecha solo en tablet */}
                        <div className="md:float-right md:ml-4 md:mb-3 mt-[5%] md:w-[40%] lg:float-none lg:w-full lg:ml-0 lg:mb-0 lg:order-2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/img/becasa/fundacion-ASA.jpg"
                                alt="Fundación ASA Más - foto grupal"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Texto fluye alrededor de la imagen en tablet */}
                        <div className="lg:order-1">
                            <h2
                                className="text-[#AAFF00] uppercase text-2xl lg:text-3xl tracking-wide mb-2"
                                style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
                            >
                                Fundación ASA Más
                            </h2>
                            <p className="text-white/55 text-sm leading-relaxed mb-4">
                                En Athletic Scholarship Agency (ASA) somos una organización dedicada a acompañar a atletas latinoamericanos en su camino hacia una beca deportiva y académica en Estados Unidos. Nuestro equipo está formado por ex atletas universitarios, entrenadores, mentores y profesionales que han vivido este proceso en primera persona y ahora trabajan para hacerlo más claro, accesible y estratégico para ti.
                            </p>
                            <p className="text-white/55 text-sm leading-relaxed mb-4">
                                Evaluamos tu perfil, te preparamos, te guiamos con honestidad y te conectamos con universidades que realmente valoren tu talento. Nuestra misión es ayudarte a alcanzar tu máximo potencial como atleta, estudiante y líder, mientras construyes un proyecto de vida lleno de propósito.
                            </p>
                            <p className="text-white/55 text-sm leading-relaxed">
                                Muy pronto recibirás información sobre las siguientes etapas del evento, oportunidades educativas y recursos exclusivos para tu desarrollo.
                            </p>
                            <p className="font-bold text-white">
                                Esto apenas comienza.
                            </p>
                            <p className="text-white/55 text-sm leading-relaxed">
                                Tu talento puede abrirte más puertas de las que imaginas.
                            </p>
                            <p className="text-white leading-relaxed">
                                Nos emociona tenerte en el camino de BECASA CAMP 2026.
                            </p>

                            {/* Clearfix para el float */}
                            <div className="clear-both lg:hidden" />
                        </div>

                    </div>
                </div>
                <hr className="text-white mt-5" />
            </section>
        </div>
    );
}