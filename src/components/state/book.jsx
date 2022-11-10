import { createSlice } from "@reduxjs/toolkit";
export const bookSlice = createSlice({
    name: "book",
    initialState: {
        results: [],
    },
    reducers: {
        setResults: (state, payload) => {
            state.results = [...action.payload];
        },
        clearResults: (state, action) =>{
            state.results = [];
        }
    },
});

export const { setResults, clearResults } = bookSlice.actions;

export default bookSlice.reducer;