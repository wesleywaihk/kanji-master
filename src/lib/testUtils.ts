import type { RawQuestion } from './courseData';
import { dataMap } from './courseData';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildSentence(template: string, word: string): string {
  return template.replace(
    '<A>',
    `<strong style="font-weight: 600; font-size: 1.rem; text-decoration: underline; color: #ad4e4e"> ${word} </strong>`,
  );
}

export const FULLWIDTH = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export function toFullwidth(n: number): string {
  return String(n)
    .split('')
    .map((d) => FULLWIDTH[Number(d)])
    .join('');
}

export function generateTestQuestions(
  level: string,
  selectedChapters: number[],
  speakingCount: number,
  kanjiCount: number,
): { speakingQs: RawQuestion[]; kanjiQs: RawQuestion[] } {
  const chapters = dataMap[level] ?? [];
  const pool: RawQuestion[] = chapters
    .filter((c) => selectedChapters.includes(c.chapter))
    .flatMap((c) => c.questions);
  return {
    speakingQs: shuffle(pool).slice(0, speakingCount),
    kanjiQs: shuffle(pool).slice(0, kanjiCount),
  };
}
