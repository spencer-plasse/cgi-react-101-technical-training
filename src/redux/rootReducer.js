import { combineReducers } from '@reduxjs/toolkit';

import answerReducer from "./answerSlice" ;
import authReducer from "./authSlice";

export const rootReducer = combineReducers({
    answers: answerReducer, 
    auth: authReducer
});

export default rootReducer;