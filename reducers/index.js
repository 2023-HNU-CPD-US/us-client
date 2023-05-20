import { combineReducers } from "redux";

import { noteReducer } from "./noteReducer";
import { folderReducer } from "./folderReducer";

const rootReducer = combineReducers({
    noteReducer,
    folderReducer,
});

export default rootReducer;
