import { UnitLessonsScreen } from "@/components/UnitLessonsScreen";
import { getUnitForLanguageOrder } from "@/data/lessons";
import { useLanguageStore } from "@/store/language-store";
import { useProgressStore } from "@/store/progress-store";
import type { LanguageCode } from "@/types/learning";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnScreen() {
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  ) as LanguageCode | null;
  const languageId = selectedLanguageId ?? "es";
  const progress = useProgressStore((state) =>
    state.getProgressForLanguage(languageId)
  );
  const unit = getUnitForLanguageOrder(languageId, progress.currentUnitOrder);

  if (!unit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
        <View className="flex-1 items-center justify-center px-5">
          <Text className="body-sm text-center">No lessons available yet.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return <UnitLessonsScreen unit={unit} showBackButton={false} />;
}
