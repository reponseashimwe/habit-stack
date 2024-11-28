import React from "react";
import "react-calendar-heatmap/dist/styles.css";
import SharedTopBar from "./Components/SharedTopBar";
import SharedHabitArea from "./Components/SharedHabitArea";
import { Toaster } from "react-hot-toast";

function Shared() {
  return (
    <div className="w-full  p-3">
      <Toaster />
      <SharedTopBar />
      <p className="text-gray-400 py-5">
        See what others have on their agenda today!
      </p>
      <SharedHabitArea />
    </div>
  );
}

export default Shared;
