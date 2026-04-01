import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameType = 'card' | 'test' | null;

interface CourseState {
  level: string | null;
  selectedChapters: number[];
  totalAvailableQuestions: number;
  speakingCount: number;
  kanjiCount: number;
  gameType: GameType;
  isBookmarkMode: boolean;
}

const initialState: CourseState = {
  level: null,
  selectedChapters: [],
  totalAvailableQuestions: 0,
  speakingCount: 0,
  kanjiCount: 0,
  gameType: null,
  isBookmarkMode: false,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setLevel(state, action: PayloadAction<string>) {
      state.level = action.payload;
      state.selectedChapters = [];
      state.totalAvailableQuestions = 0;
      state.speakingCount = 0;
      state.kanjiCount = 0;
      state.isBookmarkMode = false;
    },
    setBookmarkMode(state, action: PayloadAction<number>) {
      state.isBookmarkMode = true;
      state.selectedChapters = [];
      state.totalAvailableQuestions = action.payload;
      state.speakingCount = 0;
      state.kanjiCount = 0;
    },
    setSelectedChapters(
      state,
      action: PayloadAction<{ chapters: number[]; totalQuestions: number }>,
    ) {
      state.selectedChapters = action.payload.chapters;
      state.totalAvailableQuestions = action.payload.totalQuestions;
      state.speakingCount = 0;
      state.kanjiCount = 0;
    },
    setQuestionCounts(
      state,
      action: PayloadAction<{ speakingCount: number; kanjiCount: number }>,
    ) {
      state.speakingCount = action.payload.speakingCount;
      state.kanjiCount = action.payload.kanjiCount;
      state.gameType = null;
    },
    setGameType(state, action: PayloadAction<GameType>) {
      state.gameType = action.payload;
    },
  },
});

export const {
  setLevel,
  setSelectedChapters,
  setQuestionCounts,
  setGameType,
  setBookmarkMode,
} = courseSlice.actions;
export default courseSlice.reducer;
