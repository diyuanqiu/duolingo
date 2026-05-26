import { AuthDivider } from "@/components/AuthDivider";
import { AuthEmailField } from "@/components/AuthEmailField";
import { AuthPasswordField } from "@/components/AuthPasswordField";
import { AuthGradientButton } from "@/components/AuthGradientButton";
import { SocialAuthButton } from "@/components/SocialAuthButton";
import { VerificationCodeModal } from "@/components/VerificationCodeModal";
import { images } from "@/constants/images";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  finalizeSignIn,
  finalizeSignUp,
  getClerkErrorMessage,
  initiateSignUp,
} from "@/lib/auth";
import { useSignIn, useSignUp } from "@clerk/expo";
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
  const { signUp, errors: signUpErrors, fetchStatus: signUpFetchStatus } =
    useSignUp();
  const { signIn, errors: signInErrors } = useSignIn();
  const {
    socialLoading,
    socialError,
    handleGooglePress,
    handleFacebookPress,
    clearSocialError,
  } = useSocialAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [useSignInVerification, setUseSignInVerification] = useState(false);

  const canSignUp =
    email.trim().length > 0 && PASSWORD_POLICY.test(password);
  const isBusy = signUpFetchStatus === "fetching" || verifying || submitting;
  const displayError = formError ?? socialError;

  const handleStartSignUp = async () => {
    Keyboard.dismiss();
    setFormError(null);
    setModalError(null);
    clearSocialError();
    setUseSignInVerification(false);
    setSubmitting(true);

    try {
      const result = await initiateSignUp({
        email,
        password,
        signUp,
        signIn,
        signUpErrors,
        signInErrors,
      });

      if (!result.success) {
        setFormError(result.error ?? "Sign-up failed. Please try again.");
        return;
      }

      if (result.completeSignUp) {
        await finalizeSignUp(signUp, router);
        return;
      }

      if (result.completeSignIn) {
        await finalizeSignIn(signIn, router);
        return;
      }

      if (result.needsVerification) {
        setUseSignInVerification(result.useSignInVerification ?? false);
        setModalVisible(true);
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : "Sign-up failed. Please try again.";

      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyCode = async (code: string) => {
    setVerifying(true);
    setModalError(null);

    if (useSignInVerification) {
      const { error } = await signIn.mfa.verifyEmailCode({ code });

      if (error) {
        setModalError(
          getClerkErrorMessage(error, signInErrors?.fields, "code")
        );
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
    }

    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      setModalError(
        getClerkErrorMessage(error, signUpErrors?.fields, "code")
      );
      setVerifying(false);
      return false;
    }

    const finalized = await finalizeSignUp(signUp, router);
    setVerifying(false);

    if (!finalized) {
      setModalError("Sign-up could not be completed. Please try again.");
      return false;
    }

    return true;
  };

  const handleResendCode = async () => {
    setModalError(null);

    if (useSignInVerification) {
      const { error } = await signIn.mfa.sendEmailCode();

      if (error) {
        setModalError(
          getClerkErrorMessage(error, signInErrors?.fields, "code")
        );
      }

      return;
    }

    const { error } = await signUp.verifications.sendEmailCode();

    if (error) {
      setModalError(
        getClerkErrorMessage(error, signUpErrors?.fields, "code")
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
            {!canSignUp && password.length > 0 ? (
              <Text className="caption mt-2 text-text-secondary">
                Use 8+ characters with uppercase, lowercase, and a number.
              </Text>
            ) : null}
          </View>

          {displayError ? (
            <Text className="body-sm mt-3 text-[#E84B3B]">{displayError}</Text>
          ) : null}

          <View className="mt-4">
            <AuthGradientButton
              title="Sign Up"
              disabled={!canSignUp || isBusy || !!socialLoading}
              onPress={handleStartSignUp}
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
        onClose={() => {
          setModalVisible(false);
          setModalError(null);
          setUseSignInVerification(false);
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
