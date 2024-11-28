import { NextResponse } from "next/server";
import HabitsCollection from "@/app/Models/HabitSchema";
import connectToDB from "@/app/lib/conntectToDB";
import User from "@/app/Models/UserSchema";
import { sendNotification } from "../notify/route";

export async function POST(req: Request) {
  try {
    const { habitId, clerkUserId } = await req.json();
    const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD

    if (!habitId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const habit = await HabitsCollection.findOne({ _id: habitId, clerkUserId });

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    // Check if the habit is completed today
    const completedToday = habit.completedDays.find(
      (completedDay: any) => completedDay.date === currentDate
    );

    if (completedToday) {
      return NextResponse.json(
        { message: "Habit completed today" },
        { status: 400 }
      );
    }

    // Check if reminder has already been sent for today
    if (completedToday?.reminderSent) {
      return NextResponse.json({ message: "Reminder already sent today" });
    }

    // Send reminder (this is where you would integrate your reminder service)
    // Example: sendReminder(habit);

    // Mark reminder as sent for today
    const updatedHabit = await HabitsCollection.findOneAndUpdate(
      { _id: habitId, "completedDays.date": currentDate },
      { $set: { "completedDays.$.reminderSent": true } },
      { new: true }
    );

    const user = await User.findOne({
      clerkUserId: habit.clerkUserId,
      pushSubscription: { $exists: true, $ne: null },
    });
    if (user) {
      sendNotification(user, {
        title: "Don't forget your habit!" as any,
        body: `Someone sent you a reminder for: ${habit.name}`,
        icon: "/icons/icon.svg",
      });
    }

    return NextResponse.json({
      message: "Reminder sent successfully",
      habit: updatedHabit,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
