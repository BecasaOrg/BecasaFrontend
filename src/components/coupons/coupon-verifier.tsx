"use client";

import { useTema } from "@/context/TemaContext";
import { Search, Loader } from "lucide-react";
import { useState } from "react";
import CouponCard from "./coupon-card";
import { getCouponByCode } from "@/app/actions/coupon.action";

export default function CouponVerifier() {
    const { oscuro } = useTema();
    const [code, setCode] = useState("");
    const [coupon, setCoupon] = useState<Awaited<ReturnType<typeof getCouponByCode>> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const verifyCoupon = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setError("");
        setCoupon(null);

        try {
            const data = await getCouponByCode(code.trim());
            setCoupon(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") verifyCoupon();
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    placeholder="Ingresa tu código"
                    className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-colors ${
                        oscuro
                            ? "bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500 focus:border-[#AAFF00]"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#AAFF00]"
                    }`}
                />
                <button
                    onClick={verifyCoupon}
                    disabled={loading || !code.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#AAFF00] text-black font-bold text-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {loading ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
                    Verificar
                </button>
            </div>

            {error && (
                <p className={`text-sm text-center ${oscuro ? "text-red-400" : "text-red-600"}`}>
                    {error}
                </p>
            )}

            {coupon && <CouponCard coupon={coupon} />}
        </div>
    );
}