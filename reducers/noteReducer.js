import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [
        { id: 1, type: "note", title: "Note 1", content: "Content 1" },
        { id: 2, type: "note", title: "Note 2", content: "Content 2" },
    ],
};

const notes = createSlice({
    name: "noteReducer",
    initialState,
    reducers: {
        add: (state, action) => {
            // state.unshift({ text: action.payload.text, id: action.payload.id });
        },
        remove: (state, action) => {
            // return state.filter(toDo => toDo.id !== action.payload.id);
        },
        rename: (state, action) => {},
    },
});

export const { add, remove, rename } = notes.actions;
export const noteReducer = notes.reducer;
