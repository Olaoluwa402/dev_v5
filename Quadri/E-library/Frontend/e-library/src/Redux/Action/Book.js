import {
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOK_ERROR,
} from "../Constants";
import axios from "axios";

const url = "http://localhost:3000";

export const getBooksAction = () => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({
      type: GET_BOOKS_REQUEST,
    });
    const { data } = await axios.get(`${url}/book`, config);
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
      type: GET_BOOK_ERROR,
      payload: message,
    });
  }
};
