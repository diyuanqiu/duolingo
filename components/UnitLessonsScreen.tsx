import { LessonRow } from "@/components/LessonRow";
import {
  getUnitHeroImageSource,
  images,
} from "@/constants/images";
import {
  getLessonsForUnit,
  getUnitById,
} from "@/data/lessons";
import {
  countUnitLessonProgress,
  getLessonDisplayStatus,
} from "@/lib/lesson-progress";
import { useProgressStore } from "@/store/progress-store";
import type { Unit } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UnitSegment = "lessons" | "practice";

type UnitLessonsScreenProps = {
  unit: Unit;
  showBackButton?: boolean;
};

export function UnitLessonsScreen({
  unit,
  showBackButton = true,
}: UnitLessonsScreenProps) {
  const router = useRouter();
  const [segment, setSegment] = useState<UnitSegment>("lessons");
  const progress = useProgressStore((state) =>
    state.getProgressForLanguage(unit.languageId)
  );

  const unitLessons = useMemo(
    () => getLessonsForUnit(unit.id),
    [unit.id]
  );
  const completedCount = countUnitLessonProgress(unitLessons, progress);

  const handleLessonPress = (lessonId: string) => {
    router.push({
      pathname: "/lesson/[lessonId]",
      params: { lessonId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="flex-row items-center px-5 pt-1">
          {showBackButton ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={8}
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center"
            >
              <Ionicons name="chevron-back" size={24} color="#0D132B" />
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}

          <View className="flex-1 items-center px-2">
            <Text className="font-poppins-bold text-lg text-text-primary">
              {unit.title}
            </Text>
            <Text className="mt-0.5 font-poppins-medium text-sm text-text-secondary">
              Unit {unit.order} • {completedCount} / {unitLessons.length} lessons
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bookmark unit"
            hitSlop={8}
            className="h-10 w-10 items-center justify-center rounded-full border-2 border-streak bg-white"
          >
            <Ionicons name="bookmark-outline" size={18} color="#FF8A00" />
          </Pressable>
        </View>

        <View className="mt-4 px-5">
          <Image
            source={getUnitHeroImageSource(unit.heroImageKey)}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View className="mt-5 px-5">
          <View className="flex-row rounded-2xl bg-[#ECEEF3] p-1">
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: segment === "lessons" }}
              onPress={() => setSegment("lessons")}
              className={`flex-1 items-center rounded-xl py-3 ${
                segment === "lessons" ? "bg-white" : ""
              }`}
            >
              {segment === "lessons" ? (
                <View style={styles.activeTabIndicator} />
              ) : null}
              <Text
                className={`font-poppins-semibold text-sm ${
                  segment === "lessons"
                    ? "text-lingua-purple"
                    : "text-text-secondary"
                }`}
              >
                Lessons
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: segment === "practice" }}
              onPress={() => setSegment("practice")}
              className={`flex-1 items-center rounded-xl py-3 ${
                segment === "practice" ? "bg-white" : ""
              }`}
            >
              {segment === "practice" ? (
                <View style={styles.activeTabIndicator} />
              ) : null}
              <Text
                className={`font-poppins-semibold text-sm ${
                  segment === "practice"
                    ? "text-lingua-purple"
                    : "text-text-secondary"
                }`}
              >
                Practice
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="mt-5 px-5 pb-6">
          {segment === "lessons" ? (
            unitLessons.map((lesson) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                status={getLessonDisplayStatus(lesson, progress)}
                onPress={() => handleLessonPress(lesson.id)}
              />
            ))
          ) : (
            <View className="items-center rounded-2xl border border-border bg-white px-5 py-10">
              <Image
                source={images.palace}
                style={styles.practiceImage}
                resizeMode="contain"
              />
              <Text className="mt-4 font-poppins-semibold text-base text-text-primary">
                Practice coming soon
              </Text>
              <Text className="body-sm mt-2 text-center">
                Review vocabulary and phrases from {unit.title}.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function resolveUnitOrNull(unitId: string): Unit | null {
  return getUnitById(unitId) ?? null;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
  },
  activeTabIndicator: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "#6C4EF5",
  },
  practiceImage: {
    width: 96,
    height: 96,
  },
});
