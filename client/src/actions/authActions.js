import axios from "../utils/axiosInstance";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Action for registering a user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Action for logging in user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("jwt", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Action to log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwt");

  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// // Action to delete user
// export const deleteUser = () => (dispatch) => {
//     axios
//         .delete("http://localhost:5000/users/delete")
//         .then((res) => {
//             dispatch(logoutUser());
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
