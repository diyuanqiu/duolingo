import { AuthDivider } from "@/components/AuthDivider";
import { AuthEmailField } from "@/components/AuthEmailField";
import { AuthPasswordField } from "@/components/AuthPasswordField";
import { AuthGradientButton } from "@/components/AuthGradientButton";
import { SocialAuthButton } from "@/components/SocialAuthButton";
import { VerificationCodeModal } from "@/components/VerificationCodeModal";
import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PASSWORD_POLICY = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const canSignUp =
    email.trim().length > 0 && PASSWORD_POLICY.test(password);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            className="mb-4 h-10 w-10 items-center justify-center"
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={24} color="#0D132B" />
          </Pressable>

          <Text className="h2">Create your account</Text>
          <Text className="body-sm mt-2">
            Start your language journey today ✨
          </Text>

          <View className="my-6 items-center">
            <Image
              source={images.mascotAuth}
              className="h-36 w-56"
              resizeMode="contain"
            />
          </View>

          <AuthEmailField value={email} onChangeText={setEmail} />

          <View className="mt-3">
            <AuthPasswordField value={password} onChangeText={setPassword} />
          </View>

          <View className="mt-4">
            <AuthGradientButton
              title="Sign Up"
              disabled={!canSignUp}
              onPress={() => {
                Keyboard.dismiss();
                setModalVisible(true);
              }}
            />
          </View>

          <AuthDivider />

          <SocialAuthButton provider="google" />
          <SocialAuthButton provider="facebook" />
          <SocialAuthButton provider="apple" />

          <View className="mt-6 flex-row items-center justify-center pb-4">
            <Text className="body-sm">Already have an account? </Text>
            <Pressable onPress={() => router.push("/sign-in")}>
              <Text className="font-poppins-semibold text-base text-lingua-purple">
                Log in
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <VerificationCodeModal
        visible={modalVisible}
        email={email.trim()}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
