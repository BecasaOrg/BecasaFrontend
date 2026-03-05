"use client";

import CartasServicios from "@/components/componentsServicios/CartasServicios";
import { useTema } from "@/context/TemaContext";
import Image from "next/image";

export default function Servicios() {
    const { oscuro } = useTema();

    return (
        <div className={`min-h-screen ${oscuro ? "bg-black text-white" : "bg-white text-black"} `}>

            <section className="relative w-full h-screen">
                <Image
                    src="/img/section/Servicios.png"
                    alt="Nuestros Servicios"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-start text-center px-6">
                    <h1 className="text-[#AAFF00] text-xl sm:text-2xl md:text-4xl lg:text-6xl text-nowrap fuente font-bold mb-4 text-lime max-w-3xl">
                        Nuestros Servicios
                    </h1>
                    <Image
                        src="/img/section/vineta.png"
                        alt=""
                        width={50}
                        height={15}
                        style={{ width: "50px", height: "auto" }}
                        className=""
                    />
                </div>
            </section>

            <section className="block mx-4 sm:mx-6 md:mx-8 lg:mx-16 my-6 sm:my-8 md:my-12 lg:my-16 text-justify px-[7%]">
                <p className="text-lg leading-relaxed">
                    En Athletic Scholarship Agency, estamos comprometidos a acompañarte en cada paso de tu camino hacia una beca deportiva en los EE.UU. Desde la evaluación inicial hasta la preparación de entrevistas y la solicitud de visa, ofrecemos un enfoque personalizado y completo para asegurar tu éxito. Nuestros servicios cubren desde la creación de perfiles académicos y deportivos hasta la producción de videos destacados, todo con el objetivo de maximizar tus oportunidades. Trabaja con nosotros y asegúrate de que tu talento llegue a las mejores universidades. ¡Potencia y conquista nuevas metas!
                </p>
            </section>
            <CartasServicios />
        </div>
    );
}