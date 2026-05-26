/** Supported target language codes in the sample dataset. */
export type LanguageCode = "es" | "fr" | "zh";

export type LessonType = "audio" | "video" | "chat" | "vocabulary";

export type ActivityType =
  | "intro"
  | "vocabulary"
  | "listening"
  | "speaking"
  | "phrase_practice"
  | "review";

export type Language = {
  id: LanguageCode;
  code: LanguageCode;
  name: string;
  nativeName: string;
  description: string;
  flagEmoji: string;
  learners?: string;
};

export type Unit = {
  id: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  description: string;
  heroImageKey?: string;
};

export type VocabularyItem = {
  id: string;
  term: string;
  translation: string;
  pronunciation?: string;
  example?: string;
};

export type PhraseItem = {
  id: string;
  text: string;
  translation: string;
  note?: string;
};

export type LessonGoal = {
  id: string;
  description: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  instruction: string;
  vocabularyIds?: string[];
  phraseIds?: string[];
};

/** Prompts for Vision Agent / audio AI teacher sessions. */
export type AiTeacherPrompts = {
  system: string;
  kickoff: string;
  lessonContext: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  description: string;
  lessonType: LessonType;
  xpReward: number;
  imageKey?: string;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  aiTeacher: AiTeacherPrompts;
};

export type LearningContent = {
  languages: Language[];
  units: Unit[];
  lessons: Lesson[];
};
