import {
    CREATE_USER_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_RESET,
    CREATE_USER_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_REQUEST,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_REQUEST,
    GET_USERS_RESET,
    GET_USERS_SUCCESS,
    GET_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_RESET,
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_RESET,
    LOGIN_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
  } from "../Constants";
  
  export const createUserReducer = (
    state = { user: null, loading: false, success: false, error: null },
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
          user: null,
          success: false,
          error: null,
        };
      case CREATE_USER_ERROR:
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
  
  const storedUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  export const loginUserReducer = (
    state = { user: storedUserInfo, loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload,
        };
  
      case LOGIN_USER_RESET:
        return {
          loading: false,
          user: null,
          success: false,
          error: null,
        };
  
      case LOGIN_USER_ERROR:
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
  export const getUsersReducer = (
    state = { users: [], loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          users: action.payload,
        };
      case GET_USERS_RESET:
        return {
          loading: false,
          success: false,
          error: null,
          users: [],
        };
      case GET_USERS_ERROR:
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
  
  export const getUserReducer = (
    state = { user: null, loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case GET_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload,
        };
  
      case GET_USER_RESET:
        return {
          loading: false,
          success: false,
          user: null,
          error: null,
        };
      case GET_USER_ERROR:
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
  
  export const updateUserReducer = (
    state = { user: null, loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload,
        };
  
      case UPDATE_USER_RESET:
        return {
          user: null,
          loading: false,
          success: false,
          error: null,
        };
      case UPDATE_USER_ERROR:
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
  
  export const deleteUserReducer = (
    state = { user: null, loading: false, success: false, error: null },
    action
  ) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload,
        };
  
      case DELETE_USER_RESET:
        return {
          loading: false,
          user: null,
          success: false,
          error: null,
        };
      case DELETE_USER_ERROR:
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
  