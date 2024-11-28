import webPush from "web-push";

export function getCATTime() {
  const date = new Date();

  // Convert to UTC (in milliseconds) and add 2 hours for CAT (+2 UTC)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000; // Convert local time to UTC
  const catTime = new Date(utc + 2 * 3600000); // Add 2 hours to UTC for CAT

  return catTime;
}

export const sendNotification = async (user: any, notification: any) => {
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
