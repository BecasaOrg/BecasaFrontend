"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function VisionMision() {

    const { oscuro } = useTema();

    return (
        <section className={`w-full ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            {/* leer bien aca maneje las cosas un poco diferente en cuanto la estructura, para pantallas pequeñas una sola columna y pantallas grandes dos columnas  */}
            <div className="flex flex-col md:flex-row gap-12 items-start ">

                {/* Mision y Vision */}
                <div className="flex flex-col gap-10 flex-1 pt-26 md:pl-10">

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="font-bold text-2xl md:text-3xl uppercase tracking-widest whitespace-nowrap">
                                Misión
                            </h2>
                            <span className="flex-1 h-[3px] bg-neon rounded-full" />
                        </div>
                        <p className={`text-base leading-relaxed max-w-[500px] ${oscuro ? "text-gray-300" : "text-black"} `}>
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
                        <p className={`text-base leading-relaxed max-w-[500px]  ${oscuro ? "text-gray-300" : "text-black"} `}>
                            Ser la agencia líder en conectar a atletas talentosos con
                            instituciones académicas en los EE.UU.
                        </p>
                    </div>

                    {/* solo visible en telefono y tablet */}
                    <div className="relative overflow-hidden w-full md:hidden flex justify-center">
                        <Image
                            src="/img/section/Marco.png"
                            alt="Atleta"
                            height="512"
                            width="428"
                            sizes="100vw"
                            className="rounded-xl"
                        />
                    </div>

                </div>

                {/* Imagen solo en pantallas grandes */}
                <div className="hidden md:block relative md:w-[428px] md:h-[512px] lg:w-[698px] lg:h-[792px] overflow-hidden">
                    <Image
                        src="/img/section/Marco.png"
                        alt="Atleta"
                        fill
                        sizes="480px"
                        className=""
                    />
                </div>

            </div>

        </section>
    )
}