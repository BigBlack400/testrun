"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "true";
}

export async function updateContent(key: string, value: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await prisma.websiteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/");
}

export async function getContent() {
  const content = await prisma.websiteContent.findMany();
  return content.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}
