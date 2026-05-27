import { StreamClient } from "@stream-io/node-sdk";

const STREAM_CALL_TYPE = "audio_room";

export function getStreamClient(): StreamClient {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error(
      "STREAM_API_KEY and STREAM_API_SECRET must be set for Stream API routes."
    );
  }

  return new StreamClient(apiKey, apiSecret);
}

export function getStreamApiKey(): string {
  const apiKey = process.env.STREAM_API_KEY;
  if (!apiKey) {
    throw new Error("STREAM_API_KEY is not configured.");
  }
  return apiKey;
}

export { STREAM_CALL_TYPE };

export function buildLessonCallId(lessonId: string, userId: string): string {
  return `lingua-${lessonId}-${userId}`;
}
