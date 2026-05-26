import { AuthDivider } from "@/components/AuthDivider";
import { AuthEmailField } from "@/components/AuthEmailField";
import { AuthGradientButton } from "@/components/AuthGradientButton";
import { SocialAuthButton } from "@/components/SocialAuthButton";
import { VerificationCodeModal } from "@/components/VerificationCodeModal";
import { images } from "@/constants/images";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  finalizeSignIn,
  getClerkErrorMessage,
} from "@/lib/auth";
import { useSignIn } from "@clerk/expo";
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

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const {
    socialLoading,
    socialError,
    handleGooglePress,
    handleFacebookPress,
    clearSocialError,
  } = useSocialAuth();

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const isEmailValid = email.trim().length > 0;
  const isBusy = fetchStatus === "fetching" || verifying;
  const displayError = formError ?? socialError;

  const handleSendCode = async () => {
    Keyboard.dismiss();
    setFormError(null);
    setModalError(null);
    clearSocialError();

    const { error } = await signIn.emailCode.sendCode({
      emailAddress: email.trim(),
    });

    if (error) {
      setFormError(
        getClerkErrorMessage(error, errors?.fields, "identifier")
      );
      return;
    }

    setModalVisible(true);
  };

  const handleVerifyCode = async (code: string) => {
    setVerifying(true);
    setModalError(null);

    const { error } = await signIn.emailCode.verifyCode({ code });

    if (error) {
      setModalError(getClerkErrorMessage(error, errors?.fields, "code"));
      setVerifying(false);
      return false;
    }

    const finalized = await finalizeSignIn(signIn, router);
    setVerifying(false);

    if (!finalized) {
      setModalError("Sign-in could not be completed. Please try again.");
      return false;
    }

    return true;
  };

  const handleResendCode = async () => {
    setModalError(null);

    const { error } = await signIn.emailCode.sendCode({
      emailAddress: email.trim(),
    });

    if (error) {
      setModalError(
        getClerkErrorMessage(error, errors?.fields, "identifier")
      );
    }
  };

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

          <Text className="h2">Log in</Text>
          <Text className="body-sm mt-2">
            Welcome back! Continue your language journey.
          </Text>

          <View className="my-6 items-center">
            <Image
              source={images.mascotAuth}
              className="h-36 w-56"
              resizeMode="contain"
            />
          </View>

          <AuthEmailField value={email} onChangeText={setEmail} />

          {displayError ? (
            <Text className="body-sm mt-3 text-[#E84B3B]">{displayError}</Text>
          ) : null}

          <View className="mt-4">
            <AuthGradientButton
              title="Log In"
              disabled={!isEmailValid || isBusy || !!socialLoading}
              onPress={handleSendCode}
            />
          </View>

          <AuthDivider />

          <SocialAuthButton
            provider="google"
            onPress={handleGooglePress}
            disabled={isBusy || socialLoading === "facebook"}
          />
          <SocialAuthButton
            provider="facebook"
            onPress={handleFacebookPress}
            disabled={isBusy || socialLoading === "google"}
          />
          <View className="mt-6 flex-row items-center justify-center pb-4">
            <Text className="body-sm">Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.push("/sign-up")}>
              <Text className="font-poppins-semibold text-base text-lingua-purple">
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <VerificationCodeModal
        visible={modalVisible}
        email={email.trim()}
        onClose={() => {
          setModalVisible(false);
          setModalError(null);
        }}
        onVerify={handleVerifyCode}
        onResend={handleResendCode}
        loading={verifying}
        error={modalError}
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
