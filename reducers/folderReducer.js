import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../actions/index";

const initialState = {
    folders: [],
};

const folderSlice = createSlice({
    name: "folder",
    initialState,
    reducers: {
        add: (state, action) => {
            const { id, name, parentId, created_at } = action.payload;
            const newFolder = {
                id,
                type: "Folder",
                name,
                parentId,
                created_at,
            };
            state.folders = [newFolder, ...state.folders];
        },
        remove: (state, action) => {
            state.folders = state.folders.filter(
                (folder) => folder.id !== action.payload.id
            );
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
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.folders = action.payload.folder;
        });
    },
});

export const { add, remove, rename } = folderSlice.actions;
export default folderSlice.reducer;
