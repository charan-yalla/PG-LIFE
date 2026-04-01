import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/blob-db";

export async function POST(req: Request) {
  const { email, password, full_name, phone, gender, college_name } = await req.json();
  if (await getUserByEmail(email))
    return NextResponse.json({ success: false, message: "Email already registered." }, { status: 409 });
  const password_hash = await bcrypt.hash(password, 10);
  await createUser({ email, password_hash, full_name, phone, gender, college_name });
  return NextResponse.json({ success: true, message: "Account created! Please log in." });
}
