"use client";

import { useTema } from "@/context/TemaContext";
import { nuestroEquipo } from "@/data/nuestroEquipo";
import Image from "next/image"


export default function NuestroEquipo() {

    const { oscuro } = useTema();

    return (
        <section className={`max-w-6xl mx-auto px-6 py-10 ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            <div className="flex items-center gap-3 mb-12">
                <h2 className="font-black text-3xl md:text-4xl uppercase tracking-widest whitespace-nowrap">
                    Nuestro Equipo
                </h2>
                <span className="w-10 h-[4px] bg-neon rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {nuestroEquipo.map((miembro) => (
                    <div
                        key={miembro.id}
                        className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
                    >
                        {/* Foto miembros */}
                        <Image
                            src={miembro.imagen}
                            alt={miembro.nombre}
                            fill
                            sizes="(max-width: 768px) 120px, 160px"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* rol arriba */}
                        <div className="absolute top-0 right-0">
                            <span className="bg-[#AAFF00] text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                                {miembro.rol}
                            </span>
                        </div>

                        {/* Nombre abajo */}
                        <div className="absolute bottom-0 left-0 right-0">
                            <span className="bg-[#AAFF00] text-black text-xs md:text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                {miembro.nombre}
                            </span>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    )
}