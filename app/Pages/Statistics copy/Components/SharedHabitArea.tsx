import { useGlobalContextProvider } from "@/app/contextApi";
import SharedHabitCard from "./SharedHabitCard";
import { darkModeColor } from "@/colors";
import { useUser } from "@clerk/nextjs";

function SharedHabitArea() {
  const {
    sharedHabitsObject: { sharedHabits, setSharedHabits },
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();
  const user = useUser();
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className="p-1 sm:p-4   mt-4 rounded-md min-h-screen"
    >
      {sharedHabits.map((habit, index) => (
        <div key={index} className="max-w-full">
          <SharedHabitCard
            habit={habit}
            user={user}
            setSharedHabits={setSharedHabits}
          />
        </div>
      ))}
    </div>
  );
}

export default SharedHabitArea;
