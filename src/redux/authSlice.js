// Redux
import { createSlice } from '@reduxjs/toolkit'

// Keeps track of whether a user is logged in, and if so, their username and email
export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false,
        user: null
    },
    reducers: {
        // Log the user in and keep track of their username and email
        login: (state, action) => {
            const {username, email} = action.payload;

            state.loggedIn = true;
            state.user = {
                username: username,
                email: email
            };
        },

        // Log the user out
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;