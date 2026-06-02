"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function HistoriaEquipo() {

    const { oscuro } = useTema();

    return (

        <section className={`relative h-[34vh] sm:h-[150vh] flex items-center justify-start overflow-hidden ${oscuro ? "bg-black text-white" : "bg-white text-black"} `} >

               
      {/* Background container */}
      <div className="absolute inset-0 w-full ">
        {/* Mobile title - visible only on small screens */}
        <h1 className="text-4xl md:text-6xl sm:hidden absolute px-[2%] font-bold mt-4 text-lime-400 max-w-3xl z-10 fuente">
          NUESTRA HISTORIA
        </h1>
 
        {/* Background image */}
        <Image
          src="/img/section/Servicio7.png"
          alt="Hero background"
          fill
          
          className="object-cover w-full h-full"
          priority
        />
 
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
 
      {/* Desktop content - hidden on mobile */}
      <div className="hidden sm:block relative z-10 text-white text-start px-[7%]">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-lime-400 max-w-3xl">
          NUESTRA HISTORIA
        </h1>
 
        <p className="text-xl mb-8 font-bold max-w-3xl parrafo">
          La idea de Athletic Scholarship Agency nació de la experiencia
          personal de alguien que decidió arriesgarlo todo para superar sus
          propios límites y descubrir su verdadero potencial. Soy Sebastián, y
          en el 2022 llegué a Estados Unidos gracias a una beca deportiva que
          conseguí por mi cuenta. El proceso no fue fácil: cometí muchos
          errores, pero cada uno de ellos me enseñó valiosas lecciones que, a
          su vez, me dieron la oportunidad de crear algo significativo para
          otros jóvenes que, como yo, no creen en los límites.
          <br />
          <br />
          Al llegar a Estados Unidos, me di cuenta del profundo impacto que una
          beca deportiva puede tener en la vida de un atleta. Decidido a
          perfeccionar el proceso y con el deseo de ayudar a otros a evitar los
          mismos errores que yo cometí, me dediqué a aprender todo lo
          relacionado con la obtención de becas deportivas. Con esa experiencia,
          desarrollé estrategias personalizadas para cada deporte, incrementando
          así el éxito de nuestros atletas.
          <br />
          <br />
          En el camino, me uní a Andres Guzmán, un amigo de muchos años y
          compañero estudiante-atleta en Estados Unidos. Andres compartía mi
          visión de generar un impacto más allá de lo deportivo y lo académico.
          Juntos, decidimos forjar Athletic Scholarship Agency con un propósito
          claro: ayudar a los atletas a desbloquear su máximo potencial, no solo
          como deportistas, sino también como estudiantes, miembros activos de
          sus comunidades y futuros líderes de la próxima generación.
          <br />
        </p>
      </div>
    </section>


           


    )
}