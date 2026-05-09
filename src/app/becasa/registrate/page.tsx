"use client";

import { useState, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMercadoPago } from "@/hooks/useMercadoPago";

const posiciones = [
    "Delantero", "Mediocampista", "Defensor", "Portero",
    "Base", "Escolta", "Alero", "Ala-Pívot", "Pívot",
    "Libero", "Opuesto", "Receptor", "Armador",
    "Sprinter", "Fondista", "Saltador", "Lanzador",
];

const nivelesJuego = ["principiante", "intermedio", "avanzado", "Élite / Competitivo"];
const tallasCalcetas = ["XS", "S", "M", "L", "XL", "XXL"];

function FormularioRegistroInner() {
    const searchParams = useSearchParams();
    const campId = searchParams.get("camp_id");

    const [posicionesSeleccionadas, setPosicionesSeleccionadas] = useState<string[]>([]);
    const [clubsSeleccionados, setClubsSeleccionados] = useState<string[]>([]);
    const [posicionInput, setPosicionInput] = useState("");
    const [clubInput, setClubInput] = useState("");
    const [posicionOpen, setPosicionOpen] = useState(false);
    const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

    const [step, setStep] = useState<"register" | "payment">("register");
    const [registrationId, setRegistrationId] = useState<number | null>(null);
    const [payerEmail, setPayerEmail] = useState("");
    const [identificationNumber, setIdentificationNumber] = useState("");

    const MP_PUBLIC_KEY = "TEST-51781f49-dcbe-46fa-9776-ab649735803f";
    const { loaded: mpLoaded, error: mpError, getCardToken } = useMercadoPago(MP_PUBLIC_KEY);

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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setIsSubmitting(true);

        const userId = localStorage.getItem("user_id");
        const authToken = localStorage.getItem("auth_token");

        if (!userId || !authToken) {
            setMessage({ type: "error", text: "Por favor inicia sesión para continuar con el registro." });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(e.currentTarget);

        setPayerEmail(formData.get("guardian_email") as string);
        setIdentificationNumber(formData.get("identification_number") as string);

        if (campId) formData.append("camp_id", campId);
        formData.append("user_id", userId);
        formData.append("position", posicionesSeleccionadas.join(", "));
        formData.append("club_name", clubsSeleccionados.join(", "));

        const fileInput = formData.get("health_insurance_path");
        if (fileInput instanceof File && fileInput.size === 0) {
            formData.delete("health_insurance_path");
        }

        try {
            const response = await fetch("/api/registrations", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("data.data:", data.data);
                const id = data.data?.id ?? data.data?.registration_id ?? data.registration_id;
                console.log("ID extraído:", id);
                setRegistrationId(id);
                setStep("payment");
                setMessage(null);
            } else {
                console.error("Error al registrar:", data);
                setMessage({ type: "error", text: data.message || "Hubo un error al procesar el registro." });
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Error de conexión. Intente nuevamente.";
            setMessage({ type: "error", text: msg });
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setMessage(null);
    //     setIsSubmitting(true);

    //     const authToken = localStorage.getItem("auth_token");
    //     if (!authToken) {
    //         setMessage({ type: "error", text: "Sesión expirada. Inicia sesión nuevamente." });
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     if (!registrationId) {
    //         setMessage({ type: "error", text: "Error: no hay registro activo para asociar el pago." });
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     if (!mpLoaded) {
    //         setMessage({ type: "error", text: "Mercado Pago no se ha cargado aún. Intente nuevamente." });
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     const formElements = e.currentTarget.elements;

    //     const cardNumber = (formElements.namedItem("card_number") as HTMLInputElement).value.replace(/\s/g, "");
    //     const cardholderName = (formElements.namedItem("cardholder_name") as HTMLInputElement).value;
    //     const cardExpiry = (formElements.namedItem("card_expiry") as HTMLInputElement).value;
    //     const cardCvv = (formElements.namedItem("card_cvv") as HTMLInputElement).value;

    //     if (!cardNumber || !cardholderName || !cardExpiry || !cardCvv) {
    //         setMessage({ type: "error", text: "Por favor completa todos los datos de la tarjeta." });
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     const [expMonth, expYear] = cardExpiry.split("/");
    //     if (!expMonth || !expYear) {
    //         setMessage({ type: "error", text: "Formato de fecha inválido. Usa MM/AA." });
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     try {
    //         const token = await getCardToken({
    //             cardNumber,
    //             cardholderName,
    //             cardExpirationMonth: expMonth,
    //             cardExpirationYear: "20" + expYear,
    //             securityCode: cardCvv,
    //             identificationType: "CC",
    //             identificationNumber,
    //         });

    //         const payload = {
    //             token,
    //             transaction_amount: 150000,
    //             description: campId
    //                 ? `Inscripción: Campamento ${campId}`
    //                 : "Inscripción campamento",
    //             installments: 1,
    //             payer: {
    //                 email: payerEmail,
    //                 identification: {
    //                     type: "CC",
    //                     number: identificationNumber,
    //                 },
    //             },
    //             registration_id: registrationId,
    //             ...(campId ? { camp_id: Number(campId) } : {}),
    //         };

    //         const response = await fetch("/api/payments/process-card", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //                 "Authorization": `Bearer ${authToken}`
    //             },
    //             body: JSON.stringify(payload),
    //         });

    //         const data = await response.json();

    //         if (response.ok && data.success) {
    //             setMessage({ type: "success", text: "Pago procesado exitosamente." });
    //         } else {
    //             console.error("Error 422 - respuesta completa:", data);
    //             setMessage({ type: "error", text: data.message || data.error || "Hubo un error al procesar el pago." });
    //         }
    //     } catch (error: unknown) {
    //         console.error("Error en handlePay:", error);
    //         const errMsg = error instanceof Error ? error.message : "Error de conexión. Intente nuevamente.";
    //         const msg = errMsg.includes("token")
    //             ? "Error al procesar la tarjeta. Verifica los datos e intenta nuevamente."
    //             : errMsg;
    //         setMessage({ type: "error", text: msg });
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setIsSubmitting(true);
        const authToken = localStorage.getItem("auth_token");
        if (!authToken) {
            setMessage({ type: "error", text: "Sesión expirada. Inicia sesión nuevamente." });
            setIsSubmitting(false);
            return;
        }
        const form = e.currentTarget.elements;
        const cardNumber = (form.namedItem("card_number") as HTMLInputElement).value.replace(/\s/g, "");
        const cardholderName = (form.namedItem("cardholder_name") as HTMLInputElement).value;
        const cardExpiry = (form.namedItem("card_expiry") as HTMLInputElement).value;
        const cardCvv = (form.namedItem("card_cvv") as HTMLInputElement).value;
        const [expMonth, expYear] = cardExpiry.split("/");
        if (!cardNumber || !cardholderName || !cardExpiry || !cardCvv) {
            setMessage({ type: "error", text: "Completa todos los datos de la tarjeta." });
            setIsSubmitting(false);
            return;
        }
        try {
            const response = await fetch("/api/payments/pay-with-card-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    card_number: cardNumber,
                    expiration_month: parseInt(expMonth),
                    expiration_year: parseInt("20" + expYear),
                    security_code: cardCvv,
                    cardholder_name: cardholderName,
                    transaction_amount: 150000,
                    description: "Inscripción campamento",
                    installments: 1,
                    payer_email: payerEmail,
                    payer_identification_type: "CC",
                    payer_identification_number: identificationNumber,
                    registration_id: registrationId,
                }),
            });
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("text/html")) {
                const htmlText = await response.text();
                console.error("El servidor devolvió HTML en vez de JSON. Status:", response.status);
                console.error("=== INICIO HTML ===");
                console.error(htmlText);
                console.error("=== FIN HTML ===");
                setMessage({ type: "error", text: "Error interno del servidor. Revisa la consola (F12) para más detalles." });
                return;
            }
            const data = await response.json();
            if (data.success) {
                setMessage({ type: "success", text: "Pago procesado exitosamente." });
            } else {
                console.error("Error en el pago:", { status: response.status, data });
                setMessage({ type: "error", text: data.mp_body?.message || data.error || "Error al procesar el pago." });
            }
        } catch (error: unknown) {
            console.error("Error de conexión en el pago:", error);
            const msg = error instanceof Error ? error.message : "Error de conexión.";
            setMessage({ type: "error", text: msg });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#AAFF00]/60 transition-colors";

    const labelClass = "block text-white/60 text-xs mb-1";

    return (
        <section className="min-h-screen bg-[#0A0E2A] flex items-center justify-center px-4 pb-12 pt-17 relative ">

            <div
                className="absolute right-0 -bottom-50 h-full pointer-events-none z-0"
                style={{
                    backgroundImage: "url('/img/becasa/Vector.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundSize: "auto 100%",
                    width: "100%",
                }}
            />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 rounded-2xl overflow-hidden shadow-2xl border border-white/5 px-5 py-5 bg-[#060f18]/80 backdrop-blur-lg relative z-10">

                {/* Columna izquierda */}
                <div className="bg-[#0a1520]/50 px-8 py-10 rounded-2xl">

                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            onClick={() => setStep('register')}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "register" ? "bg-[#AAFF00] text-black" : "bg-[#AAFF00]/30 text-[#AAFF00]"}`}>
                            1
                        </div>
                        <span className={`text-sm ${step === "register" ? "text-white font-medium" : "text-white/40"}`}>Registro</span>
                        <div className="w-6 h-px bg-white/20" />
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "payment" ? "bg-[#AAFF00] text-black" : "bg-white/10 text-white/40"}`}>
                            2
                        </div>
                        <span className={`text-sm ${step === "payment" ? "text-white font-medium" : "text-white/40"}`}>Pago</span>
                    </div>

                    {step === "register" && (
                        <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">

                            {message && (
                                <div className={`sm:col-span-2 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-[#AAFF00]/20 text-[#AAFF00]' : 'bg-red-500/20 text-red-400'}`}>
                                    {message.text}
                                </div>
                            )}

                            {/* Número de identificación */}
                            <div>
                                <label className={labelClass}>Número de identificación (C.C o T.I) *</label>
                                <input name="identification_number" type="text" placeholder="Numero..." className={inputClass} required />
                            </div>

                            {/* Años de experiencia */}
                            <div>
                                <label className={labelClass}>Años de experiencia competitiva *</label>
                                <input name="years_experience" type="number" placeholder="Numero..." className={inputClass} required min="0" />
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
                                            <button type="button" onClick={(e) => { e.stopPropagation(); togglePosicion(p); }} className="hover:text-white transition-colors">×</button>
                                        </span>
                                    ))}
                                    <input
                                        value={posicionInput}
                                        onChange={(e) => { setPosicionInput(e.target.value); setPosicionOpen(true); }}
                                        onFocus={() => setPosicionOpen(true)}
                                        onBlur={() => setTimeout(() => setPosicionOpen(false), 150)}
                                        placeholder={posicionesSeleccionadas.length === 0 ? "Escribe/Selecciona Múltiples Opciones" : ""}
                                        className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none flex-1 min-w-[160px]"
                                        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                                    />
                                </div>
                                {posicionOpen && posicionesFiltradas.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 z-20 bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg mt-1 max-h-40 overflow-y-auto shadow-xl">
                                        {posicionesFiltradas.map((p) => (
                                            <button
                                                type="button"
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
                                    <select name="skill_level" className={`${inputClass} appearance-none cursor-pointer`} defaultValue="" required>
                                        <option value="" disabled>Seleccione</option>
                                        {nivelesJuego.map((n) => <option key={n} value={n.toLowerCase()}>{n}</option>)}
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xs">▼</span>
                                </div>
                            </div>

                            {/* Talla de camiseta */}
                            <div>
                                <label className={labelClass}>Talla de camiseta *</label>
                                <div className="relative">
                                    <select name="shirt_size" className={`${inputClass} appearance-none cursor-pointer`} defaultValue="" required>
                                        <option value="" disabled>Seleccione</option>
                                        {tallasCalcetas.map((t) => <option key={t} value={t}>{t}</option>)}
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
                                            <button type="button" onClick={() => setClubsSeleccionados((prev) => prev.filter((x) => x !== c))} className="hover:text-white transition-colors">×</button>
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
                                <input name="school_name" type="text" placeholder="Escribe..." className={inputClass} required />
                            </div>

                            {/* Certificado EPS */}
                            <div>
                                <label className={labelClass}>Certificado de afiliación a la EPS o carnet de salud *</label>
                                <div
                                    className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#AAFF00]/40 transition-colors"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <span className="text-sm text-white/25 truncate mr-2">{archivoNombre ?? "Adjuntar Archivo"}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 flex-shrink-0">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input name="health_insurance_path" ref={fileRef} type="file" className="hidden" onChange={(e) => setArchivoNombre(e.target.files?.[0]?.name ?? null)} />
                                </div>
                            </div>

                            {/* Restricción alimenticia */}
                            <div>
                                <label className={labelClass}>¿Tiene alguna restricción alimenticia o alergias? *</label>
                                <input name="dietary_restrictions" type="text" placeholder="Escribe..." className={inputClass} />
                            </div>

                            {/* Condición médica */}
                            <div className="sm:col-span-2">
                                <label className={labelClass}>¿Tiene alguna condición médica que debamos conocer?</label>
                                <input name="medical_conditions" type="text" placeholder="Escribe..." className={inputClass} />
                            </div>

                            {/* Separador acudiente */}
                            <div className="sm:col-span-2 border-t border-white/5 pt-2" />

                            {/* Nombre acudiente */}
                            <div>
                                <label className={labelClass}>Nombre completo del acudiente *</label>
                                <input name="guardian_name" type="text" placeholder="Nombre Completo" className={inputClass} required />
                            </div>

                            {/* Teléfono acudiente */}
                            <div>
                                <label className={labelClass}>Número de contacto del acudiente *</label>
                                <input name="guardian_phone" type="tel" placeholder="+57" className={inputClass} required />
                            </div>

                            {/* Email acudiente */}
                            <div>
                                <label className={labelClass}>Email del acudiente *</label>
                                <input name="guardian_email" type="email" placeholder="Usuario@Gmail.Com" className={inputClass} required />
                            </div>

                            {/* Botón registro */}
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#AAFF00] text-black font-bold text-base rounded-full py-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
                                >
                                    {isSubmitting ? "Registrando..." : "Registrarse"}
                                </button>
                            </div>

                        </form>
                    )}

                    {step === "payment" && (
                        <form onSubmit={handlePay} className="grid grid-cols-1 gap-x-5 gap-y-4">

                            {message && (
                                <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-[#AAFF00]/20 text-[#AAFF00]' : 'bg-red-500/20 text-red-400'}`}>
                                    {message.text}
                                </div>
                            )}

                            {message?.type === "success" ? (
                                <div className="text-center py-6">
                                    <p className="text-[#AAFF00] text-lg font-bold mb-2">¡Pago completado!</p>
                                    <p className="text-white/60 text-sm">Tu inscripción está confirmada.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="border border-[#AAFF00]/20 bg-[#AAFF00]/5 rounded-lg p-3 mb-2">
                                        <p className="text-white/70 text-xs">
                                            Registro #{registrationId} creado correctamente. Ahora completa el pago para confirmar tu cupo.
                                        </p>
                                    </div>

                                    {mpError && (
                                        <p className="text-red-400 text-xs">{mpError}</p>
                                    )}

                                    <div>
                                        <label className={labelClass}>Nombre del titular de la tarjeta *</label>
                                        <input
                                            name="cardholder_name"
                                            type="text"
                                            placeholder="Como aparece en la tarjeta"
                                            className={inputClass}
                                            required
                                            autoComplete="cc-name"
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Número de la tarjeta *</label>
                                        <input
                                            name="card_number"
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="0000 0000 0000 0000"
                                            className={inputClass}
                                            required
                                            autoComplete="cc-number"
                                            maxLength={19}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                                                e.target.value = raw.replace(/(.{4})/g, "$1 ").trim();
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Fecha de vencimiento *</label>
                                            <input
                                                name="card_expiry"
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="MM/AA"
                                                className={inputClass}
                                                required
                                                autoComplete="cc-exp"
                                                maxLength={5}
                                                onChange={(e) => {
                                                    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                                                    if (raw.length >= 3) {
                                                        raw = raw.slice(0, 2) + "/" + raw.slice(2);
                                                    }
                                                    e.target.value = raw;
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClass}>CVV *</label>
                                            <input
                                                name="card_cvv"
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="123"
                                                className={inputClass}
                                                required
                                                autoComplete="cc-csc"
                                                maxLength={4}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#AAFF00] text-black font-bold text-base rounded-full py-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
                                    >
                                        {isSubmitting ? "Procesando pago..." : "Pagar"}
                                    </button>
                                </>
                            )}

                        </form>
                    )}

                </div>

                {/* ── Columna derecha: info ── */}
                <div
                    className="relative flex flex-col items-center justify-start px-10 pt-20 pb-12 text-center overflow-hidden">

                    <p className="text-white/60 text-sm leading-relaxed mb-8 relative z-1 max-w-xs">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laore  et dolore magna aliquam erat volutpat.
                    </p>

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

                    <h3 className="text-white font-bold text-2xl leading-tight mb-8 relative z-1">
                        Una comunidad de mas de<br />
                        <span className="text-[#AAFF00]">300 atletas</span> de todo el mundo
                    </h3>

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

export default function FormularioRegistro() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0A0E2A] flex items-center justify-center text-white">Cargando formulario...</div>}>
            <FormularioRegistroInner />
        </Suspense>
    );
}
