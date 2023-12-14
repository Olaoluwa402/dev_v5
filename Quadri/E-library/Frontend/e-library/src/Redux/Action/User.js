import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_RESET,
  LOGIN_USER_SUCCESS,
} from "../Constants";
const url = "http://localhost:3000";

export const loginUserAction = (user) => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const { data } = await axios.post(
      `${url}/user/login`,
      { email: user.email, password: user.password },
      config
    );
    const userInfo = { ...data.payload, token: data.token };

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: userInfo,
    });
    localStorage.setItem("userInfo", JSON.stringify("userInfo"));
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: message,
    });
  }
};

export const Logout = () => async (dispatch, state) => {
  dispatch({
    type: LOGIN_USER_RESET,
  });
  localStorage.setItem("userInfo", null);
  toast.success("Logged out");
};


export const registerUserAction =(info)=>async(dispatch, state)=>{
  const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }

  try {
    dispatch({
      type:CREATE_USER_REQUEST
    })

    const {data}= await axios.post(`${url}/user`,{...info},config)
    const userInfo = {...data.payload}
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload:userInfo
    })
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
          type:CREATE_USER_ERROR,
          payload:message
        })
  }
}