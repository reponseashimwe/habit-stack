import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor } from "@/colors";
import DarkMode from "../../AllHabits/Components/DarkMode";
function SharedTopBar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openSideBar, setOpenSideBar } = openSideBarObject;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className=" max-sm:bg-transparent sm:p-6 pt-3  rounded-md flex justify-between items-center transition-all"
    >
      <div className="  ">
        <span className="text-lg sm:text-xl font-bold">Shared</span>
      </div>
      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-end">
        {/* <AllHabitsSearchBar /> */}
        <DarkMode />
        <FontAwesomeIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="m-2 hidden sm:flex lg:hidden  mt-[13px] cursor-pointer  "
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default SharedTopBar;
