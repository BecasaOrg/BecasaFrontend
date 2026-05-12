"use server"

import { cookies } from "next/headers";

export const getCouponByCode = async (code: string) => {
    const cookiesStore = await cookies();

    
}