"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip",
  },
  {
    id: 2,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    id: 3,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    id: 4,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    id: 5,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    id: 6,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip",
  },
  {
    id: 7,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    id: 8,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    id: 9,
    pregunta: "¿Orem ipsum dolor sit amet, consectetuer adipiscing elit?",
    respuesta: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
];

export default function PreguntasFrecuentes() {
  const [abierto, setAbierto] = useState<number | null>(6);

  const toggle = (id: number) => setAbierto((prev) => (prev === id ? null : id));

  return (
    <section className="w-full overflow-hidden z-1 ">

        {/* preguntas acordeón*/}
        <div className="flex flex-col gap-1">
          {faqs.map((faq) => {
            const estaAbierto = abierto === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-lg border transition-all duration-200 overflow-hidden
                  ${estaAbierto
                    ? "border-[#AAFF00]/40 bg-[#0f2200]"
                    : "border-white/5 bg-[#0a1520] hover:bg-[#0d1c2e]"
                  }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span
                    className={`text-sm font-semibold transition-colors
                      ${estaAbierto ? "text-[#AAFF00]" : "text-white"}`}
                  >
                    {faq.pregunta}
                  </span>

                  {/* Ícono */}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200
                      ${estaAbierto
                        ? "border-[#AAFF00] bg-[#AAFF00]/10"
                        : "border-white/30 bg-transparent"
                      }`}
                  >
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className={`transition-transform duration-300 ${estaAbierto ? "rotate-45" : ""}`}
                    >
                      <line x1="6" y1="1" x2="6" y2="11" stroke={estaAbierto ? "#AAFF00" : "white"} strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke={estaAbierto ? "#AAFF00" : "white"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Respuesta con animación */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden
                    ${estaAbierto ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-5 text-sm text-white/55 leading-relaxed">
                    {faq.respuesta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
}
