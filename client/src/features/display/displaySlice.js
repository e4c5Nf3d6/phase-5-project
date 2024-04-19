import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    component: null
}

export const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setDisplay(state, action) {
            state.component = action.payload
        },
        resetDisplay() {
            return initialState
        }
    },
});

export const { setDisplay, resetDisplay } = displaySlice.actions;

export default displaySlice.reducer;