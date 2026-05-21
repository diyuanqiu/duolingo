import { Text, TextInput, View } from "react-native";

type AuthEmailFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function AuthEmailField({ value, onChangeText }: AuthEmailFieldProps) {
  return (
    <View className="rounded-2xl border border-border px-4 py-3">
      <Text className="caption text-text-secondary">Email</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="alex@gmail.com"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        className="mt-1 font-poppins-regular text-base text-text-primary"
        style={{ padding: 0 }}
      />
    </View>
  );
}
