"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { setBookmarkMode } from "@/store/courseSlice";
import type { AppDispatch } from "@/store/store";
import { getBookmarks, removeBookmarkAt } from "@/lib/bookmarks";
import type { BookmarkedQuestion } from "@/lib/bookmarks";
import { buildSentence } from "@/lib/testUtils";

type Props = { onBack: () => void; onStart: () => void };

export default function BookmarkStep({ onBack, onStart }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>(() => getBookmarks());

  function handleRemove(index: number) {
    setBookmarks(removeBookmarkAt(index));
  }

  function handleStart() {
    dispatch(setBookmarkMode(bookmarks.length));
    onStart();
  }

  return (
    <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
      <section className="landing-card mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col justify-between rounded-[36px] border border-white/60 bg-white/65 p-8 shadow-sakura backdrop-blur md:p-12">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-sakura-coral/70 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sakura-iris">
            漢字マスター · ブックマーク
          </p>
          <Typography
            component="h1"
            variant="h1"
            className="max-w-2xl text-4xl leading-none text-sakura-dusk md:text-5xl"
          >
            ブックマーク一覧
          </Typography>
          <Typography className="mt-3 text-sm text-sakura-iris">
            {bookmarks.length} 問保存されています。
          </Typography>

          {bookmarks.length === 0 ? (
            <p className="mt-10 text-base text-sakura-iris">
              まだブックマークがありません。解答ページで ☆ をタップして問題を保存してください。
            </p>
          ) : (
            <ol className="mt-8 space-y-3">
              {bookmarks.map((b, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-sakura-dusk"
                >
                  <span className="shrink-0 text-xs font-semibold uppercase text-sakura-iris">
                    {b.level.toUpperCase()}
                  </span>
                  <span
                    className="min-w-0 flex-1 break-words"
                    dangerouslySetInnerHTML={{ __html: buildSentence(b.question, b.kanji) }}
                  />
                  <span className="shrink-0 font-semibold text-sakura-iris">{b.kana}</span>
                  <button
                    onClick={() => handleRemove(i)}
                    className="shrink-0 text-base leading-none text-sakura-coral hover:text-red-500"
                    title="削除"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            variant="outlined"
            onClick={onBack}
            sx={(theme) => ({
              px: 4,
              color: theme.palette.sakura.iris,
              borderColor: theme.palette.sakura.coral,
              borderWidth: 2,
              background: "rgba(255,255,255,0.45) !important",
              boxShadow: "none",
              "&:hover": { borderColor: theme.palette.primary.main, background: "rgba(255,255,255,0.7) !important" },
            })}
          >
            ← 戻る
          </Button>
          <Button
            variant="contained"
            disabled={bookmarks.length === 0}
            onClick={handleStart}
            sx={(theme) => ({
              px: 6,
              background: `${theme.palette.sakura.bloom} !important`,
              color: theme.palette.primary.main,
              "&:hover": { background: `${theme.palette.sakura.coral} !important`, transform: "translateY(-4px)" },
              "&.Mui-disabled": { background: "rgba(255,194,194,0.3) !important", color: "rgba(80,84,119,0.35)", boxShadow: "none" },
            })}
          >
            練習開始 →
          </Button>
        </div>
      </section>
    </main>
  );
}
