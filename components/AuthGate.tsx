import { useLanguageStore } from "@/store/language-store";
import { useAuth } from "@clerk/expo";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const PUBLIC_SEGMENTS = new Set([
  "onboarding",
  "sign-in",
  "sign-up",
  "sso-callback",
]);

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId
  );
  const hasHydrated = useLanguageStore((state) => state._hasHydrated);

  useEffect(() => {
    if (!isLoaded || !hasHydrated) {
      return;
    }

    const firstSegment = segments[0] as string | undefined;
    const isPublicRoute =
      firstSegment !== undefined && PUBLIC_SEGMENTS.has(firstSegment);
    const isTabsRoute = firstSegment === "(tabs)";
    const isChooseLanguage = firstSegment === "choose-language";
    const hasSelectedLanguage = selectedLanguageId !== null;

    if (isSignedIn && isPublicRoute && firstSegment !== "sso-callback") {
      router.replace(hasSelectedLanguage ? "/" : "/choose-language");
      return;
    }

    if (isSignedIn && !hasSelectedLanguage && isTabsRoute) {
      router.replace("/choose-language");
      return;
    }

    if (isSignedIn && !hasSelectedLanguage && !isChooseLanguage) {
      router.replace("/choose-language");
      return;
    }

    if (!isSignedIn && isTabsRoute) {
      router.replace("/onboarding");
    }
  }, [
    isLoaded,
    isSignedIn,
    hasHydrated,
    selectedLanguageId,
    segments,
    router,
  ]);

  return children;
}
