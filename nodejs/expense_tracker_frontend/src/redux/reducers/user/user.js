//A reducer is a function that takes in two argument (initialState and action)
//and mutate the store based on the action
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_RESET,
  CREATE_USER_ERROR,
  CREATE_USER_CLEAR_ERROR,
} from "../../constants/user/user";
export const registerUserReducer = (
  state = { user: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };

    case CREATE_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        error: null,
      };

    case CREATE_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
