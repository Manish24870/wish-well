import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
    isAuth: false,
    user: {},
};

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
