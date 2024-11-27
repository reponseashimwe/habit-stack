import toast from "react-hot-toast";

export function sendNotifications(habitName: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    const notification = new Notification("Habit Tracker", {
      body: `It's time to do your habit: ${habitName}`,
      icon: "/icons/icon.svg",
    });
    // Close the notification after a specified time (e.g., 5 seconds)
    setTimeout(() => {
      notification.close();
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}

export const subscribeUser = async (clerkUserId: string) => {
  if ("serviceWorker" in navigator) {
    try {
      const applicationServerKey = urlB64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      );
      navigator.serviceWorker.ready.then(async (registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          })
          .then(async (subscription) => {
            const response = await fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                subscription,
                clerkUserId,
              }),
            });

            console.log(response);
          });
      });
      // const registration = await navigator.serviceWorker.getRegistration();
      // if (registration) {
      //   generateSubscriptionEndPoint(registration, clerkUserId);
      // } else {
      //   const newRegistration = await navigator.serviceWorker.register(
      //     "/worker/index.js"
      //   );
      //   generateSubscriptionEndPoint(newRegistration, clerkUserId);
      // }
    } catch (err) {
      toast.error("Something");
    }
  }
};
export const generateSubscriptionEndPoint = async (
  registration: ServiceWorkerRegistration,
  clerkUserId: string
) => {
  console.log(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
  const applicationServerKey = urlB64ToUint8Array(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
  );
  const options = {
    applicationServerKey,
    userVisibleOnly: true,
  };
  const subscription = await registration.pushManager.subscribe(options);
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      subscription,
      clerkUserId,
    }),
  });

  console.log(response);
};

export function urlB64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4) || "";
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
