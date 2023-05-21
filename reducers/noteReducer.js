import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [
        {
            id: 1384151775573,
            type: "note",
            title: "Note 1",
            content: "Content 1",
        },
        {
            id: 1713602775573,
            type: "note",
            title: "Note 2",
            content: "Content 2",
        },
    ],
};

const notes = createSlice({
    name: "noteReducer",
    initialState,
    reducers: {
        add: (state, action) => {
            // state.unshift({ text: action.payload.text, id: action.payload.id }); // redux toolkit을 사용하면 state를 mutate해도 됨
        },
        remove: (state, action) => {
            return {
                ...state,
                notes: state.notes.filter(
                    (note) => note.id !== action.payload.id
                ),
            };
        },
        rename: (state, action) => {},
    },
});

export const { add, remove, rename } = notes.actions;
export const noteReducer = notes.reducer;
