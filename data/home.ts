import { getLanguageById, getLessonById, getUnitsForLanguage } from "@/data/lessons";
import { getNextUpForLanguage, getTodayPlanForLanguage } from "@/data/home-plan";
import { getProgressForLanguage } from "@/data/progress";
import type { LanguageCode } from "@/types/learning";
import type { NextUpItem, TodayPlanItem } from "@/data/home-plan";

export type HomePlanItem = TodayPlanItem & {
  completed: boolean;
};

export type HomeScreenData = {
  languageId: LanguageCode;
  languageName: string;
  greetingWord: string;
  levelLabel: string;
  unitLabel: string;
  currentLessonTitle: string;
  streakDays: number;
  dailyGoalXp: number;
  xpEarnedToday: number;
  dailyGoalProgress: number;
  todayPlan: HomePlanItem[];
  nextUp: NextUpItem;
};

const greetingByLanguage: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  zh: "你好",
};

export function getHomeScreenData(languageId: LanguageCode): HomeScreenData {
  const language = getLanguageById(languageId);
  const progress = getProgressForLanguage(languageId);
  const units = getUnitsForLanguage(languageId);
  const currentUnit =
    units.find((unit) => unit.order === progress.currentUnitOrder) ??
    units[units.length - 1];
  const currentLesson = getLessonById(progress.currentLessonId);
  const todayPlan = getTodayPlanForLanguage(languageId).map((item) => ({
    ...item,
    completed: progress.completedPlanItemIds.includes(item.id),
  }));

  const dailyGoalProgress =
    progress.dailyGoalXp > 0
      ? Math.min(progress.xpEarnedToday / progress.dailyGoalXp, 1)
      : 0;

  return {
    languageId,
    languageName: language?.name ?? "Spanish",
    greetingWord: greetingByLanguage[languageId],
    levelLabel: progress.levelLabel,
    unitLabel: currentUnit
      ? `Unit ${currentUnit.order}`
      : `Unit ${progress.currentUnitOrder}`,
    currentLessonTitle: currentLesson?.title ?? "Continue learning",
    streakDays: progress.streakDays,
    dailyGoalXp: progress.dailyGoalXp,
    xpEarnedToday: progress.xpEarnedToday,
    dailyGoalProgress,
    todayPlan,
    nextUp: getNextUpForLanguage(languageId),
  };
}
