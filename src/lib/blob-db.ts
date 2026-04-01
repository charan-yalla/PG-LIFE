import { put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";

const LOCAL_DIR = path.join(process.cwd(), ".pglife-data");
const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    if (USE_BLOB) {
      const res = await fetch(`https://blob.vercel-storage.com/${key}`, { cache: "no-store" });
      if (!res.ok) return fallback;
      return res.json();
    }
    const raw = await fs.readFile(path.join(LOCAL_DIR, key), "utf-8");
    return JSON.parse(raw);
  } catch { return fallback; }
}

async function writeJson<T>(key: string, data: T): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  if (USE_BLOB) {
    await put(key, body, { access: "public", contentType: "application/json", addRandomSuffix: false });
  } else {
    await fs.mkdir(path.join(LOCAL_DIR, path.dirname(key)), { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, key), body, "utf-8");
  }
}

// ── Users ──────────────────────────────────────────────────────────────────
export type DbUser = {
  id: number; email: string; password_hash: string;
  full_name: string; phone: string; gender: string; college_name: string;
};

const USERS_KEY = "db/users.json";

export async function getUsers(): Promise<DbUser[]> {
  return readJson<DbUser[]>(USERS_KEY, []);
}
export async function getUserByEmail(email: string) {
  return (await getUsers()).find(u => u.email === email);
}
export async function getUserById(id: number) {
  return (await getUsers()).find(u => u.id === id);
}
export async function createUser(data: Omit<DbUser, "id">): Promise<DbUser> {
  const users = await getUsers();
  const newUser: DbUser = { id: Date.now(), ...data };
  await writeJson(USERS_KEY, [...users, newUser]);
  return newUser;
}

// ── Interested ─────────────────────────────────────────────────────────────
export type DbInterested = { user_id: number; property_id: number };
const INT_KEY = "db/interested.json";

export async function getInterested(): Promise<DbInterested[]> {
  return readJson<DbInterested[]>(INT_KEY, []);
}
export async function getInterestedByProperty(property_id: number) {
  return (await getInterested()).filter(i => i.property_id === property_id);
}
export async function getInterestedByUser(user_id: number) {
  return (await getInterested()).filter(i => i.user_id === user_id);
}
export async function toggleInterested(user_id: number, property_id: number): Promise<boolean> {
  const all = await getInterested();
  const exists = all.some(i => i.user_id === user_id && i.property_id === property_id);
  if (exists) {
    await writeJson(INT_KEY, all.filter(i => !(i.user_id === user_id && i.property_id === property_id)));
    return false;
  }
  await writeJson(INT_KEY, [...all, { user_id, property_id }]);
  return true;
}
