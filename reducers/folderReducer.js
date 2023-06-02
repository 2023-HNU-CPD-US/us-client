import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    folders: [],
};

const folders = createSlice({
    name: "folderReducer",
    initialState,
    reducers: {
        setFolders: (state, action) => {
            state.folders = action.payload;
        },
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

export const folderReducer = folders.reducer;
