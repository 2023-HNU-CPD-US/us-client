import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [
        {
            id: 1384151775573,
            type: "note",
            title: "Note 1",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 1713602775573,
            type: "note",
            title: "Note 2",
            content:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        },
    ],
};

const notes = createSlice({
    name: "noteReducer",
    initialState,
    reducers: {
        add: (state, action) => {
            // state.unshift({ text: action.payload.text, id: action.payload.id }); // redux toolkit을 사용하면 state를 mutate해도 됨
        },
        remove: (state, action) => {
            return {
                ...state,
                notes: state.notes.filter(
                    (note) => note.id !== action.payload.id
                ),
            };
        },
        rename: (state, action) => {
            const note = state.notes.find(
                (note) => note.id === action.payload.id
            );
            if (note) {
                note.title = action.payload.newName;
            }
        },
    },
});

export const { add, remove, rename } = notes.actions;
export const noteReducer = notes.reducer;
