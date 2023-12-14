import { combineReducers } from "redux";
import { registerUserReducer } from "./reducers/user/user";

export const combined = combineReducers({
  createdUser: registerUserReducer,
});
