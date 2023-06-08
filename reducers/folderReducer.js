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
            state.folders.unshift({
                id: action.payload.id,
                type: "folder",
                name: action.payload.name,
                parentId: action.payload.parentId,
                created_at: action.payload.created_at,
            });
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
