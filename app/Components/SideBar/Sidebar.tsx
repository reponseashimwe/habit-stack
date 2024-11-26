import React, { useRef, useEffect } from "react";
import LogoAnName from "../LogoAnName";
import { useGlobalContextProvider } from "@/app/contextApi";
import MenuSelection from "./MenuSelection";
import LogoutSection from "./LogoutSection";
import { darkModeColor, defaultColor } from "@/colors";

function Sidebar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClicked(event: MouseEvent) {
      if (!sideBarRef.current?.contains(event.target as Node)) {
        setOpenSideBar(false);
      }
    }

    document.addEventListener("click", handleOutsideClicked);
    return () => {
      document.removeEventListener("click", handleOutsideClicked);
    };
  }, [openSideBar]);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      ref={sideBarRef}
      className={`${
        !openSideBar ? "max-sm:flex max-lg:hidden" : " fixed "
      } flex-grow z-40 sm:z-50 shadow-2xl sm:shadow max-sm:shadow-black -mt-2 p-2 px-4 sm:p-10 sm:flex-col justify-between flex   sm:min-h-screen transition-all w-64 fixed bottom-0 left-0 max-sm:w-full max-sm:items-center `}
    >
      <LogoAnName />
      <MenuSelection />

      <LogoutSection />
    </div>
  );
}

export default Sidebar;
