"use client";
import { useState } from "react";
import Link from "next/link";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function CreaTuPerfil() {
    const [showP1, setShowP1] = useState(false);
    const [showP2, setShowP2] = useState(false);

    return (
        <div className="min-h-screen bg-[#050d1f] flex justify-center pb-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-[95vw] bg-[#080808]/60 backdrop-blur-sm mt-20 rounded-3xl border border-white/40 ">

                {/*DERECHA: título (arriba en móvil) */}
                <div className="lg:order-last relative flex flex-col items-center justify-center px-8 py-10 mx-8 my-10 lg:py-0 overflow-hidden">

                    <h1 className="relative z-1 text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight text-center">
                        Crea tu perfil y<br />regístrate en un<br />
                        <span className="text-[#AAFF00]">campamento</span>
                    </h1>
                </div>

                {/* IZQUIERDA: formulario*/}
                <div className="flex flex-col gap-4 px-5 py-8 lg:px-10 lg:py-10 bg-[#080808]/10 backdrop-blur-sm rounded-3xl border border-white/40 m-5 ">

                    {/* Nombres / Apellidos */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="Nombres *"><input type="text" placeholder="Nombres" /></Field>
                        <Field label="Apellidos *"><input type="text" placeholder="Apellidos" /></Field>
                    </div>

                    {/* Fecha / Año graduación */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="Fecha de nacimiento *"><input type="text" placeholder="DD / MM / AAAA" /></Field>
                        <Field label="Año de graduación *"><input type="text" placeholder="0000" /></Field>
                    </div>

                    {/* País / Ciudad */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="País de nacimiento *">
                            <select defaultValue="">
                                <option value="" disabled>País</option>
                                <option>Colombia</option><option>Venezuela</option><option>Ecuador</option>
                            </select>
                        </Field>
                        <Field label="Ciudad de residencia *"><input type="text" placeholder="Ciudad" /></Field>
                    </div>

                    {/* Deporte / Email */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="Deporte *">
                            <select defaultValue="">
                                <option value="" disabled>Seleccione</option>
                                {["Fútbol", "Voleibol", "Natación", "Tenis", "Atletismo", "Béisbol", "Basquetbol"].map(d =>
                                    <option key={d}>{d}</option>
                                )}
                            </select>
                        </Field>
                        <Field label="Email *"><input type="email" placeholder="usuario@gmail.com" /></Field>
                    </div>

                    {/* Teléfono / Sexo */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="Número de celular *">
                            <div className="grid grid-cols-[60px_1fr] gap-2">
                                <input type="text" defaultValue="+57" className="text-center" />
                                <input type="tel" placeholder="300 000 0000" />
                            </div>
                        </Field>
                        <Field label="Sexo *">
                            <select defaultValue="">
                                <option value="" disabled>Seleccione</option>
                                <option>Masculino</option><option>Femenino</option><option>Prefiero no decir</option>
                            </select>
                        </Field>
                    </div>

                    {/* Contraseñas */}
                    <div className="grid grid-cols md:grid-cols-2 gap-3">
                        <Field label="Contraseña *">
                            <div className="relative">
                                <input type={showP1 ? "text" : "password"} placeholder="Contraseña" className="pr-10" />
                                <button type="button" onClick={() => setShowP1(!showP1)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">
                                    {showP1 ? "🙈" : "👁"}
                                </button>
                            </div>
                        </Field>
                        <Field label="Confirmar contraseña *">
                            <div className="relative">
                                <input type={showP2 ? "text" : "password"} placeholder="Contraseña" className="pr-10" />
                                <button type="button" onClick={() => setShowP2(!showP2)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">
                                    {showP2 ? "🙈" : "👁"}
                                </button>
                            </div>
                        </Field>
                    </div>

                    {/* Términos */}
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 accent-[#AAFF00]" />
                        <span className="text-[11px] text-white/40 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                            <Link href="/terminos" className="block mt-1 text-[10px] font-bold tracking-wider text-[#AAFF00]">
                                LEER TÉRMINOS Y CONDICIONES
                            </Link>
                        </span>
                    </label>

                    {/* Crear */}
                    <button className="w-full bg-[#AAFF00] text-black font-black text-[15px] rounded-full py-3 tracking-wide hover:opacity-88 transition-opacity">
                        Crear
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[11px] text-white/25">o continúa con</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-2">
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1a1a] font-semibold text-[13px] rounded-full py-3 hover:opacity-88 transition-opacity">
                            {/* Google SVG */}
                            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4" /><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" /><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" /><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" /></svg>
                            Registrarse con Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-[#1a1a2e] text-white font-semibold text-[13px] rounded-full py-3 border border-white/15 hover:opacity-88 transition-opacity">
                            <FaApple size={20} />
                            Registrarse con Apple
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-white/45 tracking-widest uppercase">{label}</span>
            <div className="[&_input]:w-full [&_input]:bg-[#0d1a2d] [&_input]:border [&_input]:border-white/12 [&_input]:rounded-[10px] [&_input]:px-3.5 [&_input]:py-2.5 [&_input]:text-[13px] [&_input]:text-white [&_input]:outline-none [&_input:focus]:border-[#AAFF00] [&_input::placeholder]:text-white/30 [&_select]:w-full [&_select]:bg-[#0d1a2d] [&_select]:border [&_select]:border-white/12 [&_select]:rounded-[10px] [&_select]:px-3.5 [&_select]:py-2.5 [&_select]:text-[13px] [&_select]:text-white [&_select]:outline-none [&_select:focus]:border-[#AAFF00] [&_select]:appearance-none [&_select]:cursor-pointer">
                {children}
            </div>
        </div>
    );
}