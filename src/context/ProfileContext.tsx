"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileData {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  pais: string;
  deporte: string;
  avatar: string;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (newData: Partial<ProfileData>) => void;
}

const defaultProfile: ProfileData = {
  nombres: "Andres Sebastian",
  apellidos: "Guzmán Castillo",
  email: "athletic-scholarship-agency@gmail.com",
  telefono: "+57 3339820565",
  fechaNacimiento: "2000-05-15",
  pais: "Colombia",
  deporte: "Voleibol",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  React.useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetch("https://athleticscholarshipagency.com/api/user", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) {
          const avatarUrl = data.avatar 
            ? (data.avatar.startsWith('http') ? data.avatar : `https://athleticscholarshipagency.com/storage/${data.avatar}`)
            : "https://randomuser.me/api/portraits/men/32.jpg";

          setProfile({
            nombres: data.name || data.nombres || "",
            apellidos: data.last_name || data.apellidos || "",
            email: data.email || "",
            telefono: data.phone || data.telefono || "",
            fechaNacimiento: data.birth_date || data.fechaNacimiento || "",
            pais: data.country || data.birth_country?.name || "Colombia",
            deporte: data.sport || data.deporte || "",
            avatar: avatarUrl,
          });
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
    }
  }, []);

  const updateProfile = (newData: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...newData }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
