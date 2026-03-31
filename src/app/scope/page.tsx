"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import n5Data from "@/data/n5.json";
import n4Data from "@/data/n4.json";
import n3Data from "@/data/n3.json";
import n2Data from "@/data/n2.json";
import n1Data from "@/data/n1.json";

import { setSelectedChapters } from "@/store/courseSlice";
import type { RootState, AppDispatch } from "@/store/store";

type Chapter = { chapter: number; questions: unknown[] };

const dataMap: Record<string, Chapter[]> = {
  n5: n5Data as Chapter[],
  n4: n4Data as Chapter[],
  n3: n3Data as Chapter[],
  n2: n2Data as Chapter[],
  n1: n1Data as Chapter[],
};

export default function ScopePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const level = useSelector((state: RootState) => state.course.level) ?? "";
  const chapters = dataMap[level] ?? [];

  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggle(chapter: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(chapter)) next.delete(chapter);
      else next.add(chapter);
      return next;
    });
  }

  function handleProceed() {
    const chosen = [...selected].sort((a, b) => a - b);
    const totalQuestions = chapters
      .filter((c) => selected.has(c.chapter))
      .reduce((sum, c) => sum + c.questions.length, 0);
    dispatch(setSelectedChapters({ chapters: chosen, totalQuestions }));
    router.push("/question-count");
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
            Choose your chapters.
          </Typography>
          <Typography className="mt-5 max-w-xl text-base text-sakura-iris md:text-lg">
            Toggle the chapters you want to practice, then press Proceed to
            begin your session.
          </Typography>
        </div>

        <div
          className="mt-10 grid gap-3 md:mt-0"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 1fr))",
          }}
        >
          {chapters.map((c) => {
            const isSelected = selected.has(c.chapter);
            return (
              <Button
                key={c.chapter}
                variant={isSelected ? "contained" : "outlined"}
                fullWidth
                onClick={() => toggle(c.chapter)}
                sx={(theme) => ({
                  fontSize: "0.95rem",
                  minHeight: 48,
                  py: "0.5rem",
                  px: "0.75rem",
                  borderRadius: "14px",
                  ...(isSelected
                    ? {
                        background: `${theme.palette.sakura.mist} !important`,
                        color: theme.palette.sakura.iris,
                        borderColor: theme.palette.sakura.coral,
                        borderWidth: 2,
                        boxShadow: "none",
                        "&:hover": {
                          background: `${theme.palette.sakura.mist} !important`,
                          transform: "translateY(-4px)",
                          borderColor: "transparent",
                          color: theme.palette.primary.main,
                        },
                      }
                    : {
                        background: "rgba(255,255,255,0.45) !important",
                        color: theme.palette.primary.main,
                        border: "none",
                        boxShadow: "0 4px 10px rgba(80,84,119,0.10)",
                        "&:hover": {
                          background: `${theme.palette.sakura.coral} !important`,
                          transform: "translateY(-4px)",
                          border: "none",
                        },
                      }),
                })}
              >
                Ch {c.chapter}
              </Button>
            );
          })}
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
            disabled={selected.size === 0}
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
