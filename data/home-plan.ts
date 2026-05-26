import type { LanguageCode } from "@/types/learning";

export type PlanItemStatus = "completed" | "pending";

export type PlanItemType = "lesson" | "ai_conversation" | "new_words";

export type TodayPlanItem = {
  id: string;
  type: PlanItemType;
  title: string;
  subtitle: string;
  status: PlanItemStatus;
  lessonId?: string;
};

const todayPlanByLanguage: Record<LanguageCode, TodayPlanItem[]> = {
  es: [
    {
      id: "es-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "At the café",
      status: "completed",
      lessonId: "es-lesson-2",
    },
    {
      id: "es-plan-ai",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      status: "pending",
    },
    {
      id: "es-plan-words",
      type: "new_words",
      title: "New words",
      subtitle: "10 words",
      status: "pending",
    },
  ],
  fr: [
    {
      id: "fr-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "Greetings",
      status: "pending",
      lessonId: "fr-lesson-1",
    },
    {
      id: "fr-plan-ai",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Introduce yourself",
      status: "pending",
    },
    {
      id: "fr-plan-words",
      type: "new_words",
      title: "New words",
      subtitle: "8 words",
      status: "pending",
    },
  ],
  zh: [
    {
      id: "zh-plan-lesson",
      type: "lesson",
      title: "Lesson",
      subtitle: "Greetings",
      status: "pending",
      lessonId: "zh-lesson-1",
    },
    {
      id: "zh-plan-ai",
      type: "ai_conversation",
      title: "AI Conversation",
      subtitle: "Say hello in Mandarin",
      status: "pending",
    },
    {
      id: "zh-plan-words",
      type: "new_words",
      title: "New words",
      subtitle: "6 words",
      status: "pending",
    },
  ],
};

export function getTodayPlanForLanguage(
  languageId: LanguageCode
): TodayPlanItem[] {
  return todayPlanByLanguage[languageId];
}
