"use client"
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { useTema } from "@/context/TemaContext";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Entrenador {
  id: number;
  nombre: string;
  resumen: string;
  descripcion: string;
  foto: string;
  instagram: string;
  slug: string;
}

const entrenadores: Entrenador[] = [
  {
    id: 1,
    nombre: "Adam Brewster",
    resumen: "Head coach de Tabor, exarmador NCAA y profesional en Dinamarca. Aporta alto nivel técnico y gran desarrollo de talento.", 
    descripcion:
      "Adam Brewster tiene una trayectoria muy fuerte como jugador. Se formó en clubes como MAVS, KAMO y HPSTL, donde acumuló reconocimientos importantes, incluyendo una medalla de bronce en la Open Division de USAV Nationals y selección al All-Tournament Team. Luego jugó a nivel NCAA en Lindenwood University, donde fue armador All-Conference en dos ocasiones y récord histórico del programa. Más adelante dio el salto al profesionalismo en Nordenskov, Dinamarca, donde ganó bronce en la Danish Cup y plata en la Danish Volley Ligaen. <br>Como entrenador, Brewster suma una década de experiencia y un recorrido amplio en diferentes niveles. Ha trabajado con más de 15 equipos de club, fue asistente en MidAmerica Nazarene University y Ottawa University, además de desempeñarse con Indy Ignite Pro Volleyball. En 2022 fue nombrado NAIA Assistant Coach of the Year, ha sido presentado en espacios de AVCA y Coaches Insider, y ha contribuido al desarrollo de All-Americans en NAIA. Actualmente vive su primera experiencia como head coach universitario en Tabor College.",
    foto: "/img/becasa/entrenadores/entrenadores1.jpg",
    instagram: "",
    slug: "Head Coach at Tabor College",
  },
  {
    id: 2,
    nombre: "Dillon Dahl",
    resumen: "Head coach de ONU y ex Asistente del Año AVCA NAIA 2023. Lidera un programa histórico, competitivo y sólido en NAIA.", 
    descripcion:
      "Antes de consolidarse como entrenador de voleibol, Dillon Dahl construyó una base competitiva desde el deporte universitario, compitiendo en decatlón y jabalina durante cuatro temporadas en Northern State. Esa etapa refleja un perfil disciplinado, versátil y orientado al alto rendimiento, complementado además por reconocimientos académicos de conferencia que hablan de su constancia dentro y fuera del deporte. <br>Como entrenador, ha tenido un ascenso muy sólido. Fue asistente en Dordt University y Black Hills State University antes de asumir como head coach del programa masculino de Olivet Nazarene University en 2024. Bajo su dirección, ONU logró temporadas competitivas en 2024 y 2025, llegó por primera vez a una final de conferencia, venció a un equipo top 7 nacional y llevó al programa a liderar la NAIA en blocks por set, además de sumar múltiples reconocimientos All-CCAC.",
    foto: "/img/becasa/entrenadores/entrenadores2.jpg",
    instagram: "",
    slug: "Head Coach at Olivet Nazarene University."
  },
  {
    id: 3,
    nombre: "Audrye Alejandro-Rivera",
    resumen: "Coach de Webber con pasado profesional en Puerto Rico y experiencia NCAA/NAIA. Forma equipos competitivos con liderazgo y método.", 
    descripcion:
      "Audrye Alejandro-Rivera llega con una trayectoria muy completa como deportista. Jugó voleibol universitario durante tres años en Elms College, donde fue top 10 líbero nacional, Freshman Athlete of the Year y NECC Defensive Player of the Year. Luego continuó su carrera en Warner University como estudiante de maestría, siendo reconocido dos veces como Mid-South Conference Defensive Player of the Week y como NCCAA Scholar Athlete. Después de esa etapa, fue reclutado por la liga profesional de Puerto Rico, consolidando así una carrera competitiva de 17 años. <br> Su recorrido como entrenador también es amplio y progresivo. Empezó en Elms como Student Intern Coach, luego trabajó durante cuatro temporadas en Warner, donde ayudó al equipo masculino a terminar invicto en temporada regular de conferencia y fue nombrado Assistant Coach of the Year en 2023. Más adelante pasó por Polk State College, dirigió en 2024 a Culver-Stockton College con una mejora de 10 victorias y actualmente lidera el programa de Webber University. Además, ha trabajado en voleibol de club con Top Select Club.",
    foto: "/img/becasa/entrenadores/entrenadores3.jpg",
    instagram: "",
    slug: "Head Coach at Webber International University",
  },
  {
    id: 4,
    nombre: "Andrés Mauricio Rosas",
    resumen: "Head coach de Tabor, exarmador NCAA y profesional en Dinamarca. Aporta alto nivel técnico y gran desarrollo de talento.", 
    descripcion:
      "Su identidad dentro del voleibol se ve marcada por más de 15 años de trabajo en desarrollo, perfeccionamiento y alto rendimiento, con una mirada muy enfocada en la evolución integral del atleta. <br>Como entrenador, Rosas ha dirigido en escenarios importantes del voleibol colombiano. Actualmente está vinculado a la Selección Colombia Sub-17 Masculina y también ha liderado procesos con Zion en la Superliga de Bogotá, la Universidad Central, CNG Athletics y la Selección Bogotá en distintas categorías. Su metodología se describe como sistémico-relacional, influenciada por principios del sistema americano de voleibol, con especial énfasis en táctica por posiciones, transición al alto rendimiento y cultura de equipo.",
    foto: "/img/becasa/entrenadores/entrenadores4.jpg",
    instagram: "",
    slug: "Head Coach at Selección Colombia U-17",
  },
];


function EntrenadorWindow({ entrenador, onCerrar }: { entrenador: Entrenador | null; onCerrar: () => void }) {
  useEffect(() => {
    document.body.style.overflow = entrenador ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [entrenador]);

  if (!entrenador) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onCerrar}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
        >
          <X size={16} className="text-black" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
          <div className="p-8 pr-6">
            <h2
              className="text-black font-black uppercase text-3xl md:text-4xl leading-tight mb-1"
              style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
            >
              {entrenador.nombre}
            </h2>
            <h3 className="text-black font-bold text-lg mb-5">
              {entrenador.slug}
            </h3>
            <div className="flex flex-col gap-4">
              {[entrenador.descripcion, entrenador.descripcion, entrenador.descripcion].map((p, i) => (
                <p key={i} className="text-black/60 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-full rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none overflow-hidden">
            <Image src={entrenador.foto} alt={entrenador.nombre} fill className="object-cover object-top" />
          </div>
        </div>
      </div>
    </div>
  );
}



export default function Entrenadores() {
  const [hover, setHover] = useState<number | null>(null);

  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState<Entrenador | null>(null);

  const { oscuro } = useTema();

  return (
    <section className={`w-full py-14 px-4 md:px-10 ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>
      <hr className="mb-8" />
      <div className="max-w-6xl mx-auto">

        {/* Título + descripción */}
        <div className="text-center mb-10">
          <h2
            className="uppercase text-3xl md:text-4xl tracking-widest mb-4"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
          >
            Entrenadores
          </h2>
          <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${oscuro ? " text-white/75" : "text-black/75"} `} >
            Tener a estos entrenadores en BECASA significa acceder a una perspectiva distinta: una que enseña, te reta, exige y también inspira. Su presencia eleva la experiencia del campamento, enriquece cada entrenamiento y acerca a cada atleta a encontrar ese plan de vida deportivo y académico.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {entrenadores.map((e) => {
            const estaActivo = hover === e.id;
            return (
              <div
                key={e.id}
                className="relative rounded-2xl overflow-hidden aspect-[3/4.5] group bg-[#0a1520]"
                onMouseEnter={() => setHover(e.id)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Foto — baja al hacer hover para dejar espacio a la info */}
                <div className="absolute inset-0 transition-transform duration-500 ease-in-out "
                  style={{ transform: estaActivo ? "translateY(30%)" : "translateY(0)" }}
                >
                  <Image
                    src={e.foto}
                    alt={e.nombre}
                    fill
                    className="object-cover object-center"
                  />
                  {/* Gradiente sobre la foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setEntrenadorSeleccionado(e);
                  }}
                  className="absolute bottom-2 left-3 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-xs px-3 py-1 rounded-full w-fit hover:bg-white/25 transition-colors mb-2 z-1 text-white">
                  Saber más
                  <ChevronRight size={11} />
                </button>

                {/* Info — entra desde arriba al hacer hover */}
                <div className="absolute top-0 left-0 right-0 p-2 transition-transform group-hover:bg-black/30 h-screen duration-500 ease-in-out "
                  style={{ transform: estaActivo ? "translateY(0%)" : "translateY(-30%)" }}
                >
                  <a
                    href={e.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-[0.60rem] px-3 py-1 rounded-full w-fit hover:bg-white/25 transition-colors mb-1 text-white"
                  >
                    <FaInstagram size={10} />
                    Instagram
                  </a>

                  <h5 className="text-white text-sm leading-relaxed">{e.nombre}</h5>

                  <p className="text-[0.60rem] leading-relaxed text-wrap text-white/70">{e.resumen}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pie de sección */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 items-start" >
          <h3
            className="font-black text-lg md:text-xl leading-tight"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}>
            Entrenadores internacionales que<br />vienen desde Estados Unidos
          </h3>
          <p
            className="text-sm leading-relaxed pt-4 sm:pt-0"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300, letterSpacing: "-0.01em" }}>
            Cada uno llega con experiencia real en formación, competencia y desarrollo de atletas, para brindarte una experiencia exigente, cercana y de alto valor dentro y fuera de la cancha.
          </p>
        </div>

      </div>

      <EntrenadorWindow
        entrenador={entrenadorSeleccionado}
        onCerrar={() => setEntrenadorSeleccionado(null)}
      />
    </section>
  );
}