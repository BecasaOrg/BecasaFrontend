"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaApple, FaGoogle } from "react-icons/fa";

interface SelectItem {
    id: number | string;
    name: string;
}

export default function CreaTuPerfil() {
    const [showP1, setShowP1] = useState(false);
    const [showP2, setShowP2] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);
    const router = useRouter();

    const [countries, setCountries] = useState<SelectItem[]>([]);
    const [states, setStates] = useState<SelectItem[]>([]);
    const [cities, setCities] = useState<SelectItem[]>([]);

    useEffect(() => {
        // Fetch Countries
        fetch("https://athleticscholarshipagency.com/api/countries")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCountries(data);
                else if (data.data && Array.isArray(data.data)) setCountries(data.data);
            })
            .catch(err => console.error("Error fetching countries:", err));

        // Fetch States
        fetch("https://athleticscholarshipagency.com/api/states")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setStates(data);
                else if (data.data && Array.isArray(data.data)) setStates(data.data);
            })
            .catch(err => console.error("Error fetching states:", err));

        // Fetch Cities
        fetch("https://athleticscholarshipagency.com/api/cities")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCities(data);
                else if (data.data && Array.isArray(data.data)) setCities(data.data);
            })
            .catch(err => console.error("Error fetching cities:", err));
    }, []);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setIsSubmitting(true);

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        const body = Object.fromEntries(formData.entries());

        if (body.password !== body.password_confirmation) {
            setMessage({ type: "error", text: "Las contraseñas no coinciden." });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("https://athleticscholarshipagency.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                // Save token and user data
                localStorage.setItem("auth_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                setMessage({ type: "success", text: "¡Cuenta creada exitosamente!" });
                
                // Redirect to dashboard
                setTimeout(() => {
                    router.push("/dashboard/perfil");
                }, 1000);
            } else {
                let errorMsg = data.message || "Hubo un error al crear la cuenta.";
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0] as string[];
                    if (firstError && firstError.length > 0) {
                        errorMsg = firstError[0];
                    }
                }
                setMessage({ type: "error", text: errorMsg });
            }
        } catch (error: any) {
            console.error("Fetch error:", error);
            setMessage({ type: "error", text: "Error: " + (error.message || "Problema de conexión") });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0E2A] flex justify-center pb-10 relative ">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-[95vw] bg-[#080808]/60 backdrop-blur-lg mt-20 rounded-3xl border border-white/40 ">

                {/*DERECHA: título (arriba en móvil) */}
                <div className="lg:order-last relative flex flex-col items-center justify-center px-8 py-10 mx-8 my-10 lg:py-0 overflow-hidden">

                    <h1 className="relative z-1 text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight text-center">
                        Crea tu perfil y<br />regístrate en un<br />
                        <span className="text-[#AAFF00]">campamento</span>
                    </h1>
                </div>

                {/* IZQUIERDA: formulario*/}
                <div className="flex flex-col gap-4 px-5 py-8 lg:px-10 lg:py-10 bg-[#080808]/10 backdrop-blur-sm rounded-3xl border border-white/40 m-5 ">
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        
                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-[#AAFF00]/20 text-[#AAFF00]' : 'bg-red-500/20 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        {/* Nombres / Apellidos */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="Nombres *"><input name="name" type="text" placeholder="Nombres" required /></Field>
                            <Field label="Apellidos *"><input name="last_name" type="text" placeholder="Apellidos" required /></Field>
                        </div>

                        {/* Fecha / Año graduación */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="Fecha de nacimiento *"><input name="birth_date" type="date" className="placeholder:text-white/30" required /></Field>
                            <Field label="Año de graduación *"><input name="graduation_year" type="number" placeholder="2026" required /></Field>
                        </div>

                        {/* País / Estado */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="País de nacimiento *">
                                <select name="birth_country_id" defaultValue="" required>
                                    <option value="" disabled>Seleccione un País</option>
                                    {countries.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                    {countries.length === 0 && <option value="1">Colombia (Fallback)</option>}
                                </select>
                            </Field>
                            <Field label="Estado / Departamento">
                                <select name="state_id" defaultValue="">
                                    <option value="" disabled>Seleccione un Estado</option>
                                    {states.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                    {states.length === 0 && <option value="1">Cesar (Fallback)</option>}
                                </select>
                            </Field>
                        </div>

                        {/* Ciudad / Deporte */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="Ciudad de residencia *">
                                <select name="city_id" defaultValue="" required>
                                    <option value="" disabled>Seleccione una Ciudad</option>
                                    {cities.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                    {cities.length === 0 && <option value="1">Valledupar (Fallback)</option>}
                                </select>
                            </Field>
                            <Field label="Deporte *">
                                <select name="sport" defaultValue="" required>
                                    <option value="" disabled>Seleccione</option>
                                    {["Fútbol", "Voleibol", "Natación", "Tenis", "Atletismo", "Béisbol", "Basquetbol"].map(d =>
                                        <option key={d} value={d.toLowerCase()}>{d}</option>
                                    )}
                                </select>
                            </Field>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-1 gap-3">
                            <Field label="Email *"><input name="email" type="email" placeholder="usuario@gmail.com" required /></Field>
                        </div>

                        {/* Teléfono / Sexo */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="Número de celular *">
                                <div className="grid grid-cols-[60px_1fr] gap-2">
                                    <input type="text" defaultValue="+57" className="text-center" />
                                    <input name="phone" type="tel" placeholder="300 000 0000" required />
                                </div>
                            </Field>
                            <Field label="Sexo *">
                                <select name="gender" defaultValue="" required>
                                    <option value="" disabled>Seleccione</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="Other">Prefiero no decir</option>
                                </select>
                            </Field>
                        </div>

                        {/* Contraseñas */}
                        <div className="grid grid-cols md:grid-cols-2 gap-3">
                            <Field label="Contraseña *">
                                <div className="relative">
                                    <input name="password" type={showP1 ? "text" : "password"} placeholder="Contraseña" className="pr-10" required minLength={8} />
                                    <button type="button" onClick={() => setShowP1(!showP1)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">
                                        {showP1 ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </Field>
                            <Field label="Confirmar contraseña *">
                                <div className="relative">
                                    <input name="password_confirmation" type={showP2 ? "text" : "password"} placeholder="Contraseña" className="pr-10" required minLength={8} />
                                    <button type="button" onClick={() => setShowP2(!showP2)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">
                                        {showP2 ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </Field>
                        </div>

                        {/* Términos */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 w-4 h-4 accent-[#AAFF00]" required />
                            <span className="text-[11px] text-white/40 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                                <Link href="/terminos" className="block mt-1 text-[10px] font-bold tracking-wider text-[#AAFF00]">
                                    LEER TÉRMINOS Y CONDICIONES
                                </Link>
                            </span>
                        </label>

                        {/* Crear */}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#AAFF00] text-black font-black text-[15px] rounded-full py-3 tracking-wide hover:opacity-88 transition-opacity disabled:opacity-50">
                            {isSubmitting ? "Creando perfil..." : "Crear"}
                        </button>

                    </form>

                    {/* Login link */}
                    <div className="text-center mt-2">
                        <span className="text-white/60 text-sm">¿Ya tienes cuenta? </span>
                        <Link href="/becasa/login" className="text-[#AAFF00] text-sm font-bold hover:underline">
                            Iniciar Sesión
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[11px] text-white/25">o continúa con</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-2">
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1a1a] font-semibold text-[13px] rounded-full py-3 hover:opacity-88 transition-opacity">
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
            <div className="[&_input]:w-full [&_input]:bg-[#0d1a2d] [&_input]:border [&_input]:border-white/12 [&_input]:rounded-[10px] [&_input]:px-3.5 [&_input]:py-2.5 [&_input]:text-[13px] [&_input]:text-white [&_input]:outline-none [&_input:focus]:border-[#AAFF00] [&_input::placeholder]:text-white/30 [&_select]:w-full [&_select]:bg-[#0d1a2d] [&_select]:border [&_select]:border-white/12 [&_select]:rounded-[10px] [&_select]:px-3.5 [&_select]:py-2.5 [&_select]:text-[13px] [&_select]:text-white [&_select]:outline-none [&_select:focus]:border-[#AAFF00] [&_select]:appearance-none [&_select]:cursor-pointer [&_input[type=date]]:text-white/70">
                {children}
            </div>
        </div>
    );
}