import { AudioLessonScreen } from "@/components/AudioLessonScreen";
import { getLessonById } from "@/data/lessons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonDetailScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center px-5">
          <Text className="body-sm text-center">Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AudioLessonScreen lesson={lesson} />
    </>
  );
}
