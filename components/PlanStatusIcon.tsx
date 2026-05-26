import type { TodayPlanItem } from "@/data/home-plan";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export function PlanStatusIcon({ status }: { status: TodayPlanItem["status"] }) {
  if (status === "completed") {
    return (
      <View className="h-6 w-6 items-center justify-center rounded-full bg-lingua-purple">
        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View className="h-6 w-6 rounded-full border-2 border-[#D1D5DB]" />
  );
}
