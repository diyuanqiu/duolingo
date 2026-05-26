import PostHog from "posthog-react-native";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (!posthogKey) {
  throw new Error("Add EXPO_PUBLIC_POSTHOG_KEY to your .env file");
}

export const posthog = new PostHog(posthogKey, {
  host: posthogHost,
});
