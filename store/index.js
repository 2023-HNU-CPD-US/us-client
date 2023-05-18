import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./reducers/folderReducer";

const store = configureStore({
    reducer: {
        note: noteReducer,
        folder: folderReducer,
    },
});

export default store;
