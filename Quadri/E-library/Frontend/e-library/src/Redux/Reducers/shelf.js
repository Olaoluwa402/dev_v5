import {
  CREATE_SHELF_ERROR,
  CREATE_SHELF_REQUEST,
  CREATE_SHELF_RESET,
  CREATE_SHELF_SUCCESS,
  GET_SHELVES_ERROR,
  GET_SHELVES_REQUEST,
  GET_SHELVES_RESET,
  GET_SHELVES_SUCCESS,
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

export const getShelvesReducer = (
  state = { shelves: [], loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_SHELVES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SHELVES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        shelves: action.payload,
      };

    case GET_SHELVES_RESET:
      return {
        loading: false,
        shelves: [],
        success: false,
        error: null,
      };

    case GET_SHELVES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };

    default:
      return state;
  }
};


export const deleteShelfReducer=(state={shelf:null, loading:false, success:true, error:null}, action)=>{
    switch (action.type) {
        case value:
            
            break;
    
        default:
            break;
    }
}
