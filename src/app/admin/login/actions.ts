"use server"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" }
  }

  const secret = new TextEncoder().encode(process.env.ADMIN_SECRET)
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 86400,
  })

  redirect("/admin")
}
