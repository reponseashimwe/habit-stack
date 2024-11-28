"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProvider } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import Areas from "../Pages/Areas/Areas";
import AllHabits from "../Pages/AllHabits/AllHabits";
import Statistics from "../Pages/Statistics/Statistics";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkModeColor, defaultColor } from "@/colors";
import { useRouter } from "next/navigation";
import { urlB64ToUint8Array } from "../SendNotification";
import Shared from "../Pages/Statistics copy/Shared";

function Dashboard() {
  const { user } = useUser(); // Get the user object from Clerk
  const router = useRouter(); // Access the Next.js router

  // Redirect to sign-in page if not logged in
  useEffect(() => {
    if (user === null) {
      router.push("/sign-in"); // Redirect to the sign-in page if not logged in
    }
  }, [user]);

  const { menuItemsObject, darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { menuItems } = menuItemsObject;
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
  let selectComponent = null;

  const requestPermission = useCallback(async () => {
    if (user) {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("granted");
        }
      }
    }
  }, [user]);

  // Handle service worker registration
  useEffect(() => {
    if (user && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js") // Register the main service worker (handles caching, etc.)
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      // Register the push notification worker (handles push notifications)
      navigator.serviceWorker
        .register("/worker/index.js") // Register the push notification worker
        .then((registration) => {
          console.log(
            "Push Service Worker registered with scope:",
            registration.scope
          );
          const applicationServerKey = urlB64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          );

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
                  clerkUserId: user.id,
                }),
              });

              console.log(response);
            });
        })
        .catch((error) => {
          console.error("Push Notification Worker registration failed:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if ("Notification" in window) {
      requestPermission(); // Request notification permission when the page loads
    }
  }, [requestPermission]);

  useEffect(() => {
    menuItems.map((singleItem) => {
      if (singleItem.isSelected) {
        setSelectedMenu(singleItem);
      }
    });
  }, [menuItems]);

  switch (selectedMenu?.name) {
    case "Habits":
      selectComponent = <AllHabits />;
      break;
    case "Statistics":
      selectComponent = <Statistics />;
      break;
    case "Areas":
      selectComponent = <Areas />;
      break;
    case "Community":
      selectComponent = <Shared />;
      break;
    case "All Areas":
      break;
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Sidebar />
        <div className="lg:pl-64 w-full max-sm:pb-16">{selectComponent}</div>
        <BlackSoftLayer />
      </LocalizationProvider>
    </div>
  );
}

export default Dashboard;

function BlackSoftLayer() {
  const {
    openSideBarObject,
    habitWindowObject,
    openConfirmationWindowObject,
    openAreaFormObject,
  } = useGlobalContextProvider();
  const { openSideBar } = openSideBarObject;
  const { openHabitWindow } = habitWindowObject;
  const { openConfirmationWindow } = openConfirmationWindowObject;
  const { openAreaForm } = openAreaFormObject;
  return (
    <div
      className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${
        openSideBar || openHabitWindow || openConfirmationWindow || openAreaForm
          ? "fixed"
          : "hidden"
      }`}
    ></div>
  );
}
