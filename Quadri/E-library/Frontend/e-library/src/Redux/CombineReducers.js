import { combineReducers } from "redux";
import {
  createUserReducer,
  deleteUserReducer,
  getUserReducer,
  getUsersReducer,
  loginUserReducer,
  updateUserReducer,
} from "./Reducers/user";
import {
  createBookReducer,
  deleteBookReducer,
  getBookReducer,
  getBooksReducer,
  updateBookReducer,
} from "./Reducers/book";

export const reducers = combineReducers({
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  getUsers: getUsersReducer,
  getUser: getUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  createBook: createBookReducer,
  getBooks: getBooksReducer,
  getBook: getBookReducer,
  updateBook: updateBookReducer,
  deleteBook: deleteBookReducer,
});
