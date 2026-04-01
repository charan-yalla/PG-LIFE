import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getInterested } from "@/lib/blob-db";
import { getPropertiesByCity } from "@/lib/seed";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "";
  const session = await getSession();
  const props = getPropertiesByCity(city);
  const allInterested = await getInterested();
  const result: Record<number, { count: number; isInt: boolean }> = {};
  for (const p of props) {
    const rows = allInterested.filter(i => i.property_id === p.id);
    result[p.id] = { count: rows.length, isInt: !!session.user && rows.some(i => i.user_id === session.user!.id) };
  }
  return NextResponse.json(result);
}
