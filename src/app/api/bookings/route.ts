import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createBooking } from "@/lib/blob-db";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.user) 
      return NextResponse.json({ success: false, message: "Please login to book a viewing." }, { status: 401 });

    const { property_id } = await req.json();
    if (!property_id)
      return NextResponse.json({ success: false, message: "Property ID is required." }, { status: 400 });

    const booking = await createBooking(session.user.id, property_id);
    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
