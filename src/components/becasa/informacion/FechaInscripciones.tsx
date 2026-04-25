import Link from "next/link";

export default function FechasInscripciones() {

  const fadedCircleOne = "w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(170,255,0,0.8)_0%,_rgba(170,255,0,0.3)_50%,_transparent_80%)] blur-2xl absolute "

  const fadedCircleTwo = "w-[400px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(170,255,0,0.8)_0%,_rgba(170,255,0,0.3)_50%,_transparent_80%)] blur-2xl absolute "

  return (
    <section
      className="w-full py-6 px-2 relative overflow-hidden flex justify-center bg-[#0A0E2A] " >

      <div className={` ${fadedCircleOne} -top-30 -left-60`} />
      <div className={` ${fadedCircleTwo} -top-30 left-[50%] `} />
      <div className={` ${fadedCircleOne} -bottom-40 -right-60 `} />

      {/* sombra de la derecha */}
      {/* <div
        className="absolute right-0 top-0 h-full w-80 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at right center, #7fff0044 0%, transparent 70%)",
        }}
      /> */}

      <div className="relative z-1 flex flex-col items-center gap-6 bg-[#0A0E2A] w-[95vw] px-[5vw] py-[5vh] rounded-2xl ">

        {/* Título */}
        <div className="text-center">
          <h2
            className="text-white uppercase text-2xl md:text-4xl tracking-widest"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
          >
            Fechas de Inscripciones
          </h2>
          <p className="text-white/50 text-xs mt-1">
            Inició el 20 de abril · cierre el 5 de junio del 2026
          </p>
        </div>

        {/* Cards de precios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

          {/* Inscripción Normal */}
          <div className="bg-white/40 border border-white/10 rounded-2xl px-8 py-6 text-center">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
              Valor:
            </p>
            <p
              className="text-white font-black text-sm uppercase mb-3"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "0.10em", transform: "scaleY(1.2)" }}>
              Inscripción Normal:
            </p>
            <div className="flex items-end justify-center gap-1 leading-none mb-3">
              <span className="text-[#AAFF00] font-black italic text-4xl md:text-5xl">
                $ 497.000
              </span>
              <span className="text-[#AAFF00]/70 font-bold text-base mb-1">
                COP
              </span>
            </div>
            <p className="text-white/40 text-xs">
              Por atleta del 15 de agosto hasta el 05 de Octubre
            </p>
          </div>

          {/* Inscripción Extraordinaria */}
          <div className="bg-white/40 border border-white/10 rounded-2xl px-8 py-6 text-center">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
              Valor:
            </p>
            <p
              className="text-white font-black text-sm uppercase mb-3"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "0.10em", transform: "scaleY(1.2)" }}>
              Inscripción Extraordinaria:
            </p>
            <div className="flex items-end justify-center gap-1 leading-none mb-3">
              <span className="text-[#AAFF00] font-black italic text-4xl md:text-5xl">
                $ 550.000
              </span>
              <span className="text-[#AAFF00]/70 font-bold text-base mb-1">
                COP
              </span>
            </div>
            <p className="text-white/40 text-xs">
              Por atleta del 15 de agosto hasta el 05 de Octubre
            </p>
          </div>

        </div>

        {/* Botón */}
        <Link
          href="/becasa/registrate"
          className="bg-[#AAFF00] text-[#0A0E2A] font-bold text-sm px-10 py-3 rounded-full
            hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200
            shadow-[0_4px_24px_rgba(170,255,0,0.35)]"
        >
          Regístrate ahora
        </Link>

      </div>
    </section>
  );
}