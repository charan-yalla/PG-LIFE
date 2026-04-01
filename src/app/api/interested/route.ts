import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { toggleInterested, getInterestedByProperty } from "@/lib/blob-db";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.user) return NextResponse.json({ success: false, is_logged_in: false }, { status: 401 });
  const { property_id } = await req.json();
  const is_interested = await toggleInterested(session.user.id, property_id);
  const count = (await getInterestedByProperty(property_id)).length;
  return NextResponse.json({ success: true, is_interested, count, property_id });
}
