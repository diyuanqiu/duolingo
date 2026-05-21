import type { Router } from "expo-router";

type ClerkErrorLike = {
  message?: string;
  longMessage?: string;
  errors?: Array<{ message?: string; longMessage?: string; code?: string }>;
} | null;

type HookErrors = {
  global?: Array<{ message?: string; longMessage?: string; code?: string }> | null;
  fields?: unknown;
} | null | undefined;

export function getClerkErrorMessage(
  error: ClerkErrorLike | undefined,
  fieldErrors?: unknown,
  field?: string
): string {
  const fields = fieldErrors as
    | Record<string, { message?: string; longMessage?: string } | undefined>
    | null
    | undefined;

  if (field && fields?.[field]) {
    const fieldError = fields[field];
    return (
      fieldError?.longMessage ??
      fieldError?.message ??
      "Something went wrong. Please try again."
    );
  }

  const nested = error?.errors?.[0];
  if (nested?.longMessage || nested?.message) {
    const message = nested.longMessage ?? nested.message ?? "";
    if (nested.code === "captcha_invalid" || message.toLowerCase().includes("captcha")) {
      return "Sign-up is blocked by bot protection. In Clerk Dashboard, disable Bot sign-up protection for Expo Go testing.";
    }
    return message;
  }

  if (error?.longMessage) {
    return error.longMessage;
  }

  if (error?.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function getHookGlobalError(hookErrors?: HookErrors): string | null {
  const globalError = hookErrors?.global?.[0];
  if (!globalError) {
    return null;
  }

  return getClerkErrorMessage(globalError);
}

type SignUpLike = {
  status: string;
  unverifiedFields?: string[];
  missingFields?: string[];
  isTransferable?: boolean;
};

export function needsEmailVerification(signUp: SignUpLike): boolean {
  return (
    signUp.status === "missing_requirements" &&
    (signUp.unverifiedFields?.includes("email_address") ?? false) &&
    (signUp.missingFields?.length ?? 0) === 0
  );
}

type Finalizable = {
  status: string;
  finalize: (options?: {
    navigate?: (params: { session: unknown; decorateUrl: (url: string) => string }) => void;
  }) => Promise<unknown>;
};

export async function finalizeSignIn(signIn: Finalizable, router: Router) {
  if (signIn.status !== "complete") {
    return false;
  }

  await signIn.finalize({
    navigate: () => {
      router.replace("/");
    },
  });

  return true;
}

export async function finalizeSignUp(signUp: Finalizable, router: Router) {
  if (signUp.status !== "complete") {
    return false;
  }

  await signUp.finalize({
    navigate: () => {
      router.replace("/");
    },
  });

  return true;
}

export async function activateSession(
  createdSessionId: string | null | undefined,
  setActive: ((params: { session: string }) => Promise<void>) | undefined
) {
  if (!createdSessionId || !setActive) {
    return false;
  }

  await setActive({ session: createdSessionId });
  return true;
}
