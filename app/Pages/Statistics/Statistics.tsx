import React from "react";
import StatisticsTopBar from "./Components/StatisticsTopBar";
import "react-calendar-heatmap/dist/styles.css";
import StatisticsBoard from "./Components/StatisticsBoard";
import StatisticsHabitsArea from "./Components/StatisticsHabitArea";

function Statistics() {
  return (
    <div className="w-full  p-3">
      <StatisticsTopBar />
      <StatisticsBoard />
      <StatisticsHabitsArea />
    </div>
  );
}

export default Statistics;
