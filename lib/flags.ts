import { flagImages } from "@/constants/images";
import type { ImageSourcePropType } from "react-native";
import type { LanguageCode } from "@/types/learning";

export function getFlagImageSource(
  languageId: LanguageCode
): ImageSourcePropType {
  return flagImages[languageId];
}
