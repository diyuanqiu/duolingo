import Constants from "expo-constants";

export type StreamTokenResponse = {
  apiKey: string;
  token: string;
  userId: string;
};

export type StreamCallResponse = {
  callId: string;
  callType: string;
};

function getApiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return `http://${hostUri}`;
  }

  return "http://localhost:8081";
}

async function streamFetch<T>(
  path: string,
  clerkToken: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${clerkToken}`,
      ...init?.headers,
    },
  });

  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(
      typeof data === "object" && data && "error" in data && data.error
        ? data.error
        : `Stream API request failed (${response.status})`
    );
  }

  return data;
}

export async function fetchStreamToken(
  clerkToken: string
): Promise<StreamTokenResponse> {
  return streamFetch<StreamTokenResponse>("/api/stream/token", clerkToken);
}

export type CreateStreamCallPayload = {
  lessonId: string;
  languageId: string;
  lessonTitle: string;
  lessonDescription?: string;
  goals?: { id: string; description: string }[];
  phrases?: { id: string; text: string; translation: string }[];
  aiTeacherContext?: string;
};

export async function createStreamCall(
  clerkToken: string,
  payload: CreateStreamCallPayload
): Promise<StreamCallResponse> {
  return streamFetch<StreamCallResponse>("/api/stream/call", clerkToken, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
