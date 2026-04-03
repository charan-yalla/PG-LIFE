import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getBookingsByOwner, getUsers, getDbProperties } from "@/lib/blob-db";
import { properties as seedProperties } from "@/lib/seed";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.user || session.user.role !== "owner")
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 403 });

    const bookings = await getBookingsByOwner(session.user.id);
    const users = await getUsers();
    const dbProps = await getDbProperties();
    const allProps = [...seedProperties, ...dbProps];

    // Enrich bookings with user and property details
    const enriched = bookings.map(b => {
      const user = users.find(u => u.id === b.user_id);
      const prop = allProps.find(p => p.id === b.property_id);
      return {
        ...b,
        user_name: user?.full_name || "Unknown User",
        user_email: user?.email || "No Email",
        user_phone: user?.phone || "No Phone",
        property_name: prop?.name || "Deleted Property",
      };
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ success: true, bookings: enriched });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
