import type { LanguageCode } from "@/types/learning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LanguageProgress = {
  level: string;
  currentUnitOrder: number;
  currentLessonId: string;
  completedLessonIds: string[];
  dailyGoalXp: number;
  dailyXpEarned: number;
  streakDays: number;
};

const DEFAULT_PROGRESS: Record<LanguageCode, LanguageProgress> = {
  es: {
    level: "A1",
    currentUnitOrder: 3,
    currentLessonId: "es-unit3-l3",
    completedLessonIds: [
      "es-lesson-1",
      "es-lesson-2",
      "es-unit3-l1",
      "es-unit3-l2",
    ],
    dailyGoalXp: 20,
    dailyXpEarned: 15,
    streakDays: 12,
  },
  fr: {
    level: "A1",
    currentUnitOrder: 1,
    currentLessonId: "fr-lesson-1",
    completedLessonIds: [],
    dailyGoalXp: 20,
    dailyXpEarned: 10,
    streakDays: 5,
  },
  zh: {
    level: "A1",
    currentUnitOrder: 1,
    currentLessonId: "zh-lesson-1",
    completedLessonIds: [],
    dailyGoalXp: 20,
    dailyXpEarned: 8,
    streakDays: 3,
  },
};

type ProgressState = {
  progressByLanguage: Record<LanguageCode, LanguageProgress>;
  getProgressForLanguage: (languageId: LanguageCode) => LanguageProgress;
  updateProgress: (
    languageId: LanguageCode,
    progress: Partial<LanguageProgress>
  ) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progressByLanguage: DEFAULT_PROGRESS,
      getProgressForLanguage: (languageId) =>
        get().progressByLanguage[languageId],
      updateProgress: (languageId, progress) =>
        set((state) => ({
          progressByLanguage: {
            ...state.progressByLanguage,
            [languageId]: {
              ...state.progressByLanguage[languageId],
              ...progress,
            },
          },
        })),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function getProgressForLanguage(
  languageId: LanguageCode
): LanguageProgress {
  return useProgressStore.getState().getProgressForLanguage(languageId);
}
