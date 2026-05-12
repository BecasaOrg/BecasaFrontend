"use server"

import { cookies } from "next/headers";

export interface Coupon {
    id: number;
    code: string;
    discount_percentage: string;
    max_installments: string;
    valid_until: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const getCouponByCode = async (code: string) => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    const res = await fetch("https://athleticscholarshipagency.com/api/discounts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ code }),
    });

    const json = await res.json();

    if (!res.ok) {
        if (res.status === 404) throw new Error("Cupón no encontrado");
        throw new Error(json.message || "Error al verificar el cupón");
    }

    if (json.success === false) {
        throw new Error(json.message || "Cupón no disponible");
    }

    return json.data ?? json;
}