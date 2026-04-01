import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionUser = {
  id: number; email: string; full_name: string;
  phone: string; gender: string; college_name: string;
};

export type AppSession = { user?: SessionUser };

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "pglife-super-secret-key-change-in-production-2024",
  cookieName: "pglife_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function getSession() {
  const c = await cookies();
  return getIronSession<AppSession>(c, sessionOptions);
}
