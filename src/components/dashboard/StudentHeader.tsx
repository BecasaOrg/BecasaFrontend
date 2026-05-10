"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, FileText, LogOut, Trash2, LayoutDashboard, LogIn } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { logoutAction } from '@/app/actions/auth.action';

const StudentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("auth_token"));
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    router.push("/becasa/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  if (!isLoggedIn) {
    return (
      <Link
        href="/becasa/login"
        className="flex items-center gap-2 bg-[#AAFF00] text-black font-bold text-sm rounded-full px-5 py-2 hover:opacity-90 transition-opacity"
      >
        <LogIn className="w-4 h-4" />
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <div
        className={`absolute top-0 right-0 w-[240px] rounded-[2.5rem] pt-16 pb-4 px-3 
          bg-[#0d1424]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5
          transition-all duration-400 origin-top z-10
          ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="flex flex-col gap-1.5 mt-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white/80 hover:text-[#AAFF00] hover:bg-[#AAFF00]/10 px-4 py-2.5 rounded-2xl transition-all duration-300 text-[13px] font-semibold tracking-wide group"
          >
            <LayoutDashboard className="w-4 h-4" />
            Panel Principal
          </Link>
          <Link
            href="/dashboard/perfil"
            className="flex items-center gap-3 text-white/80 hover:text-[#AAFF00] hover:bg-[#AAFF00]/10 px-4 py-2.5 rounded-2xl transition-all duration-300 text-[13px] font-semibold tracking-wide group"
          >
            <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            Ajuste de cuenta
          </Link>
          <span
            className="flex items-center gap-3 text-white/30 px-4 py-2.5 rounded-2xl text-[13px] font-semibold tracking-wide cursor-not-allowed"
            title="Próximamente"
          >
            <FileText className="w-4 h-4" />
            Facturas
          </span>

          <div className="h-[1px] bg-white/5 my-1 mx-4"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/50 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-2xl transition-all duration-300 text-[13px] font-semibold tracking-wide w-full text-left group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            Cerrar sesión
          </button>
        </div>
      </div>

      <div
        className={`relative z-20 flex items-center justify-between gap-4 bg-[#050b14] text-white px-2.5 py-2 rounded-full shadow-xl cursor-pointer transition-all duration-300 border 
          ${isOpen ? 'border-[#AAFF00]/40 shadow-[0_0_20px_rgba(170,255,0,0.15)] ring-2 ring-[#AAFF00]/20' : 'border-white/5 hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-extrabold text-[13px] tracking-tight pl-4 text-white/90">Hola {profile.nombres}</span>
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white/5 relative shrink-0 border border-white/10 shadow-inner">
          <Image
            src={profile.avatar}
            alt={`${profile.nombres} Profile`}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
