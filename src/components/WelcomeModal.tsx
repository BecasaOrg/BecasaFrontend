"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImageModal() {
 const imagen = "/img/modal/ventana-emergente.webp"; 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <div className="relative w-[40vw] min-w-[280px] max-w-[640px] animate-slide-up">

        {/* Botón cerrar */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar"
          className="absolute -top-3.5 -right-3.5 z-10 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
        >
          <X size={14} />
        </button>

        {/* Imagen */}
        <div className="rounded-2xl overflow-hidden">
            <Link href="/becasa">
          <Image
            src={imagen}
            alt="Imagen promocional"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
          </Link>
        </div>

      </div>
    </div>
  );
}