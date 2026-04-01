import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/blob-db";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });

  const session = await getSession();
  session.user = { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone, gender: user.gender, college_name: user.college_name };
  await session.save();
  return NextResponse.json({ success: true, message: "Login successful!", user: session.user });
}
