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
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";

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
    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data,
    // });
    
    dispatch(setAlert(`${res.data.msg}`,"success"));
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {

      dispatch(setAlert(`${err.response.data.errors[0].msg}`, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// LOGIN USER

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
      console.log(err.response.data.errors)
      dispatch(setAlert(`${err.response.data.errors[0].msg}`, "danger"));
    }
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const resetpassword = (email) => async (dispatch)=>{
  const config={
    headers:{
      "Content-Type":"application/json"
    },
  }
  const body = JSON.stringify({email})
  try{
    const res = await axios.post("/api/auth/reset-password",body,config);
    
    dispatch({
      type:RESET_PASSWORD,
      payload:res.data,
    })
    console.log(res.data)
   
    dispatch(setAlert(`${res.data.msg}`,"success"));

  }
  catch(err){
    const errors = err.response.data;
   
    if (errors) {
      console.log(errors)
      dispatch(setAlert(`${errors.error}`, "danger"));
    }
    dispatch({
      type: RESET_PASSWORD_FAILED,
    });
    
  }
}

export const newPassword = (password,token) =>async (dispatch)=>{
  const config = {
    headers:{
      "Content-Type":"application/json"
    },
  }
  const body = JSON.stringify({password,token})
  
  try{
    const res = await axios.post("/api/auth/newpassword",body,config);
    dispatch({
      type:RESET_PASSWORD,
      payload:res.data,
    })
    console.log(res.data)
   
    dispatch(setAlert(`${res.data.msg}`,"success"));
  }
  catch(err){
    const errors = err.response.data;
   
    if (errors) {
      console.log(errors)
      dispatch(setAlert(`${errors.error}`, "danger"));
    }
    dispatch({
      type: RESET_PASSWORD_FAILED,
    });
  }


}

// LOGOUT USESR /CLEAR PROFILE

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
