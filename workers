// Listen for the `push` event
self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  // Extract data from the push event
  const data = event.data ? JSON.parse(event.data.text()) : {};
  console.log("Push data:", data);

  const title = data.title || "Default Title";
  const options = {
    body: data.body || "Default body content",
    icon: data.icon || "/icons/icon.svg", // Optional: Replace with your icon URL
    badge: data.badge || "/icons/icon.svg", // Optional: Replace with your badge URL
    data: {
      url: data.url || "/", // URL to open when the notification is clicked
    },
  };

  // Show the notification
  event.waitUntil(self.registration.showNotification(title, options));
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
