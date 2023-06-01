import axios from 'axios';
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

export const { setFolders, add, remove, rename } = folders.actions;

export const fetchFolders = () => async dispatch => {
    const response = await axios.get('https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/FolderList/');
    dispatch(setFolders(response.data));
};

export const addFolder = (folder) => async dispatch => {
    const response = await axios.post('https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/TextList/', folder);
    dispatch(add(response.data));
};

export const removeFolder = (id) => async dispatch => {
    await axios.delete(`https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/TextList/${id}`);
    dispatch(remove({ id }));
};

export const renameFolder = (id, newName) => async dispatch => {
    const response = await axios.patch(`https://port-0-us-server-das6e2dli8igkfo.sel4.cloudtype.app/TextList/${id}`, { name: newName });
    dispatch(rename({ id, newName: response.data.name }));
};

export const folderReducer = folders.reducer;
