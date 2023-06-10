import { combineReducers } from "redux";
import folderReducer from "./folderReducer";
import noteReducer from "./noteReducer";

const rootReducer = combineReducers({
    folder: folderReducer,
    note: noteReducer,
});

export default rootReducer;
