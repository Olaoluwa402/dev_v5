import axios from "axios";
import {
  CREATE_SHELF_ERROR,
  CREATE_SHELF_REQUEST,
  CREATE_SHELF_SUCCESS,
  GET_SHELVES_ERROR,
  GET_SHELVES_REQUEST,
  GET_SHELVES_SUCCESS,
} from "../Constants";
import { Logout } from "./User";

const url = "http://localhost:3000";
export const addToShelfAction =
  ({ bookId, categoryId }) =>
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
        type: CREATE_SHELF_REQUEST,
      });

      const { data } = await axios.post(
        `${url}/shelf`,
        { bookId, categoryId },
        config
      );
      dispatch({
        type: CREATE_SHELF_SUCCESS,
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
        type: CREATE_SHELF_ERROR,
        payload: message,
      });
    }
  };

export const getShelfAction = () => async (dispatch, state) => {
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
      type: GET_SHELVES_REQUEST,
    });
    const { data } = await axios.get(`${url}/shelf`, config);

    console.log(data, "shelf")

    dispatch({
      type: GET_SHELVES_SUCCESS,
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
      type: GET_SHELVES_ERROR,
      payload: message,
    });
  }
};
