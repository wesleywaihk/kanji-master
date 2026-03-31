"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import LandingStep from "@/components/steps/LandingStep";
import ScopeStep from "@/components/steps/ScopeStep";
import QuestionCountStep from "@/components/steps/QuestionCountStep";
import GameTypeStep from "@/components/steps/GameTypeStep";
import TestPaperStep from "@/components/steps/TestPaperStep";
import AnswerPaperStep from "@/components/steps/AnswerPaperStep";
import CardGameStep from "@/components/steps/CardGameStep";
import type { GameType } from "@/store/courseSlice";
import type { RootState } from "@/store/store";
import { generateTestQuestions } from "@/lib/testUtils";

type Step = "landing" | "scope" | "question-count" | "game-type" | "test-paper" | "answer-paper" | "card-game";

export default function HomePage() {
  const [step, setStep] = useState<Step>("landing");

  const level = useSelector((state: RootState) => state.course.level) ?? "";
  const selectedChapters = useSelector((state: RootState) => state.course.selectedChapters);
  const speakingCount = useSelector((state: RootState) => state.course.speakingCount);
  const kanjiCount = useSelector((state: RootState) => state.course.kanjiCount);

  // Generated once per unique set of settings; stable across test↔answer navigation.
  const { speakingQs, kanjiQs } = useMemo(
    () => generateTestQuestions(level, selectedChapters, speakingCount, kanjiCount),
    [level, selectedChapters, speakingCount, kanjiCount],
  );

  if (step === "landing") return <LandingStep onNext={() => setStep("scope")} />;
  if (step === "scope") return <ScopeStep onNext={() => setStep("question-count")} onBack={() => setStep("landing")} />;
  if (step === "question-count") return <QuestionCountStep onNext={() => setStep("game-type")} onBack={() => setStep("scope")} />;
  if (step === "game-type") {
    return (
      <GameTypeStep
        onNext={(type: GameType) => {
          if (type === "test") setStep("test-paper");
          if (type === "card") setStep("card-game");
        }}
        onBack={() => setStep("question-count")}
      />
    );
  }
  if (step === "test-paper") {
    return (
      <TestPaperStep
        speakingQs={speakingQs}
        kanjiQs={kanjiQs}
        onBack={() => setStep("game-type")}
        onAnswer={() => setStep("answer-paper")}
      />
    );
  }
  if (step === "card-game") {
    return (
      <CardGameStep
        speakingQs={speakingQs}
        kanjiQs={kanjiQs}
        onBack={() => setStep("game-type")}
        onRestart={() => setStep("landing")}
      />
    );
  }
  return (
    <AnswerPaperStep
      speakingQs={speakingQs}
      kanjiQs={kanjiQs}
      onBack={() => setStep("test-paper")}
      onRestart={() => setStep("landing")}
    />
  );
}
