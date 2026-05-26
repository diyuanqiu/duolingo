import { languages } from "@/data/languages";
import {
  clearLanguageStorage,
  useLanguageStore,
} from "@/store/language-store";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Stack, useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );

  const selectedLanguageName = useMemo(() => {
    if (!selectedLanguageId) {
      return null;
    }
    return languages.find((language) => language.id === selectedLanguageId)
      ?.name;
  }, [selectedLanguageId]);

  if (!isLoaded) {
    return null;
  }

  const handleClearLanguageStorage = async () => {
    await clearLanguageStorage();
    router.replace("/choose-language");
  };

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
        {selectedLanguageName ? (
          <Text className="body-sm mt-4 text-text-secondary">
            Learning: {selectedLanguageName}
          </Text>
        ) : null}
        <Pressable
          className="mt-8 rounded-2xl bg-lingua-purple px-6 py-3"
          onPress={() => router.push("/choose-language")}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Choose a language
          </Text>
        </Pressable>
        <Pressable
          className="mt-4 rounded-2xl border border-border bg-white px-6 py-3"
          onPress={handleClearLanguageStorage}
        >
          <Text className="font-poppins-semibold text-base text-text-primary">
            Clear language storage (test)
          </Text>
        </Pressable>
        <Pressable
          className="mt-4 rounded-2xl border border-border bg-white px-6 py-3"
          onPress={() => signOut()}
        >
          <Text className="font-poppins-semibold text-base text-text-primary">
            Sign out
          </Text>
        </Pressable>
      </View>
    </>
  );
}
