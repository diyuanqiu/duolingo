import earth from "@/assets/images/earth.png";
import flagCn from "@/assets/images/flags/cn.png";
import flagEs from "@/assets/images/flags/es.png";
import flagFr from "@/assets/images/flags/fr.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";
import type { LanguageCode } from "@/types/learning";

/** Bundled from flagcdn (see data/languages.ts flagEmoji). Reliable in Expo Go. */
export const flagImages: Record<LanguageCode, number> = {
  es: flagEs,
  fr: flagFr,
  zh: flagCn,
};

/** Remote placeholders when no local asset exists. */
export const remoteImages = {
  aiTeacherAvatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
} as const;

export const images = {
  earth,
  mascotAuth,
  mascotLogo,
  mascotWelcome,
  palace,
  streakFire,
  treasure,
};
