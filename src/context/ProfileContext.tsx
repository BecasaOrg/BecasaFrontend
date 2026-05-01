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
  avatar: "https://randomuser.mehttps://athleticscholarshipagency.com/api/portraits/men/32.jpg",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  React.useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetch("/api/user", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) {
          setProfile({
            nombres: data.name || "",
            apellidos: data.last_name || "",
            email: data.email || "",
            telefono: data.phone || "",
            fechaNacimiento: data.birth_date || "",
            pais: data.birth_country_id ? "Colombia" : "Colombia", // Simplificado por ahora
            deporte: data.sport || "",
            avatar: data.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
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
