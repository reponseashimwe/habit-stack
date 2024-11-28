import connectToDB from "@/app/lib/conntectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import User from "@/app/Models/UserSchema";
import { NextResponse } from "next/server";
import { sendNotification } from "../notify/route";
import { Db, ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { habitId, clerkUserId } = await req.json();

    if (!habitId || !clerkUserId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    await HabitsCollection.updateMany(
      { habitLikes: { $exists: false } },
      { $set: { habitLikes: [] } }
    );

    const habit = await HabitsCollection.findOne({ _id: habitId });
    console.log(habit);

    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const hasLiked = habit.habitLikes?.includes(clerkUserId) || false;
    // Ensure habitLikes array exists
    // Determine the update operation: add or remove
    const updateOperation = hasLiked
      ? { $pull: { habitLikes: clerkUserId } } // If already liked, remove user ID
      : { $addToSet: { habitLikes: clerkUserId } }; // If not liked, add user ID

    // Update the habit in the database
    const updatedHabit = await HabitsCollection.findOneAndUpdate(
      { _id: habitId },
      updateOperation,
      { new: true } // Return the updated document
    );

    const user = await User.findOne({
      clerkUserId: habit.clerkUserId,
      pushSubscription: { $exists: true, $ne: null },
    });

    await HabitsCollection.updateMany(
      { habitLikes: { $exists: false } },
      { $set: { habitLikes: [] } }
    );

    if (user && !hasLiked) {
      sendNotification(user, {
        title: "Someone liked your habit!",
        body: `Keep going, someone liked your habit: ${habit.name}`,
        icon: "/icons/icon.svg",
      });
    }

    return NextResponse.json({
      message: "Saved  successfully",
      habit: updatedHabit,
      isLiked: !hasLiked,
    });
  } catch (error: any) {
    console.error("Error liking habit:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
