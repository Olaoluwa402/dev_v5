import {
  CREATE_SHELF_ERROR,
  CREATE_SHELF_REQUEST,
  CREATE_SHELF_RESET,
  CREATE_SHELF_SUCCESS,
} from "../Constants";

export const addToShelfReducer = (
  state = { book: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_SHELF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SHELF_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case CREATE_SHELF_RESET:
      return {
        loading: false,
        book: null,
        success: false,
        error: null,
      };

    case CREATE_SHELF_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
