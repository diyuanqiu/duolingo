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

type SignUpResource = SignUpLike & {
  isTransferable?: boolean;
  password: (params: {
    emailAddress: string;
    password: string;
  }) => Promise<{ error: ClerkErrorLike }>;
  verifications: {
    sendEmailCode: () => Promise<{ error: ClerkErrorLike }>;
  };
};

type SignInResource = {
  status: string;
  password: (params: {
    emailAddress: string;
    password: string;
  }) => Promise<{ error: ClerkErrorLike }>;
  mfa: {
    sendEmailCode: () => Promise<{ error: ClerkErrorLike }>;
  };
};

export type InitiateSignUpResult = {
  success: boolean;
  completeSignUp?: boolean;
  completeSignIn?: boolean;
  needsVerification?: boolean;
  useSignInVerification?: boolean;
  error?: string;
};

type InitiateSignUpParams = {
  email: string;
  password: string;
  signUp: SignUpResource;
  signIn: SignInResource;
  signUpErrors?: HookErrors;
  signInErrors?: HookErrors;
};

export async function initiateSignUp({
  email,
  password,
  signUp,
  signIn,
  signUpErrors,
  signInErrors,
}: InitiateSignUpParams): Promise<InitiateSignUpResult> {
  const { error } = await signUp.password({
    emailAddress: email.trim(),
    password,
  });

  if (error) {
    return {
      success: false,
      error: getClerkErrorMessage(error, signUpErrors?.fields, "emailAddress"),
    };
  }

  const hookError = getHookGlobalError(signUpErrors);
  if (hookError) {
    return { success: false, error: hookError };
  }

  if (signUp.status === "complete") {
    return { success: true, completeSignUp: true };
  }

  if (signUp.isTransferable) {
    const { error: signInError } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    if (signInError) {
      return {
        success: false,
        error:
          "This email is already registered. Please log in with your password.",
      };
    }

    if (signIn.status === "complete") {
      return { success: true, completeSignIn: true };
    }

    if (signIn.status === "needs_client_trust") {
      const { error: mfaSendError } = await signIn.mfa.sendEmailCode();
      if (mfaSendError) {
        return {
          success: false,
          error: getClerkErrorMessage(mfaSendError, signInErrors?.fields, "code"),
        };
      }

      return {
        success: true,
        needsVerification: true,
        useSignInVerification: true,
      };
    }

    return {
      success: false,
      error: "Please log in from the Log in screen.",
    };
  }

  const missingFields = signUp.missingFields ?? [];
  if (missingFields.length > 0) {
    return {
      success: false,
      error: `Additional information required: ${missingFields.join(", ")}`,
    };
  }

  if (!needsEmailVerification(signUp)) {
    return {
      success: false,
      error: `Sign-up could not continue (status: ${signUp.status}). Check Clerk email verification settings.`,
    };
  }

  const { error: sendError } = await signUp.verifications.sendEmailCode();
  if (sendError) {
    return {
      success: false,
      error: getClerkErrorMessage(sendError, signUpErrors?.fields, "code"),
    };
  }

  return { success: true, needsVerification: true };
}

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
