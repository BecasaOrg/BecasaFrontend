"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const posiciones = [
    "Delantero", "Mediocampista", "Defensor", "Portero",
    "Base", "Escolta", "Alero", "Ala-Pívot", "Pívot",
    "Libero", "Opuesto", "Receptor", "Armador",
    "Sprinter", "Fondista", "Saltador", "Lanzador",
];

const nivelesJuego = ["Principiante", "Intermedio", "Avanzado", "Élite / Competitivo"];
const tallasCalcetas = ["XS", "S", "M", "L", "XL", "XXL"];

export default function FormularioRegistro() {
    const [posicionesSeleccionadas, setPosicionesSeleccionadas] = useState<string[]>([]);
    const [clubsSeleccionados, setClubsSeleccionados] = useState<string[]>([]);
    const [posicionInput, setPosicionInput] = useState("");
    const [clubInput, setClubInput] = useState("");
    const [posicionOpen, setPosicionOpen] = useState(false);
    const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const posicionesFiltradas = posiciones.filter(
        (p) => p.toLowerCase().includes(posicionInput.toLowerCase()) && !posicionesSeleccionadas.includes(p)
    );

    const togglePosicion = (p: string) => {
        setPosicionesSeleccionadas((prev) =>
            prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
        );
    };

    const agregarClub = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && clubInput.trim()) {
            e.preventDefault();
            if (!clubsSeleccionados.includes(clubInput.trim())) {
                setClubsSeleccionados((prev) => [...prev, clubInput.trim()]);
            }
            setClubInput("");
        }
    };

    const inputClass =
        "w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#AAFF00]/60 transition-colors";

    const labelClass = "block text-white/60 text-xs mb-1";

    return (
        <section className="min-h-screen bg-[#050d1f] flex items-center justify-center px-4 pb-12 pt-17 ">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 rounded-2xl overflow-hidden shadow-2xl border border-white/5 px-5 py-5 bg-[#060f18]">

                {/* ── Columna izquierda: formulario ── */}
                <div className="bg-[#0a1520]/50 px-8 py-10 rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">

                        {/* Número de identificación */}
                        <div>
                            <label className={labelClass}>Número de identificación (C.C o T.I) *</label>
                            <input type="text" placeholder="Numero..." className={inputClass} />
                        </div>

                        {/* Años de experiencia */}
                        <div>
                            <label className={labelClass}>Años de experiencia competitiva *</label>
                            <input type="number" placeholder="Numero..." className={inputClass} />
                        </div>

                        {/* Posición en la cancha — multiselect */}
                        <div className="sm:col-span-2 relative">
                            <label className={labelClass}>Posición en la cancha *</label>
                            <div
                                className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-3 py-2 flex flex-wrap gap-1.5 cursor-text focus-within:border-[#AAFF00]/60 transition-colors min-h-[42px]"
                                onClick={() => { setPosicionOpen(true); }}
                            >
                                {posicionesSeleccionadas.map((p) => (
                                    <span key={p} className="bg-[#AAFF00]/15 text-[#AAFF00] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                        {p}
                                        <button onClick={(e) => { e.stopPropagation(); togglePosicion(p); }} className="hover:text-white transition-colors">×</button>
                                    </span>
                                ))}
                                <input
                                    value={posicionInput}
                                    onChange={(e) => { setPosicionInput(e.target.value); setPosicionOpen(true); }}
                                    onFocus={() => setPosicionOpen(true)}
                                    onBlur={() => setTimeout(() => setPosicionOpen(false), 150)}
                                    placeholder={posicionesSeleccionadas.length === 0 ? "Escribe/Selecciona Múltiples Opciones" : ""}
                                    className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none flex-1 min-w-[160px]"
                                />
                            </div>
                            {posicionOpen && posicionesFiltradas.length > 0 && (
                                <div className="absolute top-full left-0 right-0 z-20 bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg mt-1 max-h-40 overflow-y-auto shadow-xl">
                                    {posicionesFiltradas.map((p) => (
                                        <button
                                            key={p}
                                            onMouseDown={() => { togglePosicion(p); setPosicionInput(""); }}
                                            className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-[#AAFF00]/10 hover:text-[#AAFF00] transition-colors"
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Nivel de juego */}
                        <div>
                            <label className={labelClass}>Nivel de juego estimado *</label>
                            <div className="relative">
                                <select className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                                    <option value="" disabled>Seleccione</option>
                                    {nivelesJuego.map((n) => <option key={n}>{n}</option>)}
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xs">▼</span>
                            </div>
                        </div>

                        {/* Talla de camiseta */}
                        <div>
                            <label className={labelClass}>Talla de camiseta *</label>
                            <div className="relative">
                                <select className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                                    <option value="" disabled>Seleccione</option>
                                    {tallasCalcetas.map((t) => <option key={t}>{t}</option>)}
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xs">▼</span>
                            </div>
                        </div>

                        {/* Club(s) — tags con Enter */}
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Club(s) o equipo(s) al que perteneces *</label>
                            <div className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-3 py-2 flex flex-wrap gap-1.5 focus-within:border-[#AAFF00]/60 transition-colors min-h-[42px]">
                                {clubsSeleccionados.map((c) => (
                                    <span key={c} className="bg-[#AAFF00]/15 text-[#AAFF00] text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                        {c}
                                        <button onClick={() => setClubsSeleccionados((prev) => prev.filter((x) => x !== c))} className="hover:text-white transition-colors">×</button>
                                    </span>
                                ))}
                                <input
                                    value={clubInput}
                                    onChange={(e) => setClubInput(e.target.value)}
                                    onKeyDown={agregarClub}
                                    placeholder={clubsSeleccionados.length === 0 ? "Escribe y presiona Enter para agregar" : ""}
                                    className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none flex-1 min-w-[200px]"
                                />
                            </div>
                        </div>

                        {/* Nombre del colegio */}
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Nombre del colegio o universidad actual *</label>
                            <input type="text" placeholder="Escribe..." className={inputClass} />
                        </div>

                        {/* Certificado EPS */}
                        <div>
                            <label className={labelClass}>Certificado de afiliación a la EPS o carnet de salud *</label>
                            <div
                                className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#AAFF00]/40 transition-colors"
                                onClick={() => fileRef.current?.click()}
                            >
                                <span className="text-sm text-white/25">{archivoNombre ?? "Adjuntar Archivo"}</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input ref={fileRef} type="file" className="hidden" onChange={(e) => setArchivoNombre(e.target.files?.[0]?.name ?? null)} />
                            </div>
                        </div>

                        {/* Restricción alimenticia */}
                        <div>
                            <label className={labelClass}>¿Tiene alguna restricción alimenticia o alergias? *</label>
                            <input type="text" placeholder="Escribe..." className={inputClass} />
                        </div>

                        {/* Condición médica */}
                        <div className="sm:col-span-2">
                            <label className={labelClass}>¿Tiene alguna condición médica que debamos conocer?</label>
                            <input type="text" placeholder="Escribe..." className={inputClass} />
                        </div>

                        {/* Separador acudiente */}
                        <div className="sm:col-span-2 border-t border-white/5 pt-2" />

                        {/* Nombre acudiente */}
                        <div>
                            <label className={labelClass}>Nombre completo del acudiente *</label>
                            <input type="text" placeholder="Nombre Completo" className={inputClass} />
                        </div>

                        {/* Teléfono acudiente */}
                        <div>
                            <label className={labelClass}>Número de contacto del acudiente *</label>
                            <input type="tel" placeholder="+57" className={inputClass} />
                        </div>

                        {/* Email acudiente */}
                        <div>
                            <label className={labelClass}>Email del acudiente *</label>
                            <input type="email" placeholder="Usuario@Gmail.Com" className={inputClass} />
                        </div>

                        {/* Botón */}
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-[#AAFF00] text-black font-bold text-base rounded-full py-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                            >
                                Registrarse
                            </button>
                        </div>

                    </div>
                </div>

                {/* ── Columna derecha: info ── */}
                <div
                    className="relative flex flex-col items-center justify-start px-10 pt-20 pb-12 text-center overflow-hidden">

                    {/* Texto */}
                    <p className="text-white/60 text-sm leading-relaxed mb-8 relative z-1 max-w-xs">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laore  et dolore magna aliquam erat volutpat.
                    </p>

                    {/* Avatares superpuestos */}
                    <div className="flex -space-x-4 mb-6 relative z-1 ">
                        {[
                            "/img/atletas/atleta-1.png",
                            "/img/atletas/atleta-2.png",
                            "/img/atletas/atleta-3.png",
                        ].map((src, i) => (
                            <div
                                key={i}
                                className="w-20 h-20 rounded-full border-2 border-[#060f18] overflow-hidden bg-[#1a2e10] relative"
                                style={{ zIndex: 3 - i }}
                            >
                                <Image src={src} alt={`Atleta ${i + 1}`} fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Texto comunidad */}
                    <h3 className="text-white font-bold text-2xl leading-tight mb-8 relative z-1">
                        Una comunidad de mas de<br />
                        <span className="text-[#AAFF00]">300 atletas</span> de todo el mundo
                    </h3>

                    {/* Logo */}
                    <div className="relative z-1 opacity-80">
                        <Image
                            src="/img/header/ASA-logo-6.png"
                            alt="Becasa Camp"
                            width={90}
                            height={80}
                            style={{ width: "90px", height: "auto" }}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
