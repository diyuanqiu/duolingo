import { getLessonImageSource } from "@/constants/images";
import type { LessonDisplayStatus } from "@/lib/lesson-progress";
import type { Lesson } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type LessonRowProps = {
  lesson: Lesson;
  status: LessonDisplayStatus;
  onPress: () => void;
};

export function LessonRow({ lesson, status, onPress }: LessonRowProps) {
  const isActive = status === "in_progress";
  const isCompleted = status === "completed";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${lesson.title}, lesson ${lesson.order}`}
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-2xl border px-4 py-4 ${
        isActive
          ? "border-lingua-purple bg-[#F3EEFF]"
          : "border-border bg-white"
      }`}
    >
      <View className="flex-1 pr-3">
        <Text
          className={`font-poppins-medium text-xs ${
            isActive ? "text-lingua-purple" : "text-text-secondary"
          }`}
        >
          Lesson {lesson.order}
        </Text>
        <Text
          className={`mt-0.5 font-poppins-semibold text-base ${
            isActive ? "text-lingua-purple" : "text-text-primary"
          }`}
        >
          {lesson.title}
        </Text>
        {isActive ? (
          <Text className="mt-0.5 font-poppins-medium text-xs text-lingua-purple">
            In progress
          </Text>
        ) : null}
      </View>

      {isCompleted ? (
        <View className="h-9 w-9 items-center justify-center rounded-full bg-success">
          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
        </View>
      ) : null}

      {isActive ? (
        <Image
          source={getLessonImageSource(lesson.imageKey)}
          style={styles.lessonThumb}
          resizeMode="cover"
        />
      ) : null}

      {status === "upcoming" ? (
        <View className="h-9 w-9 items-center justify-center">
          <Ionicons name="lock-closed-outline" size={22} color="#9CA3AF" />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  lessonThumb: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
});
