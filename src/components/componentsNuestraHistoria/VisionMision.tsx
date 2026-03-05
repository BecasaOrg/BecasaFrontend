"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function VisionMision() {

    const { oscuro } = useTema();

    return (
        <section className={`max-w-6xl mx-auto px-6 py-10 ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            {/* leer bien aca maneje las cosas un poco diferente en cuanto la estructura, para pantallas pequeñas una sola columna y pantallas grandes dos columnas  */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* Mision y Vision */}
                <div className="flex flex-col gap-10 flex-1 pt-16">

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="font-bold text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap">
                                Misión
                            </h2>
                            <span className="flex-1 h-[3px] bg-neon rounded-full" />
                        </div>
                        <p className={`text-sm md:text-base leading-relaxed ${oscuro ? "text-gray-300" : "text-black"} `}>
                            Empoderar a jóvenes atletas para que desbloqueen su máximo potencial
                            deportivo y académico, brindándoles las oportunidades y la guía
                            necesaria para obtener becas deportivas en los EE.UU.
                        </p>
                    </div>


                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="font-bold text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap">
                                Visión
                            </h2>
                            <span className="flex-1 h-[3px] bg-neon rounded-full" />
                        </div>
                        <p className={`text-sm md:text-base leading-relaxed ${oscuro ? "text-gray-300" : "text-black"} `}>
                            Ser la agencia líder en conectar a atletas talentosos con
                            instituciones académicas en los EE.UU.
                        </p>
                    </div>

                    {/* solo visible en telefono y tablet */}
                    <div className="relative w-full h-[280px] md:h-[380px] rounded-3xl overflow-hidden lg:hidden">
                        <Image
                            src="/img/section/Marco.png"
                            alt="Atleta"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </div>

                </div>

                {/* Imagen solo en pantallas grandes */}
                <div className="hidden lg:block relative w-[480px] min-w-[480px] h-[420px] rounded-3xl overflow-hidden">
                    <Image
                        src="/img/section/Marco.png"
                        alt="Atleta"
                        fill
                        sizes="480px"
                        className="object-cover object-center"
                    />
                </div>

            </div>

        </section>
    )
}