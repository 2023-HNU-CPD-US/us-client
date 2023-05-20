import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folders: [
        { id: 1, type: "folder", name: "Food Recipes" },
        { id: 2, type: "folder", name: "Project" },
        { id: 3, type: "folder", name: "Secret" },
        { id: 4, type: "folder", name: "Reference" },
        { id: 5, type: "folder", name: "Test" },
    ],
};

const folders = createSlice({
    name: "folderReducer",
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

export const { add, remove, rename } = folders.actions;
export const folderReducer = folders.reducer;
