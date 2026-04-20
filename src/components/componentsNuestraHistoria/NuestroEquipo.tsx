"use client";

import { useTema } from "@/context/TemaContext";
import { nuestroEquipo } from "@/data/nuestroEquipo";
import Image from "next/image"
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function NuestroEquipo() {

    const { oscuro } = useTema();
    const [page, setPage] = useState<number>(0)

    const totalPages = Math.ceil(nuestroEquipo.length / ITEMS_PER_PAGE)
    const currentMembers = nuestroEquipo.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    return (
        <section className={`max-w-3xl mx-auto px-6 py-10 ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            <div className="flex items-center gap-3 mb-12 justify-center">
                <h2 className="font-black text-2xl md:text-4xl uppercase tracking-widest whitespace-nowrap">
                    Nuestro Equipo
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {currentMembers.map((miembro) => (
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
                        <div className="absolute -top-1 right-0">
                            <span className="bg-black text-[#AAFF00] text-[10px] md:text-xs font-bold px-2 py-1 rounded-bl-xl  rounded-tr-xl whitespace-nowrap">
                                {miembro.rol}
                            </span>
                        </div>

                        {/* Nombre abajo */}
                        <div className="absolute bottom-0 left-0 right-0">
                            <span className="bg-[#AAFF00] text-black text-xs md:text-sm font-bold px-3 py-1 rounded-bl-xl  rounded-tr-xl whitespace-nowrap">
                                {miembro.nombre}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
            {/* Dots de navegación */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === page ? "bg-[#AAFF00] scale-125" : "bg-gray-500"
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}