import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import wishReducer from "./wishReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    wish: wishReducer,
    profile: profileReducer,
});
