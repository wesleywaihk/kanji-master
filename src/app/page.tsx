"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { jlptLevels } from "@/theme/palette";
import { setLevel } from "@/store/courseSlice";
import type { AppDispatch } from "@/store/store";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  function handleLevelClick(level: string) {
    dispatch(setLevel(level.toLowerCase()));
    router.push("/scope");
  }

  return (
    <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
      <section className="landing-card mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between rounded-[36px] border border-white/60 bg-white/65 p-8 shadow-sakura backdrop-blur md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-sakura-coral/70 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sakura-iris">
            Kanji Master
          </p>
          <Typography
            component="h1"
            variant="h1"
            className="max-w-2xl text-5xl leading-none text-sakura-dusk md:text-7xl"
          >
            Learn kanji with a soft sakura rhythm.
          </Typography>
          <Typography className="mt-5 max-w-xl text-base text-sakura-iris md:text-lg">
            Start from your JLPT level and grow into daily practice, memory
            drills, and review sessions designed for steady progress.
          </Typography>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-5">
          {jlptLevels.map((level) => (
            <Button
              key={level}
              variant="contained"
              fullWidth
              onClick={() => handleLevelClick(level)}
              sx={(theme) => ({
                background: "#fff",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.6rem", md: "1.9rem" },
                "&:hover": {
                  background: theme.palette.sakura.coral,
                  transform: "translateY(-4px)",
                },
              })}
            >
              {level}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
