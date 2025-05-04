import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("token", JSON.stringify(state.token))
        },
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(state.user))
        }
    }
})
export const { setToken, setUser } = authSlice.actions
export default authSlice.reducer