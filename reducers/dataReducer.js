import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
    name: "data",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const dataReducer = data.reducer;
