import { createSlice } from '@reduxjs/toolkit'

const answerOffsets = {
    'Never': 1,
    'Sometimes': 0,
    'Always': -1,
    'Yes': 1,
    'No': -1
}

export const answerSlice = createSlice({
    name: 'answers',
    initialState: {
        dateOfBirth: null,
        radioQuestions: [null, null, null]
    },
    reducers: {
        saveDateAnswer: (state, action) => {
            state.dateOfBirth = action.payload;
        },
        saveRadioAnswer: (state, action) => {
            state.radioQuestions[action.payload.questionID] = answerOffsets[action.payload.answer]
        }
    }
});

export const { saveDateAnswer, saveRadioAnswer } = answerSlice.actions;
export const { initialAnswerState } = answerSlice.getInitialState()
export default answerSlice.reducer;