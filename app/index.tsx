import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "index", headerTitleAlign: "center" }} />
      <View className="flex-1 items-center justify-center">
        <Text className="h1 text-lingua-purple">Duolingo</Text>
        <Link
          href="/onboarding"
          className="mt-6 font-poppins-semibold text-lingua-purple"
        >
          Open Onboarding
        </Link>
      </View>
    </>
  );
}
