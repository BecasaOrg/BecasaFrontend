"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface TemaContextType {
  oscuro: boolean;
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType>({
  oscuro: false,
  toggleTema: () => {},
});

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [oscuro, setOscuro] = useState<boolean>(false);

  useEffect(() => {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado) {
      const esOscuro = temaGuardado === "oscuro";
      setOscuro(esOscuro);
      document.documentElement.classList.toggle("dark", esOscuro);
    } else {
      const sistemaOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setOscuro(sistemaOscuro);
      document.documentElement.classList.toggle("dark", sistemaOscuro);
    }
  }, []);

  const toggleTema = () => {
    const nuevoTema = !oscuro;
    setOscuro(nuevoTema);
    document.documentElement.classList.toggle("dark", nuevoTema);
    localStorage.setItem("tema", nuevoTema ? "oscuro" : "claro");
  };

  return (
    <TemaContext.Provider value={{ oscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// Hook para usar en cualquier componente
export function useTema() {
  return useContext(TemaContext);
}