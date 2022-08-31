import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false,
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;