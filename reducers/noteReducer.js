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
            const { id, name, content, parentId, created_at } = action.payload;
            const newNote = {
                id,
                type: "Text",
                name,
                content,
                parentId,
                created_at,
            };
            state.notes = [newNote, ...state.notes];
        },
        remove: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload.id
            );
        },
        rename: (state, action) => {
            const { id, name } = action.payload;
            const note = state.notes.find((note) => note.id === id);
            if (note) {
                note.name = name;
            }
        },
        update: (state, action) => {
            const { id, name, content } = action.payload;
            const note = state.notes.find((note) => note.id === id);
            if (note) {
                note.name = name;
                note.content = content;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.notes = action.payload.text;
        });
    },
});

export const { add, remove, rename, update } = notes.actions;
export default notes.reducer;
