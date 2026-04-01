import type { RawQuestion } from './courseData';

export type BookmarkedQuestion = RawQuestion & { level: string };

const STORAGE_KEY = 'kanji-master-bookmarks';

export function getBookmarks(): BookmarkedQuestion[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveBookmarks(list: BookmarkedQuestion[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function toggleBookmark(level: string, q: RawQuestion): boolean {
  const list = getBookmarks();
  const idx = list.findIndex(
    (b) =>
      b.level === level && b.question === q.question && b.kanji === q.kanji,
  );
  if (idx >= 0) {
    list.splice(idx, 1);
    saveBookmarks(list);
    return false;
  }
  list.push({ ...q, level });
  saveBookmarks(list);
  return true;
}

export function removeBookmarkAt(index: number): BookmarkedQuestion[] {
  const list = getBookmarks();
  list.splice(index, 1);
  saveBookmarks(list);
  return list;
}

export function checkIsBookmarked(level: string, q: RawQuestion): boolean {
  return getBookmarks().some(
    (b) =>
      b.level === level && b.question === q.question && b.kanji === q.kanji,
  );
}
