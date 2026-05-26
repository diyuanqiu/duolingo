import type { LanguageCode } from "@/types/learning";

export type LanguageProgress = {
  level: string;
  currentUnitOrder: number;
  currentLessonId: string;
  dailyGoalXp: number;
  dailyXpEarned: number;
  streakDays: number;
};

export const progressByLanguage: Record<LanguageCode, LanguageProgress> = {
  es: {
    level: "A1",
    currentUnitOrder: 3,
    currentLessonId: "es-lesson-2",
    dailyGoalXp: 20,
    dailyXpEarned: 15,
    streakDays: 12,
  },
  fr: {
    level: "A1",
    currentUnitOrder: 1,
    currentLessonId: "fr-lesson-1",
    dailyGoalXp: 20,
    dailyXpEarned: 10,
    streakDays: 5,
  },
  zh: {
    level: "A1",
    currentUnitOrder: 1,
    currentLessonId: "zh-lesson-1",
    dailyGoalXp: 20,
    dailyXpEarned: 8,
    streakDays: 3,
  },
};

export function getProgressForLanguage(
  languageId: LanguageCode
): LanguageProgress {
  return progressByLanguage[languageId];
}
