import { images } from "@/constants/images";
import type { HomePlanItem } from "@/data/home";
import { getHomeScreenData } from "@/data/home";
import type { TodayPlanItemType } from "@/data/home-plan";
import { languages } from "@/data/languages";
import { getFlagImageSource } from "@/lib/flags";
import { useLanguageStore } from "@/store/language-store";
import type { LanguageCode } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  Pressable,
  Image as RNImage,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CONTINUE_CARD_GRADIENT =
  "linear-gradient(135deg, #7B61FF 0%, #5B3BF6 55%, #6366F1 100%)";

function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  username?: string | null
): string {
  const trimmedFirst = firstName?.trim();
  if (trimmedFirst) {
    return trimmedFirst;
  }
  const full = [firstName, lastName].filter(Boolean).join(" ").trim();
  if (full) {
    return full;
  }
  if (username?.trim()) {
    return username.trim();
  }
  return "Learner";
}

function PlanIcon({
  type,
}: {
  type: TodayPlanItemType;
}) {
  if (type === "vocabulary") {
    return (
      <View className="h-12 w-12 items-center justify-center rounded-[14px] bg-[#FB7185]">
        <RNImage
          source={images.mascotLogo}
          className="h-7 w-7"
          resizeMode="contain"
        />
      </View>
    );
  }

  const iconName =
    type === "lesson" ? "book-outline" : ("headset-outline" as const);

  return (
    <View className="h-12 w-12 items-center justify-center rounded-[14px] bg-lingua-purple">
      <Ionicons name={iconName} size={22} color="#FFFFFF" />
    </View>
  );
}

function PlanStatus({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
      </View>
    );
  }

  return <View className="h-7 w-7 rounded-full border-2 border-gray-300" />;
}

function TodayPlanRow({ item }: { item: HomePlanItem }) {
  return (
    <View className="flex-row items-center py-3">
      <PlanIcon type={item.type} />
      <View className="ml-3.5 flex-1">
        <Text className="font-poppins-semibold text-base text-text-primary">
          {item.title}
        </Text>
        <Text className="body-sm mt-0.5">{item.subtitle}</Text>
      </View>
      <PlanStatus completed={item.completed} />
    </View>
  );
}

export default function HomeScreen() {
  const { user, isLoaded } = useUser();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const hasHydrated = useLanguageStore((state) => state._hasHydrated);

  const languageId: LanguageCode =
    selectedLanguageId ?? languages[0]?.id ?? "es";

  const homeData = useMemo(
    () => getHomeScreenData(languageId),
    [languageId]
  );

  const displayName = useMemo(
    () =>
      getDisplayName(
        user?.firstName,
        user?.lastName,
        user?.username ?? user?.primaryEmailAddress?.emailAddress
      ),
    [user]
  );

  const xpProgressPercent = Math.round(homeData.dailyGoalProgress * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-6 pt-2"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <View className="h-11 w-11 overflow-hidden rounded-full bg-gray-100">
              <RNImage
                source={getFlagImageSource(languageId)}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
            <Text
              className="ml-3 font-poppins-semibold text-lg text-text-primary"
              numberOfLines={1}
            >
              {isLoaded && hasHydrated
                ? `${homeData.greetingWord}, ${displayName}! 👋`
                : `${homeData.greetingWord}! 👋`}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center">
              <RNImage
                source={images.streakFire}
                className="h-[22px] w-[22px]"
                resizeMode="contain"
              />
              <Text className="ml-1 font-poppins-semibold text-base text-text-primary">
                {homeData.streakDays}
              </Text>
            </View>
            <Pressable hitSlop={8} accessibilityLabel="Notifications">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#0D132B"
              />
            </Pressable>
          </View>
        </View>

        {/* Daily goal */}
        <View className="mt-5 min-h-[120px] flex-row items-center rounded-3xl bg-[#FFF6ED] px-5 py-[18px]">
          <View className="flex-1 pr-2">
            <Text className="body-sm text-text-secondary">Daily goal</Text>
            <Text className="mt-1 font-poppins-bold text-[28px] leading-8 text-text-primary">
              {homeData.xpEarnedToday}
              <Text className="font-poppins-semibold text-xl text-text-secondary">
                {" "}
                / {homeData.dailyGoalXp} XP
              </Text>
            </Text>
            <View className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#FFE4CC]">
              <View
                className="h-full rounded-full bg-orange-500"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </View>
          </View>
          <RNImage
            source={images.treasure}
            className="h-24 w-24"
            resizeMode="contain"
          />
        </View>

        {/* Continue learning */}
        <View
          className="mt-5 min-h-[168px] overflow-hidden rounded-3xl px-5 pb-4 pt-5"
          style={{
            experimental_backgroundImage: CONTINUE_CARD_GRADIENT,
          }}
        >
          <View className="absolute -bottom-5 right-[-30px] h-[100px] w-[180px] -rotate-12 rounded-[90px] bg-[rgba(91,59,246,0.45)]" />
          <View className="absolute bottom-2.5 -left-5 h-[70px] w-[120px] rotate-[8deg] rounded-[60px] bg-[rgba(109,78,245,0.35)]" />

          <View className="flex-row items-end">
            <View className="flex-1 pb-1 pr-2">
              <Text className="body-sm text-white/90">Continue learning</Text>
              <Text className="mt-1 font-poppins-bold text-[26px] leading-8 text-white">
                {homeData.languageName}
              </Text>
              <Text className="mt-0.5 font-poppins-medium text-base text-white/95">
                {homeData.levelLabel} • {homeData.unitLabel}
              </Text>
              <Pressable
                className="mt-3.5 self-start rounded-full bg-white px-[22px] py-2.5"
                accessibilityRole="button"
                accessibilityLabel="Continue lesson"
              >
                <Text className="font-poppins-semibold text-base text-lingua-purple">
                  Continue
                </Text>
              </Pressable>
            </View>

            <RNImage
              source={images.palace}
              className="-mb-1 h-[110px] w-[130px]"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Today's plan */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="font-poppins-semibold text-lg text-text-primary">
              Today&apos;s plan
            </Text>
            <Pressable hitSlop={8}>
              <Text className="font-poppins-semibold text-sm text-lingua-purple">
                View all
              </Text>
            </Pressable>
          </View>

          <View className="mt-1">
            {homeData.todayPlan.map((item) => (
              <TodayPlanRow key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
