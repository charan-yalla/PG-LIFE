import { put, list } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";

const LOCAL_DIR = path.join(process.cwd(), ".pglife-data");
const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    if (USE_BLOB) {
      const { blobs } = await list({ prefix: key });
      const blob = blobs.find(b => b.pathname === key);
      if (!blob) return fallback;

      const res = await fetch(blob.url, { cache: "no-store" });
      if (!res.ok) return fallback;
      return res.json();
    }
    const raw = await fs.readFile(path.join(LOCAL_DIR, key), "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Read error for ${key}:`, err);
    return fallback;
  }
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
  role: "user" | "owner";
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
// ── Properties ────────────────────────────────────────────────────────────
export type DbProperty = {
  id: number; city_id: number; name: string; address: string;
  description: string; gender: "male" | "female" | "unisex";
  rent: number; rating_clean: number; rating_food: number; rating_safety: number;
  images: string[]; is_verified?: boolean; is_popular?: boolean;
  owner_id: number;
};
const PROPS_KEY = "db/properties.json";

export async function getDbProperties(): Promise<DbProperty[]> {
  return readJson<DbProperty[]>(PROPS_KEY, []);
}
export async function createProperty(data: Omit<DbProperty, "id">): Promise<DbProperty> {
  const all = await getDbProperties();
  const next: DbProperty = { id: Date.now(), ...data };
  await writeJson(PROPS_KEY, [...all, next]);
  return next;
}

// ── Bookings ──────────────────────────────────────────────────────────────
export type DbBooking = {
  id: number; user_id: number; property_id: number;
  timestamp: string; status: "pending" | "confirmed" | "rejected";
};
const BOOKINGS_KEY = "db/bookings.json";

export async function getBookings(): Promise<DbBooking[]> {
  return readJson<DbBooking[]>(BOOKINGS_KEY, []);
}
export async function createBooking(user_id: number, property_id: number): Promise<DbBooking> {
  const all = await getBookings();
  const next: DbBooking = { id: Date.now(), user_id, property_id, timestamp: new Date().toISOString(), status: "pending" };
  await writeJson(BOOKINGS_KEY, [...all, next]);
  return next;
}
export async function getBookingsByOwner(owner_id: number) {
  const p = await getDbProperties();
  const myProps = p.filter(x => x.owner_id === owner_id).map(x => x.id);
  return (await getBookings()).filter(b => myProps.includes(b.property_id));
}
