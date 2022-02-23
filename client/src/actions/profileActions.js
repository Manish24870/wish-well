import axios from "../utils/axiosInstance";

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Function to load the user profile
export const getProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/users/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

// Function to edit the username
export const editProfileUsername = (data) => (dispatch) => {
  axios
    .post("/users/profile/newusername", data)
    .then((res) => {
      dispatch(getProfile());
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

// Function to edit the password
export const editProfilePassword = (data) => (dispatch) => {
  axios
    .post("/users/profile/newpassword", data)
    .then((res) => {
      dispatch(getProfile());
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

// Action to upload an avatar
export const uploadAvatar = (data) => (dispatch) => {
  console.log(data);
  let formData = new FormData();
  formData.append("avatar", data);
  axios
    .post("/users/profile/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(getProfile());
    });
};
