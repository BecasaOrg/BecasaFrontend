"use client";

import { useTema } from "@/context/TemaContext";
import { servicios } from "@/data/servicios";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";


type Servicio = typeof servicios[0];

export default function CartasServicios() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [servicioActivo, setServicioActivo] = useState<Servicio | null>(null);

    const { oscuro } = useTema();

    const abrirModal = (servicio: Servicio) => {
        setServicioActivo(servicio);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setServicioActivo(null);
    };
    return (
        <section>
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicios.map((servicio) => (
                        <div
                            key={servicio.id}
                            className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-neon transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(170,255,0,0.15)] rounded-tl-[100px] rounded-br-[100px] "
                        >

                            <div className="relative w-full h-[420px] sm:h-[390px] md:h-[430px] overflow-hidden">
                                <Image
                                    src={servicio.imagen}
                                    alt={servicio.titulo}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/30 to-transparent" />
                            </div>


                            <div className="absolute bottom-0 p-6 flex flex-col gap-3">
                                <h3 className="text-white font-bold text-xl leading-tight group-hover:text-neon transition-colors duration-300">
                                    {servicio.titulo}
                                </h3>


                                <button
                                    onClick={() => abrirModal(servicio)}
                                    className="flex items-center gap-2 mt-2 cursor-pointer bg-[#AAFF00] py-2 w-35 rounded-2xl px-4 text-black font-bold whitespace-nowrap "
                                >
                                    <span>Leer más </span>
                                    <FaArrowRight />
                                </button>
                            </div>

                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-neon group-hover:w-full transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            {modalAbierto && servicioActivo && (
                <div
                    className={`fixed inset-0 z-5 flex items-center justify-center px-4`}
                    onClick={cerrarModal}
                >
                    {/* fondo oscuro */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Popup */}
                    <div
                        className={`relative h-[87vh] border border-neon rounded-3xl max-w-2xl w-full z-6 overflow-x-hidden overflow-y-auto shadow-[0_0_60px_rgba(170,255,0,0.2)] p-8  ${oscuro ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* btn cerras */}
                        <button
                            onClick={cerrarModal}
                            className="absolute top-4 right-4 bg-zinc-800 hover:bg-neon hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-200 z-10"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col md:flex-row gap-6">

                            <div className="flex flex-col gap-4 flex-1">
                                <span className="text-neon text-xs font-bold uppercase tracking-widest">
                                    {servicioActivo.subtitulo}
                                </span>
                                <h2 className="text-2xl font-bold uppercase leading-tight">
                                    {servicioActivo.titulo}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {servicioActivo.descripcion}
                                </p>

                                <div className="w-full h-[1px] bg-zinc-700 my-1" />

                                <p className="text-gray-500 text-xs leading-relaxed">
                                    En Athletic Scholarship Agency te acompañamos en cada paso del proceso
                                    para maximizar tus oportunidades de obtener una beca deportiva en EE.UU.
                                </p>

                                <p className="text-gray-500 text-xs">
                                    ¿Tienes dudas? Contáctanos y te orientamos sin compromiso.
                                </p>
                            </div>

                            <div className="relative w-full md:w-[260px] min-w-[260px] h-[220px] md:h-auto rounded-2xl overflow-hidden">
                                <Image
                                    src={servicioActivo.imagen}
                                    alt={servicioActivo.titulo}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}