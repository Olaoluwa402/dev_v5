import {
  CREATE_BOOK_ERROR,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_RESET,
  CREATE_BOOK_SUCCESS,
  DELETE_BOOK_ERROR,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_RESET,
  DELETE_BOOK_SUCCESS,
  GET_BOOKS_ERROR,
  GET_BOOKS_REQUEST,
  GET_BOOKS_RESET,
  GET_BOOKS_SUCCESS,
  GET_BOOK_ERROR,
  GET_BOOK_REQUEST,
  GET_BOOK_RESET,
  GET_BOOK_SUCCESS,
  SEARCH_BOOK,
  UPDATE_BOOK_ERROR,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_RESET,
  UPDATE_BOOK_SUCCESS,
} from "../Constants";

export const createBookReducer = (
  state = { book: null, success: false, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case CREATE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case CREATE_BOOK_RESET:
      return {
        loading: false,
        success: false,
        error: null,
        book: null,
      };

    case CREATE_BOOK_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getBookReducer = (
  state = { book: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case GET_BOOK_RESET:
      return {
        loading: false,
        success: false,
        book: null,
        error: null,
      };
    case GET_BOOK_ERROR:
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

export const getBooksReducer = (
  state = {
    book: [],
    loading: false,
    success: false,
    error: null,
    isSearchActive: false,
    foundResult: [],
  },
  action
) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case SEARCH_BOOK: {
      console.log(action.payload, "payloaddd");
      return {
        ...state,
        loading: false,
        isSearchActive: action.payload.length > 0 ? action.payload : false,
        foundResult: state.book.records.filter((item) => {
          return (
            item.title.toLowerCase().search(action.payload.toLowerCase()) !==
              -1 ||
            item.author.toLowerCase().search(action.payload.toLowerCase()) !== -1
          );
        }),
      };
    }
    case GET_BOOKS_RESET:
      return {
        loading: false,
        success: false,
        book: [],
        error: null,
      };

    case GET_BOOKS_ERROR:
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

export const updateBookReducer = (
  state = { book: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.payload) {
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };

    case UPDATE_BOOK_RESET:
      return {
        loading: false,
        success: false,
        book: null,
        error: null,
      };

    case UPDATE_BOOK_ERROR:
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

export const deleteBookReducer = (
  state = { book: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        book: action.payload,
      };
    case DELETE_BOOK_RESET:
      return {
        loading: false,
        success: false,
        book: null,
        error: null,
      };
    case DELETE_BOOK_ERROR:
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
