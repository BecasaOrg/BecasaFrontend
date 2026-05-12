"use client";

import { useTema } from "@/context/TemaContext";
import { Search, Loader, Check, X } from "lucide-react";
import { useState } from "react";
import CouponCard from "./coupon-card";
import { getCouponByCode, Coupon } from "@/app/actions/coupon.action";

interface CouponVerifierProps {
    originalPrice: number;
    appliedCoupon: Coupon | null;
    onApply: (coupon: Coupon) => void;
    onRemove: () => void;
}

export default function CouponVerifier({ originalPrice, appliedCoupon, onApply, onRemove }: CouponVerifierProps) {
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

    if (appliedCoupon) {
        const discount = Number(appliedCoupon.discount_percentage);
        const savings = originalPrice * (discount / 100);
        return (
            <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${oscuro ? "bg-zinc-900 border-[#AAFF00]/30" : "bg-green-50 border-green-300"}`}>
                <div className="flex items-center gap-3">
                    <div className="bg-[#AAFF00] rounded-full p-1.5">
                        <Check size={16} className="text-black" />
                    </div>
                    <div>
                        <p className={`text-sm font-bold ${oscuro ? "text-[#AAFF00]" : "text-green-700"}`}>
                            Cupón aplicado: {Math.ceil(discount)}% descuento
                        </p>
                        <p className={`text-xs ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
                            Ahorras ${Math.round(savings).toLocaleString("es-CO")}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onRemove}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${oscuro ? "hover:bg-zinc-800 text-gray-400 hover:text-white" : "hover:bg-gray-200 text-gray-500"}`}
                    title="Quitar cupón"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3">
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

            {coupon && !appliedCoupon && (
                <div className="flex flex-col gap-3">
                    <CouponCard coupon={coupon} />
                    <button
                        onClick={() => onApply(coupon)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#AAFF00] text-black font-bold text-sm transition-all hover:brightness-110 cursor-pointer"
                    >
                        Aplicar cupón
                    </button>
                </div>
            )}
        </div>
    );
}