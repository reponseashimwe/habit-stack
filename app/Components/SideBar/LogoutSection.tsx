import React from "react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignOutButton } from "@clerk/nextjs";
function LogoutSection() {
  const logOutObject = { name: "Log Out", icon: faRightFromBracket };
  return (
    <div className="max-sm:hidden flex gap-2 text-slate-400  items-center p-2  hover:text-customRed transition-all ">
      <FontAwesomeIcon width={20} height={20} icon={logOutObject.icon} />
      <div className="">
        <SignOutButton />
      </div>
    </div>
  );
}
export default LogoutSection;
