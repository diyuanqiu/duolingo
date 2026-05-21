import { activateSession } from "@/lib/auth";
import { useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

type SocialProvider = "google" | "facebook";

const OAUTH_STRATEGIES = {
  google: "oauth_google",
  facebook: "oauth_facebook",
} as const;

const ERROR_MESSAGES: Record<SocialProvider, string> = {
  google: "Google sign-in failed. Please try again.",
  facebook: "Facebook sign-in failed. Please try again.",
};

export function useSocialAuth() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
    null
  );
  const [socialError, setSocialError] = useState<string | null>(null);

  const startOAuth = useCallback(
    async (provider: SocialProvider) => {
      setSocialError(null);
      setSocialLoading(provider);

      try {
        const { createdSessionId, setActive, authSessionResult } =
          await startSSOFlow({
            strategy: OAUTH_STRATEGIES[provider],
          });

        if (
          authSessionResult?.type === "cancel" ||
          authSessionResult?.type === "dismiss"
        ) {
          return;
        }

        const activated = await activateSession(createdSessionId, setActive);
        if (activated) {
          router.replace("/");
        }
      } catch (err: unknown) {
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message: unknown }).message)
            : ERROR_MESSAGES[provider];

        setSocialError(message);
      } finally {
        setSocialLoading(null);
      }
    },
    [router, startSSOFlow]
  );

  const handleGooglePress = useCallback(
    () => startOAuth("google"),
    [startOAuth]
  );

  const handleFacebookPress = useCallback(
    () => startOAuth("facebook"),
    [startOAuth]
  );

  return {
    socialLoading,
    socialError,
    handleGooglePress,
    handleFacebookPress,
    clearSocialError: () => setSocialError(null),
  };
}
