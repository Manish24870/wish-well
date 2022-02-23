import {
    WISH_LOADING,
    GET_WISHES,
    GET_WISH,
    ADD_WISH,
    GET_TOP_WISHES,
    TOP_WISH_LOADING,
    MY_WISH_LOADING,
    GET_MY_WISHES,
    MY_POCKET_LOADING,
    GET_MY_POCKET,
} from "../actions/types";

const initialState = {
    wishes: [],
    topWishes: [],
    myWishes: [],
    myPocket: [],
    wish: {},
    loading: false,
    loadingTop: false,
    loadingMy: false,
    loadingPocket: false,
};

const wishReducer = function (state = initialState, action) {
    switch (action.type) {
        // FOR WISHES AND SINGLE WISH PAGE
        case WISH_LOADING:
            return {
                ...state,
                loading: true,
            };

        case GET_WISHES:
            return {
                ...state,
                wishes: action.payload,
                loading: false,
            };

        case ADD_WISH:
            return {
                ...state,
                wishes: [action.payload, ...state.wishes],
            };

        case GET_WISH:
            return {
                ...state,
                wish: action.payload,
                loading: false,
            };

        // FOR TOP WISHES PAGE
        case TOP_WISH_LOADING:
            return {
                ...state,
                loadingTop: true,
            };

        case GET_TOP_WISHES:
            return {
                ...state,
                topWishes: action.payload,
                loadingTop: false,
            };

        // FOR MY WISHES PAGE
        case MY_WISH_LOADING:
            return {
                ...state,
                loadingMy: true,
            };

        case GET_MY_WISHES:
            return {
                ...state,
                myWishes: action.payload,
                loadingMy: false,
            };
        // FOR POCKET PAGE
        case MY_POCKET_LOADING:
            return {
                ...state,
                loadingPocket: true,
            };

        case GET_MY_POCKET:
            return {
                ...state,
                myPocket: action.payload,
                loadingPocket: false,
            };

        default:
            return state;
    }
};

export default wishReducer;
