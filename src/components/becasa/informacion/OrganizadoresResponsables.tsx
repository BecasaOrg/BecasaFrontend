"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTema } from "@/context/TemaContext";
import { FaInstagram } from "react-icons/fa";

const organizadores = [
    {
        id: 1,
        nombre: "Juan Sebastián Rodríguez Ortiz",
        descripcion:
            "Estudiante-atleta colombiano de Psicología en Bethel University (Indiana, EE. UU.), donde combina sus estudios universitarios con el voleibol de alto rendimiento. Cofundador de Athletic Scholarship Agency (ASA) y de la Fundación ASA Mas, conoce de primera mano los retos y oportunidades de conseguir una beca deportiva en Estados Unidos. Su propósito es servir como mentor y plataforma de impulso para que más jóvenes utilicen sus talentos y construyan un futuro mejor para ellos, sus familias y sus comunidades.",
        foto: "/img/nuestroEquipo/ORGANIZADORES2.jpg",
        instagram: "",
        slug: "organizador-1",
    },
    {
        id: 2,
        nombre: "Andrés Felipe Guzmán Gutiérrez",
        descripcion:
            "Cofundador de Athletic Scholarship Agency (ASA) y la Fundación ASA Mas, e Ingeniero Civil de profesión. Fue jugador de voleibol de la Selección Bogotá y de la Selección Colombia. Entre 2021 y 2025 se desempeñó como estudiante-atleta en Dordt University (Iowa, EE. UU.). Hoy combina su recorrido profesional en Estados Unidos con su pasión por abrir caminos a jóvenes deportistas latinoamericanos. Su misión es desbloquear el máximo potencial humano en más colombianos, formando líderes y agentes de cambio que impacten sus comunidades.",
        foto: "/img/nuestroEquipo/foto-web-asa-ANDRES2.png",
        instagram: "",
        slug: "organizador-2",
    },
];

export default function OrganizadoresResponsables() {
    const [hover, setHover] = useState<number | null>(null);

    const { oscuro } = useTema();

    return (
        <section className={`w-full py-14 px-4 ${oscuro ? " text-white bg-black" : "text-black bg-white"} `}>
            <div className="max-w-4xl mx-auto">

                {/* Título + descripción */}
                <div className="text-center mb-10">
                    <h2
                        className={`uppercase text-md sm:text-xl md:text-3xl lg:text-4xl tracking-widest mb-4 ${oscuro ? " text-white" : "text-black"} `}
                        style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
                    >
                        Organizadores/Responsables
                    </h2>
                    <p className={`text-black/50 text-sm max-w-2xl mx-auto leading-relaxed ${oscuro ? " text-white/55" : "text-black/55"} `}>
                        Detrás de BECASA hay personas que entienden lo que significa soñar con un futuro más grande. Por eso, cada detalle del campamento está pensado para servir, orientar y hacer que cada atleta y cada familia vivan una experiencia cercana, valiosa y llena de propósito.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 gap-5 max-w-2xl mx-auto">
                    {organizadores.map((org) => {
                        const estaActivo = hover === org.id;
                        return (
                            <div
                                key={org.id}
                                className="relative rounded-2xl overflow-hidden aspect-[3/4.5] cursor-pointer group"
                                onMouseEnter={() => setHover(org.id)}
                                onMouseLeave={() => setHover(null)}
                            >
                                {/* Foto — baja al hacer hover */}
                                <div
                                    className="absolute inset-0 transition-transform duration-500 ease-in-out"
                                    style={{ transform: estaActivo ? "translateY(30%)" : "translateY(0)" }}
                                >
                                    <Image
                                        src={org.foto}
                                        alt={org.nombre}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Gradiente sutil abajo */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                                <button
                                    className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/25 transition-colors"
                                >
                                    Saber mas
                                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <ChevronRight size={11} />
                                    </span>
                                </button>

                                {/* Info — entra desde arriba */}
                                <div className="absolute top-0 left-0 right-0 p-2 transition-transform group-hover:bg-black/30 h-screen duration-500 ease-in-out "
                                    style={{ transform: estaActivo ? "translateY(0%)" : "translateY(-30%)" }}
                                >
                                    <a
                                        href={org.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-[0.60rem] px-3 py-1 rounded-full w-fit hover:bg-white/25 transition-colors mb-1 text-white"
                                    >
                                        <FaInstagram size={10} />
                                        Instagram
                                    </a>

                                    <h5 className="text-white text-sm leading-relaxed">{org.nombre}</h5>

                                    <p className="text-[0.60rem] leading-relaxed text-wrap text-white/70">{org.descripcion}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}