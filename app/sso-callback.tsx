import { activateSession } from "@/lib/auth";
import { useSignIn, useSignUp } from "@clerk/expo/legacy";
import * as Linking from "expo-linking";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

async function completeSSOFromUrl(
  url: string,
  signIn: NonNullable<ReturnType<typeof useSignIn>["signIn"]>,
  signUp: NonNullable<ReturnType<typeof useSignUp>["signUp"]>,
  setActive: ReturnType<typeof useSignIn>["setActive"]
) {
  const params = new URL(url).searchParams;
  const rotatingTokenNonce = params.get("rotating_token_nonce") ?? "";

  if (!rotatingTokenNonce) {
    return false;
  }

  await signIn.reload({ rotatingTokenNonce });

  const userNeedsToBeCreated =
    signIn.firstFactorVerification?.status === "transferable";

  if (userNeedsToBeCreated && signUp) {
    await signUp.create({ transfer: true });
  }

  const createdSessionId = signUp?.createdSessionId ?? signIn.createdSessionId;
  return activateSession(createdSessionId, setActive);
}

export default function SSOCallbackScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignInLoaded || !isSignUpLoaded || !signIn || !signUp) {
      return;
    }

    const handleUrl = async (url: string) => {
      try {
        const success = await completeSSOFromUrl(
          url,
          signIn,
          signUp,
          setActive
        );

        if (success) {
          router.replace("/index");
          return;
        }

        setErrorMessage("Sign-in could not be completed. Please try again.");
        router.replace("/sign-in");
      } catch {
        setErrorMessage("Sign-in could not be completed. Please try again.");
        router.replace("/sign-in");
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) {
        void handleUrl(url);
      }
    });

    const subscription = Linking.addEventListener("url", (event) => {
      void handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, [isSignInLoaded, isSignUpLoaded, router, setActive, signIn, signUp]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7B61FF" />
        {errorMessage ? (
          <Text className="body-sm mt-4 text-[#E84B3B]">{errorMessage}</Text>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
});
