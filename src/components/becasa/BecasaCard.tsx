"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTema } from "@/context/TemaContext";

interface Beca {
  id: number;
  titulo: string;
  ciudad: string;
  fecha: string;
  edad: string;
  cupos: number;
  deporte: string;
  logo: string;
  slug: string;
}

const DEPORTES = ["Voleibol", "Fútbol", "Natación", "Tenis", "Atletismo", "Béisbol", "Basquetbol"];

const mapDeporte: Record<string, string> = {
  "futbol": "Fútbol",
  "voleibol": "Voleibol",
  "natacion": "Natación",
  "tenis": "Tenis",
  "atletismo": "Atletismo",
  "beisbol": "Béisbol",
  "basquetbol": "Basquetbol",
  "football": "Fútbol",
  "volleyball": "Voleibol",
  "swimming": "Natación",
  "tennis": "Tenis",
  "athletics": "Atletismo",
  "baseball": "Béisbol",
  "basketball": "Basquetbol"
};

export default function BecasaCard() {
  const [deporteActivo, setDeporteActivo] = useState("Voleibol");
  const [becas, setBecas] = useState<Beca[]>([]);
  const [cargando, setCargando] = useState(true);
  const { oscuro } = useTema();

  useEffect(() => {
    const fetchCampamentos = async () => {
      try {
        const response = await fetch("/api/camps");
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const campamentosFormateados: Beca[] = data.data.map((camp: any) => {
          const apiSportLower = (camp.sport_type || "").toLowerCase();
          const deporteMapeado = mapDeporte[apiSportLower] || camp.sport_type || "Fútbol";

          const fechaObj = new Date(camp.start_date);
          const fechaFormateada = `${fechaObj.getDate().toString().padStart(2, '0')} / ${(fechaObj.getMonth() + 1).toString().padStart(2, '0')} / ${fechaObj.getFullYear()}`;

          return {
            id: camp.id,
            titulo: camp.name,
            ciudad: camp.city?.name || "No especificada",
            fecha: fechaFormateada,
            edad: `${camp.min_age} a ${camp.max_age} años`,
            cupos: parseInt(camp.capacity, 10),
            deporte: deporteMapeado,
            logo: "/img/becasa/becasa_camp.jpg",
            slug: camp.id.toString(),
          };
        });

        setBecas(campamentosFormateados);
      } catch (error) {
        console.error("Error fetching campamentos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchCampamentos();
  }, []);

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
        {cargando ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#AAFF00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : becasFiltradas.length === 0 ? (
          <p className="text-center text-white/35 py-12 text-sm">
            Próximamente nuevos campamentos BECASA.
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
                      href={`/becasa/informacion?id=${beca.id}`}
                      className="text-[12px] font-bold rounded-full py-1 px-2 sm:px-5 bg-white transition-colors whitespace-nowrap text-black "
                    >
                      Información
                    </Link>
                    <Link
                      href={`becasa/registrate?camp_id=${beca.id}`}
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