// Redux
import { createSlice } from '@reduxjs/toolkit';

// Stores the current values for answers as the user provides them in "/questions"
export const answerSlice = createSlice({
	name: 'answers',
	initialState: {
		dateOfBirth: null,
		doesWorkout: null,
		doesEatJunkFood: null,
		canTouchToes: null
	},
	reducers: {
		// Saves the date answer every time a new date is selected (default format is an ISO date without time)
		saveDateAnswer: (state, action) => {
				state.dateOfBirth = action.payload;
		},

		// Saves the specified radio answer every time a new answer is selected
		// Note: Saves the answer text rather than the numerical offset value
		saveRadioAnswer: (state, action) => {
				const {questionId, answer} = action.payload;
				state[questionId] = answer;
		},
		
		// Clear out answer state as the "/questions" form is submitted
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