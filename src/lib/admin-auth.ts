import { createHash } from "crypto"
import { list, put } from "@vercel/blob"

const BLOB_PATH = "admin-password.json"

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

async function getStoredHash(): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null

  try {
    const { blobs } = await list({ prefix: BLOB_PATH, token })
    if (!blobs.length) return null

    // no-store: password changes must take effect immediately
    const res = await fetch(blobs[0].url, { cache: "no-store" })
    if (!res.ok) return null

    const data = await res.json()
    return typeof data.hash === "string" ? data.hash : null
  } catch {
    return null
  }
}

/** Returns true if the given password is correct. */
export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = await getStoredHash()

  if (storedHash !== null) {
    return sha256(password) === storedHash
  }

  // Fall back to env var (plain comparison, original behaviour)
  return password === process.env.ADMIN_PASSWORD
}

/** Hashes and stores a new password in Vercel Blob. */
export async function savePasswordHash(newPassword: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not set")

  await put(BLOB_PATH, JSON.stringify({ hash: sha256(newPassword) }), {
    access: "public",
    addRandomSuffix: false,
    token,
    contentType: "application/json",
  })
}
