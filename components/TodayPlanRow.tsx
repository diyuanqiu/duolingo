import { PlanStatusIcon } from "@/components/PlanStatusIcon";
import type { PlanItemType, TodayPlanItem } from "@/data/home-plan";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type PlanIconConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  backgroundClass: string;
};

const PLAN_ICON_CONFIG: Record<PlanItemType, PlanIconConfig> = {
  lesson: { icon: "book", backgroundClass: "bg-lingua-purple" },
  ai_conversation: { icon: "headset", backgroundClass: "bg-lingua-purple" },
  new_words: { icon: "chatbubble-ellipses", backgroundClass: "bg-[#FF8A7A]" },
};

export function TodayPlanRow({ item }: { item: TodayPlanItem }) {
  const config = PLAN_ICON_CONFIG[item.type];

  return (
    <View className="flex-row items-center py-3">
      <View
        className={`h-11 w-11 items-center justify-center rounded-xl ${config.backgroundClass}`}
      >
        <Ionicons name={config.icon} size={20} color="#FFFFFF" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-base text-text-primary">
          {item.title}
        </Text>
        <Text className="body-sm mt-0.5">{item.subtitle}</Text>
      </View>
      <PlanStatusIcon status={item.status} />
    </View>
  );
}
