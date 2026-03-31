"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

import n5Data from "@/data/n5.json";
import n4Data from "@/data/n4.json";
import n3Data from "@/data/n3.json";
import n2Data from "@/data/n2.json";
import n1Data from "@/data/n1.json";

import type { RootState } from "@/store/store";

type RawQuestion = { question: string; kanji: string; kana: string };
type Chapter = { chapter: number; questions: RawQuestion[] };

const dataMap: Record<string, Chapter[]> = {
  n5: n5Data as Chapter[],
  n4: n4Data as Chapter[],
  n3: n3Data as Chapter[],
  n2: n2Data as Chapter[],
  n1: n1Data as Chapter[],
};

const FULLWIDTH = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"];
function toFullwidth(n: number): string {
  return String(n)
    .split("")
    .map((d) => FULLWIDTH[Number(d)])
    .join("");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Replace <A> in template with a <strong> word */
function buildSentence(template: string, word: string): string {
  return template.replace(
    "<A>",
    `<strong style="font-weight: 700; font-size: 1.2rem;"> ${word} </strong>`,
  );
}

export default function TestPaperPage() {
  const router = useRouter();
  const level = useSelector((state: RootState) => state.course.level) ?? "";
  const selectedChapters = useSelector(
    (state: RootState) => state.course.selectedChapters,
  );
  const speakingCount = useSelector(
    (state: RootState) => state.course.speakingCount,
  );
  const kanjiCount = useSelector((state: RootState) => state.course.kanjiCount);

  const { speakingQs, kanjiQs } = useMemo(() => {
    const chapters = dataMap[level] ?? [];
    const pool: RawQuestion[] = chapters
      .filter((c) => selectedChapters.includes(c.chapter))
      .flatMap((c) => c.questions);

    const shuffled = shuffle(pool);
    return {
      speakingQs: shuffled.slice(0, speakingCount),
      kanjiQs: shuffle(pool).slice(0, kanjiCount),
    };
  }, [level, selectedChapters, speakingCount, kanjiCount]);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-area { box-shadow: none !important; border: none !important; backdrop-filter: none !important; background: white !important; }
        }
      `}</style>

      <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
        <section className="print-area landing-card mx-auto w-full max-w-3xl rounded-[36px] border border-white/60 bg-white/90 p-8 shadow-sakura backdrop-blur md:p-12">
          {/* Toolbar */}
          <div className="no-print mb-8 flex items-center justify-between">
            <Button
              variant="outlined"
              onClick={() => router.back()}
              sx={(theme) => ({
                color: theme.palette.sakura.iris,
                borderColor: theme.palette.sakura.coral,
                borderWidth: 2,
                background: "rgba(255,255,255,0.45) !important",
                boxShadow: "none",
                minHeight: "unset",
                px: "0.6rem !important",
                py: "0.4rem !important",
                fontSize: "0.875rem",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  background: "rgba(255,255,255,0.7) !important",
                },
              })}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => window.print()}
              sx={(theme) => ({
                minWidth: "unset",
                background: `${theme.palette.sakura.bloom} !important`,
                color: theme.palette.primary.main,
                boxShadow: "none",
                minHeight: "unset",
                fontSize: "1.2rem",
                lineHeight: 1,
                px: "0.6rem !important",
                py: "0.4rem !important",
                "&:hover": {
                  background: `${theme.palette.sakura.coral} !important`,
                },
              })}
              title="Print"
            >
              🖨️ Print
            </Button>
          </div>

          {/* Header */}
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-sakura-iris">
            {level.toUpperCase()} · Test Paper
          </p>

          {/* 発音 section */}
          {speakingQs.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-sakura-dusk">発音</h2>
              <ol className="space-y-3">
                {speakingQs.map((q, i) => (
                  <li key={i} className="flex gap-2 text-base text-sakura-dusk">
                    <span className="w-12 shrink-0 font-medium">
                      {toFullwidth(i + 1)}．
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: buildSentence(q.question, q.kanji),
                      }}
                    />
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* 漢字 section */}
          {kanjiQs.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-sakura-dusk">漢字</h2>
              <ol className="space-y-3">
                {kanjiQs.map((q, i) => (
                  <li key={i} className="flex gap-2 text-base text-sakura-dusk">
                    <span className="w-12 shrink-0 font-medium">
                      {toFullwidth(i + 1)}．
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: buildSentence(q.question, q.kana),
                      }}
                    />
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
