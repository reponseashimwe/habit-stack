import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor } from "@/colors";
import CalendarHeatmap from "react-calendar-heatmap";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { HabitType } from "@/app/Types/GlobalTypes";
import "react-calendar-heatmap/dist/styles.css";
import "@/app/styles/calendarHeatmap.css"; // Ensure you import the base styles
import { calculateStreak } from "./StatisticsBoard";

//
//

export default function StatisticsHabitCard({ habit }: { habit: HabitType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();
  const recurringDaysText = habit.frequency[0].days.join(",");
  console.log(recurringDaysText);

  function calculateConsistency(habit: HabitType): number {
    return (calculateStreak(habit) / habit.completedDays.length) * 100 || 0;
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className=" px-5 py-2 sm:py-5 rounded-md m-3 mb-6 "
    >
      {/* Icon + Habit name +  notification + frequency */}
      <div className="flex mt-5 max-md:flex-col md:flex-row justify-between md:items-center">
        <div className="flex gap-3 items-center">
          {/* Icon */}
          <div className="bg-customRed w-10 h-10 md:w-10 md:h-10 rounded-full p-3 flex items-center justify-center text-white">
            <FontAwesomeIcon
              className="  p-3 rounded-full w-4 h-4 bg-customRed text-white"
              height={20}
              width={20}
              icon={habit.icon}
            />
          </div>
          {/* Habit Name */}
          <span className="font-medium max-sm:text-sm">{habit.name}</span>
          {/* Notification */}
          <div></div>
        </div>
        {/*  */}
        {/* Freqeuncy */}
        <div className="flex justify-between gap-4 max-md:pl-14 text-xs items-center">
          <span className="text-gray-400 truncate">{recurringDaysText}</span>
          {habit.isNotificationOn && (
            <span
              style={{
                backgroundColor: defaultColor[100],
                color: defaultColor.default,
              }}
              className=" p-1 pl-4 md:pl-1 block px-3 rounded-md"
            >
              {habit.notificationTime.replace(" ", "")}
            </span>
          )}
        </div>
      </div>
      {/* Single card stats */}
      <div className="   p-2 grid grid-cols-3">
        <div className="flex flex-col gap-1 justify-center   items-center">
          <span className="font-bold max-sm:text-sm">
            {habit.completedDays.length}
          </span>
          <span className="max-sm:text-xs">Total</span>
        </div>
        <div className="flex flex-col gap-1 justify-center   items-center">
          <span className="font-bold max-sm:text-sm">
            {calculateConsistency(habit).toFixed(0) || 0}%
          </span>
          <span className="max-sm:text-xs">Consistency</span>
        </div>

        <div className="flex flex-col gap-1 justify-center   items-center">
          <span className="font-bold max-sm:text-sm">
            {calculateStreak(habit)}
          </span>
          <span className="max-sm:text-xs">Streaks</span>
        </div>
      </div>
      {/* Headmap */}

      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className={`w-full mt-5 flex justify-center overflow-x-auto    transition-all ${
          isExpanded ? "h-auto md:h-48" : "h-0"
        }`}
      >
        <div className={`w-[700px]    ${isExpanded ? "block" : "hidden"}`}>
          <HabitHeatmap habit={habit} />
        </div>
      </div>
      {/* Arrow to expand the card */}
      <div className=" flex justify-end mt-3">
        <FontAwesomeIcon
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer"
          icon={isExpanded ? faChevronUp : faChevronDown}
        />
      </div>
    </div>
  );
}

type DateData = {
  date: string;
  count: number;
};

function transformToDateData(habit: HabitType): DateData[] {
  const dateMap: { [date: string]: number } = {};

  habit.completedDays.forEach((day) => {
    if (dateMap[day.date]) {
      dateMap[day.date]++;
    } else {
      dateMap[day.date] = 1;
    }
  });

  return Object.keys(dateMap).map((date) => ({
    date: date,
    count: dateMap[date],
  }));
}

const HabitHeatmap = ({ habit }: { habit: HabitType }) => {
  const dateData: DateData[] = transformToDateData(habit);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 6);

  return (
    <div className="max-w-full w-full overflow-x-auto">
      <div className="min-w-[40em] max-sm:pl-44">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={dateData}
          showMonthLabels={true}
          showWeekdayLabels={true}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-4`;
          }}
        />
      </div>
    </div>
  );
};
