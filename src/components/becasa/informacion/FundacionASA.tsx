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
                style={{
                    background: cambioTemaDegradado,
                }}
            >

                <div className="relative z-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/40 backdrop-blur-md rounded-3xl px-6 py-8 ">

                    {/* Texto */}
                    <div>
                        <h2
                            className="text-[#AAFF00] uppercase text-2xl md:text-3xl tracking-wide mb-2"
                           style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
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

                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/img/becasa/fundacion-ASA.jpg"
                            alt="Fundación ASA Más - foto grupal"
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>
            <hr className="text-white mt-5" />
            </section>
        </div>
    );
}