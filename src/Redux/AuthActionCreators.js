import * as actionType from "./ActionTypes";
import axios from "axios";

export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authFailed = (err) => {
  return {
    type: actionType.AUTH_FAILED,
    payload: err,
  };
};

export const authLoading = () => {
  return {
    type: actionType.AUTH_LOADING,
  };
};

export const auth = (email, password, mode) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    mode: mode,
    returnSecureToken: true,
  };

  const API_KEY = "AIzaSyCyQmfoplMFXlQD-OpVxHmGRweCloPzD_4";

  let AUTH_URL = null;

  if (mode === "Sign Up") {
    AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    AUTH_URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  axios
    .post(AUTH_URL + API_KEY, authData)
    .then((response) => {
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("userId", response.data.localId);
      const expirationTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("expirationTime", expirationTime);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch((err) => dispatch(authFailed(err.response.data.error.message)));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const autoCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  }
};
