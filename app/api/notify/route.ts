import connectToDB from "@/app/lib/conntectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import User from "@/app/Models/UserSchema"; // Adjust the path based on your project structure
import { NextResponse } from "next/server";
import webPush from "web-push";

export async function GET(req: Request) {
  await connectToDB();

  try {
    console.log("Connected to DB");
    const date = new Date().toString();

    const now = getCATTime();
    const flooredMinutes = Math.round(now.getMinutes() / 10) * 10;
    const flooredTime = new Date(now.setMinutes(flooredMinutes, 0, 0));
    const formattedTime = flooredTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Get current day abbreviation (e.g., "Mo", "Tu")
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDay = days[flooredTime.getDay()];
    let response: any;

    // Fetch habits matching the criteria
    const habits = await HabitsCollection.find({
      "frequency.days": currentDay,
      notificationTime: formattedTime,
      isNotificationOn: true,
      queryTimestamp: new Date(),
    });

    if (habits.length === 0) {
      response = NextResponse.json({
        message: "No habits to notify",
        formattedTime,
        currentDay,
        date,
      });
    }

    const userHabits = habits.reduce((acc: any, habit: any) => {
      const userId = habit.clerkUserId;
      acc[userId] = acc[userId] || [];
      acc[userId].push(habit);
      return acc;
    }, {});

    // Fetch users with push subscriptions
    const userIds = Object.keys(userHabits);
    const users = await User.find({
      clerkUserId: { $in: userIds },
      pushSubscription: { $exists: true, $ne: null },
    });

    if (users.length === 0) {
      response = NextResponse.json({ message: "No users with subscriptions" });
    } else {
      // Fetch all users with a subscription field
      const notificationPromises = users.map((user) => {
        const userSpecificHabits = userHabits[user.clerkUserId];
        const habitNames = userSpecificHabits
          .map((habit: any) => habit.name)
          .join(", ");

        const notificationPayload = {
          title: "Habit Reminder",
          body: `Don't forget: ${habitNames}`,
          icon: "/icons/icon.svg", // Optional: Update with your icon path
        };

        return sendNotification(user, notificationPayload);
      });

      await Promise.all(notificationPromises);

      response = NextResponse.json({
        formattedTime,
        currentDay,
        date,
        message: "Notifications sent successfully",
        habits,
        users,
      });
    }

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { message: "Error sending notifications" },
      { status: 500 }
    );
  }
}

const sendNotification = async (user: any, notification: any) => {
  const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
  const privateVapidKey = process.env.VAPID_PRIVATE_KEY!;

  // Set web push VAPID details
  webPush.setVapidDetails(
    "mailto:your-email@example.com", // Replace with your email
    publicVapidKey,
    privateVapidKey
  );

  webPush
    .sendNotification(user.pushSubscription, JSON.stringify(notification))
    .catch((err) => {
      console.error(`Error sending notification to user ${user.id}:`, err);
    });
};

function getCATTime() {
  const date = new Date();

  // Convert to UTC (in milliseconds) and add 2 hours for CAT (+2 UTC)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000; // Convert local time to UTC
  const catTime = new Date(utc + 2 * 3600000); // Add 2 hours to UTC for CAT

  return catTime;
}
