import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const getUserFromToken = (token) => {
    try {
        return token ? jwtDecode(token) : null;
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
};



const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        isUserLoggedIn: !!localStorage.getItem("token"),
        user: getUserFromToken(localStorage.getItem("token")),
    },
    reducers: {
        setToken: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            state.isUserLoggedIn = true;
            state.user = getUserFromToken(token)
            localStorage.setItem("token", token);
        },
        removeToken: (state) => {
            state.token = "";
            state.isUserLoggedIn = false;
            state.user = null;
            localStorage.removeItem("token");     
        }
    }

})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions