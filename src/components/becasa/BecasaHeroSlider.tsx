"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

  

const slides = [
  {
    bgBecasa: "/img/becasa/slide1.png",
    bgInfo: "/img/becasa/slide4.png",
  },
  {
    bgBecasa: "/img/becasa/slide2.png",
    bgInfo: "/img/becasa/slide5.png",
  },
  {
    bgBecasa: "/img/becasa/slide3.png",
    bgInfo: "/img/becasa/slide6.png",
  },
];



function RegistrateLink() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const isInformacion = pathname.startsWith("/becasa/informacion") && id !== null;

  return (
    <Link
      href="/becasa/crea-tu-perfil"
      className="px-4 py-2 rounded-full bg-[#c8f500] text-black font-bold text-md tracking-wide shadow-[0_4px_24px_rgba(200,245,0,0.4)] hover:bg-[#d6ff1a] hover:scale-105 hover:shadow-[0_6px_32px_rgba(200,245,0,0.6)] transition-all duration-200"
    >
      {isInformacion ? "Registrate a este evento" : "Crea tu perfil"}
    </Link>
  );
}

export default function BecasaHeroSlider({ titulo = "BECASA CAMP 2026" }: { titulo?: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (fading || index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  };

  const pathname = usePathname();

  const bgImg = pathname.startsWith('/becasa/informacion') ? slides[current].bgInfo : slides[current].bgBecasa;

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden font-sans">

      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 `}
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65" />

      {/* Navbar */}
      <nav className="absolute top-15 left-0 right-0 flex items-center justify-center gap-16 px-10 py-6">
        {["Becasa", "Showcase", "Tour"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-white font-bold text-sm tracking-widest uppercase hover:text-[#c8f500] transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-400 `}
      >
        <h1 className="font-black uppercase text-[#c8f500] leading-none tracking-tight drop-shadow-lg mb-6"
          style={{ fontFamily: "Acumin", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.0)", fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
        >
          {titulo}
        </h1>

        <p className="max-w-2xl text-white/90 leading-relaxed mb-10"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
        >
          Tu talento no es suficiente si no sabes qué hacer con él. BECASA CAMP te da la claridad, la mentoría y las herramientas para convertirlo en un camino real donde puedes combinar la academia y el deporte.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/becasa#becasaCampamento" className="px-4 py-2 rounded-full bg-white text-black font-bold text-md tracking-wide transition-all duration-200 hover:scale-105" >
            Campamentos
          </Link>
          
          <Suspense fallback={
            <span className="px-4 py-2 rounded-full bg-[#c8f500] text-black font-bold text-md tracking-wide">
              Crea tu perfil
            </span>
          }>
            <RegistrateLink />
          </Suspense>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full border-none transition-all duration-300 ${current === index
              ? "bg-[#c8f500] scale-125"
              : "bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}