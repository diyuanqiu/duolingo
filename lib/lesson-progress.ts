import type { LanguageProgress } from "@/store/progress-store";
import type { Lesson } from "@/types/learning";

export type LessonDisplayStatus = "completed" | "in_progress" | "upcoming";

export function getLessonDisplayStatus(
  lesson: Lesson,
  progress: LanguageProgress
): LessonDisplayStatus {
  if (progress.completedLessonIds.includes(lesson.id)) {
    return "completed";
  }

  if (progress.currentLessonId === lesson.id) {
    return "in_progress";
  }

  return "upcoming";
}

export function countCompletedLessonsInUnit(
  unitLessons: Lesson[],
  progress: LanguageProgress
): number {
  return unitLessons.filter((lesson) =>
    progress.completedLessonIds.includes(lesson.id)
  ).length;
}

export function countUnitLessonProgress(
  unitLessons: Lesson[],
  progress: LanguageProgress
): number {
  const completed = countCompletedLessonsInUnit(unitLessons, progress);
  const hasInProgressInUnit = unitLessons.some(
    (lesson) =>
      lesson.id === progress.currentLessonId &&
      !progress.completedLessonIds.includes(lesson.id)
  );

  return completed + (hasInProgressInUnit ? 1 : 0);
}
