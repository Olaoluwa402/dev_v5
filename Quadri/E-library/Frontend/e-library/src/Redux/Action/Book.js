import {
  GET_BOOKS_ERROR,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOK_ERROR,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  SEARCH_BOOK,
} from "../Constants";
import axios from "axios";
import { Logout } from "./User";

const url = "http://localhost:3000";

export const getBooksAction =
  (page = 1, search="") =>
  async (dispatch, state) => {
    const {
      loginUser: { user },
    } = state();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    try {
      dispatch({
        type: GET_BOOKS_REQUEST,
      });

      const numPage = Number(page) || 1;
      const { data } = await axios.get(`${url}/book?page=${numPage}&search=${search}`, config);
      console.log(data, "dataBook");
      dispatch({
        type: GET_BOOKS_SUCCESS,
        payload: data.payload,
      });
    } catch (error) {
      let message =
        error.response && error.response.data.errors
          ? error.response.data.errors.join(",")
          : error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_BOOKS_ERROR,
        payload: message,
      });
    }
  };

export const getBookAction =
  ({ bookId }) =>
  async (dispatch, state) => {
    const {
      loginUser: { user },
    } = state();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    try {
      dispatch({
        type: GET_BOOK_REQUEST,
      });

      const { data } = await axios.get(`${url}/book/${bookId}`, config);
      console.log(data, "prodSingle");
      dispatch({
        type: GET_BOOK_SUCCESS,
        payload: data.payload,
      });
    } catch (error) {
      console.log(error);
      let message =
        error.response && error.response.data.errors
          ? error.response.data.errors.join(",")
          : error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message.includes("jwt")) {
        dispatch(Logout());
      }

      dispatch({
        type: GET_BOOK_ERROR,
        payload: message,
      });
    }
  };


  // export const searchActions=(changeValue)=>async(dispatch, state)=>{
  //     dispatch({
  //       type:SEARCH_BOOK,
  //       payload: changeValue
  //     })
  // }
