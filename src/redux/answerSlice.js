import { createSlice } from '@reduxjs/toolkit';

const answerOffsets = {
	'Never': 1,
	'Sometimes': 0,
	'Always': -1,
	'Yes': 1,
	'No': -1
};

export const answerSlice = createSlice({
	name: 'answers',
	initialState: {
		dateOfBirth: null,
		doesWorkout: null,
		doesEatJunkFood: null,
		canTouchToes: null
	},
	reducers: {
		saveDateAnswer: (state, action) => {
				state.dateOfBirth = action.payload;
		},

		saveRadioAnswer: (state, action) => {
				const {questionId, answer} = action.payload;
				state[questionId] = answerOffsets[answer];
		},
		
		submitAnswers: (state) => {
			state.dateOfBirth = null;
			state.doesWorkout = null;
			state.doesEatJunkFood = null;
			state.canTouchToes = null;
		}
	}
});

export const { saveDateAnswer, saveRadioAnswer, submitAnswers } = answerSlice.actions;
export const { initialAnswerState } = answerSlice.getInitialState();
export default answerSlice.reducer;