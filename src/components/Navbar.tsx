"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BtnCambiarTema from "./BtnCambiarTema";
import { useTema } from "@/context/TemaContext";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nuestra-historia", label: "Nuestra Historia" },
  { href: "/servicios", label: "Servicios" },
  { href: "/disciplinas", label: "Disciplinas" },
  { href: "/becas", label: "Becas" },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

  const { oscuro } = useTema();

  return (
    <nav className={`w-full flex justify-center `}>
      <div className={`backdrop-blur-sm flex w-[95%] justify-between items-center py-3 rounded-tl-4xl rounded-br-4xl md:rounded-tl-full md:rounded-br-full top-3 fixed z-3 shadow-2xl ${oscuro ? "bg-white/50  text-white" : "bg-black/50 text-black"}`}>

        {/* logo */}
        <Link href="/" className="ml-6">
          <Image
            src="/img/header/ASA-logo-6.png"
            alt="Logo Athletic Scholarship Agency"
            width={70}
            height={60}
            style={{ width: "70px", height: "auto" }}
          />
        </Link>

        <div className="hidden md:flex gap-5 mr-9 items-center">
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-medium hover:text-[#AAFF00] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/unete"
            className="bg-[#AAFF00] text-black whitespace-nowrap px-4 py-2 rounded-tr-full rounded-tl-full rounded-bl-full font-bold hover:opacity-90 transition-opacity"
          >
            Únete a Nosotros
          </Link>
        </div>

        {/* hamburguesa menu */}
        <button
          className="md:hidden mr-6 flex flex-col gap-[5px] cursor-pointer z-3"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#AAFF00] transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* menu telefono */}
      <div
        className={`fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md z-2 flex flex-col px-8 pt-20 pb-5 gap-6 transition-all duration-500 md:hidden ${menuAbierto ? "block pointer-events-auto translate-y-0" : "hidden pointer-events-none -translate-y-4"
          }`}
      >

        {/* links */}
        <ul className="flex flex-col items-start gap-2 ml-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuAbierto(false)}
                className="text-white font-normal tracking-widest hover:text-neon transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <BtnCambiarTema />

        <Link
          href="/unete"
          onClick={() => setMenuAbierto(false)}
          className="bg-[#AAFF00] whitespace-nowrap px-8 py-2 rounded-tr-full rounded-tl-full rounded-bl-full text-black font-bold text-lg mt-0 hover:opacity-90 transition-opacity"
        >
          Únete a Nosotros
        </Link>
      </div>
    </nav>
  );
}