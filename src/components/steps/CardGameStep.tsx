import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import type { RootState } from '@/store/store';
import type { RawQuestion } from '@/lib/courseData';
import { shuffle } from '@/lib/testUtils';

type Card = {
  type: '発音' | '漢字';
  question: string;
  boldWord: string;
  answer: string;
};

function buildCards(speakingQs: RawQuestion[], kanjiQs: RawQuestion[]): Card[] {
  const s: Card[] = speakingQs.map((q) => ({
    type: '発音',
    question: q.question.replace('<A>', '＿＿＿'),
    boldWord: q.kanji,
    answer: q.kana,
  }));
  const k: Card[] = kanjiQs.map((q) => ({
    type: '漢字',
    question: q.question.replace('<A>', '＿＿＿'),
    boldWord: q.kana,
    answer: q.kanji,
  }));
  return shuffle([...s, ...k]);
}

type Props = {
  speakingQs: RawQuestion[];
  kanjiQs: RawQuestion[];
  onBack: () => void;
  onRestart: () => void;
};

export default function CardGameStep({
  speakingQs,
  kanjiQs,
  onBack,
  onRestart,
}: Props) {
  const level = useSelector((state: RootState) => state.course.level) ?? '';
  const cards = useMemo(
    () => buildCards(speakingQs, kanjiQs),
    [speakingQs, kanjiQs],
  );

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(true);

  const card = cards[index];
  const total = cards.length;

  function navigate(next: boolean) {
    setVisible(false);
    setFlipped(false);
    setTimeout(() => {
      setIndex((i) => (next ? Math.min(i + 1, total - 1) : Math.max(i - 1, 0)));
      setVisible(true);
    }, 180);
  }

  return (
    <>
      <style>{`
        .flip-card { perspective: 1200px; cursor: pointer; }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.45s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          gap: 1.25rem;
        }
        .flip-front { background: rgba(255,255,255,0.85); }
        .flip-back  { background: rgba(252,221,242,0.92); transform: rotateY(180deg); }
      `}</style>

      <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
        <section className="landing-card mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col justify-between rounded-[36px] border border-white/60 bg-white/65 p-8 shadow-sakura backdrop-blur md:p-12">
          {/* Top bar */}
          <div className="flex items-center justify-between">
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
                px: '0.75rem !important',
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
            <span className="text-sm font-semibold tracking-widest text-sakura-iris">
              {level.toUpperCase()} · カードゲーム
            </span>
            <Button
              variant="contained"
              onClick={onRestart}
              sx={(theme) => ({
                background: `${theme.palette.sakura.bloom} !important`,
                color: theme.palette.primary.main,
                boxShadow: 'none',
                minHeight: 'unset',
                px: '0.75rem !important',
                py: '0.4rem !important',
                fontSize: '0.875rem',
                '&:hover': {
                  background: `${theme.palette.sakura.coral} !important`,
                },
              })}
            >
              🔄 最初から
            </Button>
          </div>

          {/* Card */}
          <div
            className="flip-card mx-auto w-full"
            style={{
              height: '22rem',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.15s ease',
            }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div className={`flip-inner${flipped ? ' flipped' : ''}`}>
              {/* Front */}
              <div className="flip-face flip-front">
                <span className="rounded-full border border-sakura-coral/60 bg-sakura-bloom/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sakura-iris">
                  {card.type}
                </span>
                <p className="text-center text-2xl font-semibold leading-relaxed text-sakura-dusk">
                  {card.question}
                </p>
                <p className="mt-2 text-3xl font-bold text-sakura-iris">
                  {card.boldWord}
                </p>
                <p className="mt-4 text-xs text-sakura-iris/60">
                  タップして答えを見る
                </p>
              </div>

              {/* Back */}
              <div className="flip-face flip-back">
                <span className="rounded-full border border-sakura-coral/60 bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sakura-iris">
                  {card.type} · 答え
                </span>
                <p className="text-5xl font-bold text-sakura-dusk">
                  {card.answer}
                </p>
                <p className="mt-2 text-center text-base text-sakura-iris">
                  {card.boldWord}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outlined"
              onClick={() => navigate(false)}
              disabled={index === 0}
              sx={(theme) => ({
                color: theme.palette.sakura.iris,
                borderColor: theme.palette.sakura.coral,
                borderWidth: 2,
                background: 'rgba(255,255,255,0.45) !important',
                boxShadow: 'none',
                minHeight: 'unset',
                px: '1.25rem !important',
                py: '0.6rem !important',
                '&:hover': {
                  background: `${theme.palette.sakura.mist} !important`,
                  borderColor: 'transparent',
                },
                '&.Mui-disabled': {
                  opacity: 0.3,
                  background: 'rgba(255,255,255,0.2) !important',
                },
              })}
            >
              ←
            </Button>

            <span className="text-sm font-semibold text-sakura-iris">
              {index + 1} / {total}
            </span>

            <Button
              variant="outlined"
              onClick={() => navigate(true)}
              disabled={index === total - 1}
              sx={(theme) => ({
                color: theme.palette.sakura.iris,
                borderColor: theme.palette.sakura.coral,
                borderWidth: 2,
                background: 'rgba(255,255,255,0.45) !important',
                boxShadow: 'none',
                minHeight: 'unset',
                px: '1.25rem !important',
                py: '0.6rem !important',
                '&:hover': {
                  background: `${theme.palette.sakura.mist} !important`,
                  borderColor: 'transparent',
                },
                '&.Mui-disabled': {
                  opacity: 0.3,
                  background: 'rgba(255,255,255,0.2) !important',
                },
              })}
            >
              →
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
