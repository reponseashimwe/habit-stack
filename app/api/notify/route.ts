import connectToDB from "@/app/lib/conntectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";
import User from "@/app/Models/UserSchema"; // Adjust the path based on your project structure
import { NextResponse } from "next/server";
import webPush from "web-push";

export async function GET(req: Request) {
  await connectToDB();

  try {
    console.log("Connected to DB");

    const now = getCATTimeWithIntl();
    const flooredMinutes = Math.floor(now.getMinutes() / 10) * 10;
    const flooredTime = new Date(now.setMinutes(flooredMinutes, 0, 0));
    const formattedTime = flooredTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Get current day abbreviation (e.g., "Mo", "Tu")
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDay = days[flooredTime.getDay()];

    // Fetch habits matching the criteria
    const habits = await HabitsCollection.find({
      "frequency.days": currentDay,
      notificationTime: formattedTime,
      isNotificationOn: true,
    });

    if (habits.length === 0) {
      return NextResponse.json({
        message: "No habits to notify",
        formattedTime,
        currentDay,
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
      return NextResponse.json({ message: "No users with subscriptions" });
    }
    console.log(users);

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

    return NextResponse.json({
      message: "Notifications sent successfully",
      habits,
      users,
    });
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

function getCATTimeWithIntl() {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000; // Convert to UTC
  const cat = new Date(utc + 2 * 3600000); // Add 2 hours for CAT
  return cat;
}
