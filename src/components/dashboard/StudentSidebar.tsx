"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, MapPin, Calendar, Phone, Trophy, LayoutDashboard } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';

const StudentSidebar = () => {
    const { profile } = useProfile();

    return (
        <div className="h-full bg-gradient-to-b from-[#1a1c2c] to-[#050d18] rounded-[40px] p-4 sm:p-8 flex flex-col items-center text-white border border-white/10 shadow-2xl backdrop-blur-sm relative overflow-y-auto overflow-x-hidden custom-scrollbar">
            {/* Background Glow */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#AAFF00]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#00aaff]/10 rounded-full blur-[100px]" />

            {/* Logo */}
            <Link href="/dashboard" className="mb-10 z-10 hover:opacity-80 transition-opacity cursor-pointer">
                <Image src="/icon.svg" alt="ASA Logo" width={60} height={180} className="brightness-110" />
            </Link>

            {/* Profile Pic */}
            <div className="relative mb-6 z-10">
                <div className="w-32 h-32 rounded-full border-4 border-[#AAFF00]/20 overflow-hidden shadow-[0_0_30px_rgba(170,255,0,0.1)] relative">
                    <Image
                        src={profile.avatar}
                        alt={`${profile.nombres} ${profile.apellidos} - Profile Picture`}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#AAFF00] rounded-full p-1 border-4 border-[#1a1c2c]">
                    <CheckCircle className="w-5 h-5 text-black" />
                </div>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-8 z-10">
                <h2 className="text-xl font-black tracking-tight leading-tight mb-1">
                    {profile.nombres}<br />{profile.apellidos}
                </h2>
                <p className="text-white/40 text-[10px] font-medium tracking-widest lowercase">
                    {profile.email}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-10 w-full z-10 px-2">
                <Link href="/dashboard" className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 border border-white/20 text-[#AAFF00] font-black py-2.5 rounded-full text-xs hover:bg-white/10 transition-colors">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Panel
                </Link>
                <Link href="/dashboard/perfil" className="flex-1 flex items-center justify-center bg-[#AAFF00] text-black font-black py-2.5 rounded-full text-xs hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(170,255,0,0.3)]">
                    Perfil
                </Link>
            </div>

            {/* Progress Section */}
            <div className="w-full mb-10 z-10 px-4">
                <div className="flex justify-center items-baseline gap-1 mb-2">
                    <span className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">Proceso</span>
                </div>
                <div className="text-center mb-3">
                    <span className="text-4xl font-black text-[#f8f8f8]">78%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#AAFF00] to-[#f8f8f8] w-[78%] rounded-full shadow-[0_0_10px_rgba(170,255,0,0.5)]" />
                </div>
            </div>

            {/* Details List */}
            <div className="w-full space-y-4 mb-10 z-10 px-4 text-[11px]">
                <div className="flex justify-between items-center group cursor-default">
                    <span className="text-white/40 font-bold tracking-wider flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-[#AAFF00]" />
                        Deporte
                    </span>
                    <span className="font-bold">{profile.deporte}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white/40 font-bold tracking-wider flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#AAFF00]" />
                        País
                    </span>
                    <span className="font-bold">{profile.pais}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white/40 font-bold tracking-wider flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#AAFF00]" />
                        Fecha de nacimiento
                    </span>
                    <span className="font-bold">{profile.fechaNacimiento.split('T')[0]}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-white/40 font-bold tracking-wider flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#AAFF00]" />
                        Celular
                    </span>
                    <span className="font-bold">{profile.telefono}</span>
                </div>
            </div>

            {/* Events Section */}
            <div className="w-full z-10 px-4 mb-auto">
                <h4 className="text-[10px] font-black text-[#AAFF00] tracking-[0.2em] mb-2 uppercase border-l-2 border-[#AAFF00] pl-2">Eventos</h4>
                <p className="text-[10px] text-white/60 font-medium leading-relaxed">
                    Registrado en <span className="text-white font-bold uppercase underline decoration-[#AAFF00]/40 decoration-2 underline-offset-2">BECASA CAMP VOLEIBOL 2026</span>
                </p>
            </div>

            {/* Bottom Status Status Rings */}
            <div className="flex justify-center gap-6 mt-10 z-10 w-full px-2">
                {[
                    { label: 'Acad', color: '#AAFF00', value: 85 },
                    { label: 'Phys', color: '#00aaff', value: 92 },
                    { label: 'Eng', color: '#ff00aa', value: 70 }
                ].map((status, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center relative group-hover:border-white/30 transition-colors">
                            <div 
                                className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-1000"
                                style={{ 
                                    borderTopColor: status.color,
                                    transform: `rotate(${status.value * 3.6}deg)`
                                }}
                            />
                            <span className="text-[8px] font-black uppercase text-white/60 group-hover:text-white transition-colors">{status.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentSidebar;
