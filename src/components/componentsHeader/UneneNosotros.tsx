import Link from "next/link";

export default function UneneNosotros() {


    return(<>
        <section id="cta" className="py-12 sm:py-16">
            <div className="container mx-auto px-4 text-center">
                <Link href="/unete"   className="bg-[#AAFF00] text-xl  sm:text-3xl font-bold py-2 sm:py-3 px-6 sm:px-8 mb-4 rounded-full hover:bg-opacity-80 transition duration-300 bg-[#AAFF00] rounded-bl-[35px] sm:rounded-bl-[70px]">
                    Únete a nosotros
                </Link>
                <p className="mb-8 max-w-2xl mt-9 font-bold mx-auto text-sm sm:text-base">¿Listo para llevar tu carrera deportiva
                    al siguiente nivel? ¡Contáctanos hoy y descubre cómo podemos ayudarte a obtener una beca en los
                    EE.UU.!</p>

            </div>
        </section>
    </>)
}