import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: "index", headerTitleAlign: "center" }} />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="h1 text-lingua-purple">Duolingo</Text>
        {user?.primaryEmailAddress?.emailAddress ? (
          <Text className="body-sm mt-4 text-text-secondary">
            Signed in as {user.primaryEmailAddress.emailAddress}
          </Text>
        ) : null}
        <Pressable
          className="mt-8 rounded-2xl bg-lingua-purple px-6 py-3"
          onPress={() => signOut()}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Sign out
          </Text>
        </Pressable>
      </View>
    </>
  );
}
