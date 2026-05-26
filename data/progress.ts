import type { LanguageCode } from "@/types/learning";

export type LanguageProgress = {
  languageId: LanguageCode;
  levelLabel: string;
  currentUnitOrder: number;
  currentLessonId: string;
  streakDays: number;
  dailyGoalXp: number;
  xpEarnedToday: number;
  completedLessonIds: string[];
  completedPlanItemIds: string[];
};

/** Sample local progress used on the home screen (replace with Zustand later). */
export const languageProgress: Record<LanguageCode, LanguageProgress> = {
  es: {
    languageId: "es",
    levelLabel: "A1",
    currentUnitOrder: 3,
    currentLessonId: "es-lesson-cafe",
    streakDays: 12,
    dailyGoalXp: 20,
    xpEarnedToday: 15,
    completedLessonIds: ["es-lesson-cafe"],
    completedPlanItemIds: ["es-plan-lesson"],
  },
  fr: {
    languageId: "fr",
    levelLabel: "A1",
    currentUnitOrder: 1,
    currentLessonId: "fr-lesson-1",
    streakDays: 5,
    dailyGoalXp: 20,
    xpEarnedToday: 8,
    completedLessonIds: [],
    completedPlanItemIds: [],
  },
  zh: {
    languageId: "zh",
    levelLabel: "A1",
    currentUnitOrder: 1,
    currentLessonId: "zh-lesson-1",
    streakDays: 3,
    dailyGoalXp: 20,
    xpEarnedToday: 10,
    completedLessonIds: [],
    completedPlanItemIds: [],
  },
};

export function getProgressForLanguage(
  languageId: LanguageCode
): LanguageProgress {
  return languageProgress[languageId];
}
