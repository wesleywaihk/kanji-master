import n5Data from "@/data/n5.json";
import n4Data from "@/data/n4.json";
import n3Data from "@/data/n3.json";
import n2Data from "@/data/n2.json";
import n1Data from "@/data/n1.json";

export type RawQuestion = { question: string; kanji: string; kana: string };
export type Chapter = { chapter: number; questions: RawQuestion[] };

export const dataMap: Record<string, Chapter[]> = {
  n5: n5Data as Chapter[],
  n4: n4Data as Chapter[],
  n3: n3Data as Chapter[],
  n2: n2Data as Chapter[],
  n1: n1Data as Chapter[],
};
