import { useTema } from "@/context/TemaContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BtnCambiarTema from "./BtnCambiarTema";
import { useProfile } from "@/context/ProfileContext";
import StudentHeader from "./dashboard/StudentHeader";

const links = [
    { href: "/", label: "Inicio" },
    { href: "/nuestra-historia", label: "Nuestra Historia" },
    { href: "/servicios", label: "Servicios" },
    { href: "/disciplinas", label: "Disciplinas" },
    { href: "/becasa", label: "Becasa" },
];

export default function HeaderBecasa() {

    const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { oscuro } = useTema();
    const { profile } = useProfile();
    const pathname = usePathname();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("auth_token"));
    }, []);

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setMenuAbierto(false);
    }, [pathname]);

    // Bloquear scroll cuando el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = menuAbierto ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuAbierto]);

    return (
        <header>
            <nav className="w-full flex justify-center ">

                {/* Barra principal */}
                <div className={`flex w-[95%] justify-between items-center top-3 fixed z-[3] shadow-2xl transition-colors duration-300 bg-black/70 p-2 rounded-2xl `} >
                    {/* Logo */}
                    <Link href="/" className="ml-6 flex-shrink-0">
                        <Image
                            src="/img/header/ASA-logo-6.png"
                            alt="Logo Athletic Scholarship Agency"
                            width={70}
                            height={60}
                            style={{ width: "70px", height: "auto" }}
                            priority
                        />
                    </Link>

                    {/* Desktop nav */}
                    <div className={`hidden lg:flex gap-5 mr-6 items-center backdrop-blur-sm py-3 px-7 rounded-full ${oscuro ? "bg-[#474a4d3f] bg-opacity-50  text-white" : "bg-[#474a4d3f] bg-opacity-50  text-white"} `}>
                        <ul className="flex gap-5">
                            {links.map((link) => {
                                const activo = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`font-medium transition-colors relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#AAFF00] after:transition-all after:duration-300 whitespace-nowrap ${activo ? "text-[#AAFF00] after:w-full" : "hover:text-[#AAFF00] after:w-0 hover:after:w-full"} `} >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <BtnCambiarTema />

                    </div>
                    {isLoggedIn ? (
                        <div className="hidden lg:flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="bg-[#AAFF00] text-black whitespace-nowrap px-5 py-2 rounded-full font-bold hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
                            >
                                Ir al Panel
                            </Link>
                            <StudentHeader />
                        </div>
                    ) : (
                        <Link
                            href="/becasa/crea-tu-perfil"
                            className="bg-[#AAFF00] text-black whitespace-nowrap px-5 py-2 rounded-tr-full rounded-tl-full rounded-bl-full font-bold hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 hidden lg:flex"
                        >
                            Crea tu perfil
                        </Link>
                    )}

                    {/* Boton hamburguesa */}
                    <button
                        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuAbierto}
                        className="lg:hidden mr-6 flex flex-col gap-[5px] cursor-pointer z-[3] "
                        onClick={() => setMenuAbierto((prev) => !prev)} >
                        <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all ${menuAbierto ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all duration-300 ${menuAbierto ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </div>

                {/* Menú móvil */}
                <div
                    className={` fixed w-full bg-black/95 backdrop-blur-md z-[2] flex flex-col px-8 pt-28 pb-8 gap-6 lg:hidden transition-all duration-400 ${menuAbierto ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                    {/* Links */}
                    <ul className="flex flex-col items-start gap-3 ml-2">
                        {links.map((link, i) => {
                            const activo = pathname === link.href;
                            return (
                                <li
                                    key={link.href}
                                    style={{ transitionDelay: menuAbierto ? `${i * 60}ms` : "0ms" }}
                                    className={`transition-all duration-300 ${menuAbierto ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} >
                                    <Link href={link.href} className={`text-lg font-light tracking-widest transition-colors ${activo ? "text-[#AAFF00]" : "text-white hover:text-[#AAFF00]"}`}>
                                        {activo && <span className="text-[#AAFF00] mr-2">›</span>}
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-2">
                        <BtnCambiarTema />
                    </div>

                    {isLoggedIn ? (
                        <Link href="/dashboard" className="bg-[#AAFF00] whitespace-nowrap px-8 py-3 rounded-full text-black font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 self-start">
                            Ir al Panel
                        </Link>
                    ) : (
                        <Link href="/becasa/crea-tu-perfil" className="bg-[#AAFF00] whitespace-nowrap px-8 py-3 rounded-tr-full rounded-tl-full rounded-bl-full text-black font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 self-start" >
                            Crea tu perfil
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}