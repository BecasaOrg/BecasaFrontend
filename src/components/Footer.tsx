"use client";

import { useTema } from "@/context/TemaContext";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {

    const { oscuro } = useTema();

    return (
        <footer className={`pt-10 ${oscuro ? "bg-black text-white" : "bg-white text-black"}`} >

            <div className="relative bg-[#AAFF00] text-black rounded-tr-[60px] md:rounded-tr-[120px] overflow-hidden">
                {/* Brillo blanco en el centro */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_transparent_70%)] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-6 py-10 md:py-14 flex flex-col items-center gap-5">

                    {/* Logo */}
                    <Image
                        src="/img/footer/logo.png"
                        alt="Logo Athletic Scholarship Agency"
                        width={70}
                        height={70}
                        style={{ width: "70px", height: "auto" }}
                        className="object-contain"
                    />

                    {/* Links de navegacion */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold">
                        <Link href="/" className="hover:underline">Inicio</Link>
                        <Link href="/nuestra-historia" className="hover:underline">Nuestra Historia</Link>
                        <Link href="/servicios" className="hover:underline">Servicios</Link>
                        <Link href="/disciplinas" className="hover:underline">Disciplinas</Link>
                        <Link href="/unete" className="hover:underline">Únete a nosotros</Link>
                    </nav>
                </div>

                {/* Línea divisoria */}
                <div className="relative border-t border-black/20 mx-6" />

                {/* Barra inferior */}
                <div className="relative max-w-6xl mx-auto px-6 py-5 flex flex-col-reverse md:flex-row items-center justify-between gap-4">

                    <p className="text-xs font-medium text-black/70 text-center md:text-left">
                        © 2024 Athletic Scholarship Agency. Todos los derechos reservados.
                    </p>

                    {/* Redes sociales */}
                    <div className="flex gap-5 text-xl">
                        <a href="#" className="hover:opacity-60 transition-opacity"><FaYoutube /></a>
                        <a href="#" className="hover:opacity-60 transition-opacity"><FaTiktok /></a>
                        <a href="#" className="hover:opacity-60 transition-opacity"><FaXTwitter /></a>
                        <a href="#" className="hover:opacity-60 transition-opacity"><FaInstagram /></a>
                    </div>
                </div>
            </div>

        </footer>
    )
}