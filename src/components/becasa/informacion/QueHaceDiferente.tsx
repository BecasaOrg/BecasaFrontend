"use client";

import { useTema } from "@/context/TemaContext";
import VideoAthletic from "../VideoAthletic";

export default function QueHaceDiferente() {
    const { oscuro } = useTema();

    return (
        <section className={`w-full py-12 px-6 ${oscuro ? " text-white bg-black" : "text-black bg-white"} `}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-3xl p-4 ${oscuro ? "border-white/60 " : "border-black/60"} `}>

                {/*Columna izquierda: texto */}
                <div>
                    <h2
                        className="uppercase text-xl md:text-2xl mb-2"
                        style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 700, letterSpacing: "-0.01em", transform: "scaleY(1.2)" }}
                    >
                        ¿Que hace diferente al Becasa Camp?:
                    </h2>

                    <h3 className="font-bold text-lg md:text-xl mb-4">
                        Alto rendimiento dentro y fuera de la cancha.
                    </h3>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                        No es solo una vitrina de talentos para reclutadores ni solo un campamento de entrenamiento. Es una experiencia sin precedentes en Colombia que combina el alto rendimiento deportivo con formación académica y vocacional. BECASA integra:
                    </p>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                       <strong>Aula:</strong>  Aquí los participantes trabajan en la práctica del inglés, exploración vocacional y autoconocimiento, elementos fundamentales para quienes aspiran a convertirse en estudiantes-atletas internacionales.
                    </p>

                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                      <strong>Training:</strong>   Sesiones de entrenamiento técnico, táctico y estratégico orientadas al aprendizaje y desarrollo deportivo, tanto dentro como fuera de la cancha.
                    </p>
                    <p className={`text-sm leading-relaxed mb-4 ${oscuro ? " text-white/55 bg-black" : "text-black/55 bg-white"} `}>
                       <strong>Showcase:</strong> Los atletas compiten en dinámicas y partidos que simulan el nivel y la organización de eventos deportivos del sistema universitario estadounidense, brindando visibilidad, medición de desempeño y experiencia competitiva.
                    </p>
                </div>

                {/* ── Columna derecha: video ── */}
                <VideoAthletic />

            </div>
        </section>
    );
}