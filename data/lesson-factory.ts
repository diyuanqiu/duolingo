import type { LanguageCode, Lesson, LessonType } from "@/types/learning";

type MinimalLessonInput = {
  id: string;
  unitId: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonType?: LessonType;
  xpReward?: number;
  imageKey?: string;
};

export function createMinimalLesson(input: MinimalLessonInput): Lesson {
  const {
    id,
    unitId,
    languageId,
    order,
    title,
    description,
    lessonType = "audio",
    xpReward = 10,
    imageKey,
  } = input;

  return {
    id,
    unitId,
    languageId,
    order,
    title,
    description,
    lessonType,
    xpReward,
    imageKey,
    goals: [
      {
        id: `${id}-goal-1`,
        description,
      },
    ],
    vocabulary: [
      {
        id: `${id}-vocab-1`,
        term: title,
        translation: description,
      },
    ],
    phrases: [
      {
        id: `${id}-phrase-1`,
        text: title,
        translation: description,
      },
    ],
    activities: [
      {
        id: `${id}-activity-1`,
        type: "intro",
        title: `Explore ${title}`,
        instruction: description,
        vocabularyIds: [`${id}-vocab-1`],
      },
    ],
    aiTeacher: {
      system: `You are a warm language teacher. Stay strictly within the lesson "${title}" and speak mostly in English with gentle target-language examples.`,
      kickoff: `Today we're working on "${title}". Ready to begin?`,
      lessonContext: `Focus: ${title}. ${description}`,
    },
  };
}
