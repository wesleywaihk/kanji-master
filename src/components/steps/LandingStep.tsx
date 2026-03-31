import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { jlptLevels } from "@/theme/palette";
import { setLevel } from "@/store/courseSlice";
import type { AppDispatch } from "@/store/store";

export default function LandingStep({ onNext }: { onNext: () => void }) {
  const dispatch = useDispatch<AppDispatch>();

  function handleLevelClick(level: string) {
    dispatch(setLevel(level.toLowerCase()));
    onNext();
  }

  return (
    <main className="landing-shell bg-sakura-glow px-6 py-10 md:px-10 md:py-14">
      <section className="landing-card mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between rounded-[36px] border border-white/60 bg-white/65 p-8 shadow-sakura backdrop-blur md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-sakura-coral/70 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sakura-iris">
            漢字マスター
          </p>
          <Typography
            component="h1"
            variant="h1"
            className="max-w-2xl text-5xl leading-none text-sakura-dusk md:text-7xl"
          >
            日々の練習で漢字をマスターしよう。
          </Typography>
          <Typography className="mt-5 max-w-xl text-base text-sakura-iris md:text-lg">
            JLPTレベルを選んで、毎日の練習・記憶訓練・復習セッションで着実に実力を伸ばそう。
          </Typography>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-5">
          {jlptLevels.map((level) => (
            <Button
              key={level}
              variant="contained"
              fullWidth
              onClick={() => handleLevelClick(level)}
              disabled={level !== "N2"}
              sx={(theme) => ({
                background: "#fff",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.6rem", md: "1.9rem" },
                "&:hover": {
                  background: theme.palette.sakura.coral,
                  transform: "translateY(-4px)",
                },
                "&:disabled": {
                  background: "#eee !important",
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
