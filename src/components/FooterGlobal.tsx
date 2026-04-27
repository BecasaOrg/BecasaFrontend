"use client"

import { usePathname } from "next/navigation";
import FooterBecasa from "./FooterBecasa";
import FooterAtletic from "./FooterAtletic";

export default function FooterGlobal() {

    const pathname = usePathname();

    if (pathname.startsWith('/dashboard')) {
        return null;
    }

    if (pathname.startsWith('/becasa')) {
        return <FooterBecasa />
    }

    return <FooterAtletic />
}