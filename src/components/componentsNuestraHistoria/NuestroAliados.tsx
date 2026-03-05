"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function NuestroAliados() {

    const { oscuro } = useTema();

    return (
        <section className={`py-10 px-6 ${oscuro ? "bg-white text-white" : "bg-white text-black"} `}>
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-center items-center gap-3 mb-12">
                    <h2 className="text-black font-black text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap">
                        Nuestros Aliados
                    </h2>
                    <Image
                        src="/img/section/vineta.png"
                        alt="viñeta"
                        width={30}
                        height={12}
                        style={{ width: "30px", height: "auto" }}
                        className="object-contain"
                    />
                </div>

                {/* Logos de aliados */}
                <div className="flex justify-center items-center gap-10 md:gap-16">

                    <div className="relative w-[120px] md:w-[160px] h-[70px] md:h-[90px]">
                        <Image
                            src="/img/aliados/PLAYERSON_LOGO_FUNDO_AMARELO.png"
                            alt="Aliado Playerson"
                            fill
                            sizes="(max-width: 768px) 120px, 160px"
                            className="object-contain"
                        />
                    </div>

                    <div className="relative w-[120px] md:w-[160px] h-[70px] md:h-[90px]">
                        <Image
                            src="/img/aliados/Logo_SuVisaYa.png"
                            alt="Aliado SuVisaYa"
                            fill
                            sizes="(max-width: 768px) 120px, 160px"
                            className="object-contain"
                        />
                    </div>

                    <div className="relative w-[120px] md:w-[160px] h-[70px] md:h-[90px]">
                        <Image
                            src="/img/aliados/AVBA.png"
                            alt="Aliado AVBA"
                            fill
                            sizes="(max-width: 768px) 120px, 160px"
                            className="object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}