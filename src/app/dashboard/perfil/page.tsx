"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';

const PerfilPage = () => {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState(profile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const body = new FormData();
    body.append('name', formData.nombres);
    body.append('last_name', formData.apellidos);
    body.append('phone', formData.telefono);
    body.append('birth_date', formData.fechaNacimiento);
    body.append('sport', formData.deporte);
    body.append('country', formData.pais);
    
    if (imageFile) {
      body.append('avatar_file', imageFile);
    }

    try {
      const res = await fetch("https://athleticscholarshipagency.com/api/user", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: body
      });

      const data = await res.json();

      if (res.ok) {
        updateProfile({
          nombres: data.name || data.nombres,
          apellidos: data.last_name || data.apellidos,
          telefono: data.phone || data.telefono,
          fechaNacimiento: data.birth_date || data.fechaNacimiento,
          deporte: data.sport || data.deporte,
          avatar: data.avatar || profile.avatar,
        });
        setPreviewUrl(null);
        setImageFile(null);
        alert('Perfil guardado exitosamente.');
      } else {
        alert('Error al guardar el perfil: ' + (data.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('Error de conexión al guardar el perfil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full overflow-y-auto pr-4 pb-10 custom-scrollbar mt-4">
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Ajustes de Cuenta</h1>
        <p className="text-gray-400 font-light mb-10 text-sm">
          Actualiza los datos de tu perfil de estudiante-atleta.
        </p>

        {/* Avatar Upload UI */}
        <div className="flex flex-col items-center mb-10">
          <div 
            className="relative w-32 h-32 rounded-full border-4 border-[#AAFF00]/20 overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(170,255,0,0.1)] transition-all hover:border-[#AAFF00]/60"
            onClick={handleImageClick}
          >
            <Image
              src={previewUrl || formData.avatar}
              alt="Profile avatar"
              fill
              className="object-cover group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
          <p className="text-xs text-[#AAFF00] mt-4 font-semibold uppercase tracking-widest cursor-pointer hover:underline" onClick={handleImageClick}>
            Cambiar Foto
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombres */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">NOMBRES</label>
              <input 
                type="text" 
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all"
              />
            </div>

            {/* Apellidos */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">APELLIDOS</label>
              <input 
                type="text" 
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all"
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">CORREO ELECTRÓNICO</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">TELÉFONO</label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all"
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">FECHA DE NACIMIENTO</label>
              <input 
                type="date" 
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* País */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">PAÍS</label>
              <select 
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all appearance-none"
              >
                <option value="Colombia">Colombia</option>
                <option value="Mexico">México</option>
                <option value="Argentina">Argentina</option>
                <option value="Espana">España</option>
                <option value="Estados Unidos">Estados Unidos</option>
              </select>
            </div>

            {/* Deporte */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-300 tracking-wider">DEPORTE PRINCIPAL</label>
              <select 
                name="deporte"
                value={formData.deporte}
                onChange={handleChange}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#AAFF00]/50 focus:ring-1 focus:ring-[#AAFF00]/50 transition-all appearance-none"
              >
                <option value="Voleibol">Voleibol</option>
                <option value="Futbol">Fútbol</option>
                <option value="Baloncesto">Baloncesto</option>
                <option value="Tenis">Tenis</option>
                <option value="Atletismo">Atletismo</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
            <button 
              type="button" 
              className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className={`px-8 py-3 rounded-full text-sm font-bold text-black bg-[#AAFF00] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(170,255,0,0.3)] ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerfilPage;
