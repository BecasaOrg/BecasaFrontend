"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaApple, FaGoogle } from "react-icons/fa";
import { loginAction } from "@/app/actions/auth.action";

export default function Login() {
    const [showP1, setShowP1] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const data = await loginAction(formData);

            if (data.token) {
                localStorage.setItem("auth_token", data.token);
                localStorage.setItem("user_id", data.user.id);
                setMessage({ type: "success", text: "¡Inicio de sesión exitoso!" });

                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
        } else {
            return (
                <button
                    onClick={() => router.push(`/becasa/registrate?camp_id=${camp.id}&camp_price=${Math.ceil(Number(camp.price))}`)}
                    className="mt-4 w-full py-2 bg-gray-50 text-gray-500 font-bold text-xs rounded-xl hover:bg-[#AAFF00] hover:text-black transition-colors uppercase tracking-widest"
                >
                    Inscribirse
                </button>
            );
        }
        } catch {
            setMessage({ type: "error", text: "Error de conexión. Intente nuevamente." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0E2A] flex justify-center items-center pb-10 relative ">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[95vw] max-w-6xl bg-[#080808]/60 backdrop-blur-lg mt-20 rounded-3xl border border-white/40 ">

                {/*DERECHA: título (arriba en móvil) */}
                <div className="lg:order-last relative flex flex-col items-center justify-center px-8 py-10 mx-8 my-10 lg:py-0 overflow-hidden">
                    <h1 className="relative z-1 text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight text-center">
                        Bienvenido de<br />vuelta a<br />
                        <span className="text-[#AAFF00]">Becasa</span>
                    </h1>
                </div>

                {/* IZQUIERDA: formulario*/}
                <div className="flex flex-col gap-6 px-5 py-12 lg:px-12 lg:py-16 bg-[#080808]/10 backdrop-blur-sm rounded-3xl border border-white/40 m-5 ">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        {message && (
                            <div className={`p-3 rounded-lg text-sm text-center ${message.type === 'success' ? 'bg-[#AAFF00]/20 text-[#AAFF00]' : 'bg-red-500/20 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        {/* Email */}
                        <Field label="Email *">
                            <input name="email" type="email" placeholder="usuario@gmail.com" required />
                        </Field>

                        {/* Contraseña */}
                        <Field label="Contraseña *">
                            <div className="relative">
                                <input name="password" type={showP1 ? "text" : "password"} placeholder="Contraseña" className="pr-10" required />
                                <button type="button" onClick={() => setShowP1(!showP1)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 text-sm">
                                    {showP1 ? "🙈" : "👁"}
                                </button>
                            </div>
                        </Field>

                        <div className="flex justify-end">
                            <span className="text-[11px] font-bold text-[#AAFF00]/50 tracking-wider uppercase cursor-not-allowed">
                                ¿Olvidaste tu contraseña?
                            </span>
                        </div>

                        {/* Entrar */}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#AAFF00] text-black font-black text-[15px] rounded-full py-3 mt-2 tracking-wide hover:opacity-88 transition-opacity disabled:opacity-50">
                            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </button>

                    </form>

                    {/* Register link */}
                    <div className="text-center">
                        <span className="text-white/60 text-sm">¿No tienes cuenta? </span>
                        <Link href="/becasa/crea-tu-perfil" className="text-[#AAFF00] text-sm font-bold hover:underline">
                            Regístrate
                        </Link>
                    </div>

                    {/* Divider 
                    <div className="flex items-center gap-3 my-2">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[11px] text-white/25">o continúa con</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>*/}

                    {/* Social 
                    <div className="flex flex-col gap-3">
                        <button className="w-full flex items-center justify-center gap-3 bg-white text-[#1a1a1a] font-semibold text-[13px] rounded-full py-3 hover:opacity-88 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4" /><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" /><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" /><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" /></svg>
                            Continuar con Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-[#1a1a2e] text-white font-semibold text-[13px] rounded-full py-3 border border-white/15 hover:opacity-88 transition-opacity">
                            <FaApple size={20} />
                            Continuar con Apple
                        </button>
                    </div>*/}

                </div>
            </div>

        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-white/45 tracking-widest uppercase">{label}</span>
            <div className="[&_input]:w-full [&_input]:bg-[#0d1a2d] [&_input]:border [&_input]:border-white/12 [&_input]:rounded-[10px] [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-[14px] [&_input]:text-white [&_input]:outline-none [&_input:focus]:border-[#AAFF00] [&_input::placeholder]:text-white/30">
                {children}
            </div>
        </div>
    );
}
