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
import { modalReducer } from "./Reducers/modal";
import { addToShelfReducer, getShelvesReducer } from "./Reducers";

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
  addToShelf: addToShelfReducer,
  getShelves: getShelvesReducer,
  modal:modalReducer
});
