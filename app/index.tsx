import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "index", headerTitleAlign: "center" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="h1 color-lingua-purple">Duolingo</Text>
      </View>
    </>
  );
}
