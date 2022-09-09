// Redux
import { combineReducers } from '@reduxjs/toolkit';
import answerReducer from "./answerSlice" ;
import authReducer from "./authSlice";

// Combined reducer for both answers and user authentication
export const rootReducer = combineReducers({
    answers: answerReducer, 
    auth: authReducer
});

export default rootReducer;