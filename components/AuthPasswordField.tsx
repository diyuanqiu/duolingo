import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type AuthPasswordFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function AuthPasswordField({
  value,
  onChangeText,
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="rounded-2xl border border-border px-4 py-3">
      <Text className="caption text-text-secondary">Password</Text>
      <View className="mt-1 flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          className="flex-1 font-poppins-regular text-base text-text-primary"
          style={{ padding: 0 }}
        />
        <Pressable
          onPress={() => setVisible((prev) => !prev)}
          hitSlop={8}
          className="ml-2 p-1"
        >
          <Ionicons
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#6B7280"
          />
        </Pressable>
      </View>
    </View>
  );
}
