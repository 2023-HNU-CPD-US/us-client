import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        note: noteReducer,
        folder: folderReducer,
    },
});

export default store;
