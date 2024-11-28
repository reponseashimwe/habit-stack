import { HabitType } from "@/app/Types/GlobalTypes";
import {
  faBell,
  faBellConcierge,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface ReminderButtonProps {
  habit: HabitType;
  setSharedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  clerkUserId: string;
}

const ReminderButton = ({
  habit,
  setSharedHabits,
  clerkUserId,
}: ReminderButtonProps) => {
  const [completedToday, setCompletedToday] = useState<boolean | null>(null); // Track if completed today
  const [reminderSent, setReminderSent] = useState<boolean>(false); // Track if reminder has been sent

  useEffect(() => {
    // Check if the habit is completed today and if reminder has been sent
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const completedToday = habit.completedDays.find(
      (completedDay) => completedDay.date === today
    );

    if (completedToday) {
      setCompletedToday(true);
      setReminderSent(completedToday.reminderSent); // Check if reminder was sent
    } else {
      setCompletedToday(false);
    }
  }, [habit]);

  // Handle reminder sending
  const sendReminder = async () => {
    const response = await fetch("/api/reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habitId: habit._id,
        clerkUserId,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setReminderSent(true); // Update the reminder sent status
      // Update the state of habits to reflect the reminder being sent
      const updatedHabits = setSharedHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === habit._id
            ? {
                ...habit,
                completedDays: habit.completedDays.map((completedDay) =>
                  completedDay.date === new Date().toISOString().split("T")[0]
                    ? { ...completedDay, reminderSent: true }
                    : completedDay
                ),
              }
            : habit
        )
      );
    } else {
      console.error("Failed to send reminder:", data.error);
    }
  };

  return (
    <div>
      <button
        onClick={sendReminder}
        className=" flex items-center space-x-2 text-xs opacity-70"
        disabled={
          completedToday || reminderSent || clerkUserId == habit.clerkUserId
        }
      >
        <FontAwesomeIcon
          icon={
            completedToday
              ? faThumbsUp
              : reminderSent
              ? faBellConcierge
              : faBell
          }
          width={16}
          height={16}
          //   className="text-customRed"
        />
        <span>
          {clerkUserId == habit.clerkUserId ? (
            <>{completedToday ? "Completed" : "Not yet"}</>
          ) : (
            <>
              {completedToday
                ? "Completed"
                : reminderSent
                ? "Sent"
                : "Send reminder"}
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default ReminderButton;
