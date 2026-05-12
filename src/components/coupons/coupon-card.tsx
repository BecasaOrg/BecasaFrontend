"use client";

import { useTema } from "@/context/TemaContext";
import { Calendar, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Coupon {
    id: number;
    code: string;
    discount_percentage: string;
    max_installments: string;
    valid_until: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface CouponCardProps {
    coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
    const { oscuro } = useTema();
    const [copied, setCopied] = useState(false);

    const formattedDate = new Date(coupon.valid_until).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const copyCode = async () => {
        await navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${oscuro
                ? "bg-zinc-900 border-zinc-700 hover:shadow-zinc-800/50"
                : "bg-white border-gray-200 hover:shadow-gray-200/80"
                } ${!coupon.is_active ? "opacity-60" : ""}`}
        >
            <div className="absolute top-3 right-3">
                <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${coupon.is_active
                        ? "bg-[#AAFF00] text-black"
                        : "bg-gray-500 text-white"
                        }`}
                >
                    {coupon.is_active ? "Activo" : "Inactivo"}
                </span>
            </div>

            <div className="p-5 flex flex-col gap-4">
                <div>
                    <span className="inline-block bg-[#AAFF00] text-black text-sm font-bold px-3 py-1 rounded-lg mb-3">
                        {Math.ceil(Number(coupon.discount_percentage))}% OFF
                    </span>
                    <div className="flex items-center justify-between gap-2">
                        <code
                            className={`text-2xl font-bold tracking-widest select-all ${oscuro ? "text-white" : "text-gray-900"
                                }`}
                        >
                            {coupon.code}
                        </code>
                        <button
                            onClick={copyCode}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${oscuro
                                ? "hover:bg-zinc-800 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
                                }`}
                            title="Copiar código"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                <div className={`flex items-center gap-2 text-sm ${oscuro ? "text-gray-400" : "text-gray-500"}`}>
                    <Calendar size={14} />
                    <span>Válido hasta: <strong className={oscuro ? "text-gray-300" : "text-gray-700"}>{formattedDate}</strong></span>
                </div>

                {Number(coupon.max_installments) > 1 && (
                    <div className={`text-xs ${oscuro ? "text-gray-500" : "text-gray-400"}`}>
                        Hasta {coupon.max_installments} pagos
                    </div>
                )}
            </div>
        </div>
    );
}