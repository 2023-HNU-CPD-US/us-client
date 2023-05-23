import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folders: [
        {
            id: 1384602775573,
            type: "folder",
            name: "Food Recipes",
            date: "2023-05-23",
            parentId: null,
        },
        {
            id: 1651612775573,
            type: "folder",
            name: "Project",
            date: "2023-05-21",
            parentId: null,
        },
        {
            id: 1684602781573,
            type: "folder",
            name: "Secret",
            date: "2023-05-22",
            parentId: null,
        },
        {
            id: 1812137775573,
            type: "folder",
            name: "Reference",
            date: "2023-05-20",
            parentId: null,
        },
        {
            id: 8333602775573,
            type: "folder",
            name: "Test",
            date: "2023-05-19",
            parentId: 1651612775573,
        },
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
