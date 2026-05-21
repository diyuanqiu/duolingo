import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "index", headerTitleAlign: "center" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-blue-500">Duolingo</Text>
      </View>
    </>
  );
}
