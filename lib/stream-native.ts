import Constants from "expo-constants";

/** True when running in a custom dev client or standalone build (not Expo Go). */
export function isStreamNativeAvailable(): boolean {
  return Constants.executionEnvironment !== "storeClient";
}

export const STREAM_DEV_BUILD_MESSAGE =
  "Audio lessons need a development build with WebRTC (Expo Go is not supported). Run: npx expo prebuild && npx expo run:android";
