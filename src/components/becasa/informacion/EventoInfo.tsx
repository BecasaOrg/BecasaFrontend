import { Calendar, MapPin, Clock } from "lucide-react";
import { ReactNode } from "react";

interface InfoCard {
  label: string;
  icon: React.ElementType;
  titulo: ReactNode;
  subtitulo: string;
  degradado: string;
  style: string,
}

const cards: InfoCard[] = [
  {
    label: "Fecha",
    icon: Calendar,
    titulo: "21 - 22 junio",
    subtitulo: "Sábado 21, domingo 22 de Junio del 2026",
    degradado: "linear-gradient(to top, #ffffff 0%, #e8e800 50%, #ffffff 100%)",
    style: "overflow-hidden -rotate-[15deg] -translate-x-10 translate-y-7 ",
  },
  {
    label: "Lugar",
    icon: MapPin,
    titulo: "Kr 20 #6a - 50",
    subtitulo: "Centro de desarrollo deportivo Fenix, Bogotá - Colombia",
    degradado: "linear-gradient(to top, #ffffff 0%, #e8e800 50%, #ffffff 100%)",
    style: "overflow-hidden -translate-y-7 -translate-x-15",
  },
  {
    label: "Hora",
    icon: Clock,
    titulo: (
      <>
        8:00<span className="align-baseline font-black">a.m.</span>
        {" "}a 4:00<span className="align-baseline font-black">p.m.</span>
      </>
    ),
    subtitulo: "Sábado 21, Domingo 22 desde las 8:00 a.m. hasta las 4:00 p.m.",
    degradado: "linear-gradient(to top, #ffffff 0%, #e8e800 50%, #ffffff 100%)",
    style: "overflow-hidden rotate-[15deg] -translate-16 translate-y-7 ",
  },
];

export default function EventoInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-8">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="relative group flex flex-col justify-between w-[95%] md:w-[30%]  h-44 rounded-2xl p-5 overflow-hidden bg-white border border-black/20 hover:bg-[#0A0E2A] "
          >

            <div
              className={`absolute w-screen h-[10rem] md:w-[40vw] md:h-[8rem] ${card.style} group-hover:opacity-0 `}
              style={{
                background: card.degradado,
              }}
            />

            {/* Label + ícono */}
            <div className="flex items-center justify-between z-1">
              <span className="bg-[#0A0E2A] text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide group-hover:bg-white group-hover:text-[#0A0E2A] ">
                {card.label}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
                <Icon size={15} className="text-black/50" />
              </div>
            </div>

            {/* Título + subtítulo */}
            <div className="z-1">
              <div
                className="text-black group-hover:text-white font-black leading-none mb-1.5 text-[28px] "
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }} >
                {card.titulo}
              </div>
              <p className="text-black/50 group-hover:text-white/50 text-xs leading-snug" >
                {card.subtitulo}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}