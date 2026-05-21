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

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const firstSegment = segments[0] as string | undefined;
    const isPublicRoute =
      firstSegment !== undefined && PUBLIC_SEGMENTS.has(firstSegment);
    const isHome = firstSegment === undefined;

    if (isSignedIn && isPublicRoute && firstSegment !== "sso-callback") {
      router.replace("/");
      return;
    }

    if (!isSignedIn && isHome) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, segments, router]);

  return children;
}
