import type { Lesson, PhraseItem } from "@/types/learning";

export type SessionStatus =
  | "connecting"
  | "joined"
  | "online"
  | "error"
  | "ended";

export type LessonFeedbackScores = {
  speaking: string;
  pronunciation: string;
  grammar: string;
};

export const DEFAULT_FEEDBACK_SCORES: LessonFeedbackScores = {
  speaking: "Excellent",
  pronunciation: "Great",
  grammar: "Good",
};

export function formatSubtitlesText(
  lessonTitle: string,
  goals: Lesson["goals"],
  phrases: PhraseItem[]
): string {
  const goalLines = goals.map((goal) => `• ${goal.description}`).join("\n");
  const phraseLines = phrases
    .map((phrase) => `${phrase.text} — ${phrase.translation}`)
    .join("\n");

  return `${lessonTitle}\n\nGoals\n${goalLines}\n\nPhrases\n${phraseLines}`;
}

export function getTeacherResponseMessage(lesson: Lesson): string {
  const firstPhrase = lesson.phrases[0];
  if (firstPhrase) {
    return `¡Muy bien! Let's practice: "${firstPhrase.text}" — ${firstPhrase.translation} 👏`;
  }

  return lesson.aiTeacher.kickoff;
}
