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

interface EventoInfoProps {
  fechaInicio?: string;
  fechaFin?: string;
  direccion?: string;
  ciudad?: string;
}

export default function EventoInfo({ fechaInicio, fechaFin, direccion, ciudad }: EventoInfoProps) {
  let tituloFecha = "21 - 22 junio";
  let subtituloFecha = "Sábado 21, domingo 22 de Junio del 2026";
  
  if (fechaInicio && fechaFin) {
    const dInicio = new Date(fechaInicio);
    const dFin = new Date(fechaFin);
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    
    if (dInicio.getMonth() === dFin.getMonth()) {
       tituloFecha = `${dInicio.getDate()} - ${dFin.getDate()} ${meses[dInicio.getMonth()]}`;
    } else {
       tituloFecha = `${dInicio.getDate()} ${meses[dInicio.getMonth()]} - ${dFin.getDate()} ${meses[dFin.getMonth()]}`;
    }
    subtituloFecha = `${diasSemana[dInicio.getDay()]} ${dInicio.getDate()}, ${diasSemana[dFin.getDay()].toLowerCase()} ${dFin.getDate()} de ${meses[dFin.getMonth()]} del ${dFin.getFullYear()}`;
  } else if (fechaInicio) {
    const dInicio = new Date(fechaInicio);
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    tituloFecha = `${dInicio.getDate()} de ${meses[dInicio.getMonth()]}`;
    subtituloFecha = `${diasSemana[dInicio.getDay()]} ${dInicio.getDate()} de ${meses[dInicio.getMonth()]} del ${dInicio.getFullYear()}`;
  }

  const tituloLugar = direccion || "Kr 20 #6a - 50";
  const subtituloLugar = ciudad ? `Centro de desarrollo deportivo Fenix, ${ciudad} - Colombia` : "Centro de desarrollo deportivo Fenix, Bogotá - Colombia";

  const cards: InfoCard[] = [
    {
      label: "Fecha",
      icon: Calendar,
      titulo: tituloFecha,
      subtitulo: subtituloFecha,
      degradado: "linear-gradient(to top, #ffffff 0%, #e8e800 50%, #ffffff 100%)",
      style: "overflow-hidden -rotate-[15deg] -translate-x-10 translate-y-7 ",
    },
    {
      label: "Lugar",
      icon: MapPin,
      titulo: tituloLugar,
      subtitulo: subtituloLugar,
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
                className="text-black group-hover:text-white font-black leading-tight mb-1.5 text-xs md:text-sm break-words line-clamp-2 "
                style={{ fontFamily: "var(--font-barlow), sans-serif", letterSpacing: "-0.01em", transform: "scaleY(1.2)" }} >
                {card.titulo}
              </div>
              <p className="text-black/50 group-hover:text-white/50 text-xs leading-snug" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }} >
                {card.subtitulo}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}