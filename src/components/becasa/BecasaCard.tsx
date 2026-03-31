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
    logo: "/img/becas/soccer.png",
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
    logo: "/img/becas/volley.png",
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
    logo: "/img/becas/soccer.png",
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
    logo: "/img/becas/volley.png",
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
    logo: "/img/becas/soccer.png",
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
    logo: "/img/becas/volley.png",
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
    logo: "/img/becas/soccer.png",
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
    logo: "/img/becas/soccer.png",
    slug: "becasa-camp-2026-soccer",
  },
];

export default function BecasaCard() {
  const [deporteActivo, setDeporteActivo] = useState("Fútbol");
  const { oscuro } = useTema();

  const becasFiltradas = becas.filter((b) => b.deporte === deporteActivo);

  return (
    <section className={`w-full py-10 px-4  ${oscuro ? "bg-black/60 text-white" : "bg-white/60 text-black"}`}>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DEPORTES.map((d) => (
          <button
            key={d}
            onClick={() => setDeporteActivo(d)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 whitespace-nowrap
              ${deporteActivo === d
                ? "bg-[#AAFF00] text-black border-[#AAFF00] font-bold"
                : ""
              }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Grid */}
      {becasFiltradas.length === 0 ? (
        <p className="text-center text-white/35 py-12 text-sm">
          No hay becas disponibles para este deporte aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {becasFiltradas.map((beca) => (
            <div
              key={beca.id}
              className={`bg-[#0f1b2d] border border-white/10
                rounded-2xl max-[420px]:rounded-2xl
                sm:[border-radius:9999px_16px_16px_9999px]
                p-2.5 pr-3.5 flex items-center gap-3
                hover:-translate-y-0.5 transition-transform duration-200
               ${oscuro ? "bg-[#0a1520] text-white " : "bg-white/60 text-black shadow-2xl"}`}>
              {/* Logo */}
              <div className="relative w-[68px] h-[68px] min-w-[68px] rounded-full overflow-hidden bg-[#1a2e45] flex-shrink-0">
                <Image
                  src={beca.logo}
                  alt={beca.titulo}
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div>
                  <p className="font-bold text-[13px] leading-snug tracking-wide">
                    {beca.titulo}
                  </p>
                  <p className={`text-[11px] mt-0.5 leading-relaxed  ${oscuro ? "text-white/40" : "text-black/40"}`}>
                    {beca.ciudad} — {beca.fecha}
                    <br />
                    {beca.edad}
                  </p>
                </div>

                {/* Botones */}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/becasa/informacion`}
                    className={`text-[12px] border rounded-full py-1 px-3.5 hover:bg-white/8 transition-colors whitespace-nowrap  ${oscuro ? "bg-black85 text-white border-white/25" : "bg-white/60 text-black border-black/25"}`}
                  >
                    Información
                  </Link>
                  <Link
                    href={`becasa/registrate`}
                    className="text-[12px] font-bold text-black bg-[#AAFF00] rounded-full py-1 px-3.5 hover:opacity-85 transition-opacity whitespace-nowrap"
                  >
                    Regístrate
                  </Link>
                </div>
              </div>

              {/*cupos */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#AAFF00] flex flex-col items-center justify-center">
                <span className="text-[18px] font-black text-black leading-none">{beca.cupos}</span>
                <span className="text-[8px] font-black text-black tracking-widest">CUPOS</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}