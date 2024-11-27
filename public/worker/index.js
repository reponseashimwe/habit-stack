// Listen for the `push` event
self.addEventListener("push", (event) => {
  console.log("Push event received:", event.data);

  // Extract data from the push event
  let data = {};

  if (event.data) {
    try {
      data = JSON.parse(event.data.text());
    } catch (err) {
      console.error("Failed to parse push data:", err);
      data = { message: "This is a test message!" };
    }
  }

  const title = data.title || "Default Title";
  const options = {
    body: data.body || "Default body content",
    icon: data.icon || "/icons/icon.svg", // Optional: Replace with your icon URL
    badge: data.badge || "/icons/icon.svg", // Optional: Replace with your badge URL
    data: {
      url: data.url || "/", // URL to open when the notification is clicked
    },
  };

  console.log(data);

  // Show the notification
  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => {
        console.log("Notification shown");
      })
      .catch((err) => {
        console.error("Failed to show notification:", err);
      })
  );
});

// Listen for the `notificationclick` event
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  event.notification.close(); // Close the notification

  // Open the URL provided in the notification data
  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const matchingClient = clientsArr.find(
          (client) => client.url === urlToOpen
        );
        if (matchingClient) {
          return matchingClient.focus(); // Focus the existing tab
        } else {
          return clients.openWindow(urlToOpen); // Open a new tab
        }
      })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated:", event);
});
