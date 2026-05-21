import { Pressable, StyleSheet, Text, View } from "react-native";

type AuthGradientButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function AuthGradientButton({
  title,
  onPress,
  disabled = false,
}: AuthGradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.wrapper,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={styles.gradient}>
        <Text className="font-poppins-semibold text-base text-white">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    experimental_backgroundImage:
      "linear-gradient(to right, #7B61FF 0%, #6366F1 100%)",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
});
