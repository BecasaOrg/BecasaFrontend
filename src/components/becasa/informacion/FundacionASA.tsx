"use client"

import { useTema } from "@/context/TemaContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import PreguntasFrecuentes from "../PreguntasFrecuentes";
import PoliticasPrivacidad from "../PoliticasCondiciones";

export default function FundacionASA() {
    const [openModal, setOpenModal] = useState(null);
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

    const cambioTemaDegradado = oscuro ? "linear-gradient(to bottom, #080808 0%, #050d1f 50%, #050d1f 100%)" : "linear-gradient(to top, #050d1f 0%, #0a1628 25%, #1a2744 58%, #2d4060 70%, #3a5070 75%, #ffffff 100%)";

    return (
        <div className="w-full">

            {/* ── Botones superiores ── */}
            <div className="w-full flex flex-wrap justify-center py-4 px-4"
                style={{
                    background: "",
                }}
            >
                <div className="flex md:justify-center flex-col md:flex-row gap-4 md:gap-8 bg-[#060f18] w-[90vw] rounded-3xl py-2 ">
                    <button
                        onClick={() => setOpenModal("faq")}
                        className="bg-[#AAFF00] text-black font-bold text-sm px-8 py-2.5 rounded-full hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Preguntas frecuentes
                    </button>
                    <button
                        onClick={() => setOpenModal("politicas")}
                        className="bg-[#AAFF00] text-black font-bold text-sm px-8 py-2.5 rounded-full hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Políticas y condiciones
                    </button>
                </div>
            </div>
            {openModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-5">
                    <div className="bg-[#060f18] text-white p-6 rounded-2xl w-[95%] sm:w-[80%] md:w-[70%] h-[80vh]  overflow-x-auto relative">

                        {/* Botón cerrar */}
                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-2 right-3 text-white text-xl"
                        >
                            ✕
                        </button>

                        {/* Contenido dinámico */}
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
            {/* ── Sección Fundación ── */}
            <section
                className="w-full relative overflow-hidden py-6 px-4"
                style={{
                    background: cambioTemaDegradado,
                }}
            >
                {/* Glow derecha */}
                <div
                    className="absolute right-0 top-0 h-full w-80 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at right center, #7fff0033 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/40 backdrop-blur-md rounded-3xl px-6 py-8 ">

                    {/* ── Texto ── */}
                    <div>
                        <h2
                            className="text-[#AAFF00] uppercase text-2xl md:text-3xl tracking-wide mb-2"
                            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
                        >
                            Fundación ASA Más
                        </h2>

                        <h3 className="text-white font-bold text-lg md:text-xl mb-4">
                            Lorem ipsum dolor sit amet, consectetue.
                        </h3>

                        <p className="text-white/55 text-sm leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
                            odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                            nulla facilisi.
                        </p>

                        <p className="text-white/55 text-sm leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                            consequat.
                        </p>

                        <p className="text-white/55 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                            consequat. Duis autem vel eum.
                        </p>
                    </div>

                    {/* ── Imagen ── */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/img/becasa/fundacion-ASA.jpg"
                            alt="Fundación ASA Más - foto grupal"
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
}