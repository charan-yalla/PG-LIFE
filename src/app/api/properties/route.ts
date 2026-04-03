import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createProperty, getDbProperties } from "@/lib/blob-db";
import { properties as seedProperties } from "@/lib/seed";

export async function GET(req: Request) {
  const dbProps = await getDbProperties();
  // Merge seed data with user-added data
  return NextResponse.json({ success: true, properties: [...seedProperties, ...dbProps] });
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.user || session.user.role !== "owner")
      return NextResponse.json({ success: false, message: "Only owners can add properties." }, { status: 403 });

    const data = await req.json();
    const property = await createProperty({ ...data, owner_id: session.user.id });
    return NextResponse.json({ success: true, property });
  } catch (err) {
    console.error("Property creation error:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
