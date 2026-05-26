import { AuthGradientButton } from "@/components/AuthGradientButton";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { getFlagImageSource } from "@/lib/flags";
import { useLanguageStore } from "@/store/language-store";
import type { Language, LanguageCode } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LanguageOptionRowProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

function LanguageOptionRow({
  language,
  selected,
  onPress,
}: LanguageOptionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-2xl bg-white px-4 py-3.5 ${
        selected ? "border-2 border-lingua-purple" : "border border-border"
      }`}
    >
      <View style={styles.flagWrap}>
        <Image
          source={getFlagImageSource(language.id)}
          style={styles.flag}
          resizeMode="cover"
        />
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-base text-text-primary">
          {language.name}
        </Text>
        {language.learners ? (
          <Text className="body-sm mt-0.5">{language.learners} learners</Text>
        ) : null}
      </View>
      {selected ? (
        <Ionicons name="checkmark-circle" size={24} color="#6C4EF5" />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </Pressable>
  );
}

export default function ChooseLanguageScreen() {
  const router = useRouter();
  const persistedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const hasHydrated = useLanguageStore((state) => state._hasHydrated);
  const setSelectedLanguage = useLanguageStore(
    (state) => state.setSelectedLanguage
  );
  const [selectedId, setSelectedId] = useState<LanguageCode | null>(
    () => persistedLanguageId ?? languages[0]?.id ?? null
  );
  const hasLanguages = languages.length > 0;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (hasHydrated && persistedLanguageId) {
      setSelectedId(persistedLanguageId);
    }
  }, [hasHydrated, persistedLanguageId]);

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return languages;
    }
    return languages.filter(
      (language) =>
        language.name.toLowerCase().includes(query) ||
        language.nativeName.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="relative mb-5 flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="z-10 h-10 w-10 items-center justify-center"
                hitSlop={8}
              >
                <Ionicons name="chevron-back" size={24} color="#0D132B" />
              </Pressable>
              <Text className="absolute left-0 right-0 text-center font-poppins-semibold text-lg text-text-primary">
                Choose a language
              </Text>
            </View>

            <View className="flex-row items-center rounded-full border border-border bg-white px-4 py-3">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search languages"
                placeholderTextColor="#9CA3AF"
                className="ml-2 flex-1 font-poppins-regular text-base text-text-primary"
                style={styles.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text className="mt-6 font-poppins-semibold text-base text-text-primary">
              Popular
            </Text>

            <View className="mt-3 gap-3">
              {filteredLanguages.map((language) => (
                <LanguageOptionRow
                  key={language.id}
                  language={language}
                  selected={selectedId === language.id}
                  onPress={() => setSelectedId(language.id)}
                />
              ))}
            </View>

            {filteredLanguages.length === 0 ? (
              <Text className="body-sm mt-4 text-center">
                {hasLanguages
                  ? "No languages match your search."
                  : "No languages available."}
              </Text>
            ) : null}

            <View className="mt-6">
              <AuthGradientButton
                title="Confirm"
                disabled={selectedId === null}
                onPress={() => {
                  if (selectedId === null) {
                    return;
                  }
                  setSelectedLanguage(selectedId);
                  router.replace("/index");
                }}
              />
            </View>
          </ScrollView>

          <View style={styles.earthContainer} pointerEvents="none">
            <Image
              source={images.earth}
              style={styles.earthImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 220,
  },
  searchInput: {
    paddingVertical: 0,
  },
  flagWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  flag: {
    width: "100%",
    height: "100%",
  },
  earthContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  earthImage: {
    width: "100%",
    height: "100%",
  },
});
