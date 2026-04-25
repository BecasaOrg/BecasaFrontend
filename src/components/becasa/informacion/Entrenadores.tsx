"use client"
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { useTema } from "@/context/TemaContext";
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Entrenador {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  instagram: string;
  slug: string;
}

const entrenadores: Entrenador[] = [
  {
    id: 1,
    nombre: "Nombre Apellido",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    foto: "/img/becasa/entrenadores/entrenadores1.jpg",
    instagram: "",
    slug: "entrenador-1",
  },
  {
    id: 2,
    nombre: "Nombre Apellido",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    foto: "/img/becasa/entrenadores/entrenadores2.jpg",
    instagram: "",
    slug: "entrenador-2",
  },
  {
    id: 3,
    nombre: "Nombre Apellido",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    foto: "/img/becasa/entrenadores/entrenadores3.jpg",
    instagram: "",
    slug: "entrenador-3",
  },
  {
    id: 4,
    nombre: "Nombre Apellido",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    foto: "/img/becasa/entrenadores/entrenadores4.jpg",
    instagram: "",
    slug: "entrenador-4",
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
              Lorem ipsum dolor sit amet, consectetuer
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
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
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

                  <p className="text-[0.60rem] leading-relaxed text-wrap text-white/70">{e.descripcion}</p>
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
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300, letterSpacing: "-0.01em"}}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
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