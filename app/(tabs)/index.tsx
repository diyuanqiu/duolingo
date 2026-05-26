import { TodayPlanRow } from "@/components/TodayPlanRow";
import { images } from "@/constants/images";
import { getGreeting, getHomeSummary } from "@/data/home";
import { getFlagImageSource } from "@/lib/flags";
import { useLanguageStore } from "@/store/language-store";
import type { LanguageCode } from "@/types/learning";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HORIZONTAL_PADDING = 20;
const SECTION_GAP = 16;

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  ) as LanguageCode | null;

  const firstName =
    user?.firstName?.trim() ||
    user?.username?.trim() ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "there";

  const languageId = selectedLanguageId ?? "es";
  const home = getHomeSummary(languageId);

  if (!home) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View className="flex-1 items-center justify-center px-5">
          <Text className="body-sm text-center">No learning data available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const greeting = getGreeting(languageId, firstName);
  const { language, progress, unitLabel, todayPlan, dailyProgressPercent } =
    home;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 pr-3">
            <View style={styles.flagWrap}>
              <Image
                source={getFlagImageSource(languageId)}
                style={styles.flagImage}
                resizeMode="cover"
              />
            </View>
            <Text
              className="ml-3 flex-1 font-poppins-bold text-xl text-text-primary"
              numberOfLines={1}
            >
              {greeting}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center">
              <Image
                source={images.streakFire}
                style={styles.streakIcon}
                resizeMode="contain"
              />
              <Text className="ml-1 font-poppins-semibold text-base text-text-primary">
                {progress.streakDays}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              hitSlop={8}
              className="h-10 w-10 items-center justify-center"
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#0D132B"
              />
            </Pressable>
          </View>
        </View>

        {/* Daily goal */}
        <View style={styles.dailyGoalCard} className="mt-5 flex-row items-center overflow-hidden rounded-3xl px-5 py-4">
          <View className="flex-1 pr-2">
            <Text className="body-sm">Daily goal</Text>
            <View className="mt-1 flex-row items-baseline">
              <Text className="font-poppins-bold text-[28px] leading-8 text-text-primary">
                {progress.dailyXpEarned}
              </Text>
              <Text className="ml-1 font-poppins-medium text-base text-text-secondary">
                / {progress.dailyGoalXp} XP
              </Text>
            </View>
            <View className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#FFE8CC]">
              <View
                className="h-full rounded-full bg-streak"
                style={{ width: `${dailyProgressPercent}%` }}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={styles.treasureImage}
            resizeMode="contain"
          />
        </View>

        {/* Continue learning */}
        <LinearGradient
          colors={["#6C4EF5", "#5B3BF6", "#4D5EF5"]}
          locations={[0, 0.55, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueCard}
          className="mt-4 overflow-hidden rounded-3xl"
        >
          <View className="flex-row items-center px-5 py-5">
            <View className="flex-1 pr-2">
              <Text className="font-poppins-medium text-sm text-white/90">
                Continue learning
              </Text>
              <Text className="mt-1 font-poppins-bold text-[26px] text-white">
                {language.name}
              </Text>
              <Text className="mt-0.5 font-poppins-medium text-base text-white/95">
                {unitLabel}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Continue"
                className="mt-4 self-start rounded-full bg-white px-6 py-2.5"
              >
                <Text className="font-poppins-semibold text-sm text-lingua-purple">
                  Continue
                </Text>
              </Pressable>
            </View>
            <Image
              source={images.palace}
              style={styles.palaceImage}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        {/* Today's plan */}
        <View className="mb-6 mt-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-poppins-bold text-lg text-text-primary">
              Today&apos;s plan
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="View all"
              hitSlop={8}
            >
              <Text className="font-poppins-semibold text-sm text-lingua-purple">
                View all
              </Text>
            </Pressable>
          </View>

          <View className="mt-1">
            {todayPlan.map((item, index) => (
              <View key={item.id}>
                <TodayPlanRow item={item} />
                {index < todayPlan.length - 1 ? (
                  <View className="h-px bg-border" />
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: SECTION_GAP,
    gap: 0,
  },
  flagWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  flagImage: {
    width: "100%",
    height: "100%",
  },
  streakIcon: {
    width: 22,
    height: 22,
  },
  dailyGoalCard: {
    backgroundColor: "#FFF6E8",
  },
  treasureImage: {
    width: 88,
    height: 88,
  },
  continueCard: {
    borderRadius: 24,
  },
  palaceImage: {
    width: 110,
    height: 110,
  },
});
