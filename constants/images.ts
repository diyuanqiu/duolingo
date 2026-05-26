import earth from "@/assets/images/earth.png";
import flagCn from "@/assets/images/flags/cn.png";
import flagEs from "@/assets/images/flags/es.png";
import flagFr from "@/assets/images/flags/fr.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import type { LanguageCode } from "@/types/learning";

/** Bundled from flagcdn (see data/languages.ts flagEmoji). Reliable in Expo Go. */
export const flagImages: Record<LanguageCode, number> = {
  es: flagEs,
  fr: flagFr,
  zh: flagCn,
};

export const images = {
  earth,
  mascotAuth,
  mascotLogo,
  mascotWelcome,
};
