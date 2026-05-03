"use server";

export async function getCamps() {
  const res = await fetch("https://athleticscholarshipagency.com/api/camps", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error creando camp");
  }

  return res.json();
}
