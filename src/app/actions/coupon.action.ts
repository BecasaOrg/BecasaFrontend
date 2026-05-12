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

export type CouponResult =
    | { success: true; data: Coupon }
    | { success: false; error: string };

export const getCouponByCode = async (code: string): Promise<CouponResult> => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    try {
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
            if (res.status === 404) return { success: false, error: "Cupón no encontrado" };
            return { success: false, error: json.message || "Error al verificar el cupón" };
        }

        if (json.success === false) {
            return { success: false, error: json.message || "Cupón no disponible" };
        }

        return { success: true, data: json.data ?? json };
    } catch {
        return { success: false, error: "Error de conexión al verificar el cupón" };
    }
}