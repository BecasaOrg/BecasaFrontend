"use client"

import Image from "next/image";
import { useTema } from "@/context/TemaContext";
import { useState } from "react";

export default function DirigidoA({ titulo }: { titulo: string }) {

    const { oscuro } = useTema();

    const tipoRutaUno = 'PERFORMANCE';
    const tipoRutaDos = 'DISCOVERY';
    const encontarTipoRuta = titulo.indexOf(tipoRutaUno) === -1 ?
        titulo.indexOf(tipoRutaDos)
        :
        titulo.indexOf(tipoRutaUno);


    const rutaFinal = encontarTipoRuta === -1 ?
        'PERFORMANCE'
        :
        'DISCOVERY'

    const rutaExtraida = titulo.slice(encontarTipoRuta, encontarTipoRuta + rutaFinal.length)

    console.log(rutaExtraida);

    return (
        <section className={`w-full px-6 md:px-12 ${oscuro ? "bg-black text-white " : "bg-white text-black shadow-2xl"}`}>

            <hr className="pt-6" />

            <h2 className="uppercase text-left text-3xl md:text-4xl tracking-widest mb-8" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }} >
                Dirigido A:
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* Columna izquierda: texto */}
                <div>

                    <h3 className="font-bold text-xl mb-3 ">
                        RUTA {rutaExtraida}
                    </h3>

                    <p className="text-sm leading-relaxed mb-5">
                        {rutaExtraida == 'PERFORMAN' ? 'está diseñada para atletas entre los 15 y 25 años que se encuentran en una etapa decisiva de su proceso, ya sea en los últimos años del colegio o en transición hacia la universidad. Es una ruta pensada para quienes no solo quieren seguir mejorando su nivel, sino comenzar a proyectarse con intención hacia oportunidades universitarias reales en Estados Unidos.' : 'está diseñada para atletas en etapa de formación, entre los 11 y 14 años, que están empezando a construir su camino en el deporte con más intención. Es una experiencia pensada para quienes sueñan con llevar su talento más lejos, pero todavía necesitan entender mejor qué significa realmente convertirse en un estudiante-atleta y qué pasos deben empezar a dar desde ahora.'}
                       

                    </p>

                    <p className="text-sm leading-relaxed mb-5">
                        {rutaExtraida == 'PERFORMAN' ? 'Aquí el enfoque está en evaluar, exponer y preparar. Los atletas reciben feedback estratégico, viven espacios de competencia y showcase, y entienden mejor cómo presentarse frente a entrenadores, cómo fortalecer su perfil y qué necesitan para dar el siguiente paso con más claridad.' : 'En esta ruta, el enfoque no está solo en entrenar, sino en formar bases sólidas. Los atletas fortalecen fundamentos técnicos, aprenden mejores hábitos, reciben orientación sobre su desarrollo deportivo y comienzan a ganar visión sobre cómo el deporte, la educación y el carácter pueden trabajar juntos para abrir oportunidades reales en el futuro.'}
                    </p>

                    <p className="text-sm leading-relaxed">
                         {rutaExtraida == 'PERFORMAN' ? '' : 'En esta ruta, el enfoque no está solo en entrenar, sino en formar bases sólidas. Los atletas fortalecen fundamentos técnicos, aprenden mejores hábitos, reciben orientación sobre su desarrollo deportivo y comienzan a ganar visión sobre cómo el deporte, la educación y el carácter pueden trabajar juntos para abrir oportunidades reales en el futuro.'}
                    </p>
                </div>

                {/* ── Columna derecha: galeria ── */}
                <div className="flex flex-col gap-3">

                    {/* magen grande */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                            src="/img/becasa/fotos1.jpg"
                            alt="Atleta principal"
                            fill
                            className="object-cover"
                        />

                        {/*año en la imagen */}
                        <div className="absolute top-3 left-3 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                            2025
                        </div>
                    </div>

                    {/* Dos imágenes pequeñas */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/img/becasa/fotos2.jpg"
                                alt="Atleta 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="/img/becasa/fotos3.jpg"
                                alt="Atleta 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
