import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../actions/index";

const initialState = {
    notes: [],
};

const notes = createSlice({
    name: "note",
    initialState,
    reducers: {
        add: (state, action) => {
            // state.notes.unshift({ text: action.payload.text, id: action.payload.id });
        },
        remove: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload.id
            );
        },
        rename: (state, action) => {
            const note = state.notes.find(
                (note) => note.id === action.payload.id
            );
            if (note) {
                note.name = action.payload.newName;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.notes = action.payload.text;
        });
    },
});

export const { add, remove, rename } = notes.actions;
export default notes.reducer;
