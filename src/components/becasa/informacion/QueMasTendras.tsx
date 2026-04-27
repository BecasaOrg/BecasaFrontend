"use client"
import { useTema } from "@/context/TemaContext";
import Image from "next/image";

const beneficios = [
  {
    id: 1,
    label: "Kit oficial de bienvenida.",
    icon: "/img/becasa/que-mas-tendras/kit.svg",
  },
  {
    id: 2,
    label: "Reporte de evaluación deportiva/académica.",
    icon: "/img/becasa/que-mas-tendras/informe.svg",
  },
  {
    id: 3,
    label: "Hidratación durante el evento.",
    icon: "/img/becasa/que-mas-tendras/hidratacion.svg",
  },
  {
    id: 4,
    label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
    icon: "/img/becasa/que-mas-tendras/premios.svg",
  },
  {
    id: 5,
    label: "Reconocimientos oficiales.",
    icon: "/img/becasa/que-mas-tendras/certificado.svg",
  },
  {
    id: 6,
    label: "Producción audiovisual.",
    icon: "/img/becasa/que-mas-tendras/producción.svg",
  },
];

export default function QueMasTendras() {
  const { oscuro } = useTema();
  return (
    <section className={`w-full py-14 px-4 ${oscuro ? " text-white bg-black" : "text-black bg-white"} `}>

      <div className="max-w-5xl mx-auto">

        {/* Título */}
        <div className="text-center mb-10">
          <h2
            className="uppercase text-3xl md:text-4xl tracking-widest mb-4"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "0.10em", transform: "scaleY(1.2)" }}
          >
            Que Mas Tendras
          </h2>
          <p className="text-sm max-w-2xl mx-auto leading-relaxed">
            Además de las actividades formativas y deportivas, los participantes del <strong>BECASA CAMP 2026</strong> recibirán una serie de recursos y experiencias diseñadas para enriquecer su participación y acompañar su proceso como estudiantes-atletas.
          </p>
             <ol>
              <li>1- BECASA pack: Camisa oficial del BECASA Camp, Pasaporte BECASA y Nametag.</li>
              <li>2- Scorecard ASA:  Evaluación deportiva y académica elaborado por los mentores ASA.</li>
              <li>3- Hidratación: Para los participantes durante las sesiones deportivas y actividades programadas.</li>
              <li>4- Premios: Reconocimientos a los atletas que se destaquen en diferentes aspectos del campamento</li>
              <li>5- Material Audiovisual:  Fotografías oficiales del evento y Grabación de entrenamientos, prácticas y competencias</li>
              <li>6- Certificado de participación: Tu recuerdo de haber participado exitosamente en nuestro evento.</li>
             </ol> 
        </div>

        {/* Iconos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {beneficios.map((b) => (
            <div key={b.id} className="flex flex-col items-center text-center gap-3">
              {/* Círculo */}
              <div
                className={`relative w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 bg-[#AAFF00] `}
              >
                <Image
                  src={b.icon}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              {/* Label */}
              <p className="text-xs leading-snug font-medium">
                {b.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}