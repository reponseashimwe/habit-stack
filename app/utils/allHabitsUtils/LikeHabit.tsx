import { HabitType } from "@/app/Types/GlobalTypes";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export default function LikeHabit({
  habit,
  clerkUserId,
  setSharedHabits,
}: {
  habit: HabitType;
  clerkUserId: string;
  setSharedHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
}) {
  console.log(habit);
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/habitLikes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habitId: habit._id,
          clerkUserId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to toggle like");
        return;
      }

      const data = await response.json();
      console.log(data);
      const updatedHabit = data.habit;

      // Update the shared habits state
      setSharedHabits((prevHabits) =>
        prevHabits.map((h) =>
          h._id === habit._id
            ? { ...h, habitLikes: updatedHabit.habitLikes }
            : h
        )
      );

      if (data.isLiked) {
        toast.success("You liked this habit");
      } else {
        toast.success("You unliked this habit");
      }
    } catch (error) {
      toast.error("An error occurred while toggling like");
      console.error(error);
    }
  };

  const isLiked = habit.habitLikes?.includes(clerkUserId);

  return (
    <button onClick={handleLike} className="flex items-center gap-2  text-xs ">
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : outlineHeart}
        width={16}
        height={16}
        className="text-customRed"
      />
      <span>{habit.habitLikes?.length || 0} likes </span>
    </button>
  );
}
