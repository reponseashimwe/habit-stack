import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/conntectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import { getCATTime } from "@/app/lib/utils";

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDB();
    const now = getCATTime();

    const flooredMinutes = Math.round(now.getMinutes() / 10) * 10;
    const flooredTime = new Date(now.setMinutes(flooredMinutes, 0, 0));

    // Get current day abbreviation (e.g., "Mo", "Tu")
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDay = days[flooredTime.getDay()];

    const habits = await HabitsCollection.find({
      // clerkUserId: { $ne: clerkId }, // Exclude habits owned by the requesting user
      "frequency.days": currentDay,
      isShared: true, // Only include shared habits
    });
    return NextResponse.json({ habits: habits });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
