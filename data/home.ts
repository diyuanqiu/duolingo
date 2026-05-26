import { getTodayPlanForLanguage } from "@/data/home-plan";
import { getLanguageById, getLessonById } from "@/data/lessons";
import { getProgressForLanguage } from "@/data/progress";
import type { Language, LanguageCode, Lesson } from "@/types/learning";

const GREETINGS: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  zh: "你好",
};

export type HomeNextUp = {
  title: string;
  subtitle: string;
};

export type HomeSummary = {
  language: Language;
  progress: ReturnType<typeof getProgressForLanguage>;
  currentLesson: Lesson | undefined;
  unitLabel: string;
  todayPlan: ReturnType<typeof getTodayPlanForLanguage>;
  nextUp: HomeNextUp;
  dailyProgressPercent: number;
};

const nextUp: HomeNextUp = {
  title: "AI Video Call",
  subtitle: "Practice speaking",
};

export function getGreeting(languageId: LanguageCode, firstName: string): string {
  return `${GREETINGS[languageId]}, ${firstName}! 👋`;
}

export function getHomeSummary(languageId: LanguageCode): HomeSummary | null {
  const language = getLanguageById(languageId);
  if (!language) {
    return null;
  }

  const progress = getProgressForLanguage(languageId);
  const currentLesson = getLessonById(progress.currentLessonId);
  const unitLabel = `${progress.level} • Unit ${progress.currentUnitOrder}`;

  const dailyProgressPercent = Math.min(
    100,
    Math.round((progress.dailyXpEarned / progress.dailyGoalXp) * 100)
  );

  return {
    language,
    progress,
    currentLesson,
    unitLabel,
    todayPlan: getTodayPlanForLanguage(languageId),
    nextUp,
    dailyProgressPercent,
  };
}
