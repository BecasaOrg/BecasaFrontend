"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function HistoriaEquipo() {

    const { oscuro } = useTema();

    return (
        <section className={`relative w-full overflow-hidden max-w-7xl mx-auto md:py-24 ${oscuro ? "bg-black text-white" : "bg-white text-black"} `} >

            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">

                <div className=" md:bg-[url('/img/section/Servicio7.png')] md:bg-cover md:bg-top md:bg-no-repeat md:min-h-screen w-full relative ">

                    <h2 className="font-black text-3xl md:text-5xl uppercase tracking-widest md:pl-10 md:py-10 pb-10">
                        Nuestra Historia
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed max-w-2xl px-10 ">
                        La idea de Athletic Scholarship Agency nació de la experiencia personal
                        de alguien que decidió arriesgarlo todo para superar sus propios límites
                        y descubrir su verdadero potencial. Soy Sebastián, y en el 2022 llegué
                        a Estados Unidos gracias a una beca deportiva que conseguí por mi cuenta.
                        El proceso no fue fácil: cometí muchos errores, pero cada uno de ellos
                        me enseñó valiosas lecciones que, a su vez, me dieron la oportunidad de
                        crear algo significativo para otros jóvenes que, como yo, no creen en
                        los límites.
                    </p>

                    <p className="text-sm md:text-base leading-relaxed max-w-3xl px-10">
                        Al llegar a Estados Unidos, me di cuenta del profundo impacto que una
                        beca deportiva puede tener en la vida de un atleta. Decidido a
                        perfeccionar el proceso y con el deseo de ayudar a otros a evitar los
                        mismos errores que yo cometí, me dediqué a aprender todo lo relacionado
                        con la obtención de becas deportivas. Con esa experiencia, desarrollé
                        estrategias personalizadas para cada deporte, incrementando así el éxito
                        de nuestros atletas.
                    </p>

                    <p className="text-sm md:text-base leading-relaxed max-w-4xl px-10">
                        En el camino, me uní a Andres Guzmán, un amigo de muchos años y
                        compañero estudiante-atleta en Estados Unidos. Andres compartía mi
                        visión de generar un impacto más allá de lo deportivo y lo académico.
                        Juntos, decidimos forjar Athletic Scholarship Agency con un propósito
                        claro: ayudar a los atletas a desbloquear su máximo potencial, no solo
                        como deportistas, sino también como estudiantes, miembros activos de sus
                        comunidades y futuros líderes de la próxima generación.
                    </p>
                </div>

                <div className="relative w-full min-w-0 h-[200px] sm:h-[300px] md:hidden overflow-hidden shadow-2xl mt-4 ">
                    <Image
                        src="/img/section/Servicio7.png"
                        alt="Nuestra Historia"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 520px"
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            </div>

        </section>
    )
}