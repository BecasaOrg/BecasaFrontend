"use client";
import { useTema } from "@/context/TemaContext";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { oscuro } = useTema();
  
  return (
    <main className={`flex-1 ${oscuro ? "bg-black text-white" : "bg-white text-black"}`}>
      {children}
    </main>
  );
}