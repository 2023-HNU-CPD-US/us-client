import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folders: [
        { id: 1384602775573, type: "folder", name: "Food Recipes" },
        { id: 1651612775573, type: "folder", name: "Project" },
        { id: 1684602781573, type: "folder", name: "Secret" },
        { id: 1812137775573, type: "folder", name: "Reference" },
        { id: 8333602775573, type: "folder", name: "Test" },
    ],
};

const folders = createSlice({
    name: "folderReducer",
    initialState,
    reducers: {
        add: (state, action) => {
            state.folders.unshift({
                id: action.payload.id,
                type: "folder",
                name: action.payload.name,
            });
        },
        remove: (state, action) => {
            return {
                ...state,
                folders: state.folders.filter(
                    (folder) => folder.id !== action.payload.id
                ),
            };
        },
        rename: (state, action) => {
            const folder = state.folders.find(
                (folder) => folder.id === action.payload.id
            );
            if (folder) {
                folder.name = action.payload.newName;
            }
        },
    },
});

export const { add, remove, rename } = folders.actions;
export const folderReducer = folders.reducer;
