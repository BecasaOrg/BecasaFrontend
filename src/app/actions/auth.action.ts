"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const body = Object.fromEntries(formData.entries());

  const res = await fetch("https://athleticscholarshipagency.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400,
    });
  }

  return data;
}

export async function registerAction(formData: FormData) {
  const body = Object.fromEntries(formData.entries());

  const res = await fetch("https://athleticscholarshipagency.com/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400,
    });
  }

  return data;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
  });

  try {
    await fetch("https://athleticscholarshipagency.com/api/logout", {
      method: "POST",
      headers: { Accept: "application/json" },
    });
  } catch {
    // ignore backend errors
  }
}
