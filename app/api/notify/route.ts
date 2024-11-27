import connectToDB from "@/app/lib/conntectToDB";
import User from "@/app/Models/UserSchema"; // Adjust the path based on your project structure
import { NextResponse } from "next/server";
import webPush from "web-push";

export async function GET(req: Request) {
  await connectToDB();

  try {
    console.log("Connected to DB");

    // Fetch all users with a subscription field
    const usersWithSubscription = await User.find({
      pushSubscription: { $exists: true, $ne: null },
    });

    if (usersWithSubscription.length === 0) {
      return NextResponse.json({ message: "No subscriptions found" });
    }

    // Prepare the notification payload
    const notificationPayload = {
      title: "Habit Reminder",
      message: "Habit Reminder",
      body: "This is a reminder to track your habit!",
      icon: "/icons/icon.svg", // Optional, add an icon URL
    };

    // Send notifications to all users
    const notificationPromises = usersWithSubscription.map((user) =>
      sendNotification(user, notificationPayload)
    );

    // Wait for all notifications to be sent
    await Promise.all(notificationPromises);

    return NextResponse.json({
      message: "Notifications sent successfully",
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
