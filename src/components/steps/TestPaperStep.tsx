import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import type { RootState } from "@/store/store";
import type { RawQuestion } from "@/lib/courseData";
import { buildSentence, toFullwidth } from "@/lib/testUtils";

type Props = {
  speakingQs: RawQuestion[];
  kanjiQs: RawQuestion[];
  onBack: () => void;
  onAnswer: () => void;
};

export default function TestPaperStep({ speakingQs, kanjiQs, onBack, onAnswer }: Props) {
  const level = useSelector((state: RootState) => state.course.level) ?? "";

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
          <div className="no-print mb-8 flex items-center justify-between">
            <Button
              variant="outlined"
              onClick={onBack}
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
                "&:hover": { borderColor: theme.palette.primary.main, background: "rgba(255,255,255,0.7) !important" },
              })}
            >
              ← 戻る
            </Button>
            <div className="flex gap-2">
              <Button
                variant="contained"
                onClick={onAnswer}
                sx={(theme) => ({
                  background: `${theme.palette.sakura.bloom} !important`,
                  color: theme.palette.primary.main,
                  boxShadow: "none",
                  minHeight: "unset",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  px: "0.6rem !important",
                  py: "0.4rem !important",
                  "&:hover": { background: `${theme.palette.sakura.coral} !important` },
                })}
                title="Answers"
              >
                📋 解答
</Button>
              <Button
                variant="contained"
                onClick={() => window.print()}
                sx={(theme) => ({
                  background: `${theme.palette.sakura.bloom} !important`,
                  color: theme.palette.primary.main,
                  boxShadow: "none",
                  minHeight: "unset",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  px: "0.6rem !important",
                  py: "0.4rem !important",
                  "&:hover": { background: `${theme.palette.sakura.coral} !important` },
                })}
                title="Print"
              >
                🖨️ 印刷
              </Button>
            </div>
          </div>

          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-sakura-iris">
            {level.toUpperCase()} · テスト
          </p>

          {speakingQs.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-sakura-dusk">発音</h2>
              <ol className="space-y-3">
                {speakingQs.map((q, i) => (
                  <li key={i} className="flex gap-2 text-base text-sakura-dusk">
                    <span className="w-12 shrink-0 font-medium">{toFullwidth(i + 1)}．</span>
                    <span
                      className="min-w-0 flex-1 break-words"
                      dangerouslySetInnerHTML={{ __html: buildSentence(q.question, q.kanji) }}
                    />
                  </li>
                ))}
              </ol>
            </section>
          )}

          {kanjiQs.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-sakura-dusk">漢字</h2>
              <ol className="space-y-3">
                {kanjiQs.map((q, i) => (
                  <li key={i} className="flex gap-2 text-base text-sakura-dusk">
                    <span className="w-12 shrink-0 font-medium">{toFullwidth(i + 1)}．</span>
                    <span
                      className="min-w-0 flex-1 break-words"
                      dangerouslySetInnerHTML={{ __html: buildSentence(q.question, q.kana) }}
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
