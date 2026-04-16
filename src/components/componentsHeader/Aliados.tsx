import Image from "next/image";
import { useTema } from "@/context/TemaContext";
import { NuestrosAliados } from "@/data/header";

export default function Aliados(){
     const { oscuro } = useTema();
    return(
        <>
        <section id="allies" className="py-12 sm:py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-baseline">
                    <h2 className="text-3xl sm:text-6xl font-bold mb-8 sm:mb-12 text-center">NUESTROS ALIADOS</h2>
   
                </div>

                <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 md:gap-28">
                    
                            {NuestrosAliados.map((aliado) => (
                                <Image
                                    key={aliado.id}
                                    src={aliado.imagen}
                                    alt={aliado.alt}
                                    width={200}
                                    height={100}
                                    className="h-10  sm:h-16 object-contain"
                                />
                            ))}
                        
                </div>
            </div>
        </section>
        </>
    )
}