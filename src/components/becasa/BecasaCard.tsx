"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTema } from "@/context/TemaContext";

const DEPORTES = ["Fútbol", "Voleibol", "Natación", "Tenis", "Atletismo", "Béisbol", "Basquetbol"];

const becas = [
  {
    id: 1,
    titulo: "BECASA CAMP 2026 - SOCCER",
    ciudad: "Barranquilla",
    fecha: "21 / 06 / 2026",
    edad: "12 a 25 años",
    cupos: 45,
    deporte: "Fútbol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-soccer",
  },
  {
    id: 2,
    titulo: "BECASA CAMP 2026 - VOLLEY",
    ciudad: "Bogotá",
    fecha: "10 / 06 / 2026",
    edad: "15 a 25 años",
    cupos: 20,
    deporte: "Voleibol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-volley",
  },
  {
    id: 3,
    titulo: "BECASA CAMP 2026 - SOCCER",
    ciudad: "Barranquilla",
    fecha: "21 / 06 / 2026",
    edad: "12 a 25 años",
    cupos: 45,
    deporte: "Fútbol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-soccer",
  },
  {
    id: 4,
    titulo: "BECASA CAMP 2026 - VOLLEY",
    ciudad: "Bogotá",
    fecha: "10 / 06 / 2026",
    edad: "15 a 25 años",
    cupos: 20,
    deporte: "Voleibol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-volley",
  },
  {
    id: 5,
    titulo: "BECASA CAMP 2026 - SOCCER",
    ciudad: "Barranquilla",
    fecha: "21 / 06 / 2026",
    edad: "12 a 25 años",
    cupos: 45,
    deporte: "Fútbol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-soccer",
  },
  {
    id: 6,
    titulo: "BECASA CAMP 2026 - VOLLEY",
    ciudad: "Bogotá",
    fecha: "10 / 06 / 2026",
    edad: "15 a 25 años",
    cupos: 20,
    deporte: "Voleibol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-volley",
  },
  {
    id: 7,
    titulo: "BECASA CAMP 2026 - SOCCER",
    ciudad: "Barranquilla",
    fecha: "21 / 06 / 2026",
    edad: "12 a 25 años",
    cupos: 45,
    deporte: "Fútbol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-soccer",
  },
  {
    id: 8,
    titulo: "BECASA CAMP 2026 - SOCCER",
    ciudad: "Barranquilla",
    fecha: "21 / 06 / 2026",
    edad: "12 a 25 años",
    cupos: 45,
    deporte: "Fútbol",
    logo: "/img/becasa/becasa_camp.jpg",
    slug: "becasa-camp-2026-soccer",
  },
];

export default function BecasaCard() {
  const [deporteActivo, setDeporteActivo] = useState("Fútbol");
  const { oscuro } = useTema();

  const becasFiltradas = becas.filter((b) => b.deporte === deporteActivo);

  const fadedCircleOne = "w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(170,255,0,0.8)_0%,_rgba(170,255,0,0.3)_50%,_transparent_80%)] blur-2xl absolute "

  const fadedCircleTwo = "w-[400px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(170,255,0,0.8)_0%,_rgba(170,255,0,0.3)_50%,_transparent_80%)] blur-2xl absolute "

  return (
    <section className={`w-full py-10 px-2 relative bg-[#0A0E2A] overflow-hidden `}>
      <div className={` ${fadedCircleOne} -top-30 -left-60`} />
      <div className={` ${fadedCircleTwo} -top-30 left-[50%] `} />
      <div className={` ${fadedCircleOne} -bottom-40 -right-60 `} />

      <div className="bg-[#0A0E2A]/80 py-5 rounded-3xl relative ">
        {/* Filtros */}
        <div className="mb-8 flex flex-col items-center ">
          <div className="gap-3 bg-white/70 rounded-full px-5 py-0.5 w-[90%] md:w-auto flex overflow-y-scroll [scrollbar-width:none] ">
            {DEPORTES.map((d) => (
              <button
                key={d}
                onClick={() => setDeporteActivo(d)}
                className={`px-4 py-0.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap
              ${deporteActivo === d
                    ? "bg-[#AAFF00] text-black border-[#AAFF00] font-bold"
                    : "text-white"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {becasFiltradas.length === 0 ? (
          <p className="text-center text-white/35 py-12 text-sm">
            No hay becas disponibles para este deporte aún.
          </p>
        ) : (
          <div id="becasaCampamento" className="grid grid-cols-1 md:grid-cols-2 gap-3 px-3 sm:px-10 ">
            {becasFiltradas.map((beca) => (
              <div
                key={beca.id}
                className={`bg-[#0f1b2d] border border-white/10
                rounded-2xl sm:rounded-bl-[150px] sm:rounded-tl-[150px] sm:rounded-tr-2xl sm:rounded-br-2xl p-2.5 pr-3.5 flex items-center gap-3 hover:-translate-y-0.5 transition-transform duration-200 relative
               ${oscuro ? "bg-[#0a1520] " : "bg-white/30 shadow-2xl"}`}>
                {/* Logo */}
                <div className="relative w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] overflow-hidden rounded-full bg-[#1a2e45] flex-shrink-0">
                  <Image
                    src={beca.logo}
                    alt={beca.titulo}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div>
                    <p className="font-bold text-[15px] sm:text-[25px] md:text-[20px] lg:text-[25px] xl:text-[30px] leading-snug tracking-wide text-white whitespace-nowrap" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700 }} >
                      {beca.titulo}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-relaxed text-white/70">
                      {beca.ciudad} — {beca.fecha}
                      {/* <br /> */}
                      {beca.edad}
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-2 whitespace-nowrap">
                    <Link
                      href={`/becasa/informacion`}
                      className="text-[12px] font-bold rounded-full py-1 px-2 sm:px-5 bg-white transition-colors whitespace-nowrap text-black "
                    >
                      Información
                    </Link>
                    <Link
                      href={`becasa/registrate`}
                      className="text-[12px] font-bold text-black bg-[#AAFF00] rounded-full py-1 px-2 sm:px-5 hover:opacity-85 transition-opacity whitespace-nowrap"
                    >
                      Regístrate
                    </Link>
                  </div>
                </div>

                {/*cupos */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#AAFF00] flex flex-col items-center justify-center absolute -top-4 -right-3 sm:static md:absolute md:-top-4 md:-right-6 lg:static " >
                  <span className="text-[18px] font-black text-black leading-none">{beca.cupos}</span>
                  <span className="text-[8px] font-black text-black tracking-widest">CUPOS</span>
                </div>
              </div>
            ))}
          </div>
        )
        }
      </div >
    </section >
  );
}