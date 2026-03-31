"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { setQuestionCounts } from "@/store/courseSlice";
import type { RootState, AppDispatch } from "@/store/store";

export default function QuestionCountPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const level = useSelector((state: RootState) => state.course.level) ?? "";
  const max = useSelector(
    (state: RootState) => state.course.totalAvailableQuestions
  );

  const [speaking, setSpeaking] = useState(0);
  const [kanji, setKanji] = useState(0);

  function handleProceed() {
    dispatch(setQuestionCounts({ speakingCount: speaking, kanjiCount: kanji }));
    router.push("/game-type");
  }

  return (
    <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
      <section className="landing-card mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between rounded-[36px] border border-white/60 bg-white/65 p-8 shadow-sakura backdrop-blur md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-sakura-coral/70 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sakura-iris">
            Kanji Master · {level.toUpperCase()}
          </p>
          <Typography
            component="h1"
            variant="h1"
            className="max-w-2xl text-5xl leading-none text-sakura-dusk md:text-7xl"
          >
            Set question counts.
          </Typography>
          <Typography className="mt-5 max-w-xl text-base text-sakura-iris md:text-lg">
            Choose how many Speaking and Kanji questions to include.{" "}
            <span className="font-semibold text-sakura-dusk">
              {max} questions available
            </span>{" "}
            from your selected chapters.
          </Typography>
        </div>

        <div className="mt-10 flex flex-col gap-10 md:mt-0 md:max-w-lg">
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <Typography className="font-semibold text-sakura-dusk">
                Speaking
              </Typography>
              <span className="text-2xl font-bold text-sakura-iris">
                {speaking}
              </span>
            </div>
            <Slider
              min={0}
              max={max}
              value={speaking}
              onChange={(_, v) => setSpeaking(v as number)}
              disabled={max === 0}
              sx={(theme) => ({
                color: theme.palette.sakura.coral,
                "& .MuiSlider-thumb": {
                  background: theme.palette.sakura.coral,
                  boxShadow: "0 2px 8px rgba(80,84,119,0.18)",
                },
                "& .MuiSlider-track": { background: theme.palette.sakura.coral, border: "none" },
                "& .MuiSlider-rail": { background: theme.palette.sakura.bloom },
              })}
            />
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <Typography className="font-semibold text-sakura-dusk">
                Kanji
              </Typography>
              <span className="text-2xl font-bold text-sakura-iris">
                {kanji}
              </span>
            </div>
            <Slider
              min={0}
              max={max}
              value={kanji}
              onChange={(_, v) => setKanji(v as number)}
              disabled={max === 0}
              sx={(theme) => ({
                color: theme.palette.sakura.iris,
                "& .MuiSlider-thumb": {
                  background: theme.palette.sakura.iris,
                  boxShadow: "0 2px 8px rgba(80,84,119,0.18)",
                },
                "& .MuiSlider-track": { background: theme.palette.sakura.iris, border: "none" },
                "& .MuiSlider-rail": { background: theme.palette.sakura.bloom },
              })}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={(theme) => ({
              px: 4,
              color: theme.palette.sakura.iris,
              borderColor: theme.palette.sakura.coral,
              borderWidth: 2,
              background: "rgba(255,255,255,0.45) !important",
              boxShadow: "none",
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
            disabled={speaking === 0 && kanji === 0}
            onClick={handleProceed}
            sx={(theme) => ({
              px: 6,
              background: `${theme.palette.sakura.bloom} !important`,
              color: theme.palette.primary.main,
              "&:hover": {
                background: `${theme.palette.sakura.coral} !important`,
                transform: "translateY(-4px)",
              },
              "&.Mui-disabled": {
                background: "rgba(255,194,194,0.3) !important",
                color: "rgba(80,84,119,0.35)",
                boxShadow: "none",
              },
            })}
          >
            Proceed
          </Button>
        </div>
      </section>
    </main>
  );
}
