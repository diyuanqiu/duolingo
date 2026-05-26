import {
  UnitLessonsScreen,
  resolveUnitOrNull,
} from "@/components/UnitLessonsScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const unit = unitId ? resolveUnitOrNull(unitId) : null;

  if (!unit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center px-5">
          <Text className="body-sm text-center">Unit not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <UnitLessonsScreen unit={unit} showBackButton />
    </>
  );
}
