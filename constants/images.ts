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
import type { ImageSourcePropType } from "react-native";

/** Bundled from flagcdn (see data/languages.ts flagEmoji). Reliable in Expo Go. */
export const flagImages: Record<LanguageCode, number> = {
  es: flagEs,
  fr: flagFr,
  zh: flagCn,
};

export type LessonImageKey =
  | "cafe"
  | "greetings"
  | "travel"
  | "shopping"
  | "plans"
  | "food"
  | "family"
  | "everyday";

/** Remote placeholders when no local asset exists. */
export const remoteImages = {
  aiTeacherAvatar:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  unitHero: {
    cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=420&fit=crop",
    everyday:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=420&fit=crop",
    default:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=420&fit=crop",
  },
  lessonThumbnail: {
    cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop",
    greetings:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120&h=120&fit=crop",
    travel:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=120&h=120&fit=crop",
    shopping:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=120&fit=crop",
    plans:
      "https://images.unsplash.com/photo-1511632765486-a019ff11ac40?w=120&h=120&fit=crop",
    food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop",
    family:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=120&h=120&fit=crop",
    everyday:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&h=120&fit=crop",
  },
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

export function getUnitHeroImageSource(
  heroImageKey?: string
): ImageSourcePropType {
  if (heroImageKey === "cafe") {
    return { uri: remoteImages.unitHero.cafe };
  }

  if (heroImageKey === "everyday") {
    return { uri: remoteImages.unitHero.everyday };
  }

  return { uri: remoteImages.unitHero.default };
}

export function getLessonImageSource(
  imageKey?: string
): ImageSourcePropType {
  const key = imageKey as LessonImageKey | undefined;
  if (key && key in remoteImages.lessonThumbnail) {
    return {
      uri: remoteImages.lessonThumbnail[
        key as keyof typeof remoteImages.lessonThumbnail
      ],
    };
  }

  return { uri: remoteImages.lessonThumbnail.everyday };
}
