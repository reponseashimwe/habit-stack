import connectToDB from "@/app/lib/conntectToDB";
import User from "@/app/Models/UserSchema"; // Adjust the path based on your project structure
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDB();

  const { subscription, clerkUserId } = await req.json();

  if (!subscription || !clerkUserId) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  try {
    // Find the user and update their subscription
    await User.findOneAndUpdate(
      { clerkUserId },
      { $set: { pushSubscription: subscription } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: "Subscription saved" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving subscription" },
      { status: 500 }
    );
  }
}
