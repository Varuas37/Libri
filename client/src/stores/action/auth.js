import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
//LOAD USER

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERR,
    });
  }
};
// REGISTER USER

export const registerUser = ({ name, lastname, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, lastname, email, password });
  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setAlert("User Already Exists 🙎‍♂️", "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// REGISTER USER

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setAlert("Invalid Credentials 🔐", "danger"));
    }
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// LOGOUT USESR /CLEAR PROFILE

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
