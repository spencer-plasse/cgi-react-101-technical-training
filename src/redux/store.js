import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'
import { initialAnswerState } from './answerSlice';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    answers: initialAnswerState
  }
});