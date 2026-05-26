import { getLessonById } from "@/data/lessons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonDetailScreen() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
        <Stack.Screen options={{ title: "Lesson" }} />
        <View className="flex-1 items-center justify-center px-5">
          <Text className="body-sm text-center">Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
      <Stack.Screen options={{ title: lesson.title }} />
      <View className="flex-1 items-center justify-center px-5">
        <Text className="font-poppins-bold text-xl text-text-primary">
          {lesson.title}
        </Text>
        <Text className="body-sm mt-2 text-center">{lesson.description}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          className="mt-6 rounded-full bg-lingua-purple px-6 py-3"
        >
          <Text className="font-poppins-semibold text-sm text-white">
            Back to lessons
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
