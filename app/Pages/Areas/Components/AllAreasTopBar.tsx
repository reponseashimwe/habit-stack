import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import DarkMode from "../../AllHabits/Components/DarkMode";
import Button from "@/Button";
function AreasTopBar() {
  //  const {
  //    openSideBarObject,
  //    darkModeObject: { isDarkMode },
  //    openAreaFormObject: { openAreaForm, setOpenAreaForm },
  //  } = useGlobalContextProvider();
  //  const { setOpenSideBar } = openSideBarObject;

  const {
    openSideBarObject,
    darkModeObject,
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
  } = useGlobalContextProvider();
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
        <span className="text-lg sm:text-xl font-bold">Areas</span>
      </div>
      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-end">
        <div>
          <Button
            style={{ backgroundColor: defaultColor.default }}
            className="text-white p-2 px-4 ml-3 inline-flex"
            size="small"
            onClick={() => setOpenAreaForm(true)}
            icon="plus"
          >
            <span className="hidden sm:block">Add Area</span>
          </Button>
        </div>

        {/* <AllHabitsSearchBar /> */}
        <DarkMode />
        <FontAwesomeIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          className="m-2 max-xl:flex hidden  mt-[13px] cursor-pointer  "
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default AreasTopBar;
