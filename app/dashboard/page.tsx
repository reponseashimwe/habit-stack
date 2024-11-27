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

  const requestPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Permission is granted");
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("requesting permission");

    if ("Notification" in window) {
      requestPermission();
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
    case "All Habits":
      selectComponent = <AllHabits />;
      break;
    case "Statistics":
      selectComponent = <Statistics />;
      break;
    case "Areas":
      selectComponent = <Areas />;
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
      className="flex   "
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
