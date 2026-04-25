"use client"
import Image from "next/image";
import Link from "next/link";
import {  FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nuestra-historia", label: "Nuestra Historia" },
  { href: "/servicios", label: "Servicios" },
  { href: "/disciplinas", label: "Disciplinas" },
  { href: "/eventos", label: "Eventos" },
];

const redes = [
  {
    label: "Spotify",
    href: "https://spotify.com",
    icon:  <FaInstagram />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon:  <FaTiktok />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebook />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <FaYoutube />,
  },
];

export default function FooterBecasa() {


  return (
    <footer
      className={`relative w-full overflow-hidden bg-[#0A0E2A] flex justify-center `}
    >

      <div className="relative z-1 w-[95%] my-5 md:mx-0 mx-2 md:px-20 px-8 bg-black/50 backdrop-blur-md rounded-4xl ">
        {/* Parte superior */}
        <div className="flex flex-col items-center py-4 gap-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/img/header/ASA-logo-6.png"
              alt="Athletic Scholarship Agency"
              width={80}
              height={70}
              style={{ width: "80px", height: "auto" }}
            />
          </Link>

          {/* Links de navegación */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-3 md:gap-10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-[#AAFF00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Separador */}
        <div className="border-t border-white/10" />

        {/* Parte inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <p className="text-white/40 text-xs">
            © 2024 Athletic Scholarship Agency. Todos los derechos reservados.
          </p>

          {/* Redes sociales */}
          <div className="flex items-center gap-2">
            {redes.map((red) => (
              <a
                key={red.label}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={red.label}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#AAFF00] hover:text-[#AAFF00] transition-all duration-200">
                {red.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
