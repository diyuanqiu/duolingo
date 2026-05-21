import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type SocialProvider = "google" | "facebook" | "apple";

type SocialAuthButtonProps = {
  provider: SocialProvider;
  onPress?: () => void;
  disabled?: boolean;
};

const LABELS: Record<SocialProvider, string> = {
  google: "Continue with Google",
  facebook: "Continue with Facebook",
  apple: "Continue with Apple",
};

function SocialIcon({ provider }: { provider: SocialProvider }) {
  if (provider === "google") {
    return <AntDesign name="google" size={20} color="#EA4335" />;
  }
  if (provider === "facebook") {
    return <FontAwesome name="facebook" size={20} color="#1877F2" />;
  }
  return <FontAwesome name="apple" size={22} color="#000000" />;
}

export function SocialAuthButton({
  provider,
  onPress,
  disabled = false,
}: SocialAuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      className="mb-3 flex-row items-center rounded-2xl border border-border bg-background px-4 py-3.5"
      style={({ pressed }) => [
        disabled || !onPress ? { opacity: 0.5 } : undefined,
        pressed && onPress && !disabled ? { opacity: 0.85 } : undefined,
      ]}
    >
      <View className="w-8 items-center">
        <SocialIcon provider={provider} />
      </View>
      <Text className="body flex-1 text-center text-text-primary">
        {LABELS[provider]}
      </Text>
      <View className="w-8" />
    </Pressable>
  );
}
