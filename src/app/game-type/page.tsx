"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { setGameType, type GameType } from "@/store/courseSlice";
import type { RootState, AppDispatch } from "@/store/store";

const options: { type: GameType; label: string; description: string }[] = [
  {
    type: "card",
    label: "Card Game",
    description: "Flip through cards at your own pace.",
  },
  {
    type: "test",
    label: "Test Paper",
    description: "Answer all questions in one session.",
  },
];

export default function GameTypePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const level = useSelector((state: RootState) => state.course.level) ?? "";

  function handleSelect(type: GameType) {
    dispatch(setGameType(type));
    if (type === "test") router.push("/test-paper");
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
            How do you want to study?
          </Typography>
          <Typography className="mt-5 max-w-xl text-base text-sakura-iris md:text-lg">
            Pick a format and begin your session.
          </Typography>
        </div>

        <div className="mt-10 grid gap-6 md:mt-0 md:grid-cols-2">
          {options.map(({ type, label, description }) => (
            <Button
              key={type}
              variant="contained"
              fullWidth
              onClick={() => handleSelect(type)}
              sx={(theme) => ({
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
                minHeight: 160,
                px: "1rem !important",
                py: "2rem",
                borderRadius: "28px",
                background: `${theme.palette.sakura.bloom} !important`,
                color: theme.palette.primary.main,
                boxShadow: "0 18px 30px rgba(80,84,119,0.13)",
                textAlign: "left",
                "&:hover": {
                  background: `${theme.palette.sakura.coral} !important`,
                  transform: "translateY(-6px)",
                },
              })}
            >
              <span
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                {label}
              </span>
              <span
                style={{ fontSize: "0.95rem", fontWeight: 400, opacity: 0.75 }}
              >
                {description}
              </span>
            </Button>
          ))}
        </div>

        <div className="mt-8">
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
        </div>
      </section>
    </main>
  );
}
