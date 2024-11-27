import React from "react";
import AppIcon from "../SVG_Icons/AppIcon";
import { defaultColor } from "@/colors";

function LogoAnName({ home = false }: { home?: boolean }) {
  return (
    <div className="hidden sm:flex gap-2 items-center sm:justify-start justify-center">
      <span className="text-2xl font-light flex items-center gap-2 ">
        {/* The Icon */}
        <div
          style={{ backgroundColor: defaultColor.default }}
          className=" p-2 rounded-md"
        >
          <AppIcon color="#ffffff" height="34" width="34" />
        </div>
        {/* The Name of the app */}
        <div className={`${home ? "hidden" : "sm:block"}`}>
          <span
            style={{ color: defaultColor.default }}
            className="font-bold text-mainColor"
          >
            Habit
          </span>
          <span className="font-light"> Tracker</span>
        </div>
      </span>
    </div>
  );
}

export default LogoAnName;
