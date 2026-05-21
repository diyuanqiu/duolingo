import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SpeechBubbleProps = {
  text: string;
  bubbleClassName: string;
  textClassName: string;
  tailAlign: "left" | "right";
};

function SpeechBubble({
  text,
  bubbleClassName,
  textClassName,
  tailAlign,
}: SpeechBubbleProps) {
  const tailPositionClass =
    tailAlign === "left" ? "self-start ml-3.5" : "self-end mr-3.5";

  return (
    <View className="items-center">
      <View
        className={`rounded-2xl px-3.5 py-2 shadow-sm ${bubbleClassName}`}
      >
        <Text className={textClassName}>{text}</Text>
      </View>
      <View
        className={`h-2.5 w-2.5 -mt-1.5 rotate-45 ${tailPositionClass} ${bubbleClassName}`}
      />
    </View>
  );
}

export default function OnboardingScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 px-6 pb-6">
          <View className="mt-4 flex-row items-center justify-center gap-2">
            <Image
              source={images.mascotLogo}
              className="h-8 w-8"
              resizeMode="contain"
            />
            <Text className="logo">duolingo</Text>
          </View>

          <View className="mt-8">
            <Text className="h1">
              Your AI language{"\n"}
              <Text className="h1 text-lingua-purple">teacher.</Text>
            </Text>
            <Text className="body-sm mt-3">
              Real conversations, personalized lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="mt-2 min-h-[260px] flex-1 items-center justify-center">
            <View className="relative max-h-[360px] w-full max-w-[300px] flex-1">
              <Image
                source={images.mascotWelcome}
                resizeMode="contain"
                className="absolute bottom-0 left-[11%] h-[92%] w-[78%]"
              />

              <View className="absolute left-[6%] top-[10%] z-10">
                <SpeechBubble
                  text="Hello!"
                  bubbleClassName="bg-[#E8F3FF]"
                  textClassName="font-poppins-medium text-sm text-text-primary"
                  tailAlign="right"
                />
              </View>

              <View className="absolute right-[6%] top-[8%] z-10">
                <SpeechBubble
                  text="¡Hola!"
                  bubbleClassName="bg-[#E8EEFF]"
                  textClassName="font-poppins-semibold text-sm text-lingua-purple"
                  tailAlign="left"
                />
              </View>

              <View className="absolute right-[4%] top-[26%] z-10">
                <SpeechBubble
                  text="你好!"
                  bubbleClassName="bg-[#FFEDE8]"
                  textClassName="font-poppins-semibold text-sm text-[#E84B3B]"
                  tailAlign="left"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-lingua-purple flex-row items-center justify-center rounded-2xl py-4"
            onPress={() => {}}
          >
            <Text className="font-poppins-semibold text-base text-white">
              Get Started
            </Text>
            <View className="absolute right-5">
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
