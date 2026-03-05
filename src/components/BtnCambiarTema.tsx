"use client";

import { FaSun, FaMoon } from "react-icons/fa";
import { useTema } from "@/context/TemaContext";

export default function BtnCambiarTema() {
  const { oscuro, toggleTema } = useTema();

  return (
    <button
      onClick={toggleTema}
      className="relative w-14 h-7 rounded-full transition-colors duration-500 focus:outline-none"
      style={{ backgroundColor: oscuro ? "#AAFF00" : "#e2e8f0" }}
    >
      <div
        className={`absolute top-1 w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-500 ${
          oscuro ? "translate-x-8 bg-black" : "translate-x-1 bg-white"
        }`}
      >
        {oscuro
          ? <FaMoon size={10} className="text-neon" />
          : <FaSun size={10} className="text-yellow-500" />
        }
      </div>
    </button>
  );
}