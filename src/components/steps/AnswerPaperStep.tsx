'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import type { RootState } from '@/store/store';
import type { RawQuestion } from '@/lib/courseData';
import { buildSentence, toFullwidth } from '@/lib/testUtils';
import { getBookmarks, toggleBookmark } from '@/lib/bookmarks';

type Props = {
  speakingQs: RawQuestion[];
  kanjiQs: RawQuestion[];
  onBack: () => void;
  onRestart: () => void;
};

export default function AnswerPaperStep({
  speakingQs,
  kanjiQs,
  onBack,
  onRestart,
}: Props) {
  const level = useSelector((state: RootState) => state.course.level) ?? '';
  const selectedChapters = useSelector(
    (state: RootState) => state.course.selectedChapters,
  );
  const isBookmarkMode = useSelector(
    (state: RootState) => state.course.isBookmarkMode,
  );

  const [bookmarked, setBookmarked] = useState<Set<string>>(() => {
    const bms = getBookmarks();
    return new Set(bms.map((b) => `${b.level}::${b.question}::${b.kanji}`));
  });

  function bKey(q: RawQuestion) {
    return `${level}::${q.question}::${q.kanji}`;
  }

  function handleToggle(q: RawQuestion) {
    const added = toggleBookmark(level, q);
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (added) next.add(bKey(q));
      else next.delete(bKey(q));
      return next;
    });
  }

  const headerLabel = isBookmarkMode
    ? 'ブックマーク · 解答'
    : `${level.toUpperCase()} · 解答 · 章 ${selectedChapters.join(', ')}`;

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          .print-shell { padding: 0 !important; }
          .print-area { box-shadow: none !important; border: none !important; backdrop-filter: none !important; background: white !important; border-radius: 0 !important; padding: 0.75rem 1.25rem !important; max-width: 100% !important; }
          .print-section-gap { margin-bottom: 2rem !important; }
          .print-heading { margin-bottom: 0.25rem !important; }
          .print-list { row-gap: 0.15rem !important; }
          .print-label { margin-bottom: 0.25rem !important; }
        }
        .answer-box {
          display: inline-block;
          min-width: 8rem;
          border-bottom: 1.5px solid #b0a0c0;
          margin-left: auto;
          flex-shrink: 0;
          text-align: center;
        }
      `}</style>

      <main className="print-shell landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
        <section className="print-area landing-card mx-auto w-full max-w-3xl rounded-[36px] border border-white/60 bg-white/90 p-8 shadow-sakura backdrop-blur md:p-12">
          <div className="no-print mb-8 flex items-center justify-between">
            <Button
              variant="outlined"
              onClick={onBack}
              sx={(theme) => ({
                color: theme.palette.sakura.iris,
                borderColor: theme.palette.sakura.coral,
                borderWidth: 2,
                background: 'rgba(255,255,255,0.45) !important',
                boxShadow: 'none',
                minHeight: 'unset',
                px: '0.6rem !important',
                py: '0.4rem !important',
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  background: 'rgba(255,255,255,0.7) !important',
                },
              })}
            >
              ← 戻る
            </Button>
            <div className="flex gap-2">
              <Button
                variant="contained"
                onClick={onRestart}
                sx={(theme) => ({
                  background: `${theme.palette.sakura.bloom} !important`,
                  color: theme.palette.primary.main,
                  boxShadow: 'none',
                  minHeight: 'unset',
                  fontSize: '1.2rem',
                  lineHeight: 1,
                  px: '0.6rem !important',
                  py: '0.4rem !important',
                  '&:hover': {
                    background: `${theme.palette.sakura.coral} !important`,
                  },
                })}
                title="Restart"
              >
                🔄 最初から
              </Button>
              <Button
                variant="contained"
                onClick={() => window.print()}
                sx={(theme) => ({
                  background: `${theme.palette.sakura.bloom} !important`,
                  color: theme.palette.primary.main,
                  boxShadow: 'none',
                  minHeight: 'unset',
                  fontSize: '1.2rem',
                  lineHeight: 1,
                  px: '0.6rem !important',
                  py: '0.4rem !important',
                  '&:hover': {
                    background: `${theme.palette.sakura.coral} !important`,
                  },
                })}
                title="Print"
              >
                🖨️ 印刷
              </Button>
            </div>
          </div>

          <p className="print-label mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-sakura-iris">
            {headerLabel}
          </p>

          {speakingQs.length > 0 && (
            <section className="print-section-gap mb-10">
              <h2 className="print-heading mb-4 text-xl font-bold text-sakura-dusk">
                発音
              </h2>
              <ol className="print-list space-y-3">
                {speakingQs.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-2 text-base text-sakura-dusk"
                  >
                    <span className="w-8 shrink-0 font-medium">
                      {toFullwidth(i + 1)}．
                    </span>
                    <span
                      className="min-w-0 flex-1 break-words"
                      dangerouslySetInnerHTML={{
                        __html: buildSentence(q.question, q.kanji),
                      }}
                    />
                    <span className="answer-box font-semibold text-sakura-iris">
                      {q.kana}
                    </span>
                    <button
                      onClick={() => handleToggle(q)}
                      className="no-print shrink-0 text-xl leading-none text-sakura-coral"
                      title={
                        bookmarked.has(bKey(q))
                          ? 'ブックマーク解除'
                          : 'ブックマーク'
                      }
                    >
                      {bookmarked.has(bKey(q)) ? '★' : '☆'}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {kanjiQs.length > 0 && (
            <section>
              <h2 className="print-heading mb-4 text-xl font-bold text-sakura-dusk">
                漢字
              </h2>
              <ol className="print-list space-y-3">
                {kanjiQs.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-2 text-base text-sakura-dusk"
                  >
                    <span className="w-8 shrink-0 font-medium">
                      {toFullwidth(i + 1)}．
                    </span>
                    <span
                      className="min-w-0 flex-1 break-words"
                      dangerouslySetInnerHTML={{
                        __html: buildSentence(q.question, q.kana),
                      }}
                    />
                    <span className="answer-box font-semibold text-sakura-iris">
                      {q.kanji}
                    </span>
                    <button
                      onClick={() => handleToggle(q)}
                      className="no-print shrink-0 text-xl leading-none text-sakura-coral"
                      title={
                        bookmarked.has(bKey(q))
                          ? 'ブックマーク解除'
                          : 'ブックマーク'
                      }
                    >
                      {bookmarked.has(bKey(q)) ? '★' : '☆'}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </section>
      </main>
    </>
  );
}
