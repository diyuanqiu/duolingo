import type { LanguageCode } from "@/types/learning";

export type TodayPlanItemType =
  | "lesson"
  | "ai_conversation"
  | "vocabulary";

export type TodayPlanItem = {
  id: string;
  type: TodayPlanItemType;
  title: string;
  subtitle: string;
  lessonId?: string;
};

export type NextUpItem = {
  id: string;
  title: string;
  subtitle: string;
};

const todayPlansByLanguage: Record<LanguageCode, TodayPlanItem[]> = {
  es: [
    {
      id: "es-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "At the café",
      lessonId: "es-lesson-cafe",
    },
    {
      id: "es-plan-conversation",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Talk about your day",
    },
    {
      id: "es-plan-words",
      type: "vocabulary",
      title: "New words",
      subtitle: "10 words",
    },
  ],
  fr: [
    {
      id: "fr-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "Greetings",
      lessonId: "fr-lesson-1",
    },
    {
      id: "fr-plan-conversation",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Introduce yourself",
    },
    {
      id: "fr-plan-words",
      type: "vocabulary",
      title: "New words",
      subtitle: "8 words",
    },
  ],
  zh: [
    {
      id: "zh-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "Greetings",
      lessonId: "zh-lesson-1",
    },
    {
      id: "zh-plan-conversation",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Say hello in Mandarin",
    },
    {
      id: "zh-plan-words",
      type: "vocabulary",
      title: "New words",
      subtitle: "10 words",
    },
  ],
};

const nextUpByLanguage: Record<LanguageCode, NextUpItem> = {
  es: {
    id: "es-next-video",
    title: "AI Video Call",
    subtitle: "Practice speaking",
  },
  fr: {
    id: "fr-next-video",
    title: "AI Video Call",
    subtitle: "Practice speaking",
  },
  zh: {
    id: "zh-next-video",
    title: "AI Video Call",
    subtitle: "Practice speaking",
  },
};

export function getTodayPlanForLanguage(
  languageId: LanguageCode
): TodayPlanItem[] {
  return todayPlansByLanguage[languageId];
}

export function getNextUpForLanguage(languageId: LanguageCode): NextUpItem {
  return nextUpByLanguage[languageId];
}
