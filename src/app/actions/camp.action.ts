"use server";

import { cookies } from "next/headers";

export async function getCamps() {

  const cookiesStore = await cookies();

  const token = cookiesStore.get("auth_token")?.value;

  console.log(token, "token al obtener camps");

  const res = await fetch("https://athleticscholarshipagency.com/api/camps", {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error creando camp");
  }

  return res.json();
}


export async function getCampById(id: number) {

  const cookiesStore = await cookies();

  const token = cookiesStore.get("auth_token")?.value;

  console.log(token, "token al obtener camps");

  const res = await fetch(`https://athleticscholarshipagency.com/api/camps/${id}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error creando camp");
  }

  return res.json();
}
