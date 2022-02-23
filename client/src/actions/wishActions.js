import axios from "../utils/axiosInstance";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_WISH,
  GET_WISH,
  GET_WISHES,
  WISH_LOADING,
  GET_TOP_WISHES,
  TOP_WISH_LOADING,
  GET_MY_WISHES,
  MY_WISH_LOADING,
  MY_POCKET_LOADING,
  GET_MY_POCKET,
} from "./types";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setWishLoading = () => {
  return {
    type: WISH_LOADING,
  };
};
export const setTopWishLoading = () => {
  return {
    type: TOP_WISH_LOADING,
  };
};
export const setMyWishLoading = () => {
  return {
    type: MY_WISH_LOADING,
  };
};
export const setMyPocketLoading = () => {
  return {
    type: MY_POCKET_LOADING,
  };
};

// #######################################
// FOR WISHES PAGE
// Function to get all wishes
// #######################################

// Function to get all wishes
export const getWishes = () => (dispatch) => {
  dispatch(setWishLoading());
  axios
    .get("/wishes")
    .then((res) => {
      dispatch({
        type: GET_WISHES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_WISHES,
        payload: null,
      });
    });
};

// Function to create a new wish
export const addWish = (wishData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/wishes", wishData)
    .then((res) => {
      dispatch({
        type: ADD_WISH,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to like or dislike wish from wishes page
export const toggleLike = (id) => (dispatch) => {
  axios
    .post(`/wishes/like/${id}`)
    .then((res) => dispatch(getWishes()))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to pocket or unpocket wish from wishes page
export const togglePocket = (id) => (dispatch) => {
  axios
    .post(`/wishes/pocket/${id}`)
    .then((res) => dispatch(getWishes()))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// #######################################
// FOR SINGLE WISH PAGE
// Function to get a single wish
// #######################################

// Function to get a single wish
export const getWish = (id) => (dispatch) => {
  dispatch(setWishLoading());
  axios
    .get(`/wishes/${id}`)
    .then((res) => {
      dispatch({
        type: GET_WISH,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_WISH,
        payload: null,
      });
    });
};

// Function to like or dislike wish from single wish page
export const toggleLikeWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/like/${id}`)
    .then((res) => dispatch(getWish(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to pocket or unpocket wish from single wish page
export const togglePocketWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/pocket/${id}`)
    .then((res) => dispatch(getWish(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to add a new comment
export const addComment = (id, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/wishes/comment/${id}`, commentData)
    .then((res) => {
      dispatch(getWish(id));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to delete a comment
export const deleteComment = (wishId, commentId) => (dispatch) => {
  axios
    .delete(`/wishes/comment/${wishId}/${commentId}`)
    .then((res) => {
      dispatch(getWish(wishId));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// #######################################
// FOR TOP WISH PAGE
// Function to get top wishes
// #######################################

export const getTopWishes = () => (dispatch) => {
  dispatch(setTopWishLoading());
  axios
    .get("/wishes/topwishes")
    .then((res) => {
      dispatch({
        type: GET_TOP_WISHES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_TOP_WISHES,
        payload: null,
      });
    });
};

// Function to like or dislike wish from top wishes page
export const toggleLikeTopWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/like/${id}`)
    .then((res) => dispatch(getTopWishes(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to pocket or unpocket wish from top wishes page
export const togglePocketTopWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/pocket/${id}`)
    .then((res) => dispatch(getTopWishes(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// #######################################
// FOR MY WISH PAGE
// Function to get my wishes
export const getMyWishes = () => (dispatch) => {
  dispatch(setMyWishLoading());
  axios
    .get("/wishes/mywishes")
    .then((res) => {
      dispatch({
        type: GET_MY_WISHES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MY_WISHES,
        payload: null,
      });
    });
};

// Function to like or dislike wish from my wishes page
export const toggleLikeMyWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/like/${id}`)
    .then((res) => dispatch(getMyWishes(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to pocket or unpocket wish from my wishes page
export const togglePocketMyWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/pocket/${id}`)
    .then((res) => dispatch(getMyWishes(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Function to delete my wish
export const deleteMyWish = (id) => (dispatch) => {
  axios
    .delete(`/wishes/${id}`)
    .then((res) => {
      dispatch(getMyWishes());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// #######################################
// FOR POCKET PAGE
// Function to get my pocket
export const getMyPocket = () => (dispatch) => {
  dispatch(setMyPocketLoading());
  axios
    .get("/wishes/mypocket")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_MY_POCKET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_MY_POCKET,
        payload: null,
      });
    });
};

// Function to like or dislike wish from my wishes page
export const toggleLikePocketWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/like/${id}`)
    .then((res) => dispatch(getMyPocket(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to pocket or unpocket wish from my wishes page
export const togglePocketPocketWish = (id) => (dispatch) => {
  axios
    .post(`/wishes/pocket/${id}`)
    .then((res) => dispatch(getMyPocket(id)))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
