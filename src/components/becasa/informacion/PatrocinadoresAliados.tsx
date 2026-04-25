"use client"
import { useTema } from "@/context/TemaContext";
import Image from "next/image";

const patrocinadores = [
  { id: 1, nombre: "Logo 1", logo: "/img/patrocinadores/logo-1.png" },
  { id: 2, nombre: "Logo 2", logo: "/img/patrocinadores/logo-2.png" },
  { id: 3, nombre: "Logo 3", logo: "/img/patrocinadores/logo-3.png" },
  { id: 4, nombre: "Logo 4", logo: "/img/patrocinadores/logo-4.png" },
  { id: 5, nombre: "Logo 5", logo: "/img/patrocinadores/logo-5.png" },
];

const aliados = [
  { id: 1, nombre: "Logo", logo: "/img/aliados/logo-1.png" },
  { id: 2, nombre: "Logo", logo: "/img/aliados/logo-2.png" },
  { id: 3, nombre: "Logo", logo: "/img/aliados/logo-3.png" },
  { id: 4, nombre: "Logo", logo: "/img/aliados/logo-4.png" },
];

function LogoCard({ nombre, logo }: { nombre: string; logo: string }) {
  return (
    <div className="flex items-center justify-center border border-black/15 rounded-xl px-6 py-4 w-36 h-20 bg-white hover:border-black/30 transition-colors duration-200">
      <div className="relative w-full h-full">
        <Image
          src={logo}
          alt={nombre}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function PatrocinadoresAliados() {
  const { oscuro } = useTema();
  return (
    <section className={`w-full py-10 px-4 ${oscuro ? " text-white bg-black" : "text-black bg-white"} `}>

      <hr className="mb-8" />

      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* Patrocinadores */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-md uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "0.10em", transform: "scaleY(1.2)" }}>
            Patrocinadores
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {patrocinadores.map((p) => (
              <LogoCard key={p.id} nombre={p.nombre} logo={p.logo} />
            ))}
          </div>
        </div>

        {/* Aliados */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="text-md uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "0.10em", transform: "scaleY(1.2)" }}>
            Aliados
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {aliados.map((a) => (
              <LogoCard key={a.id} nombre={a.nombre} logo={a.logo} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}