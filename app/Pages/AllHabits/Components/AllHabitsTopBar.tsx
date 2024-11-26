import React, { useEffect } from "react";
import AllHabitsSearchBar from "./AllHabitsSearchBar";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UserButton, useUser } from "@clerk/nextjs";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
function AllHabitsTopBar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };

  function openSideBarFunction() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false);
    }

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user } = useUser();

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="max-sm:bg-transparent sm:p-6 pt-3   rounded-md flex justify-between transition-all w-full"
    >
      <div className="flex gap-4">
        <div className="flex flex-col  justify-between">
          <span className="text-xl">
            <span className="font-bold max-sm:hidden">Hi There,</span>
            <span className="font-light max-sm:font-medium">
              {" "}
              {user?.firstName}
            </span>
          </span>
          <span className="font-light text-[12px] text-gray-400 whitespace-nowrap">
            welcome back!
          </span>
        </div>
      </div>

      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-end">
        {/* <AllHabitsSearchBar /> */}
        <DarkMode />
        <FontAwesomeIcon
          onClick={openSideBarFunction}
          className="m-2 hidden sm:flex lg:hidden  mt-[13px] cursor-pointer  "
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default AllHabitsTopBar;
