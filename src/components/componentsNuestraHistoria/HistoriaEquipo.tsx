"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function HistoriaEquipo() {

    const { oscuro } = useTema();

    return (
        <section className={`relative w-full overflow-hidden max-w-7xl mx-auto px-6 py-10 md:py-24  ${oscuro ? "bg-black text-white" : "bg-white text-black"} `} >

            <div className="flex flex-col lg:flex-row items-center gap-10">

                <div className="flex flex-col gap-6 flex-1">

                    <h2 className="text-neon font-black text-3xl md:text-5xl uppercase tracking-widest">
                        Nuestra Historia
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed">
                        La idea de Athletic Scholarship Agency nació de la experiencia personal
                        de alguien que decidió arriesgarlo todo para superar sus propios límites
                        y descubrir su verdadero potencial. Soy Sebastián, y en el 2022 llegué
                        a Estados Unidos gracias a una beca deportiva que conseguí por mi cuenta.
                        El proceso no fue fácil: cometí muchos errores, pero cada uno de ellos
                        me enseñó valiosas lecciones que, a su vez, me dieron la oportunidad de
                        crear algo significativo para otros jóvenes que, como yo, no creen en
                        los límites.
                    </p>

                    <p className="text-sm md:text-base leading-relaxed">
                        Al llegar a Estados Unidos, me di cuenta del profundo impacto que una
                        beca deportiva puede tener en la vida de un atleta. Decidido a
                        perfeccionar el proceso y con el deseo de ayudar a otros a evitar los
                        mismos errores que yo cometí, me dediqué a aprender todo lo relacionado
                        con la obtención de becas deportivas. Con esa experiencia, desarrollé
                        estrategias personalizadas para cada deporte, incrementando así el éxito
                        de nuestros atletas.
                    </p>

                    <p className="text-sm md:text-base leading-relaxed">
                        En el camino, me uní a Andres Guzmán, un amigo de muchos años y
                        compañero estudiante-atleta en Estados Unidos. Andres compartía mi
                        visión de generar un impacto más allá de lo deportivo y lo académico.
                        Juntos, decidimos forjar Athletic Scholarship Agency con un propósito
                        claro: ayudar a los atletas a desbloquear su máximo potencial, no solo
                        como deportistas, sino también como estudiantes, miembros activos de sus
                        comunidades y futuros líderes de la próxima generación.
                    </p>
                </div>

                <div className="relative w-full lg:w-[520px] min-w-0 lg:min-w-[520px] h-[320px] md:h-[450px] lg:h-[550px] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl">
                    <Image
                        src="/img/section/Servicio 7.png"
                        alt="Nuestra Historia"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 520px"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>

        </section>
    )
}