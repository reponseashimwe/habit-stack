import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { menuItemType } from "@/app/Types/MenuItemType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserButton } from "@clerk/nextjs";

function MenuSelection() {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;
  return (
    <div className="flex max-sm:px-6 sm:flex-col max-sm:w-full max-sm:justify-between max-sm:items-center">
      {menuItems.map((menuItem: menuItemType, menuItemIdex: number) => (
        <div key={menuItemIdex}>
          <SingleMenuItem menuItemProp={menuItem} />
        </div>
      ))}
      <div className="flex items-center sm:hidden">
        <UserButton />
      </div>
    </div>
  );
}

function SingleMenuItem({ menuItemProp }: { menuItemProp: menuItemType }) {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems, setMenuItems } = menuItemsObject;
  function handleClickedItem() {
    const copyMenuItems = menuItems.map((menuItem) => {
      if (menuItemProp.name === menuItem.name) {
        return { ...menuItem, isSelected: true };
      }

      return { ...menuItem, isSelected: false };
    });

    setMenuItems(copyMenuItems);
  }
  return (
    <div
      onClick={handleClickedItem}
      className={`flex flex-col sm:flex-row max-sm:text-xs gap-1 sm:gap-2 items-center p-2  sm:mb-3
      cursor-pointer rounded-md sm:w-36 select-none text-gray-400   ${
        menuItemProp.isSelected
          ? "text-customRed sm:bg-customRed transition-all sm:text-white"
          : "hover:text-customRed"
      } `}
    >
      <FontAwesomeIcon
        className={
          menuItemProp.isSelected
            ? "max-sm:text-customRed transition-all sm:text-white"
            : "hover:text-customRed"
        }
        icon={menuItemProp.icon}
        width={20}
        height={20}
      />
      <div
        className={`
          ${
            menuItemProp.isSelected
              ? "max-sm:text-customRed sm:bg-customRed transition-all sm:text-white"
              : "hover:text-customRed"
          } max-sm:text-[.7rem]`}
      >
        {menuItemProp.name}
      </div>
    </div>
  );
}

export default MenuSelection;
