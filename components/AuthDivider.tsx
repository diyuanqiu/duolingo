import { Text, View } from "react-native";

export function AuthDivider() {
  return (
    <View className="my-2 flex-row items-center">
      <View className="divider flex-1" />
      <Text className="body-sm mx-3">or continue with</Text>
      <View className="divider flex-1" />
    </View>
  );
}
