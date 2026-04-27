"use client"

import { usePathname } from "next/navigation";
import HeaderBecasa from "./HeaderBecasa";
import HeaderAtletic from "./HeaderAtletic";

export default function HeaderGlobal() {
    
    const pathname = usePathname();

    if (pathname.startsWith('/dashboard')) {
        return null;
    }

    if (pathname.startsWith('/becasa')) {
        return <HeaderBecasa />
    }

    return <HeaderAtletic />
}