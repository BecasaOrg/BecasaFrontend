"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    pregunta: "¿Qué es exactamente BECASA CAMP?",
    respuesta: "BECASA CAMP es mucho más que un campamento: es una experiencia diseñada para encender la visión de un atleta. Aquí entrenas, compites, aprendes y descubres que aquello que amas hacer sí puede abrirte puertas reales para tu futuro.",
  },
  {
    id: 2,
    pregunta: "¿Para quién está dirigido?",
    respuesta: "Está dirigido a atletas con ganas de crecer, soñar en grande y vivir una experiencia que les demuestre que su talento puede llevarlos más lejos. Desde quienes apenas están empezando hasta quienes ya compiten a buen nivel, aquí todos pueden avanzar.",
  },
  {
    id: 3,
    pregunta: "¿Qué incluye la inscripción?",
    respuesta: "La inscripción incluye acceso al campamento, entrenamientos, espacios de formación, evaluación, hidratación, materiales oficiales y certificado.  Todo está pensado para que el atleta viva una experiencia completa y valiosa. *No incluye alimentación, alojamiento ni transporte.",
  },
  {
    id: 4,
    pregunta: "¿Qué hace único a este campamento?",
    respuesta: "Lo que hace único a BECASA CAMP es que no solo entrena atletas: despierta visión. Integra  exigencia deportiva, formación personal y una mirada real al camino universitario, para que cada participante salga inspirado, retado y con más claridad sobre su futuro.",
  },
  {
    id: 5,
    pregunta: "¿Qué actividades vivirán los atletas?",
    respuesta: "Los atletas participarán en entrenamientos, showcases, competencia, espacios de formación, recruiting lab y momentos en comunidad. Cada actividad está diseñada para elevar su nivel, fortalecer su mentalidad y ayudarles a ver con más claridad su camino.",
  },
  {
    id: 6,
    pregunta: "¿Van a asistir  entrenadores o scouts de EE. UU.?",
    respuesta: "Sí. BECASA CAMP contará con entrenadores invitados vinculados al entorno universitario de EE. UU., quienes aportarán experiencia, evaluación y una perspectiva real sobre el nivel, la preparación y la mentalidad que este camino exige.",
  },
  {
    id: 7,
    pregunta: "¿Este evento garantiza una beca o ser reclutado?",
    respuesta: "No garantiza una beca ni reclutamiento, pero si abre el camino  si el atleta destaca lo suficiente.  Ofrece evaluación, formación, exposición y una visión más clara de lo que se necesita para construir oportunidades reales en el deporte universitario.",
  },
  {
    id: 8,
    pregunta: "¿Cómo funciona la inscripción y el pago?",
    respuesta: "La inscripción se realiza a través  del sitio web oficial, donde podrás crear tu cuenta personal y encontrar toda la información del evento e  instrucciones de pago. Después, solo queda prepararte para vivir la experiencia. ",
  },
  {
    id: 9,
    pregunta: "¿Qué puedo hacer si después del evento si quiero seguir con ASA?",
    respuesta: "Después del evento, quienes deseen continuar  su proceso podrán acercarse a ASA para recibirmentoría continua. BECASA CAMP es el primer paso de una ruta con más dirección, preparación y acompañamiento sin importar la etapa del atleta.",
  },
    {
    id: 10,
    pregunta: "¿Por qué vale la pena para una familia invertir en BECASA CAMP?",
    respuesta: "Porque no están pagando solo por unos días de entrenamiento. Están invirtiendo en una experiencia que puede elevar el nivel de su hijo, ampliar su visión, darle dirección y mostrarle que su talento puede convertirse en oportunidades concretas.",
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
